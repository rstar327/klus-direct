import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  AlertTriangle
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
    { id: "ing", name: "ING", logo: "🟠" },
    { id: "rabobank", name: "Rabobank", logo: "🔵" },
    { id: "abn_amro", name: "ABN AMRO", logo: "🟡" },
    { id: "sns", name: "SNS Bank", logo: "🟣" },
    { id: "asn", name: "ASN Bank", logo: "🟢" },
    { id: "triodos", name: "Triodos Bank", logo: "���" },
    { id: "knab", name: "Knab", logo: "⚫" },
    { id: "bunq", name: "bunq", logo: "🌈" }
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

  const handleVerification = async () => {
    setIsVerifying(true);

    // Simulate verification process (SMS/email/bank authentication)
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsVerifying(false);
    setVerificationStep(true);
  };

  const handleUpgrade = async () => {
    setIsProcessing(true);

    // Simulate Mollie payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Store the subscription upgrade
    localStorage.setItem('userPlan', plan.name.toLowerCase());
    localStorage.setItem('subscriptionData', JSON.stringify({
      plan: plan.name,
      price: plan.price,
      upgradeDate: new Date().toISOString(),
      nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod,
      status: 'active'
    }));

    setIsProcessing(false);
    setIsSuccess(true);

    // Wait and then close modal with page refresh
    setTimeout(() => {
      setIsOpen(false);
      window.location.reload(); // Refresh to update dashboard
    }, 3000);
  };

  const isStep1Valid = billingData.companyName && billingData.email && billingData.acceptTerms;
  const isStep2Valid = paymentMethod === "ideal" ? selectedBank :
                       paymentMethod === "card" ? (cardData.cardNumber && cardData.expiryDate && cardData.cvv && cardData.cardholderName) : false;
  const isVerificationValid = paymentMethod === "ideal" ? idealData.verificationCode.length === 6 :
                             paymentMethod === "card" ? cardData.verificationCode.length === 6 : false;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl glass border-2 border-premium-600/30 bg-premium-800/95 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-premium-50 flex items-center">
            <Crown className="w-6 h-6 mr-3 text-klusdirect-gold" />
            Upgrade naar {plan.name}
          </DialogTitle>
          <DialogDescription className="text-premium-300">
            {verificationStep
              ? "Verificatie: Bevestig je betaling"
              : `Stap ${step} van 2: ${step === 1 ? "Facturatiegegevens" : "Betaalmethode"}`
            }
          </DialogDescription>
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
                  2
                </div>
              </div>
            </div>

            {/* Plan Summary */}
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
                    <div className="text-premium-400 text-sm">per maand</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 1: Billing Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-klusdirect-blue/20 to-klusdirect-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-klusdirect-blue/30">
                    <Building className="w-8 h-8 text-klusdirect-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-premium-50 mb-2">
                    Facturatiegegevens
                  </h3>
                  <p className="text-premium-300">
                    Vul je bedrijfsgegevens in voor de factuur
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
                      <Label htmlFor="vatNumber" className="text-premium-200">BTW nummer</Label>
                      <Input
                        id="vatNumber"
                        type="text"
                        value={billingData.vatNumber}
                        onChange={(e) => handleInputChange('vatNumber', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-2"
                        placeholder="NL123456789B01"
                      />
                    </div>
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
                    Volgende: Betaling
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-klusdirect-gold/20 to-klusdirect-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-klusdirect-gold/30">
                    <CreditCard className="w-8 h-8 text-klusdirect-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-premium-50 mb-2">
                    Kies je betaalmethode
                  </h3>
                  <p className="text-premium-300">
                    Veilige betaling via Mollie
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
                            <p className="text-premium-400 text-sm">Direct betalen via je bank</p>
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
                                className={`flex items-center space-x-2 p-3 rounded-lg border transition-all ${
                                  selectedBank === bank.id
                                    ? "border-klusdirect-orange bg-klusdirect-orange/10"
                                    : "border-premium-600/30 hover:border-premium-500/50"
                                }`}
                              >
                                <span className="text-lg">{bank.logo}</span>
                                <span className="text-premium-200 text-sm">{bank.name}</span>
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
                          </div>
                          <div>
                            <h4 className="text-premium-50 font-medium">Creditcard</h4>
                            <p className="text-premium-400 text-sm">Visa, Mastercard, American Express</p>
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
                              <Label className="text-premium-200 text-sm mb-2 block">Kaartnummer *</Label>
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
                                className="glass border-premium-600/30 bg-premium-800/50 text-premium-50"
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                              />
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
                                  type="text"
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
                        <h4 className="text-green-400 font-medium text-sm">Veilige betaling</h4>
                        <p className="text-premium-300 text-sm">
                          Je betaling wordt verwerkt door Mollie, een gecertificeerde Nederlandse betaalprovider. 
                          Wij slaan geen betaalgegevens op.
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
                    disabled={isProcessing}
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
                    <p className="text-premium-400 text-sm">
                      {paymentMethod === "ideal" && !selectedBank && "Kies je bank om door te gaan"}
                      {!paymentMethod && "Kies een betaalmethode"}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* Success State */
          <div className="py-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-green-400/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-premium-50 mb-3">
              Upgrade succesvol!
            </h3>
            <p className="text-premium-200 mb-4">
              Welkom bij <span className="text-klusdirect-gold font-medium">{plan.name}</span>! 
              Je account wordt nu bijgewerkt met alle nieuwe voordelen.
            </p>
            <div className="bg-premium-700/50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 text-klusdirect-orange mb-2">
                <Crown className="w-5 h-5" />
                <span className="font-medium">Je commissie is nu {plan.commission}</span>
              </div>
              <p className="text-premium-300 text-sm">
                Alle nieuwe klussen krijgen automatisch de lagere commissie. 
                Een bevestigingsmail is verstuurd naar je email.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
