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
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  if (!invoice) return null;

  const generatePDF = async () => {
    setIsGeneratingPDF(true);

    try {
      // Create HTML content for PDF
      const pdfContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>Offerte - ${invoice.invoiceNumber}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              color: #333;
              background: white;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
              border-bottom: 2px solid #e97047;
              padding-bottom: 20px;
            }
            .logo {
              font-size: 28px;
              font-weight: bold;
              color: #e97047;
              margin-bottom: 5px;
            }
            .subtitle {
              color: #666;
              font-size: 14px;
            }
            .invoice-info {
              display: flex;
              justify-content: space-between;
              margin-bottom: 30px;
            }
            .section {
              margin-bottom: 25px;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              color: #e97047;
              margin-bottom: 10px;
              border-bottom: 1px solid #ddd;
              padding-bottom: 5px;
            }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
            }
            .info-item {
              margin-bottom: 8px;
            }
            .label {
              font-weight: bold;
              color: #555;
            }
            .value {
              color: #333;
            }
            .financial-breakdown {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .amount-large {
              font-size: 24px;
              font-weight: bold;
              color: #28a745;
            }
            .amount-medium {
              font-size: 16px;
              font-weight: bold;
            }
            .status {
              display: inline-block;
              padding: 6px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: bold;
            }
            .status-accepted {
              background: #d4edda;
              color: #155724;
            }
            .status-pending {
              background: #fff3cd;
              color: #856404;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              font-size: 12px;
              color: #666;
              border-top: 1px solid #ddd;
              padding-top: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background: #f8f9fa;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">KlusDirect Pro</div>
            <div class="subtitle">Premium Vakmannen Platform</div>
          </div>

          <div class="invoice-info">
            <div>
              <h2>Offerte Details</h2>
              <div class="info-item">
                <span class="label">Factuur nummer:</span>
                <span class="value">${invoice.invoiceNumber}</span>
              </div>
              <div class="info-item">
                <span class="label">Datum:</span>
                <span class="value">${new Date(invoice.applicationDate).toLocaleDateString('nl-NL')}</span>
              </div>
            </div>
            <div>
              <div class="info-item">
                <span class="label">Status:</span>
                <span class="status ${invoice.status === 'accepted' ? 'status-accepted' : 'status-pending'}">
                  ${invoice.status === 'accepted' ? 'Geaccepteerd' :
                    invoice.status === 'pending' ? 'In behandeling' :
                    invoice.status === 'rejected' ? 'Afgewezen' : 'Onbekend'}
                </span>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Project Informatie</div>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">Project:</span>
                <span class="value">${invoice.jobTitle}</span>
              </div>
              <div class="info-item">
                <span class="label">Klant:</span>
                <span class="value">${invoice.clientName}</span>
              </div>
              <div class="info-item">
                <span class="label">Locatie:</span>
                <span class="value">${invoice.location}</span>
              </div>
              <div class="info-item">
                <span class="label">Urgentie:</span>
                <span class="value">${invoice.urgency || 'Normaal'}</span>
              </div>
            </div>
          </div>

          ${invoice.description ? `
          <div class="section">
            <div class="section-title">Werkbeschrijving</div>
            <p>${invoice.description}</p>
          </div>
          ` : ''}

          <div class="section">
            <div class="section-title">Financiële Details</div>
            <div class="financial-breakdown">
              <table>
                <tr>
                  <th>Omschrijving</th>
                  <th style="text-align: right;">Bedrag</th>
                </tr>
                <tr>
                  <td>Offerte bedrag</td>
                  <td style="text-align: right;" class="amount-large">€${invoice.proposedAmount?.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>KlusDirect commissie (${invoice.commissionRate}%)</td>
                  <td style="text-align: right; color: #e97047;" class="amount-medium">-€${invoice.commissionAmount?.toLocaleString()}</td>
                </tr>
                <tr style="border-top: 2px solid #e97047;">
                  <td><strong>Netto uitbetaling</strong></td>
                  <td style="text-align: right;" class="amount-large">€${invoice.netAmount?.toLocaleString()}</td>
                </tr>
              </table>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Betalingsinformatie</div>
            <p>
              <strong>Betaalwijze:</strong> Na acceptatie van de klant wordt het bedrag binnen 5 werkdagen overgemaakt.<br>
              <strong>BTW:</strong> BTW wordt automatisch afgehandeld conform Nederlandse wetgeving.<br>
              <strong>Voorwaarden:</strong> Betaling volgens KlusDirect algemene voorwaarden.
            </p>
          </div>

          <div class="footer">
            <p>
              <strong>KlusDirect Pro</strong><br>
              Premium Platform voor Professionele Vakmensen<br>
              www.klusdirect.nl | support@klusdirect.nl
            </p>
            <p style="margin-top: 10px; font-size: 10px;">
              Dit document is automatisch gegenereerd op ${new Date().toLocaleDateString('nl-NL')}
            </p>
          </div>
        </body>
        </html>
      `;

      // Create and download PDF
      const blob = new Blob([pdfContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);

      // Create a temporary iframe for printing
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      iframe.onload = () => {
        iframe.contentWindow?.print();
        // Clean up after a delay
        setTimeout(() => {
          document.body.removeChild(iframe);
          URL.revokeObjectURL(url);
        }, 1000);
      };

      iframe.src = url;

      // Alternative: Direct download as HTML file that can be opened and printed
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `offerte-${invoice.invoiceNumber}.html`;
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Er ging iets mis bij het genereren van de PDF. Probeer het opnieuw.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

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
