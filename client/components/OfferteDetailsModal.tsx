import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Euro,
  FileText,
  Calendar,
  MapPin,
  User,
  Crown,
  Eye,
  Download,
  CheckCircle,
  Clock,
  AlertTriangle,
  Star
} from "lucide-react";

interface OfferteDetailsModalProps {
  children: React.ReactNode;
  invoice: any;
}

export default function OfferteDetailsModal({ children, invoice }: OfferteDetailsModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!invoice) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'rejected': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      default: return <Clock className="w-5 h-5 text-blue-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-400/20 text-green-400 border-green-400/30';
      case 'pending': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'rejected': return 'bg-red-400/20 text-red-400 border-red-400/30';
      default: return 'bg-blue-400/20 text-blue-400 border-blue-400/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted': return 'Geaccepteerd';
      case 'pending': return 'In behandeling';
      case 'rejected': return 'Afgewezen';
      default: return 'Onbekend';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass border border-premium-600/30">
        <DialogHeader>
          <DialogTitle className="text-2xl text-premium-50 flex items-center">
            <Crown className="w-6 h-6 mr-2 text-klusdirect-gold" />
            Offerte Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <Card className="glass border border-premium-600/30">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl text-premium-50 mb-2">
                    {invoice.jobTitle}
                  </CardTitle>
                  <p className="text-premium-300">
                    Factuur: {invoice.invoiceNumber}
                  </p>
                </div>
                <Badge className={`flex items-center space-x-1 ${getStatusColor(invoice.status)}`}>
                  {getStatusIcon(invoice.status)}
                  <span>{getStatusText(invoice.status)}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-premium-400" />
                  <span className="text-premium-300">Klant:</span>
                  <span className="text-premium-50 ml-2 font-medium">{invoice.clientName}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-premium-400" />
                  <span className="text-premium-300">Datum:</span>
                  <span className="text-premium-50 ml-2">
                    {new Date(invoice.applicationDate).toLocaleDateString('nl-NL')}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-premium-400" />
                  <span className="text-premium-300">Locatie:</span>
                  <span className="text-premium-50 ml-2">{invoice.location}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2 text-premium-400" />
                  <span className="text-premium-300">Prioriteit:</span>
                  <span className="text-premium-50 ml-2">{invoice.urgency || 'Normaal'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Breakdown */}
          <Card className="glass border border-premium-600/30">
            <CardHeader>
              <CardTitle className="text-lg text-premium-50 flex items-center">
                <Euro className="w-5 h-5 mr-2 text-green-400" />
                Financiële Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-premium-800/30 rounded-lg">
                  <span className="text-premium-300">Offerte Bedrag</span>
                  <span className="text-2xl font-bold text-green-400">
                    €{invoice.proposedAmount?.toLocaleString()}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center p-3 bg-premium-800/20 rounded-lg">
                    <span className="text-premium-300">Commissie ({invoice.commissionRate}%)</span>
                    <span className="text-klusdirect-orange font-semibold">
                      €{invoice.commissionAmount?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-premium-800/20 rounded-lg">
                    <span className="text-premium-300">Netto Uitbetaling</span>
                    <span className="text-green-400 font-semibold">
                      €{invoice.netAmount?.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Separator className="bg-premium-600/30" />

                <div className="text-center text-sm text-premium-400">
                  <p>BTW wordt automatisch afgehandeld conform Nederlandse wetgeving</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          {invoice.description && (
            <Card className="glass border border-premium-600/30">
              <CardHeader>
                <CardTitle className="text-lg text-premium-50 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-premium-400" />
                  Werkbeschrijving
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-premium-200 leading-relaxed">
                  {invoice.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Timeline & Status */}
          <Card className="glass border border-premium-600/30">
            <CardHeader>
              <CardTitle className="text-lg text-premium-50 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-klusdirect-blue" />
                Status & Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-premium-800/20 rounded-lg">
                  <span className="text-premium-300">Offerte Ingediend</span>
                  <span className="text-premium-200">
                    {new Date(invoice.applicationDate).toLocaleDateString('nl-NL')}
                  </span>
                </div>
                
                {invoice.status === 'accepted' && (
                  <div className="flex items-center justify-between p-3 bg-green-400/10 rounded-lg">
                    <span className="text-green-400">Offerte Geaccepteerd</span>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                )}
                
                {invoice.status === 'pending' && (
                  <div className="flex items-center justify-between p-3 bg-yellow-400/10 rounded-lg">
                    <span className="text-yellow-400">Wacht op Klant Reactie</span>
                    <Clock className="w-5 h-5 text-yellow-400" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline"
            className="border-klusdirect-blue text-klusdirect-blue hover:bg-klusdirect-blue/10"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          
          <Button 
            onClick={() => setIsOpen(false)}
            className="bg-gradient-to-r from-klusdirect-blue to-klusdirect-blue-dark text-white"
          >
            Sluiten
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
