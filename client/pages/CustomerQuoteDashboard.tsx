import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bell,
  Euro,
  Calendar,
  User,
  Building,
  CheckCircle,
  Clock,
  AlertCircle,
  MessageCircle,
  CreditCard,
  Banknote,
  Star,
  Phone,
  Mail,
  MapPin,
  ArrowLeft,
  Eye,
  Download,
  Hammer
} from "lucide-react";
import { Link } from "react-router-dom";
import QuoteAcceptanceModal from "@/components/QuoteAcceptanceModal";

interface Quote {
  id: string;
  jobTitle: string;
  craftsmanName: string;
  companyName: string;
  proposedAmount: number;
  estimatedHours: string;
  startDate: string;
  message: string;
  materials: string;
  warranty: string;
  includesMaterials: boolean;
  submittedDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  craftsmanContact: {
    phone: string;
    email: string;
  };
  commissionAmount: number;
  netAmount: number;
  commissionRate: number;
  invoiceNumber: string;
}

export default function CustomerQuoteDashboard() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [customerName] = useState("Marie Jansen"); // Would come from authentication

  const handleQuoteAcceptance = (acceptanceData: any) => {
    console.log('Quote accepted:', acceptanceData);
    // This would trigger notifications to the craftsman
  };

  useEffect(() => {
    // Load quotes from localStorage (would normally come from API)
    const storedInvoices = localStorage.getItem('pendingInvoices');
    if (storedInvoices) {
      const invoices = JSON.parse(storedInvoices);
      // Convert craftsman invoices to customer quotes
      const customerQuotes = invoices.map((invoice: any) => ({
        id: invoice.invoiceNumber,
        jobTitle: invoice.jobTitle,
        craftsmanName: invoice.clientName || 'Piet Bakker', // This would be the craftsman name
        companyName: 'Bakker Timmerwerken B.V.',
        proposedAmount: invoice.proposedAmount,
        estimatedHours: invoice.estimatedHours || '8',
        startDate: invoice.estimatedStartDate || invoice.applicationDate,
        message: invoice.message || 'Graag zou ik deze klus voor u uitvoeren.',
        materials: invoice.materials || 'Materialen zijn inbegrepen in de prijs',
        warranty: invoice.warranty || '12',
        includesMaterials: invoice.includesMaterials || true,
        submittedDate: invoice.applicationDate,
        status: invoice.status === 'pending' ? 'pending' : 'accepted',
        craftsmanContact: {
          phone: '06 12345678',
          email: 'piet@bakker-timmer.nl'
        },
        commissionAmount: invoice.commissionAmount,
        netAmount: invoice.netAmount,
        commissionRate: invoice.commissionRate,
        invoiceNumber: invoice.invoiceNumber
      }));
      setQuotes(customerQuotes);
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'accepted': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Wacht op uw beslissing';
      case 'accepted': return 'Geaccepteerd';
      case 'rejected': return 'Afgewezen';
      default: return status;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-premium-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-premium-900 via-premium-800 to-premium-900"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-klusdirect-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-klusdirect-blue/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 glass border-b border-premium-700/50 sticky top-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-klusdirect-orange to-klusdirect-gold rounded-xl flex items-center justify-center glow-orange">
                <Hammer className="w-7 h-7 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-premium-gradient">
                  KlusDirect
                </h1>
                <span className="text-xs text-premium-400">Klant Dashboard</span>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative text-premium-300 hover:text-klusdirect-gold">
                <Bell className="w-5 h-5" />
                {quotes.filter(q => q.status === 'pending').length > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-klusdirect-orange rounded-full animate-pulse"></div>
                )}
              </Button>
              <span className="text-premium-200">Welkom, <span className="text-klusdirect-gold font-medium">{customerName}</span></span>
              <Button variant="outline" size="sm" className="border-klusdirect-gold/30 text-klusdirect-gold hover:bg-klusdirect-gold/10">
                Uitloggen
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold text-premium-50 mb-2">
                Mijn Offertes
              </h2>
              <p className="text-premium-200 text-lg">
                Bekijk en beheer offertes van vakmensen
              </p>
            </div>
            <Link to="/">
              <Button variant="outline" className="border-premium-600 text-premium-200 hover:bg-premium-700 mt-4 md:mt-0">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Terug naar home
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass border border-premium-600/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-premium-300 text-sm">Nieuwe offertes</p>
                    <p className="text-3xl font-bold text-premium-50">
                      {quotes.filter(q => q.status === 'pending').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass border border-premium-600/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-premium-300 text-sm">Geaccepteerd</p>
                    <p className="text-3xl font-bold text-premium-50">
                      {quotes.filter(q => q.status === 'accepted').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass border border-premium-600/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-premium-300 text-sm">Totaal waarde</p>
                    <p className="text-3xl font-bold text-premium-50">
                      €{quotes.filter(q => q.status === 'accepted').reduce((sum, q) => sum + q.proposedAmount, 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-klusdirect-gold/20 to-klusdirect-gold/10 rounded-xl flex items-center justify-center">
                    <Euro className="w-6 h-6 text-klusdirect-gold" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quotes List */}
          <Card className="glass border border-premium-600/30">
            <CardHeader>
              <CardTitle className="text-xl text-premium-50 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-klusdirect-blue" />
                Ontvangen Offertes
                <Badge className="ml-3 bg-klusdirect-orange/20 text-klusdirect-orange border border-klusdirect-orange/30">
                  {quotes.length} offertes
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quotes.map((quote) => (
                  <div key={quote.id} className="glass border border-premium-600/30 rounded-lg p-6 hover:border-klusdirect-orange/30 transition-all duration-300">
                    <div className="flex flex-col md:flex-row md:items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-premium-50 mb-1">
                              {quote.jobTitle}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-premium-300">
                              <div className="flex items-center">
                                <Building className="w-4 h-4 mr-1 text-klusdirect-blue" />
                                {quote.companyName}
                              </div>
                              <div className="flex items-center">
                                <User className="w-4 h-4 mr-1 text-klusdirect-gold" />
                                {quote.craftsmanName}
                              </div>
                            </div>
                          </div>
                          <Badge className={`${getStatusColor(quote.status)} border`}>
                            {quote.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                            {quote.status === 'accepted' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {quote.status === 'rejected' && <AlertCircle className="w-3 h-3 mr-1" />}
                            {getStatusText(quote.status)}
                          </Badge>
                        </div>

                        <div className="bg-premium-700/30 rounded-lg p-4 mb-4">
                          <h4 className="text-premium-200 font-medium mb-2">Bericht van de vakman:</h4>
                          <p className="text-premium-300 text-sm italic">"{quote.message}"</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center">
                            <Euro className="w-4 h-4 mr-2 text-green-400" />
                            <div>
                              <p className="text-xs text-premium-400">Offerte bedrag</p>
                              <p className="font-semibold text-premium-50">€{quote.proposedAmount.toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-klusdirect-orange" />
                            <div>
                              <p className="text-xs text-premium-400">Geschatte uren</p>
                              <p className="font-semibold text-premium-50">{quote.estimatedHours}u</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-klusdirect-blue" />
                            <div>
                              <p className="text-xs text-premium-400">Start datum</p>
                              <p className="font-semibold text-premium-50">{formatDate(quote.startDate)}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-2 text-yellow-400" />
                            <div>
                              <p className="text-xs text-premium-400">Garantie</p>
                              <p className="font-semibold text-premium-50">{quote.warranty} maanden</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-premium-400 mb-4">
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {quote.craftsmanContact.phone}
                          </div>
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 mr-1" />
                            {quote.craftsmanContact.email}
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1 text-green-400" />
                            {quote.includesMaterials ? 'Materialen inbegrepen' : 'Materialen apart'}
                          </div>
                        </div>

                        <div className="text-xs text-premium-500">
                          Offerte ontvangen op {formatDate(quote.submittedDate)} • Offerte nr. {quote.invoiceNumber}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 mt-4 md:mt-0 md:ml-6">
                        {quote.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Accepteren
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                            >
                              Afwijzen
                            </Button>
                          </>
                        )}
                        {quote.status === 'accepted' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-premium-600 text-premium-200 hover:bg-premium-700"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download contract
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-premium-600 text-premium-200 hover:bg-premium-700"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {quotes.length === 0 && (
                  <div className="text-center py-12">
                    <MessageCircle className="w-16 h-16 text-premium-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-premium-400 mb-2">
                      Nog geen offertes ontvangen
                    </h3>
                    <p className="text-premium-500 mb-4">
                      Plaats een klus om offertes van vakmensen te ontvangen
                    </p>
                    <Link to="/">
                      <Button className="bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold">
                        Nieuwe klus plaatsen
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
