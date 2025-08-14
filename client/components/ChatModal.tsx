import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MessageCircle,
  Send,
  User,
  Crown,
  Check,
  CheckCheck,
  Clock,
  X,
} from "lucide-react";

interface ChatModalProps {
  children: React.ReactNode;
  chatId: string;
  currentUser: {
    id: string;
    name: string;
    type: "customer" | "craftsman";
  };
  otherUser: {
    id: string;
    name: string;
    type: "customer" | "craftsman";
  };
  jobTitle?: string;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export default function ChatModal({
  children,
  chatId,
  currentUser,
  otherUser,
  jobTitle,
}: ChatModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      loadMessages();
    }
  }, [isOpen, chatId]);

  const loadMessages = () => {
    // Load messages from localStorage
    const chatKey = `chat_${chatId}`;
    const storedMessages = localStorage.getItem(chatKey);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      // Initialize with welcome message
      const welcomeMessage: Message = {
        id: `msg_${Date.now()}`,
        senderId: "system",
        content: `Chat gestart voor project: ${jobTitle || "Klus"}. Je kunt nu direct communiceren!`,
        timestamp: new Date().toISOString(),
        read: true,
      };
      setMessages([welcomeMessage]);
      localStorage.setItem(chatKey, JSON.stringify([welcomeMessage]));
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      content: newMessage.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);

    // Save to localStorage
    const chatKey = `chat_${chatId}`;
    localStorage.setItem(chatKey, JSON.stringify(updatedMessages));

    // Clear input
    setNewMessage("");

    // Simulate typing indicator and response (in real app this would be real-time)
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);

      // Simulate auto-response for demo
      if (Math.random() > 0.7) {
        const autoResponse: Message = {
          id: `msg_${Date.now() + 1}`,
          senderId: otherUser.id,
          content:
            currentUser.type === "customer"
              ? "Bedankt voor je bericht! Ik ga hier zo snel mogelijk mee aan de slag."
              : "Perfect, ik heb je offerte ontvangen. Ik neem contact op als ik vragen heb.",
          timestamp: new Date().toISOString(),
          read: false,
        };

        const finalMessages = [...updatedMessages, autoResponse];
        setMessages(finalMessages);
        localStorage.setItem(chatKey, JSON.stringify(finalMessages));
      }
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("nl-NL", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isFromCurrentUser = (senderId: string) => senderId === currentUser.id;
  const isSystemMessage = (senderId: string) => senderId === "system";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl h-[600px] glass border border-premium-600/30 flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl text-premium-50 flex items-center justify-between">
            <div className="flex items-center">
              <MessageCircle className="w-6 h-6 mr-2 text-klusdirect-blue" />
              Chat met {otherUser.name}
            </div>
            <Badge className="bg-green-400/20 text-green-400 border-green-400/30">
              <Crown className="w-3 h-3 mr-1" />
              {otherUser.type === "craftsman" ? "Vakman" : "Klant"}
            </Badge>
          </DialogTitle>
          {jobTitle && (
            <p className="text-premium-300 text-sm">Project: {jobTitle}</p>
          )}
        </DialogHeader>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 pt-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              {isSystemMessage(message.senderId) ? (
                <div className="text-center">
                  <div className="inline-block bg-premium-700/50 text-premium-300 text-xs px-3 py-1 rounded-full">
                    {message.content}
                  </div>
                </div>
              ) : (
                <div
                  className={`flex ${isFromCurrentUser(message.senderId) ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] ${
                      isFromCurrentUser(message.senderId)
                        ? "bg-klusdirect-blue text-white"
                        : "bg-premium-700 text-premium-50"
                    } rounded-lg p-3 relative`}
                  >
                    <p className="break-words">{message.content}</p>
                    <div
                      className={`flex items-center justify-end mt-1 gap-1 ${
                        isFromCurrentUser(message.senderId)
                          ? "text-blue-100"
                          : "text-premium-400"
                      }`}
                    >
                      <span className="text-xs">
                        {formatTime(message.timestamp)}
                      </span>
                      {isFromCurrentUser(message.senderId) &&
                        (message.read ? (
                          <CheckCheck className="w-3 h-3" />
                        ) : (
                          <Check className="w-3 h-3" />
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-premium-700 text-premium-300 rounded-lg p-3 max-w-[70%]">
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <span className="text-xs ml-2">
                    {otherUser.name} is aan het typen...
                  </span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-6 pt-0 border-t border-premium-600/30">
          <div className="flex space-x-3">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Typ je bericht..."
              className="flex-1 glass border-premium-600/30 bg-premium-800/50 text-premium-50"
            />
            <Button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="bg-klusdirect-blue hover:bg-klusdirect-blue-dark text-white disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-premium-400 mt-2">
            Druk op Enter om te verzenden
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
