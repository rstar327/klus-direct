import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Crown,
  CreditCard,
  Smartphone,
  Shield,
  CheckCircle,
  ArrowRight,
  Building,
  User,
  Mail,
  Lock,
  Euro,
  Zap,
  Star,
  AlertTriangle,
  MessageCircle,
  Download,
  Receipt,
  Calendar,
  Clock,
  RefreshCw,
  X,
  XCircle,
  ChevronRight,
  FileText,
  Send,
  Phone
} from "lucide-react";

interface SubscriptionUpgradeModalProps {
  plan: {
    name: string;
    price: number;
    period: string;
    commission: string;
    features: string[];
    buttonText: string;
    color: string;
  };
  children: React.ReactNode;
}

export default function SubscriptionUpgradeModal({ plan, children }: SubscriptionUpgradeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("ideal");
  const [selectedBank, setSelectedBank] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [verificationAttempts, setVerificationAttempts] = useState(0);
  const [redirectingToBank, setRedirectingToBank] = useState(false);
  const [paymentProgress, setPaymentProgress] = useState(0);
  const [currentPaymentStep, setCurrentPaymentStep] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  
  const [billingData, setBillingData] = useState({
    companyName: "",
    vatNumber: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    acceptTerms: false,
    acceptMarketing: false
  });

  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    verificationCode: ""
  });

  const [idealData, setIdealData] = useState({
    verificationCode: ""
  });

  const dutchBanks = [
    { id: "ing", name: "ING", logo: "🟠", processingTime: "Instant" },
    { id: "rabobank", name: "Rabobank", logo: "🔵", processingTime: "Instant" },
    { id: "abn_amro", name: "ABN AMRO", logo: "🟡", processingTime: "Instant" },
    { id: "sns", name: "SNS Bank", logo: "🟣", processingTime: "Instant" },
    { id: "asn", name: "ASN Bank", logo: "🟢", processingTime: "Instant" },
    { id: "triodos", name: "Triodos Bank", logo: "🔷", processingTime: "Instant" },
    { id: "knab", name: "Knab", logo: "⚫", processingTime: "Instant" },
    { id: "bunq", name: "bunq", logo: "🌈", processingTime: "Instant" }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setBillingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCardInputChange = (field: string, value: string) => {
    setCardData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleIdealInputChange = (field: string, value: string) => {
    setIdealData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateCardNumber = (cardNumber: string) => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    // Basic Luhn algorithm check
    let sum = 0;
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber[i]);
      if ((cleanNumber.length - i) % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0 && cleanNumber.length >= 13 && cleanNumber.length <= 19;
  };

  const detectCardType = (cardNumber: string) => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    if (cleanNumber.startsWith('4')) return 'Visa';
    if (cleanNumber.startsWith('5') || cleanNumber.startsWith('2')) return 'Mastercard';
    if (cleanNumber.startsWith('3')) return 'American Express';
    return 'Unknown';
  };

  const handleVerification = async () => {
    setIsVerifying(true);
    setPaymentError("");
    
    try {
      // Simulate verification request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (paymentMethod === "ideal") {
        setCurrentPaymentStep("Verbinden met je bank...");
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCurrentPaymentStep("Verificatiecode verzonden via banking app");
      } else {
        setCurrentPaymentStep("Kaart verifiëren...");
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCurrentPaymentStep("SMS verificatiecode verzonden");
      }
      
      setIsVerifying(false);
      setVerificationStep(true);
    } catch (error) {
      setIsVerifying(false);
      setPaymentError("Verificatie mislukt. Probeer het opnieuw.");
    }
  };

  const handleResendCode = async () => {
    if (verificationAttempts >= 3) {
      setPaymentError("Maximum aantal pogingen bereikt. Kies een andere betaalmethode.");
      return;
    }
    
    setIsVerifying(true);
    setVerificationAttempts(prev => prev + 1);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsVerifying(false);
    setCurrentPaymentStep("Nieuwe verificatiecode verzonden");
  };

  const handleUpgrade = async () => {
    setIsProcessing(true);
    setPaymentError("");
    setPaymentProgress(0);
    
    try {
      // Generate transaction details
      const newTransactionId = `MOL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const newInvoiceNumber = `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
      setTransactionId(newTransactionId);
      setInvoiceNumber(newInvoiceNumber);
      
      // Step 1: Initialize payment
      setCurrentPaymentStep("Betaling initialiseren...");
      setPaymentProgress(10);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 2: Connect to payment provider
      if (paymentMethod === "ideal") {
        setCurrentPaymentStep(`Verbinden met ${dutchBanks.find(b => b.id === selectedBank)?.name}...`);
        setRedirectingToBank(true);
      } else {
        setCurrentPaymentStep("Creditcard verwerken...");
      }
      setPaymentProgress(25);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Step 3: Authentication
      setCurrentPaymentStep("Authenticatie verifiëren...");
      setPaymentProgress(50);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 4: Payment processing
      setCurrentPaymentStep("Betaling verwerken...");
      setPaymentProgress(75);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Step 5: Confirmation
      setCurrentPaymentStep("Bevestiging ontvangen");
      setPaymentProgress(100);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Store the subscription upgrade
      const subscriptionData = {
        plan: plan.name,
        price: plan.price,
        commission: plan.commission,
        upgradeDate: new Date().toISOString(),
        nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        paymentMethod,
        transactionId: newTransactionId,
        invoiceNumber: newInvoiceNumber,
        status: 'active',
        billingData,
        features: plan.features
      };
      
      localStorage.setItem('userPlan', plan.name.toLowerCase());
      localStorage.setItem('subscriptionData', JSON.stringify(subscriptionData));
      
      // Generate invoice
      const invoiceData = {
        invoiceNumber: newInvoiceNumber,
        date: new Date().toISOString(),
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        company: billingData,
        items: [
          {
            description: `${plan.name} Abonnement - 1 maand`,
            quantity: 1,
            price: plan.price,
            total: plan.price
          }
        ],
        subtotal: plan.price,
        vat: Math.round(plan.price * 0.21 * 100) / 100,
        total: Math.round(plan.price * 1.21 * 100) / 100,
        transactionId: newTransactionId
      };
      
      localStorage.setItem('latestInvoice', JSON.stringify(invoiceData));
      
      setIsProcessing(false);
      setIsSuccess(true);
      
    } catch (error) {
      setIsProcessing(false);
      setPaymentError("Betaling mislukt. Controleer je gegevens en probeer het opnieuw.");
    }
  };

  const handleCloseSuccess = () => {
    setIsOpen(false);
    setTimeout(() => {
      window.location.reload(); // Refresh to update dashboard
    }, 500);
  };

  const resetModal = () => {
    setStep(1);
    setVerificationStep(false);
    setIsSuccess(false);
    setPaymentError("");
    setVerificationAttempts(0);
    setPaymentProgress(0);
    setCurrentPaymentStep("");
    setRedirectingToBank(false);
    
    // Reset form data
    setBillingData({
      companyName: "",
      vatNumber: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      acceptTerms: false,
      acceptMarketing: false
    });
    
    setCardData({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
      verificationCode: ""
    });
    
    setIdealData({
      verificationCode: ""
    });
  };

  // Validation
  const isStep1Valid = billingData.companyName && billingData.email && billingData.acceptTerms;
  const isStep2Valid = paymentMethod === "ideal" ? selectedBank : 
                       paymentMethod === "card" ? (cardData.cardNumber && cardData.expiryDate && cardData.cvv && cardData.cardholderName && validateCardNumber(cardData.cardNumber)) : false;
  const isVerificationValid = paymentMethod === "ideal" ? idealData.verificationCode.length === 6 : 
                             paymentMethod === "card" ? cardData.verificationCode.length === 6 : false;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetModal();
    }}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-3xl glass border-2 border-premium-600/30 bg-premium-800/95 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-premium-50 flex items-center">
            <Crown className="w-6 h-6 mr-3 text-klusdirect-gold" />
            Upgrade naar {plan.name}
          </DialogTitle>
          <DialogDescription className="text-premium-300">
            {isProcessing 
              ? "Betaling wordt verwerkt..." 
              : verificationStep 
                ? "Verificatie: Bevestig je betaling" 
                : `Stap ${step} van 2: ${step === 1 ? "Facturatiegegevens" : "Betaalmethode"}`
            }
          </DialogDescription>
        </DialogHeader>

        {!isSuccess ? (
          <div className="space-y-6">
            {/* Progress Indicator */}
            {!isProcessing && (
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
                    {verificationStep ? <CheckCircle className="w-4 h-4" /> : '2'}
                  </div>
                  {verificationStep && (
                    <>
                      <div className="w-12 h-1 bg-klusdirect-orange"></div>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 bg-klusdirect-orange border-klusdirect-orange text-black">
                        <Shield className="w-4 h-4" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Payment Processing */}
            {isProcessing && (
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
                    <Progress value={paymentProgress} className="h-2" />
                    <div className="flex justify-between text-xs text-premium-400 mt-2">
                      <span>0%</span>
                      <span>{paymentProgress}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  
                  {redirectingToBank && (
                    <Card className="glass border border-klusdirect-blue/30 bg-klusdirect-blue/5">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-center space-x-3">
                          <ArrowRight className="w-5 h-5 text-klusdirect-blue" />
                          <span className="text-klusdirect-blue font-medium">
                            Je wordt doorgestuurd naar {dutchBanks.find(b => b.id === selectedBank)?.name}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  <div className="text-center mt-6">
                    <p className="text-premium-400 text-sm">
                      Sluit dit venster niet tijdens het betaalproces
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Plan Summary */}
            {!isProcessing && (
              <Card className="glass border border-klusdirect-gold/30 bg-klusdirect-gold/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-premium-50">{plan.name} Plan</h3>
                      <p className="text-premium-300 text-sm">{plan.commission} commissie per klus</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-klusdirect-gold">
                        €{plan.price}{plan.period}
                      </div>
                      <div className="text-premium-400 text-sm">incl. 21% BTW</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Error Display */}
            {paymentError && (
              <Card className="glass border border-red-500/30 bg-red-500/5">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <XCircle className="w-5 h-5 text-red-400" />
                    <div>
                      <h4 className="text-red-400 font-medium text-sm">Fout bij betaling</h4>
                      <p className="text-premium-300 text-sm">{paymentError}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 1: Billing Information */}
            {step === 1 && !isProcessing && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-klusdirect-blue/20 to-klusdirect-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-klusdirect-blue/30">
                    <Building className="w-8 h-8 text-klusdirect-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-premium-50 mb-2">
                    Facturatiegegevens
                  </h3>
                  <p className="text-premium-300">
                    Voor de maandelijkse factuur en BTW administratie
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName" className="text-premium-200">Bedrijfsnaam *</Label>
                    <div className="relative mt-2">
                      <Building className="absolute left-3 top-3 w-4 h-4 text-premium-400" />
                      <Input
                        id="companyName"
                        type="text"
                        value={billingData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 pl-10"
                        placeholder="Jouw Bedrijf B.V."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="text-premium-200">Email adres *</Label>
                      <div className="relative mt-2">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-premium-400" />
                        <Input
                          id="email"
                          type="email"
                          value={billingData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 pl-10"
                          placeholder="facturen@bedrijf.nl"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-premium-200">Telefoonnummer</Label>
                      <div className="relative mt-2">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-premium-400" />
                        <Input
                          id="phone"
                          type="tel"
                          value={billingData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 pl-10"
                          placeholder="06 12345678"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="vatNumber" className="text-premium-200">BTW nummer</Label>
                    <Input
                      id="vatNumber"
                      type="text"
                      value={billingData.vatNumber}
                      onChange={(e) => handleInputChange('vatNumber', e.target.value)}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-2"
                      placeholder="NL123456789B01 (optioneel)"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-premium-200">Adres</Label>
                    <Input
                      id="address"
                      type="text"
                      value={billingData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-2"
                      placeholder="Straatnaam 123"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="postalCode" className="text-premium-200">Postcode</Label>
                      <Input
                        id="postalCode"
                        type="text"
                        value={billingData.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-2"
                        placeholder="1234 AB"
                      />
                    </div>

                    <div>
                      <Label htmlFor="city" className="text-premium-200">Plaats</Label>
                      <Input
                        id="city"
                        type="text"
                        value={billingData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-2"
                        placeholder="Amsterdam"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-premium-600/30">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="acceptTerms"
                        checked={billingData.acceptTerms}
                        onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
                        className="border-premium-600 data-[state=checked]:bg-klusdirect-orange data-[state=checked]:border-klusdirect-orange"
                      />
                      <Label htmlFor="acceptTerms" className="text-premium-200 text-sm cursor-pointer">
                        Ik ga akkoord met de <span className="text-klusdirect-gold hover:underline">abonnementsvoorwaarden</span> en 
                        automatische verlenging van het abonnement. <span className="text-red-400 font-semibold">*</span>
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="acceptMarketing"
                        checked={billingData.acceptMarketing}
                        onCheckedChange={(checked) => handleInputChange('acceptMarketing', checked as boolean)}
                        className="border-premium-600 data-[state=checked]:bg-klusdirect-orange data-[state=checked]:border-klusdirect-orange"
                      />
                      <Label htmlFor="acceptMarketing" className="text-premium-200 text-sm cursor-pointer">
                        Ik wil updates ontvangen over nieuwe features en aanbiedingen
                      </Label>
                    </div>
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
                    <ChevronRight className="w-4 h-4 mr-2" />
                    Volgende: Betaling
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && !verificationStep && !isProcessing && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-klusdirect-gold/20 to-klusdirect-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-klusdirect-gold/30">
                    <CreditCard className="w-8 h-8 text-klusdirect-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-premium-50 mb-2">
                    Kies je betaalmethode
                  </h3>
                  <p className="text-premium-300">
                    Veilige betaling via Mollie - Nederland's #1 betaalprovider
                  </p>
                </div>

                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {/* iDEAL Payment */}
                  <Card className={`glass cursor-pointer transition-all duration-200 ${
                    paymentMethod === "ideal" 
                      ? "border-klusdirect-orange/50 bg-klusdirect-orange/5" 
                      : "border-premium-600/30 hover:border-premium-500/50"
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="ideal" id="ideal" className="border-premium-600 text-klusdirect-orange" />
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-12 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded flex items-center justify-center text-white font-bold text-xs">
                            iDEAL
                          </div>
                          <div>
                            <h4 className="text-premium-50 font-medium">iDEAL</h4>
                            <p className="text-premium-400 text-sm">Direct betalen via je eigen bank - Gratis</p>
                          </div>
                        </div>
                        <div className="flex items-center text-premium-400">
                          <Shield className="w-4 h-4 mr-1" />
                          <span className="text-xs">Veilig</span>
                        </div>
                      </div>
                      
                      {paymentMethod === "ideal" && (
                        <div className="mt-4 pt-4 border-t border-premium-600/30">
                          <Label className="text-premium-200 text-sm mb-3 block">Kies je bank:</Label>
                          <div className="grid grid-cols-2 gap-2">
                            {dutchBanks.map((bank) => (
                              <button
                                key={bank.id}
                                type="button"
                                onClick={() => setSelectedBank(bank.id)}
                                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                                  selectedBank === bank.id
                                    ? "border-klusdirect-orange bg-klusdirect-orange/10"
                                    : "border-premium-600/30 hover:border-premium-500/50"
                                }`}
                              >
                                <div className="flex items-center space-x-2">
                                  <span className="text-lg">{bank.logo}</span>
                                  <span className="text-premium-200 text-sm font-medium">{bank.name}</span>
                                </div>
                                <span className="text-xs text-premium-400">{bank.processingTime}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Credit Card Payment */}
                  <Card className={`glass cursor-pointer transition-all duration-200 ${
                    paymentMethod === "card" 
                      ? "border-klusdirect-orange/50 bg-klusdirect-orange/5" 
                      : "border-premium-600/30 hover:border-premium-500/50"
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="card" id="card" className="border-premium-600 text-klusdirect-orange" />
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="flex space-x-1">
                            <div className="w-8 h-5 bg-blue-600 rounded text-white flex items-center justify-center text-xs font-bold">VISA</div>
                            <div className="w-8 h-5 bg-red-600 rounded text-white flex items-center justify-center text-xs font-bold">MC</div>
                            <div className="w-8 h-5 bg-green-600 rounded text-white flex items-center justify-center text-xs font-bold">AE</div>
                          </div>
                          <div>
                            <h4 className="text-premium-50 font-medium">Creditcard</h4>
                            <p className="text-premium-400 text-sm">Visa, Mastercard, American Express - €0,35 kosten</p>
                          </div>
                        </div>
                        <div className="flex items-center text-premium-400">
                          <Lock className="w-4 h-4 mr-1" />
                          <span className="text-xs">SSL</span>
                        </div>
                      </div>
                      
                      {paymentMethod === "card" && (
                        <div className="mt-4 pt-4 border-t border-premium-600/30">
                          <div className="space-y-4">
                            <div>
                              <Label className="text-premium-200 text-sm mb-2 block">Kaarthouder naam *</Label>
                              <Input
                                type="text"
                                value={cardData.cardholderName}
                                onChange={(e) => handleCardInputChange('cardholderName', e.target.value)}
                                className="glass border-premium-600/30 bg-premium-800/50 text-premium-50"
                                placeholder="Naam zoals op de kaart"
                              />
                            </div>
                            
                            <div>
                              <Label className="text-premium-200 text-sm mb-2 block">
                                Kaartnummer * 
                                {cardData.cardNumber && (
                                  <span className="text-klusdirect-gold text-xs ml-2">
                                    ({detectCardType(cardData.cardNumber)})
                                  </span>
                                )}
                              </Label>
                              <Input
                                type="text"
                                value={cardData.cardNumber}
                                onChange={(e) => {
                                  // Format card number with spaces
                                  let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
                                  value = value.replace(/(\d{4})/g, '$1 ').trim();
                                  if (value.length <= 19) { // Max 16 digits + 3 spaces
                                    handleCardInputChange('cardNumber', value);
                                  }
                                }}
                                className={`glass bg-premium-800/50 text-premium-50 ${
                                  cardData.cardNumber && !validateCardNumber(cardData.cardNumber) 
                                    ? 'border-red-500/50' 
                                    : 'border-premium-600/30'
                                }`}
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                              />
                              {cardData.cardNumber && !validateCardNumber(cardData.cardNumber) && (
                                <p className="text-red-400 text-xs mt-1">Ongeldige kaart nummer</p>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-premium-200 text-sm mb-2 block">Vervaldatum *</Label>
                                <Input
                                  type="text"
                                  value={cardData.expiryDate}
                                  onChange={(e) => {
                                    let value = e.target.value.replace(/\D/g, '');
                                    if (value.length >= 2) {
                                      value = value.substring(0, 2) + '/' + value.substring(2, 4);
                                    }
                                    if (value.length <= 5) {
                                      handleCardInputChange('expiryDate', value);
                                    }
                                  }}
                                  className="glass border-premium-600/30 bg-premium-800/50 text-premium-50"
                                  placeholder="MM/YY"
                                  maxLength={5}
                                />
                              </div>
                              
                              <div>
                                <Label className="text-premium-200 text-sm mb-2 block">CVV *</Label>
                                <Input
                                  type="password"
                                  value={cardData.cvv}
                                  onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    if (value.length <= 4) {
                                      handleCardInputChange('cvv', value);
                                    }
                                  }}
                                  className="glass border-premium-600/30 bg-premium-800/50 text-premium-50"
                                  placeholder="123"
                                  maxLength={4}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </RadioGroup>

                {/* Payment Security */}
                <Card className="glass border border-green-500/30 bg-green-500/5">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-green-400" />
                      <div>
                        <h4 className="text-green-400 font-medium text-sm">100% Veilige betaling</h4>
                        <p className="text-premium-300 text-sm">
                          Verwerkt door Mollie (PCI DSS Level 1). Wij slaan geen betaalgegevens op. 
                          Volledige terugbetaling binnen 14 dagen mogelijk.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1 border-premium-600 text-premium-200 hover:bg-premium-700"
                    disabled={isVerifying}
                  >
                    Vorige
                  </Button>
                  <Button 
                    onClick={handleVerification}
                    disabled={!isStep2Valid || isVerifying}
                    className="flex-1 bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
                  >
                    {isVerifying ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        Verificatie starten...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        Verifieer betaalmethode
                      </>
                    )}
                  </Button>
                </div>

                {/* Payment validation feedback */}
                {!isStep2Valid && (
                  <div className="text-center">
                    <p className="text-premium-400 text-sm mb-2">
                      Vul alle verplichte velden in:
                    </p>
                    <ul className="text-premium-400 text-xs space-y-1">
                      {paymentMethod === "ideal" && !selectedBank && (
                        <li>• Kies je bank</li>
                      )}
                      {paymentMethod === "card" && !cardData.cardholderName && (
                        <li>• Kaarthouder naam</li>
                      )}
                      {paymentMethod === "card" && !cardData.cardNumber && (
                        <li>• Kaartnummer</li>
                      )}
                      {paymentMethod === "card" && !cardData.expiryDate && (
                        <li>• Vervaldatum</li>
                      )}
                      {paymentMethod === "card" && !cardData.cvv && (
                        <li>• CVV code</li>
                      )}
                      {!paymentMethod && (
                        <li>• Kies een betaalmethode</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Verification Step */}
            {verificationStep && !isProcessing && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                    <Shield className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-premium-50 mb-2">
                    Verificatie vereist
                  </h3>
                  <p className="text-premium-300">
                    {paymentMethod === "ideal" 
                      ? `Je ${dutchBanks.find(b => b.id === selectedBank)?.name} banking app heeft een verificatiecode verzonden`
                      : "We hebben een verificatiecode verzonden naar je mobiele telefoon"
                    }
                  </p>
                </div>

                <Card className="glass border border-klusdirect-gold/30 bg-klusdirect-gold/5">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-4">
                        {paymentMethod === "ideal" ? (
                          <>
                            <Smartphone className="w-5 h-5 text-klusdirect-blue" />
                            <span className="text-premium-50 font-medium">{dutchBanks.find(b => b.id === selectedBank)?.name} Banking App</span>
                          </>
                        ) : (
                          <>
                            <MessageCircle className="w-5 h-5 text-klusdirect-orange" />
                            <span className="text-premium-50 font-medium">SMS Verificatie</span>
                          </>
                        )}
                      </div>
                      
                      <div className="mb-4">
                        <Label className="text-premium-200 text-sm mb-3 block">
                          Voer de 6-cijferige verificatiecode in:
                        </Label>
                        <Input
                          type="text"
                          value={paymentMethod === "ideal" ? idealData.verificationCode : cardData.verificationCode}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 6) {
                              if (paymentMethod === "ideal") {
                                handleIdealInputChange('verificationCode', value);
                              } else {
                                handleCardInputChange('verificationCode', value);
                              }
                            }
                          }}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 text-center text-2xl tracking-widest font-mono"
                          placeholder="000000"
                          maxLength={6}
                        />
                      </div>
                      
                      <div className="text-center">
                        <p className="text-premium-400 text-sm mb-4">
                          Geen code ontvangen? 
                          <button 
                            onClick={handleResendCode}
                            disabled={isVerifying || verificationAttempts >= 3}
                            className="text-klusdirect-gold hover:underline ml-1 disabled:opacity-50"
                          >
                            {isVerifying ? "Versturen..." : "Verstuur opnieuw"}
                          </button>
                          {verificationAttempts > 0 && (
                            <span className="text-premium-500 text-xs block mt-1">
                              Pogingen: {verificationAttempts}/3
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={() => {
                      setVerificationStep(false);
                      setCardData(prev => ({ ...prev, verificationCode: "" }));
                      setIdealData(prev => ({ ...prev, verificationCode: "" }));
                      setPaymentError("");
                    }}
                    variant="outline"
                    className="flex-1 border-premium-600 text-premium-200 hover:bg-premium-700"
                    disabled={isProcessing}
                  >
                    Terug
                  </Button>
                  <Button 
                    onClick={handleUpgrade}
                    disabled={!isVerificationValid || isProcessing}
                    className="flex-1 bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100"
                  >
                    <>
                      <Euro className="w-4 h-4 mr-2" />
                      Betaal €{plan.price} en voltooi upgrade
                    </>
                  </Button>
                </div>

                {/* Verification validation feedback */}
                {!isVerificationValid && (
                  <div className="text-center">
                    <p className="text-premium-400 text-sm">
                      Voer de volledige 6-cijferige verificatiecode in
                    </p>
                  </div>
                )}
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
              Upgrade succesvol voltooid!
            </h3>
            <p className="text-premium-200 mb-6 text-lg">
              Welkom bij <span className="text-klusdirect-gold font-medium">{plan.name}</span>! 
              Je account is geactiveerd met alle nieuwe voordelen.
            </p>
            
            {/* Transaction Details */}
            <div className="bg-premium-700/50 rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
              <h4 className="text-premium-50 font-medium mb-4 text-center">Transactie details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-premium-300">Transactie ID:</span>
                  <span className="text-premium-50 font-mono">{transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-premium-300">Factuur nummer:</span>
                  <span className="text-premium-50">{invoiceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-premium-300">Plan:</span>
                  <span className="text-premium-50">{plan.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-premium-300">Nieuwe commissie:</span>
                  <span className="text-klusdirect-gold font-medium">{plan.commission}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-premium-300">Volgende betaling:</span>
                  <span className="text-premium-50">{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('nl-NL')}</span>
                </div>
              </div>
            </div>

            {/* Benefits Summary */}
            <div className="bg-klusdirect-gold/10 border border-klusdirect-gold/20 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 text-klusdirect-gold mb-3">
                <Crown className="w-5 h-5" />
                <span className="font-medium">Je nieuwe voordelen</span>
              </div>
              <ul className="text-premium-200 text-sm space-y-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="w-3 h-3 text-klusdirect-gold mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={handleCloseSuccess}
                className="bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Ga naar dashboard
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  const invoice = localStorage.getItem('latestInvoice');
                  if (invoice) {
                    // Simulate invoice download
                    const blob = new Blob([JSON.stringify(JSON.parse(invoice), null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `Factuur-${invoiceNumber}.json`;
                    a.click();
                  }
                }}
                className="border-premium-600 text-premium-200 hover:bg-premium-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Download factuur
              </Button>
            </div>

            <p className="text-premium-400 text-sm mt-6">
              Een bevestigingsmail is verzonden naar {billingData.email}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
