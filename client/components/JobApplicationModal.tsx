import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Target,
  Send,
  CheckCircle,
  Euro,
  Clock,
  User,
  MessageCircle,
  Crown,
  AlertTriangle
} from "lucide-react";

interface JobApplicationModalProps {
  job: {
    id: number;
    title: string;
    client: {
      name: string;
    };
    budget: {
      min: number;
      max: number;
      currency: string;
    };
    timing: {
      startDate: string;
      duration: string;
    };
  };
  onApplicationSubmit: () => void;
}

export default function JobApplicationModal({ job, onApplicationSubmit }: JobApplicationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Wait a moment to show success, then close and update parent
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setMessage("");
      onApplicationSubmit();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold text-lg py-6 hover:scale-105 transition-transform">
          <Target className="w-5 h-5 mr-2" />
          Aanmelden voor klus
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl glass border-2 border-premium-600/30 bg-premium-800/95">
        <DialogHeader>
          <DialogTitle className="text-2xl text-premium-50 flex items-center">
            <Target className="w-6 h-6 mr-3 text-klusdirect-orange" />
            Aanmelden voor klus
          </DialogTitle>
          <DialogDescription className="text-premium-300">
            Bevestig je aanmelding en stuur een persoonlijk bericht naar de klant
          </DialogDescription>
        </DialogHeader>

        {!isSubmitted ? (
          <div className="space-y-6">
            {/* Job Summary */}
            <Card className="glass border border-premium-600/30">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-premium-50 mb-3">{job.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-klusdirect-blue" />
                    <span className="text-premium-200">Klant: {job.client.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Euro className="w-4 h-4 text-green-400" />
                    <span className="text-premium-200">
                      {job.budget.currency}{job.budget.min.toLocaleString()} - {job.budget.currency}{job.budget.max.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-klusdirect-orange" />
                    <span className="text-premium-200">{job.timing.duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Message */}
            <div className="space-y-3">
              <Label htmlFor="message" className="text-premium-200 text-base font-medium">
                Persoonlijk bericht (optioneel)
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 placeholder:text-premium-400 min-h-[120px]"
                placeholder="Vertel waarom je de juiste persoon bent voor deze klus. Beschrijf je ervaring, beschikbaarheid of stel vragen over het project..."
              />
              <p className="text-premium-400 text-sm">
                Een persoonlijk bericht verhoogt je kans om geselecteerd te worden
              </p>
            </div>

            {/* Warning */}
            <Card className="glass border border-yellow-500/30 bg-yellow-500/5">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-yellow-400 font-medium text-sm mb-1">
                      Belangrijk
                    </h4>
                    <p className="text-premium-300 text-sm">
                      Door je aan te melden bevestig je dat je beschikbaar bent voor dit project en 
                      voldoet aan alle gestelde vereisten. Onnodige aanmeldingen kunnen leiden tot 
                      accountbeperkingen.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                className="flex-1 border-premium-600 text-premium-200 hover:bg-premium-700"
                disabled={isSubmitting}
              >
                Annuleren
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Aanmelden...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Bevestig aanmelding
                  </>
                )}
              </Button>
            </div>
          </div>
        ) : (
          /* Success State */
          <div className="py-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-400/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-premium-50 mb-3">
              Aanmelding succesvol!
            </h3>
            <p className="text-premium-200 mb-6">
              Je aanmelding is verzonden naar <span className="text-klusdirect-gold font-medium">{job.client.name}</span>. 
              Je ontvangt bericht zodra de klant je selecteert voor dit project.
            </p>
            <div className="flex items-center justify-center space-x-2 text-klusdirect-blue">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">Je kunt de status volgen in je dashboard</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
