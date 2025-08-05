import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
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
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit3,
  Trash2,
  CheckCircle,
  AlertCircle,
  Users,
  Building,
  FileText,
  Settings,
  Filter,
  Eye,
  X,
  Save,
  RotateCcw
} from "lucide-react";

interface AgendaModalProps {
  children: React.ReactNode;
}

interface AgendaItem {
  id: string;
  title: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in_progress';
  amount: number;
  commissionRate: number;
  notes?: string;
  jobType: string;
  estimatedDuration: number;
}

export default function AgendaModal({ children }: AgendaModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<AgendaItem[]>([]);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<AgendaItem | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAvailabilityForm, setShowAvailabilityForm] = useState(false);
  const [availabilitySettings, setAvailabilitySettings] = useState({
    workingDays: [1, 2, 3, 4, 5], // Monday to Friday
    workingHours: {
      start: '08:00',
      end: '18:00'
    },
    breakTime: {
      start: '12:00',
      end: '13:00'
    },
    minSlotDuration: 60, // minutes
    bufferTime: 30 // minutes between appointments
  });

  const [newItem, setNewItem] = useState<Partial<AgendaItem>>({
    title: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    location: '',
    date: '',
    startTime: '',
    endTime: '',
    status: 'scheduled',
    amount: 0,
    commissionRate: 15,
    notes: '',
    jobType: '',
    estimatedDuration: 4
  });

  useEffect(() => {
    // Load agenda items from localStorage
    const storedItems = localStorage.getItem('agendaItems');
    if (storedItems) {
      setAgendaItems(JSON.parse(storedItems));
    }

    // Load availability settings
    const storedAvailability = localStorage.getItem('availabilitySettings');
    if (storedAvailability) {
      setAvailabilitySettings(JSON.parse(storedAvailability));
    }

    // Load accepted job applications and convert to agenda items
    const pendingInvoices = localStorage.getItem('pendingInvoices');
    if (pendingInvoices) {
      const invoices = JSON.parse(pendingInvoices);
      const agendaFromJobs = invoices.map((invoice: any) => ({
        id: `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: invoice.jobTitle,
        clientName: invoice.clientName,
        clientEmail: invoice.clientEmail || 'geen-email@example.com',
        clientPhone: invoice.clientPhone || '06 12345678',
        location: invoice.location || 'Locatie niet opgegeven',
        date: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        startTime: '09:00',
        endTime: '17:00',
        status: 'scheduled' as const,
        amount: invoice.proposedAmount || 0,
        commissionRate: invoice.commissionRate || 15,
        notes: `Aangenomen offerte - Factuur: ${invoice.invoiceNumber}`,
        jobType: 'Renovatie',
        estimatedDuration: 8
      }));

      if (agendaFromJobs.length > 0 && !storedItems) {
        setAgendaItems(agendaFromJobs);
        localStorage.setItem('agendaItems', JSON.stringify(agendaFromJobs));
      }
    }
  }, []);

  useEffect(() => {
    // Filter items based on status
    if (statusFilter === 'all') {
      setFilteredItems(agendaItems);
    } else {
      setFilteredItems(agendaItems.filter(item => item.status === statusFilter));
    }
  }, [agendaItems, statusFilter]);

  const handleSaveItem = () => {
    if (!newItem.title || !newItem.clientName || !newItem.date || !newItem.startTime) {
      return;
    }

    const item: AgendaItem = {
      id: editingItem?.id || `agenda-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: newItem.title!,
      clientName: newItem.clientName!,
      clientEmail: newItem.clientEmail || '',
      clientPhone: newItem.clientPhone || '',
      location: newItem.location || '',
      date: newItem.date!,
      startTime: newItem.startTime!,
      endTime: newItem.endTime || '',
      status: newItem.status as AgendaItem['status'] || 'scheduled',
      amount: newItem.amount || 0,
      commissionRate: newItem.commissionRate || 15,
      notes: newItem.notes || '',
      jobType: newItem.jobType || '',
      estimatedDuration: newItem.estimatedDuration || 4
    };

    let updatedItems;
    if (editingItem) {
      updatedItems = agendaItems.map(i => i.id === editingItem.id ? item : i);
    } else {
      updatedItems = [...agendaItems, item];
    }

    setAgendaItems(updatedItems);
    localStorage.setItem('agendaItems', JSON.stringify(updatedItems));
    resetForm();
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = agendaItems.filter(item => item.id !== id);
    setAgendaItems(updatedItems);
    localStorage.setItem('agendaItems', JSON.stringify(updatedItems));
  };

  const handleEditItem = (item: AgendaItem) => {
    setEditingItem(item);
    setNewItem(item);
    setShowAddForm(true);
  };

  const resetForm = () => {
    setNewItem({
      title: '',
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      location: '',
      date: '',
      startTime: '',
      endTime: '',
      status: 'scheduled',
      amount: 0,
      commissionRate: 15,
      notes: '',
      jobType: '',
      estimatedDuration: 4
    });
    setEditingItem(null);
    setShowAddForm(false);
  };

  const getStatusColor = (status: AgendaItem['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'in_progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: AgendaItem['status']) => {
    switch (status) {
      case 'scheduled': return <Calendar className="w-3 h-3" />;
      case 'in_progress': return <Clock className="w-3 h-3" />;
      case 'completed': return <CheckCircle className="w-3 h-3" />;
      case 'cancelled': return <X className="w-3 h-3" />;
    }
  };

  const getStatusText = (status: AgendaItem['status']) => {
    switch (status) {
      case 'scheduled': return 'Gepland';
      case 'in_progress': return 'Bezig';
      case 'completed': return 'Afgerond';
      case 'cancelled': return 'Geannuleerd';
    }
  };

  const getItemsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return filteredItems.filter(item => item.date === dateStr);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('nl-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const saveAvailabilitySettings = () => {
    localStorage.setItem('availabilitySettings', JSON.stringify(availabilitySettings));
    setShowAvailabilityForm(false);
  };

  const isWorkingDay = (date: Date) => {
    return availabilitySettings.workingDays.includes(date.getDay());
  };

  const getAvailableTimeSlots = (date: Date) => {
    if (!isWorkingDay(date)) return [];

    const dateStr = date.toISOString().split('T')[0];
    const dayItems = agendaItems.filter(item => item.date === dateStr && item.status !== 'cancelled');

    const slots = [];
    const startHour = parseInt(availabilitySettings.workingHours.start.split(':')[0]);
    const endHour = parseInt(availabilitySettings.workingHours.end.split(':')[0]);

    for (let hour = startHour; hour < endHour; hour++) {
      const timeStr = `${hour.toString().padStart(2, '0')}:00`;
      const isBooked = dayItems.some(item => {
        const itemStart = item.startTime;
        const itemEnd = item.endTime || item.startTime;
        return timeStr >= itemStart && timeStr < itemEnd;
      });

      const isBreakTime = timeStr >= availabilitySettings.breakTime.start &&
                          timeStr < availabilitySettings.breakTime.end;

      if (!isBooked && !isBreakTime) {
        slots.push(timeStr);
      }
    }

    return slots;
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-6xl glass border-2 border-premium-600/30 bg-premium-800/95 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-premium-50 flex items-center">
            <CalendarCheck className="w-6 h-6 mr-3 text-klusdirect-orange" />
            Agenda Beheer
          </DialogTitle>
          <DialogDescription className="text-premium-300">
            Beheer je afspraken, geplande klussen en beschikbaarheid
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="flex bg-premium-700/50 rounded-lg p-1">
                <Button
                  variant={viewMode === 'month' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('month')}
                  className={viewMode === 'month' ? 'bg-klusdirect-orange text-black' : 'text-premium-300'}
                >
                  Maand
                </Button>
                <Button
                  variant={viewMode === 'week' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('week')}
                  className={viewMode === 'week' ? 'bg-klusdirect-orange text-black' : 'text-premium-300'}
                >
                  Week
                </Button>
                <Button
                  variant={viewMode === 'day' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('day')}
                  className={viewMode === 'day' ? 'bg-klusdirect-orange text-black' : 'text-premium-300'}
                >
                  Dag
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-premium-400" />
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-premium-700/50 border border-premium-600/30 rounded-md px-3 py-1 text-premium-200 text-sm"
                >
                  <option value="all">Alle statussen</option>
                  <option value="scheduled">Gepland</option>
                  <option value="in_progress">Bezig</option>
                  <option value="completed">Afgerond</option>
                  <option value="cancelled">Geannuleerd</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setShowAvailabilityForm(true)}
                variant="outline"
                className="border-premium-600 text-premium-200 hover:bg-premium-700"
              >
                <Settings className="w-4 h-4 mr-2" />
                Beschikbaarheid
              </Button>
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nieuwe afspraak
              </Button>
            </div>
          </div>

          {/* Calendar Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevMonth}
                  className="border-premium-600 text-premium-200 hover:bg-premium-700"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <h3 className="text-xl font-semibold text-premium-50 min-w-[200px] text-center">
                  {currentDate.toLocaleDateString('nl-NL', { month: 'long', year: 'numeric' })}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextMonth}
                  className="border-premium-600 text-premium-200 hover:bg-premium-700"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-premium-300">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Gepland ({agendaItems.filter(i => i.status === 'scheduled').length})</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Afgerond ({agendaItems.filter(i => i.status === 'completed').length})</span>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          {viewMode === 'month' && (
            <div className="glass border border-premium-600/30 rounded-lg p-4">
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map((day) => (
                  <div key={day} className="h-8 flex items-center justify-center text-premium-300 font-medium text-sm">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDays().map((day, index) => {
                  const items = getItemsForDate(day);
                  const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                  const isToday = day.toDateString() === new Date().toDateString();
                  const availableSlots = getAvailableTimeSlots(day);
                  const isWorkingDayValue = isWorkingDay(day);

                  return (
                    <div
                      key={index}
                      className={`min-h-[80px] p-1 border border-premium-700/30 rounded-md cursor-pointer transition-all hover:bg-premium-700/30 ${
                        !isCurrentMonth ? 'opacity-40' : ''
                      } ${isToday ? 'bg-klusdirect-orange/10 border-klusdirect-orange/30' : ''} ${
                        !isWorkingDayValue ? 'bg-red-500/5' : ''
                      }`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className={`text-sm font-medium mb-1 ${
                        isToday ? 'text-klusdirect-orange' : 'text-premium-200'
                      }`}>
                        {day.getDate()}
                      </div>
                      
                      <div className="space-y-1">
                        {items.slice(0, 2).map((item) => (
                          <div
                            key={item.id}
                            className={`text-xs p-1 rounded border ${getStatusColor(item.status)} truncate`}
                            title={`${item.title} - ${item.clientName}`}
                          >
                            {item.startTime} {item.title}
                          </div>
                        ))}
                        {items.length > 2 && (
                          <div className="text-xs text-premium-400 px-1">
                            +{items.length - 2} meer
                          </div>
                        )}
                        {items.length === 0 && isWorkingDayValue && availableSlots.length > 0 && (
                          <div className="text-xs text-green-400 px-1">
                            {availableSlots.length} vrije slots
                          </div>
                        )}
                        {!isWorkingDayValue && (
                          <div className="text-xs text-red-400 px-1">
                            Niet beschikbaar
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Agenda List */}
          <Card className="glass border border-premium-600/30">
            <CardHeader>
              <CardTitle className="text-lg text-premium-50 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-klusdirect-blue" />
                {selectedDate ? `Afspraken voor ${formatDate(selectedDate)}` : 'Alle afspraken'}
                <Badge className="ml-3 bg-klusdirect-orange/20 text-klusdirect-orange border border-klusdirect-orange/30">
                  {selectedDate ? getItemsForDate(selectedDate).length : filteredItems.length} afspraken
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {(selectedDate ? getItemsForDate(selectedDate) : filteredItems).map((item) => (
                  <div key={item.id} className="glass border border-premium-600/30 rounded-lg p-4 hover:border-klusdirect-orange/30 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-semibold text-premium-50">
                            {item.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Badge className={`${getStatusColor(item.status)} border`}>
                              {getStatusIcon(item.status)}
                              <span className="ml-1">{getStatusText(item.status)}</span>
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3 text-sm">
                          <div className="flex items-center text-premium-200">
                            <User className="w-4 h-4 mr-2 text-klusdirect-gold" />
                            <span className="font-medium">{item.clientName}</span>
                          </div>
                          <div className="flex items-center text-premium-300">
                            <Calendar className="w-4 h-4 mr-2 text-klusdirect-blue" />
                            {new Date(item.date).toLocaleDateString('nl-NL')}
                          </div>
                          <div className="flex items-center text-premium-300">
                            <Clock className="w-4 h-4 mr-2 text-klusdirect-orange" />
                            {item.startTime} - {item.endTime}
                          </div>
                          <div className="flex items-center text-premium-300">
                            <MapPin className="w-4 h-4 mr-2 text-red-400" />
                            {item.location}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-premium-300">
                          <div className="flex items-center">
                            <Euro className="w-4 h-4 mr-1 text-green-400" />
                            €{item.amount.toLocaleString()}
                          </div>
                          <div className="flex items-center">
                            <Building className="w-4 h-4 mr-1 text-klusdirect-blue" />
                            {item.jobType}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1 text-klusdirect-orange" />
                            {item.estimatedDuration}u
                          </div>
                        </div>

                        {item.notes && (
                          <div className="mt-2 p-2 bg-premium-700/30 rounded text-sm text-premium-300">
                            {item.notes}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 mt-4 md:mt-0 md:ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditItem(item)}
                          className="border-premium-600 text-premium-200 hover:bg-premium-700"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {(selectedDate ? getItemsForDate(selectedDate) : filteredItems).length === 0 && (
                  <div className="text-center py-12">
                    <CalendarCheck className="w-16 h-16 text-premium-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-premium-400 mb-2">
                      Geen afspraken gevonden
                    </h3>
                    <p className="text-premium-500 mb-4">
                      {selectedDate ? 'Er zijn geen afspraken voor deze datum.' : 'Er zijn nog geen afspraken toegevoegd.'}
                    </p>
                    <Button
                      onClick={() => setShowAddForm(true)}
                      className="bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Eerste afspraak toevoegen
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Add/Edit Form */}
          {showAddForm && (
            <Card className="glass border border-klusdirect-orange/30 bg-klusdirect-orange/5">
              <CardHeader>
                <CardTitle className="text-lg text-premium-50 flex items-center">
                  {editingItem ? <Edit3 className="w-5 h-5 mr-2 text-klusdirect-gold" /> : <Plus className="w-5 h-5 mr-2 text-klusdirect-orange" />}
                  {editingItem ? 'Afspraak bewerken' : 'Nieuwe afspraak toevoegen'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title" className="text-premium-200">Titel *</Label>
                    <Input
                      id="title"
                      value={newItem.title}
                      onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      placeholder="Badkamer renovatie"
                    />
                  </div>

                  <div>
                    <Label htmlFor="clientName" className="text-premium-200">Klant naam *</Label>
                    <Input
                      id="clientName"
                      value={newItem.clientName}
                      onChange={(e) => setNewItem({ ...newItem, clientName: e.target.value })}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      placeholder="Jan de Vries"
                    />
                  </div>

                  <div>
                    <Label htmlFor="clientEmail" className="text-premium-200">Email</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={newItem.clientEmail}
                      onChange={(e) => setNewItem({ ...newItem, clientEmail: e.target.value })}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      placeholder="jan@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="clientPhone" className="text-premium-200">Telefoon</Label>
                    <Input
                      id="clientPhone"
                      value={newItem.clientPhone}
                      onChange={(e) => setNewItem({ ...newItem, clientPhone: e.target.value })}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      placeholder="06 12345678"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location" className="text-premium-200">Locatie</Label>
                    <Input
                      id="location"
                      value={newItem.location}
                      onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      placeholder="Amsterdam Noord"
                    />
                  </div>

                  <div>
                    <Label htmlFor="jobType" className="text-premium-200">Type klus</Label>
                    <Input
                      id="jobType"
                      value={newItem.jobType}
                      onChange={(e) => setNewItem({ ...newItem, jobType: e.target.value })}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      placeholder="Renovatie, Installatie, etc."
                    />
                  </div>

                  <div>
                    <Label htmlFor="date" className="text-premium-200">Datum *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newItem.date}
                      onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="startTime" className="text-premium-200">Start tijd *</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={newItem.startTime}
                        onChange={(e) => setNewItem({ ...newItem, startTime: e.target.value })}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="endTime" className="text-premium-200">Eind tijd</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={newItem.endTime}
                        onChange={(e) => setNewItem({ ...newItem, endTime: e.target.value })}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="amount" className="text-premium-200">Bedrag (€)</Label>
                    <Input
                      id="amount"
                      type="number"
                      value={newItem.amount}
                      onChange={(e) => setNewItem({ ...newItem, amount: parseInt(e.target.value) || 0 })}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      placeholder="2500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="status" className="text-premium-200">Status</Label>
                    <select
                      id="status"
                      value={newItem.status}
                      onChange={(e) => setNewItem({ ...newItem, status: e.target.value as AgendaItem['status'] })}
                      className="w-full mt-1 glass border-premium-600/30 bg-premium-800/50 text-premium-50 rounded-md px-3 py-2"
                    >
                      <option value="scheduled">Gepland</option>
                      <option value="in_progress">Bezig</option>
                      <option value="completed">Afgerond</option>
                      <option value="cancelled">Geannuleerd</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="notes" className="text-premium-200">Notities</Label>
                    <textarea
                      id="notes"
                      value={newItem.notes}
                      onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                      className="w-full mt-1 glass border-premium-600/30 bg-premium-800/50 text-premium-50 rounded-md px-3 py-2 min-h-[80px]"
                      placeholder="Extra informatie over de afspraak..."
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="flex-1 border-premium-600 text-premium-200 hover:bg-premium-700"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Annuleren
                  </Button>
                  <Button
                    onClick={handleSaveItem}
                    disabled={!newItem.title || !newItem.clientName || !newItem.date || !newItem.startTime}
                    className="flex-1 bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold disabled:opacity-50"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingItem ? 'Bijwerken' : 'Toevoegen'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
