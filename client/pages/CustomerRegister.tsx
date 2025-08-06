import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Crown, 
  Shield, 
  Star,
  Building,
  CreditCard,
  CheckCircle,
  Camera,
  Eye,
  EyeOff,
  Lock,
  Users,
  Calendar,
  Globe
} from "lucide-react";

export default function CustomerRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [customerData, setCustomerData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    
    // Address Info
    address: '',
    houseNumber: '',
    postalCode: '',
    city: '',
    country: 'Nederland',
    
    // Business Info (optional)
    isBusinessAccount: false,
    companyName: '',
    kvkNumber: '',
    vatNumber: '',
    
    // Preferences
    communicationPreference: 'email', // email, sms, app
    marketingConsent: false,
    privacyConsent: false,
    termsConsent: false,
    
    // Account Settings
    profileVisibility: 'private', // private, contacts, public
    notificationSettings: {
      quotes: true,
      updates: true,
      marketing: false,
      sms: false
    }
  });

  const handleInputChange = (field: string, value: any) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (section: string, field: string, value: any) => {
    setCustomerData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof customerData],
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store customer data
    const customerProfile = {
      ...customerData,
      registrationDate: new Date().toISOString(),
      customerId: `CUST_${Date.now()}`,
      accountType: 'premium',
      status: 'active'
    };
    
    localStorage.setItem('customerProfile', JSON.stringify(customerProfile));
    localStorage.setItem('userType', 'customer');
    localStorage.setItem('isLoggedIn', 'true');
    
    setIsSubmitting(false);
    
    // Navigate to customer dashboard
    navigate('/customer/dashboard');
  };

  const isStep1Valid = customerData.firstName && customerData.lastName && customerData.email && customerData.phone && customerData.password && customerData.confirmPassword && customerData.password === customerData.confirmPassword;
  const isStep2Valid = customerData.address && customerData.postalCode && customerData.city;
  const isStep3Valid = customerData.termsConsent && customerData.privacyConsent;

  return (
    <div className="min-h-screen bg-premium-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-premium-900 via-premium-800 to-premium-900"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-klusdirect-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-klusdirect-orange/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-premium-300 hover:text-klusdirect-gold transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Terug naar home
            </Link>
          </div>

          <Card className="glass border-2 border-premium-600/30">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Badge className="bg-gradient-to-r from-klusdirect-blue/20 to-klusdirect-blue/10 text-klusdirect-blue border border-klusdirect-blue/30 px-4 py-2">
                  <Crown className="w-4 h-4 mr-2" />
                  Premium Client Registratie
                </Badge>
              </div>
              <CardTitle className="text-3xl text-premium-50 mb-2">
                Word Premium Klant
              </CardTitle>
              <p className="text-premium-200">
                Toegang tot Nederland's beste vakmensen en exclusieve service
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Progress Indicator */}
              <div className="flex justify-center">
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    step >= 1 ? 'bg-klusdirect-blue border-klusdirect-blue text-white' : 'border-premium-600 text-premium-400'
                  }`}>
                    {step > 1 ? <CheckCircle className="w-4 h-4" /> : '1'}
                  </div>
                  <div className={`w-12 h-1 ${step > 1 ? 'bg-klusdirect-blue' : 'bg-premium-700'}`}></div>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    step >= 2 ? 'bg-klusdirect-blue border-klusdirect-blue text-white' : 'border-premium-600 text-premium-400'
                  }`}>
                    {step > 2 ? <CheckCircle className="w-4 h-4" /> : '2'}
                  </div>
                  <div className={`w-12 h-1 ${step > 2 ? 'bg-klusdirect-blue' : 'bg-premium-700'}`}></div>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    step >= 3 ? 'bg-klusdirect-blue border-klusdirect-blue text-white' : 'border-premium-600 text-premium-400'
                  }`}>
                    {step > 3 ? <CheckCircle className="w-4 h-4" /> : '3'}
                  </div>
                </div>
              </div>

              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-klusdirect-blue/20 to-klusdirect-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-klusdirect-blue/30">
                      <User className="w-8 h-8 text-klusdirect-blue" />
                    </div>
                    <h3 className="text-xl font-semibold text-premium-50 mb-2">
                      Persoonlijke gegevens
                    </h3>
                    <p className="text-premium-300">
                      Vul uw basisgegevens in voor uw premium account
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-premium-200">Voornaam *</Label>
                        <Input
                          id="firstName"
                          value={customerData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                          placeholder="Marie"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-premium-200">Achternaam *</Label>
                        <Input
                          id="lastName"
                          value={customerData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                          placeholder="Jansen"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-premium-200">Email adres *</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-premium-400" />
                        <Input
                          id="email"
                          type="email"
                          value={customerData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 pl-10"
                          placeholder="marie@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-premium-200">Telefoonnummer *</Label>
                      <div className="relative mt-1">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-premium-400" />
                        <Input
                          id="phone"
                          value={customerData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 pl-10"
                          placeholder="06 12345678"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="dateOfBirth" className="text-premium-200">Geboortedatum</Label>
                      <div className="relative mt-1">
                        <Calendar className="absolute left-3 top-3 w-4 h-4 text-premium-400" />
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={customerData.dateOfBirth}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 pl-10"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="password" className="text-premium-200">Wachtwoord *</Label>
                        <div className="relative mt-1">
                          <Lock className="absolute left-3 top-3 w-4 h-4 text-premium-400" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={customerData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 pl-10 pr-10"
                            placeholder="Minimaal 8 tekens"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-premium-400 hover:text-premium-200"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword" className="text-premium-200">Bevestig wachtwoord *</Label>
                        <div className="relative mt-1">
                          <Lock className="absolute left-3 top-3 w-4 h-4 text-premium-400" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            value={customerData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            className={`glass bg-premium-800/50 text-premium-50 pl-10 mt-1 ${
                              customerData.confirmPassword && customerData.password !== customerData.confirmPassword 
                                ? 'border-red-500/50' 
                                : 'border-premium-600/30'
                            }`}
                            placeholder="Herhaal wachtwoord"
                          />
                        </div>
                        {customerData.confirmPassword && customerData.password !== customerData.confirmPassword && (
                          <p className="text-red-400 text-xs mt-1">Wachtwoorden komen niet overeen</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Link to="/" className="flex-1">
                      <Button 
                        variant="outline" 
                        className="w-full border-premium-600 text-premium-200 hover:bg-premium-700"
                      >
                        Annuleren
                      </Button>
                    </Link>
                    <Button 
                      onClick={() => setStep(2)}
                      disabled={!isStep1Valid}
                      className="flex-1 bg-gradient-to-r from-klusdirect-blue to-klusdirect-blue-dark text-white font-semibold disabled:opacity-50"
                    >
                      Volgende: Adresgegevens
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Address & Business Info */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-klusdirect-gold/20 to-klusdirect-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-klusdirect-gold/30">
                      <MapPin className="w-8 h-8 text-klusdirect-gold" />
                    </div>
                    <h3 className="text-xl font-semibold text-premium-50 mb-2">
                      Adres & bedrijfsgegevens
                    </h3>
                    <p className="text-premium-300">
                      Voor facturering en het plaatsen van klussen op verschillende locaties
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Address Information */}
                    <div>
                      <h4 className="text-lg font-medium text-premium-50 mb-3">Adresgegevens</h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                          <div className="col-span-2">
                            <Label htmlFor="address" className="text-premium-200">Straatnaam *</Label>
                            <Input
                              id="address"
                              value={customerData.address}
                              onChange={(e) => handleInputChange('address', e.target.value)}
                              className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                              placeholder="Hoofdstraat"
                            />
                          </div>
                          <div>
                            <Label htmlFor="houseNumber" className="text-premium-200">Huisnummer *</Label>
                            <Input
                              id="houseNumber"
                              value={customerData.houseNumber}
                              onChange={(e) => handleInputChange('houseNumber', e.target.value)}
                              className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                              placeholder="123"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="postalCode" className="text-premium-200">Postcode *</Label>
                            <Input
                              id="postalCode"
                              value={customerData.postalCode}
                              onChange={(e) => handleInputChange('postalCode', e.target.value)}
                              className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                              placeholder="1012 AB"
                            />
                          </div>
                          <div>
                            <Label htmlFor="city" className="text-premium-200">Plaats *</Label>
                            <Input
                              id="city"
                              value={customerData.city}
                              onChange={(e) => handleInputChange('city', e.target.value)}
                              className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                              placeholder="Amsterdam"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Business Account Option */}
                    <div className="space-y-4 pt-4 border-t border-premium-600/30">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="isBusinessAccount"
                          checked={customerData.isBusinessAccount}
                          onCheckedChange={(checked) => handleInputChange('isBusinessAccount', checked)}
                          className="border-premium-600 data-[state=checked]:bg-klusdirect-blue data-[state=checked]:border-klusdirect-blue"
                        />
                        <div>
                          <Label htmlFor="isBusinessAccount" className="text-premium-200 cursor-pointer">
                            Dit is een bedrijfsaccount
                          </Label>
                          <p className="text-premium-400 text-sm">Voor bedrijven die klussen op verschillende locaties plaatsen</p>
                        </div>
                      </div>

                      {customerData.isBusinessAccount && (
                        <div className="ml-6 space-y-4 p-4 bg-premium-700/30 rounded-lg">
                          <div>
                            <Label htmlFor="companyName" className="text-premium-200">Bedrijfsnaam *</Label>
                            <div className="relative mt-1">
                              <Building className="absolute left-3 top-3 w-4 h-4 text-premium-400" />
                              <Input
                                id="companyName"
                                value={customerData.companyName}
                                onChange={(e) => handleInputChange('companyName', e.target.value)}
                                className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 pl-10"
                                placeholder="Uw Bedrijf B.V."
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="kvkNumber" className="text-premium-200">KvK nummer</Label>
                              <Input
                                id="kvkNumber"
                                value={customerData.kvkNumber}
                                onChange={(e) => handleInputChange('kvkNumber', e.target.value)}
                                className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                                placeholder="12345678"
                              />
                            </div>
                            <div>
                              <Label htmlFor="vatNumber" className="text-premium-200">BTW nummer</Label>
                              <Input
                                id="vatNumber"
                                value={customerData.vatNumber}
                                onChange={(e) => handleInputChange('vatNumber', e.target.value)}
                                className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                                placeholder="NL123456789B01"
                              />
                            </div>
                          </div>
                        </div>
                      )}
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
                      onClick={() => setStep(3)}
                      disabled={!isStep2Valid}
                      className="flex-1 bg-gradient-to-r from-klusdirect-blue to-klusdirect-blue-dark text-white font-semibold disabled:opacity-50"
                    >
                      Volgende: Voorkeuren
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Preferences & Terms */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                      <Shield className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-premium-50 mb-2">
                      Voorkeuren & voorwaarden
                    </h3>
                    <p className="text-premium-300">
                      Stel uw communicatievoorkeuren in en ga akkoord met onze voorwaarden
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Communication Preferences */}
                    <div>
                      <Label className="text-premium-200 mb-3 block">Hoe wilt u contact ontvangen?</Label>
                      <RadioGroup 
                        value={customerData.communicationPreference} 
                        onValueChange={(value) => handleInputChange('communicationPreference', value)}
                      >
                        <div className="space-y-2">
                          <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-premium-600/30 hover:border-premium-500/50">
                            <RadioGroupItem value="email" id="comm-email" className="border-premium-600 text-klusdirect-blue" />
                            <Mail className="w-5 h-5 text-premium-400" />
                            <div>
                              <span className="text-premium-50 font-medium">Email</span>
                              <p className="text-premium-400 text-sm">Ontvang updates via email</p>
                            </div>
                          </label>
                          <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-premium-600/30 hover:border-premium-500/50">
                            <RadioGroupItem value="sms" id="comm-sms" className="border-premium-600 text-klusdirect-blue" />
                            <Phone className="w-5 h-5 text-premium-400" />
                            <div>
                              <span className="text-premium-50 font-medium">SMS</span>
                              <p className="text-premium-400 text-sm">Ontvang updates via SMS</p>
                            </div>
                          </label>
                          <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-premium-600/30 hover:border-premium-500/50">
                            <RadioGroupItem value="app" id="comm-app" className="border-premium-600 text-klusdirect-blue" />
                            <Shield className="w-5 h-5 text-premium-400" />
                            <div>
                              <span className="text-premium-50 font-medium">Via app</span>
                              <p className="text-premium-400 text-sm">Ontvang push notificaties in de app</p>
                            </div>
                          </label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Terms and Consents */}
                    <div className="space-y-4 pt-4 border-t border-premium-600/30">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="termsConsent"
                          checked={customerData.termsConsent}
                          onCheckedChange={(checked) => handleInputChange('termsConsent', checked)}
                          className="border-premium-600 data-[state=checked]:bg-klusdirect-blue data-[state=checked]:border-klusdirect-blue"
                        />
                        <Label htmlFor="termsConsent" className="text-premium-200 text-sm cursor-pointer">
                          Ik ga akkoord met de <span className="text-klusdirect-gold hover:underline">algemene voorwaarden</span> van KlusDirect. 
                          <span className="text-red-400 font-semibold"> *</span>
                        </Label>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="privacyConsent"
                          checked={customerData.privacyConsent}
                          onCheckedChange={(checked) => handleInputChange('privacyConsent', checked)}
                          className="border-premium-600 data-[state=checked]:bg-klusdirect-blue data-[state=checked]:border-klusdirect-blue"
                        />
                        <Label htmlFor="privacyConsent" className="text-premium-200 text-sm cursor-pointer">
                          Ik ga akkoord met het <span className="text-klusdirect-gold hover:underline">privacybeleid</span> en 
                          geef toestemming voor de verwerking van mijn gegevens. <span className="text-red-400 font-semibold"> *</span>
                        </Label>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="marketingConsent"
                          checked={customerData.marketingConsent}
                          onCheckedChange={(checked) => handleInputChange('marketingConsent', checked)}
                          className="border-premium-600 data-[state=checked]:bg-klusdirect-blue data-[state=checked]:border-klusdirect-blue"
                        />
                        <Label htmlFor="marketingConsent" className="text-premium-200 text-sm cursor-pointer">
                          Ik wil updates ontvangen over nieuwe features, aanbiedingen en premium services
                        </Label>
                      </div>
                    </div>

                    {/* Premium Benefits Reminder */}
                    <div className="bg-klusdirect-blue/10 border border-klusdirect-blue/20 rounded-lg p-4">
                      <h4 className="text-klusdirect-blue font-medium mb-2 flex items-center">
                        <Crown className="w-4 h-4 mr-2" />
                        Uw Premium voordelen
                      </h4>
                      <ul className="space-y-1 text-premium-300 text-sm">
                        <li className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-klusdirect-gold mr-2" />
                          Toegang tot geverifieerde top vakmensen
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-klusdirect-gold mr-2" />
                          24/7 premium klantenservice
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-klusdirect-gold mr-2" />
                          Geld-terug-garantie bij problemen
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="w-3 h-3 text-klusdirect-gold mr-2" />
                          Persoonlijke projectmanager
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      onClick={() => setStep(2)}
                      variant="outline"
                      className="flex-1 border-premium-600 text-premium-200 hover:bg-premium-700"
                    >
                      Vorige
                    </Button>
                    <Button 
                      onClick={handleSubmit}
                      disabled={!isStep3Valid || isSubmitting}
                      className="flex-1 bg-gradient-to-r from-klusdirect-blue to-klusdirect-blue-dark text-white font-semibold disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Account aanmaken...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Premium Account Aanmaken
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Security Badge */}
          <div className="text-center mt-6">
            <div className="inline-flex items-center space-x-2 text-premium-400 text-sm">
              <Shield className="w-4 h-4" />
              <span>Uw gegevens worden veilig versleuteld opgeslagen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
