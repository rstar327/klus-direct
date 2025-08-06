import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  CheckCircle,
  Euro,
  Calendar,
  CreditCard,
  Banknote,
  Building,
  User,
  Clock,
  Shield,
  AlertCircle,
  FileText,
  Calculator,
  Star,
  MessageCircle,
  Send,
  X
} from "lucide-react";

interface Quote {
  id: string;
  jobTitle: string;
  craftsmanName: string;
  companyName: string;
  proposedAmount: number;
  estimatedHours: string;
  startDate: string;
  message: string;
  warranty: string;
  includesMaterials: boolean;
  craftsmanContact: {
    phone: string;
    email: string;
  };
}

interface QuoteAcceptanceModalProps {
  quote: Quote;
  children: React.ReactNode;
  onAccept: (acceptanceData: any) => void;
}

export default function QuoteAcceptanceModal({ quote, children, onAccept }: QuoteAcceptanceModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentProgress, setPaymentProgress] = useState(0);
  const [currentPaymentStep, setCurrentPaymentStep] = useState('');

  const [acceptanceData, setAcceptanceData] = useState({
    paymentMethod: 'app', // 'app' or 'cash'
    paymentSchedule: 'full', // 'full' or 'installments'
    installmentPlan: '2', // '2', '3', '4' months
    customerMessage: '',
    preferredStartDate: quote.startDate,
    additionalRequests: '',
    acceptTerms: false,
    acceptDataProcessing: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setAcceptanceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateInstallments = () => {
    const installments = parseInt(acceptanceData.installmentPlan);
    const amountPerInstallment = Math.ceil(quote.proposedAmount / installments);
    const lastInstallment = quote.proposedAmount - (amountPerInstallment * (installments - 1));

    return {
      installments,
      amountPerInstallment,
      lastInstallment,
      schedule: Array.from({ length: installments }, (_, i) => ({
        number: i + 1,
        amount: i === installments - 1 ? lastInstallment : amountPerInstallment,
        dueDate: new Date(Date.now() + (i + 1) * 30 * 24 * 60 * 60 * 1000)
      }))
    };
  };

  const processAppPayment = async () => {
    const totalAmount = acceptanceData.paymentSchedule === 'installments'
      ? calculateInstallments().amountPerInstallment
      : quote.proposedAmount;

    try {
      // Step 1: Initialize payment
      setCurrentPaymentStep("Betaling initialiseren...");
      setPaymentProgress(10);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Step 2: Setup payment method
      setCurrentPaymentStep("Betaalmethode selecteren...");
      setPaymentProgress(25);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Step 3: Process payment
      setCurrentPaymentStep("Betaling verwerken via Mollie...");
      setPaymentProgress(50);
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Step 4: Verify payment
      setCurrentPaymentStep("Betaling verifiëren...");
      setPaymentProgress(75);
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Step 5: Complete
      setCurrentPaymentStep("Betaling voltooid!");
      setPaymentProgress(100);
      await new Promise(resolve => setTimeout(resolve, 500));

      // Store payment details
      const paymentRecord = {
        paymentId: `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        amount: totalAmount,
        method: 'app',
        schedule: acceptanceData.paymentSchedule,
        installmentDetails: acceptanceData.paymentSchedule === 'installments' ? calculateInstallments() : null,
        processedAt: new Date().toISOString(),
        status: 'completed'
      };

      localStorage.setItem('paymentRecord', JSON.stringify(paymentRecord));

    } catch (error) {
      setCurrentPaymentStep("Betaling mislukt - probeer opnieuw");
      throw error;
    }
  };

  const handleAccept = async () => {
    setIsProcessing(true);

    // If app payment is selected, show payment flow
    if (acceptanceData.paymentMethod === 'app') {
      setShowPayment(true);
      await processAppPayment();
    } else {
      // For cash payment, just process the acceptance
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    const acceptanceRecord = {
      quoteId: quote.id,
      jobTitle: quote.jobTitle,
      craftsmanName: quote.craftsmanName,
      companyName: quote.companyName,
      acceptedAmount: quote.proposedAmount,
      acceptanceDate: new Date().toISOString(),
      paymentMethod: acceptanceData.paymentMethod,
      paymentSchedule: acceptanceData.paymentSchedule,
      installmentDetails: acceptanceData.paymentSchedule === 'installments' ? calculateInstallments() : null,
      customerMessage: acceptanceData.customerMessage,
      preferredStartDate: acceptanceData.preferredStartDate,
      additionalRequests: acceptanceData.additionalRequests,
      status: 'accepted',
      contractGenerated: true
    };

    // Update quote status in localStorage
    const pendingInvoices = JSON.parse(localStorage.getItem('pendingInvoices') || '[]');
    const updatedInvoices = pendingInvoices.map((invoice: any) => {
      if (invoice.invoiceNumber === quote.id) {
        return { ...invoice, status: 'accepted', customerAcceptance: acceptanceRecord };
      }
      return invoice;
    });
    localStorage.setItem('pendingInvoices', JSON.stringify(updatedInvoices));

    // Store accepted quote
    const acceptedQuotes = JSON.parse(localStorage.getItem('acceptedQuotes') || '[]');
    acceptedQuotes.push(acceptanceRecord);
    localStorage.setItem('acceptedQuotes', JSON.stringify(acceptedQuotes));

    setIsProcessing(false);
    setIsSuccess(true);
    onAccept(acceptanceRecord);

    // Close modal after success
    setTimeout(() => {
      setIsOpen(false);
      setIsSuccess(false);
      setStep(1);
      window.location.reload(); // Refresh to update the dashboard
    }, 3000);
  };

  const isStep1Valid = acceptanceData.paymentMethod && acceptanceData.paymentSchedule && acceptanceData.acceptTerms;
  const isStep2Valid = acceptanceData.preferredStartDate && acceptanceData.acceptDataProcessing;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-3xl glass border-2 border-premium-600/30 bg-premium-800/95 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-premium-50 flex items-center">
            <CheckCircle className="w-6 h-6 mr-3 text-klusdirect-orange" />
            Offerte Accepteren
          </DialogTitle>
        </DialogHeader>

        {!isSuccess ? (
          <div className="space-y-6">
            {/* Progress Indicator */}
            <div className="flex justify-center">
              <div className="flex items-center space-x-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  step >= 1 ? 'bg-klusdirect-orange border-klusdirect-orange text-black' : 'border-premium-600 text-premium-400'
                }`}>
                  {step > 1 ? <CheckCircle className="w-4 h-4" /> : '1'}
                </div>
                <div className={`w-12 h-1 ${step > 1 ? 'bg-klusdirect-orange' : 'bg-premium-700'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  step >= 2 ? 'bg-klusdirect-orange border-klusdirect-orange text-black' : 'border-premium-600 text-premium-400'
                }`}>
                  {step > 2 ? <CheckCircle className="w-4 h-4" /> : '2'}
                </div>
              </div>
            </div>

            {/* Quote Summary */}
            <Card className="glass border border-klusdirect-gold/30 bg-klusdirect-gold/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-premium-50">{quote.jobTitle}</h3>
                    <div className="flex items-center space-x-4 text-sm text-premium-300 mt-1">
                      <div className="flex items-center">
                        <Building className="w-3 h-3 mr-1" />
                        {quote.companyName}
                      </div>
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {quote.craftsmanName}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-klusdirect-gold">
                      €{quote.proposedAmount.toLocaleString()}
                    </div>
                    <div className="text-premium-400 text-sm">{quote.estimatedHours} uur werk</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Processing */}
            {showPayment && isProcessing && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-klusdirect-orange/20 to-klusdirect-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-klusdirect-orange/30">
                    <div className="w-8 h-8 border-2 border-klusdirect-orange border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-premium-50 mb-2">
                    Betaling wordt verwerkt
                  </h3>
                  <p className="text-premium-300 mb-6">
                    {currentPaymentStep}
                  </p>

                  <div className="max-w-md mx-auto mb-6">
                    <div className="w-full bg-premium-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold h-2 rounded-full transition-all duration-500"
                        style={{ width: `${paymentProgress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-premium-400 mt-2">
                      <span>0%</span>
                      <span>{paymentProgress}%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="bg-klusdirect-blue/10 border border-klusdirect-blue/20 rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Shield className="w-5 h-5 text-klusdirect-blue" />
                      <span className="text-klusdirect-blue font-medium text-sm">
                        Beveiligd door Mollie - Nederland's #1 betaalprovider
                      </span>
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <p className="text-premium-400 text-sm">
                      Sluit dit venster niet tijdens het betaalproces
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Payment Options */}
            {step === 1 && !isProcessing && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-klusdirect-blue/20 to-klusdirect-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-klusdirect-blue/30">
                    <CreditCard className="w-8 h-8 text-klusdirect-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-premium-50 mb-2">
                    Kies uw betaalvoorkeur
                  </h3>
                  <p className="text-premium-300">
                    Selecteer hoe u wilt betalen en of u het bedrag in delen wilt spreiden
                  </p>
                </div>

                {/* Payment Method */}
                <div>
                  <Label className="text-premium-200 text-lg mb-4 block">Betaalmethode</Label>
                  <RadioGroup 
                    value={acceptanceData.paymentMethod} 
                    onValueChange={(value) => handleInputChange('paymentMethod', value)}
                  >
                    <Card className={`glass cursor-pointer transition-all duration-200 ${
                      acceptanceData.paymentMethod === "app" 
                        ? "border-klusdirect-orange/50 bg-klusdirect-orange/5" 
                        : "border-premium-600/30 hover:border-premium-500/50"
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="app" id="app" className="border-premium-600 text-klusdirect-orange" />
                          <div className="flex items-center space-x-3 flex-1">
                            <CreditCard className="w-8 h-8 text-klusdirect-blue" />
                            <div>
                              <h4 className="text-premium-50 font-medium">Via KlusDirect App</h4>
                              <p className="text-premium-400 text-sm">Veilig betalen via iDEAL, creditcard of bankoverschrijving</p>
                            </div>
                          </div>
                          <div className="flex items-center text-premium-400">
                            <Shield className="w-4 h-4 mr-1" />
                            <span className="text-xs">Beveiligd</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={`glass cursor-pointer transition-all duration-200 ${
                      acceptanceData.paymentMethod === "cash" 
                        ? "border-klusdirect-orange/50 bg-klusdirect-orange/5" 
                        : "border-premium-600/30 hover:border-premium-500/50"
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="cash" id="cash" className="border-premium-600 text-klusdirect-orange" />
                          <div className="flex items-center space-x-3 flex-1">
                            <Banknote className="w-8 h-8 text-green-500" />
                            <div>
                              <h4 className="text-premium-50 font-medium">Contant / Pin ter plaatse</h4>
                              <p className="text-premium-400 text-sm">Direct betalen aan de vakman bij oplevering</p>
                            </div>
                          </div>
                          <div className="flex items-center text-premium-400">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            <span className="text-xs">Let op: Geen bescherming</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </RadioGroup>
                </div>

                {/* Payment Schedule */}
                <div>
                  <Label className="text-premium-200 text-lg mb-4 block">Betaalschema</Label>
                  <RadioGroup 
                    value={acceptanceData.paymentSchedule} 
                    onValueChange={(value) => handleInputChange('paymentSchedule', value)}
                  >
                    <Card className={`glass cursor-pointer transition-all duration-200 ${
                      acceptanceData.paymentSchedule === "full" 
                        ? "border-klusdirect-gold/50 bg-klusdirect-gold/5" 
                        : "border-premium-600/30 hover:border-premium-500/50"
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="full" id="full" className="border-premium-600 text-klusdirect-gold" />
                          <div className="flex items-center space-x-3 flex-1">
                            <Euro className="w-8 h-8 text-klusdirect-gold" />
                            <div>
                              <h4 className="text-premium-50 font-medium">Volledige betaling</h4>
                              <p className="text-premium-400 text-sm">Eenmalige betaling van €{quote.proposedAmount.toLocaleString()}</p>
                            </div>
                          </div>
                          <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                            Voordelig
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={`glass cursor-pointer transition-all duration-200 ${
                      acceptanceData.paymentSchedule === "installments" 
                        ? "border-klusdirect-gold/50 bg-klusdirect-gold/5" 
                        : "border-premium-600/30 hover:border-premium-500/50"
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="installments" id="installments" className="border-premium-600 text-klusdirect-gold" />
                          <div className="flex items-center space-x-3 flex-1">
                            <Calendar className="w-8 h-8 text-klusdirect-blue" />
                            <div>
                              <h4 className="text-premium-50 font-medium">Betaling in termijnen</h4>
                              <p className="text-premium-400 text-sm">Verdeel de betaling over meerdere maanden</p>
                            </div>
                          </div>
                        </div>
                        
                        {acceptanceData.paymentSchedule === "installments" && (
                          <div className="mt-4 pt-4 border-t border-premium-600/30">
                            <Label className="text-premium-200 text-sm mb-3 block">Aantal termijnen:</Label>
                            <RadioGroup 
                              value={acceptanceData.installmentPlan} 
                              onValueChange={(value) => handleInputChange('installmentPlan', value)}
                              className="grid grid-cols-3 gap-3"
                            >
                              {['2', '3', '4'].map((months) => {
                                const amount = Math.ceil(quote.proposedAmount / parseInt(months));
                                return (
                                  <label key={months} className="cursor-pointer">
                                    <RadioGroupItem value={months} id={`months-${months}`} className="sr-only" />
                                    <div className={`p-3 rounded-lg border text-center transition-all ${
                                      acceptanceData.installmentPlan === months
                                        ? 'border-klusdirect-orange bg-klusdirect-orange/10'
                                        : 'border-premium-600/30 hover:border-premium-500/50'
                                    }`}>
                                      <div className="font-semibold text-premium-50">{months} maanden</div>
                                      <div className="text-sm text-premium-300">€{amount}/maand</div>
                                    </div>
                                  </label>
                                );
                              })}
                            </RadioGroup>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </RadioGroup>
                </div>

                {/* Terms */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="acceptTerms"
                      checked={acceptanceData.acceptTerms}
                      onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
                      className="border-premium-600 data-[state=checked]:bg-klusdirect-orange data-[state=checked]:border-klusdirect-orange"
                    />
                    <Label htmlFor="acceptTerms" className="text-premium-200 text-sm cursor-pointer">
                      Ik ga akkoord met de <span className="text-klusdirect-gold hover:underline">algemene voorwaarden</span> en 
                      de offerte van {quote.craftsmanName}. <span className="text-red-400 font-semibold">*</span>
                    </Label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsOpen(false)}
                    className="flex-1 border-premium-600 text-premium-200 hover:bg-premium-700"
                  >
                    Annuleren
                  </Button>
                  <Button 
                    onClick={() => setStep(2)}
                    disabled={!isStep1Valid}
                    className="flex-1 bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold disabled:opacity-50"
                  >
                    Volgende: Details
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Additional Details */}
            {step === 2 && !isProcessing && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-klusdirect-gold/20 to-klusdirect-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-klusdirect-gold/30">
                    <FileText className="w-8 h-8 text-klusdirect-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-premium-50 mb-2">
                    Aanvullende details
                  </h3>
                  <p className="text-premium-300">
                    Geef eventuele wensen of opmerkingen door aan de vakman
                  </p>
                </div>

                {/* Payment Schedule Preview */}
                {acceptanceData.paymentSchedule === 'installments' && (
                  <Card className="glass border border-klusdirect-blue/30 bg-klusdirect-blue/5">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-premium-50 flex items-center">
                        <Calculator className="w-4 h-4 mr-2" />
                        Uw betaalschema
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {calculateInstallments().schedule.map((installment, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-premium-300">Termijn {installment.number}:</span>
                            <span className="text-premium-50 font-medium">
                              €{installment.amount.toLocaleString()} 
                              <span className="text-premium-400 ml-2">
                                ({installment.dueDate.toLocaleDateString('nl-NL')})
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="preferredStartDate" className="text-premium-200">Gewenste startdatum *</Label>
                    <Input
                      id="preferredStartDate"
                      type="date"
                      value={acceptanceData.preferredStartDate}
                      onChange={(e) => handleInputChange('preferredStartDate', e.target.value)}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="customerMessage" className="text-premium-200">Bericht aan de vakman</Label>
                    <Textarea
                      id="customerMessage"
                      value={acceptanceData.customerMessage}
                      onChange={(e) => handleInputChange('customerMessage', e.target.value)}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1 min-h-[80px]"
                      placeholder="Eventuele opmerkingen, wensen of vragen..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="additionalRequests" className="text-premium-200">Aanvullende wensen</Label>
                    <Textarea
                      id="additionalRequests"
                      value={acceptanceData.additionalRequests}
                      onChange={(e) => handleInputChange('additionalRequests', e.target.value)}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1 min-h-[60px]"
                      placeholder="Extra werkzaamheden of wijzigingen..."
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="acceptDataProcessing"
                      checked={acceptanceData.acceptDataProcessing}
                      onCheckedChange={(checked) => handleInputChange('acceptDataProcessing', checked as boolean)}
                      className="border-premium-600 data-[state=checked]:bg-klusdirect-orange data-[state=checked]:border-klusdirect-orange"
                    />
                    <Label htmlFor="acceptDataProcessing" className="text-premium-200 text-sm cursor-pointer">
                      Ik ga akkoord met het delen van mijn contactgegevens met {quote.craftsmanName} voor de uitvoering van deze klus. 
                      <span className="text-red-400 font-semibold"> *</span>
                    </Label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1 border-premium-600 text-premium-200 hover:bg-premium-700"
                  >
                    Vorige
                  </Button>
                  <Button 
                    onClick={handleAccept}
                    disabled={!isStep2Valid || isProcessing}
                    className="flex-1 bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        Verwerken...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Offerte Accepteren
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Success State */
          <div className="py-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500/20 to-green-400/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
            <h3 className="text-3xl font-bold text-premium-50 mb-3">
              Offerte geaccepteerd!
            </h3>
            <p className="text-premium-200 mb-6 text-lg">
              {quote.craftsmanName} ontvangt een bevestiging en neemt binnen 24 uur contact met u op.
            </p>
            
            <div className="bg-premium-700/50 rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
              <h4 className="text-premium-50 font-medium mb-4 text-center">Wat gebeurt er nu?</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-klusdirect-orange rounded-full flex items-center justify-center mr-3">
                    <span className="text-black font-bold text-xs">1</span>
                  </div>
                  <span className="text-premium-200">Vakman ontvangt uw acceptatie</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-klusdirect-orange rounded-full flex items-center justify-center mr-3">
                    <span className="text-black font-bold text-xs">2</span>
                  </div>
                  <span className="text-premium-200">Contract wordt automatisch gegenereerd</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-klusdirect-orange rounded-full flex items-center justify-center mr-3">
                    <span className="text-black font-bold text-xs">3</span>
                  </div>
                  <span className="text-premium-200">Vakman plant de werkzaamheden in</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-klusdirect-orange rounded-full flex items-center justify-center mr-3">
                    <span className="text-black font-bold text-xs">4</span>
                  </div>
                  <span className="text-premium-200">U ontvangt een bevestiging per email</span>
                </div>
              </div>
            </div>

            <p className="text-premium-400 text-sm">
              Deze pagina wordt automatisch bijgewerkt...
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
