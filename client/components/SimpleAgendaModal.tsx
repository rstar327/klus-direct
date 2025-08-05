import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Calendar,
  CalendarCheck,
  Clock,
  MapPin,
  Euro,
  User,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  X,
  Save,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface SimpleAgendaModalProps {
  children: React.ReactNode;
}

interface SimpleAgendaItem {
  id: string;
  title: string;
  client: string;
  date: string;
  time: string;
  location: string;
  amount: number;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export default function SimpleAgendaModal({ children }: SimpleAgendaModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [agendaItems, setAgendaItems] = useState<SimpleAgendaItem[]>([]);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Simple form for quick appointment
  const [quickForm, setQuickForm] = useState({
    title: '',
    client: '',
    date: '',
    time: '09:00',
    location: '',
    amount: ''
  });

  // Simple availability settings
  const [availability, setAvailability] = useState({
    workDays: 'ma-vr', // ma-vr, ma-za, alle-dagen
    startTime: '08:00',
    endTime: '18:00',
    lunch: true
  });

  useEffect(() => {
    // Load data
    const items = localStorage.getItem('agendaItems');
    if (items) {
      const fullItems = JSON.parse(items);
      // Convert to simple format
      const simpleItems = fullItems.map((item: any) => ({
        id: item.id,
        title: item.title,
        client: item.clientName,
        date: item.date,
        time: item.startTime,
        location: item.location || 'Niet opgegeven',
        amount: item.amount || 0,
        status: item.status
      }));
      setAgendaItems(simpleItems);
    }

    const settings = localStorage.getItem('simpleAvailability');
    if (settings) {
      setAvailability(JSON.parse(settings));
    }
  }, []);

  const saveQuickForm = () => {
    if (!quickForm.title || !quickForm.client || !quickForm.date) return;

    const newItem: SimpleAgendaItem = {
      id: `simple-${Date.now()}`,
      title: quickForm.title,
      client: quickForm.client,
      date: quickForm.date,
      time: quickForm.time,
      location: quickForm.location || 'Te bepalen',
      amount: parseInt(quickForm.amount) || 0,
      status: 'scheduled'
    };

    const updatedItems = [...agendaItems, newItem];
    setAgendaItems(updatedItems);

    // Save to localStorage in full format for compatibility
    const fullFormat = {
      id: newItem.id,
      title: newItem.title,
      clientName: newItem.client,
      clientEmail: '',
      clientPhone: '',
      location: newItem.location,
      date: newItem.date,
      startTime: newItem.time,
      endTime: '',
      status: newItem.status,
      amount: newItem.amount,
      commissionRate: 15,
      notes: 'Handmatig toegevoegd',
      jobType: 'Afspraak',
      estimatedDuration: 4
    };

    const existingFull = JSON.parse(localStorage.getItem('agendaItems') || '[]');
    existingFull.push(fullFormat);
    localStorage.setItem('agendaItems', JSON.stringify(existingFull));

    // Reset form
    setQuickForm({
      title: '',
      client: '',
      date: '',
      time: '09:00',
      location: '',
      amount: ''
    });
    setShowQuickAdd(false);
  };

  const saveAvailability = () => {
    localStorage.setItem('simpleAvailability', JSON.stringify(availability));
    setShowSettings(false);
  };

  const deleteItem = (id: string) => {
    const updatedItems = agendaItems.filter(item => item.id !== id);
    setAgendaItems(updatedItems);
    
    // Update full format too
    const existingFull = JSON.parse(localStorage.getItem('agendaItems') || '[]');
    const updatedFull = existingFull.filter((item: any) => item.id !== id);
    localStorage.setItem('agendaItems', JSON.stringify(updatedFull));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Get items for today and next 7 days
  const getUpcomingItems = () => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return agendaItems
      .filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= today && itemDate <= nextWeek;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    
    if (date.toDateString() === today.toDateString()) return 'Vandaag';
    if (date.toDateString() === tomorrow.toDateString()) return 'Morgen';
    
    return date.toLocaleDateString('nl-NL', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl glass border-2 border-premium-600/30 bg-premium-800/95">
        <DialogHeader>
          <DialogTitle className="text-xl text-premium-50 flex items-center justify-between">
            <div className="flex items-center">
              <CalendarCheck className="w-5 h-5 mr-2 text-klusdirect-orange" />
              Mijn Agenda
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="border-premium-600 text-premium-300 hover:bg-premium-700"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                onClick={() => setShowQuickAdd(true)}
                className="bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-medium"
              >
                <Plus className="w-4 h-4 mr-1" />
                Nieuw
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Quick Add Form */}
          {showQuickAdd && (
            <Card className="glass border border-klusdirect-orange/30 bg-klusdirect-orange/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-premium-50">Snelle afspraak toevoegen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Input
                      placeholder="Titel (bijv. Badkamer)"
                      value={quickForm.title}
                      onChange={(e) => setQuickForm({...quickForm, title: e.target.value})}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 text-sm"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Klant naam"
                      value={quickForm.client}
                      onChange={(e) => setQuickForm({...quickForm, client: e.target.value})}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 text-sm"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Input
                      type="date"
                      value={quickForm.date}
                      onChange={(e) => setQuickForm({...quickForm, date: e.target.value})}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 text-sm"
                    />
                  </div>
                  <div>
                    <Input
                      type="time"
                      value={quickForm.time}
                      onChange={(e) => setQuickForm({...quickForm, time: e.target.value})}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 text-sm"
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Bedrag (€)"
                      value={quickForm.amount}
                      onChange={(e) => setQuickForm({...quickForm, amount: e.target.value})}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <Input
                    placeholder="Locatie (optioneel)"
                    value={quickForm.location}
                    onChange={(e) => setQuickForm({...quickForm, location: e.target.value})}
                    className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 text-sm"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowQuickAdd(false)}
                    className="flex-1 border-premium-600 text-premium-300 hover:bg-premium-700"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Annuleer
                  </Button>
                  <Button
                    size="sm"
                    onClick={saveQuickForm}
                    disabled={!quickForm.title || !quickForm.client || !quickForm.date}
                    className="flex-1 bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-medium disabled:opacity-50"
                  >
                    <Save className="w-3 h-3 mr-1" />
                    Opslaan
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Simple Settings */}
          {showSettings && (
            <Card className="glass border border-klusdirect-blue/30 bg-klusdirect-blue/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-premium-50">Beschikbaarheid instellen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-premium-300 mb-1 block">Werkdagen</Label>
                    <select
                      value={availability.workDays}
                      onChange={(e) => setAvailability({...availability, workDays: e.target.value})}
                      className="w-full glass border-premium-600/30 bg-premium-800/50 text-premium-50 rounded-md px-2 py-1 text-sm"
                    >
                      <option value="ma-vr">Maandag - Vrijdag</option>
                      <option value="ma-za">Maandag - Zaterdag</option>
                      <option value="alle-dagen">Alle dagen</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-xs text-premium-300 mb-1 block">Lunch pauze</Label>
                    <select
                      value={availability.lunch ? 'ja' : 'nee'}
                      onChange={(e) => setAvailability({...availability, lunch: e.target.value === 'ja'})}
                      className="w-full glass border-premium-600/30 bg-premium-800/50 text-premium-50 rounded-md px-2 py-1 text-sm"
                    >
                      <option value="ja">Ja (12:00-13:00)</option>
                      <option value="nee">Nee</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-premium-300 mb-1 block">Start tijd</Label>
                    <Input
                      type="time"
                      value={availability.startTime}
                      onChange={(e) => setAvailability({...availability, startTime: e.target.value})}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-premium-300 mb-1 block">Eind tijd</Label>
                    <Input
                      type="time"
                      value={availability.endTime}
                      onChange={(e) => setAvailability({...availability, endTime: e.target.value})}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 text-sm"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSettings(false)}
                    className="flex-1 border-premium-600 text-premium-300 hover:bg-premium-700"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Annuleer
                  </Button>
                  <Button
                    size="sm"
                    onClick={saveAvailability}
                    className="flex-1 bg-gradient-to-r from-klusdirect-blue to-klusdirect-blue-dark text-white font-medium"
                  >
                    <Save className="w-3 h-3 mr-1" />
                    Opslaan
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upcoming Appointments */}
          <Card className="glass border border-premium-600/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-premium-50 flex items-center justify-between">
                <span>Komende afspraken</span>
                <Badge className="bg-klusdirect-orange/20 text-klusdirect-orange border border-klusdirect-orange/30 text-xs">
                  {getUpcomingItems().length} afspraken
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {getUpcomingItems().map((item) => (
                  <div key={item.id} className="glass border border-premium-600/30 rounded-lg p-3 hover:border-klusdirect-orange/30 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-premium-50 text-sm">{item.title}</h3>
                          <Badge className={`${getStatusColor(item.status)} border text-xs`}>
                            {item.status === 'scheduled' ? 'Gepland' : 
                             item.status === 'completed' ? 'Klaar' : 'Geannuleerd'}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs text-premium-300">
                          <div className="flex items-center">
                            <User className="w-3 h-3 mr-1 text-klusdirect-gold" />
                            {item.client}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1 text-klusdirect-blue" />
                            {formatDate(item.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1 text-klusdirect-orange" />
                            {item.time}
                          </div>
                          <div className="flex items-center">
                            <Euro className="w-3 h-3 mr-1 text-green-400" />
                            €{item.amount}
                          </div>
                        </div>

                        {item.location !== 'Niet opgegeven' && item.location !== 'Te bepalen' && (
                          <div className="flex items-center mt-1 text-xs text-premium-400">
                            <MapPin className="w-3 h-3 mr-1 text-red-400" />
                            {item.location}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-1 ml-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteItem(item.id)}
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10 p-1 h-6 w-6"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {getUpcomingItems().length === 0 && (
                  <div className="text-center py-8">
                    <CalendarCheck className="w-12 h-12 text-premium-600 mx-auto mb-3" />
                    <h3 className="text-sm font-medium text-premium-400 mb-2">
                      Geen afspraken deze week
                    </h3>
                    <p className="text-xs text-premium-500 mb-3">
                      Voeg je eerste afspraak toe om van start te gaan
                    </p>
                    <Button
                      size="sm"
                      onClick={() => setShowQuickAdd(true)}
                      className="bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-medium"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Eerste afspraak
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="glass border border-premium-600/30 p-3">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">
                  {agendaItems.filter(i => i.status === 'scheduled').length}
                </div>
                <div className="text-xs text-premium-400">Gepland</div>
              </div>
            </Card>
            <Card className="glass border border-premium-600/30 p-3">
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">
                  {agendaItems.filter(i => i.status === 'completed').length}
                </div>
                <div className="text-xs text-premium-400">Afgerond</div>
              </div>
            </Card>
            <Card className="glass border border-premium-600/30 p-3">
              <div className="text-center">
                <div className="text-lg font-bold text-klusdirect-gold">
                  €{agendaItems.filter(i => i.status === 'completed').reduce((sum, i) => sum + i.amount, 0).toLocaleString()}
                </div>
                <div className="text-xs text-premium-400">Verdiend</div>
              </div>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
