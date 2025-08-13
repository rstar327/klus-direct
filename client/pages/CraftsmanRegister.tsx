import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Hammer, Building, Award, MapPin, Crown, Sparkles, Shield, CheckCircle, Phone, Mail, User, FileText } from "lucide-react";
import { useState } from "react";
import { registerUser } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export default function CraftsmanRegister() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    kvkNumber: "",
    vatNumber: "",
    specialization: "",
    workArea: "",
    experience: "",
    acceptTerms: false,
    acceptMarketing: false
  });

  const [step, setStep] = useState(1);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the actual registration logic
    console.log("Registration data:", formData);
    // Redirect to dashboard for demo
    window.location.href = "/craftsman/dashboard";
  };

  const isStep1Valid = formData.firstName && formData.lastName && formData.email && formData.phone;
  const isStep2Valid = formData.companyName && formData.kvkNumber && formData.vatNumber;
  const isStep3Valid = formData.specialization && formData.workArea && formData.acceptTerms;

  return (
    <div className="min-h-screen bg-premium-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-premium-900 via-premium-800 to-premium-900"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-klusdirect-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-klusdirect-blue/5 rounded-full blur-3xl"></div>
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
                <Badge className="bg-gradient-to-r from-klusdirect-gold/20 to-klusdirect-orange/20 text-klusdirect-gold border border-klusdirect-gold/30 px-4 py-2">
                  <Crown className="w-4 h-4 mr-2" />
                  Elite Partner Registratie
                </Badge>
              </div>
              <CardTitle className="text-3xl text-premium-50 mb-2">
                Word Elite Vakman
              </CardTitle>
              <p className="text-premium-200">
                Sluit je aan bij Nederland's meest exclusieve vakmannen platform
              </p>
              
              {/* Progress Indicator */}
              <div className="flex justify-center mt-6">
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step >= 1 ? 'bg-klusdirect-orange border-klusdirect-orange text-black' : 'border-premium-600 text-premium-400'
                  }`}>
                    {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
                  </div>
                  <div className={`w-12 h-1 ${step > 1 ? 'bg-klusdirect-orange' : 'bg-premium-700'}`}></div>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step >= 2 ? 'bg-klusdirect-orange border-klusdirect-orange text-black' : 'border-premium-600 text-premium-400'
                  }`}>
                    {step > 2 ? <CheckCircle className="w-5 h-5" /> : '2'}
                  </div>
                  <div className={`w-12 h-1 ${step > 2 ? 'bg-klusdirect-orange' : 'bg-premium-700'}`}></div>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step >= 3 ? 'bg-klusdirect-orange border-klusdirect-orange text-black' : 'border-premium-600 text-premium-400'
                  }`}>
                    3
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-klusdirect-blue/20 to-klusdirect-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-klusdirect-blue/30">
                        <User className="w-8 h-8 text-klusdirect-blue" />
                      </div>
                      <h3 className="text-xl font-semibold text-premium-50 mb-2">
                        Persoonlijke Gegevens
                      </h3>
                      <p className="text-premium-300">
                        Vul je persoonlijke contactgegevens in
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-premium-200">Voornaam *</Label>
                        <Input
                          id="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 placeholder:text-premium-400"
                          placeholder="Je voornaam"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-premium-200">Achternaam *</Label>
                        <Input
                          id="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 placeholder:text-premium-400"
                          placeholder="Je achternaam"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-premium-200">Email adres *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-premium-400" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 placeholder:text-premium-400 pl-11"
                          placeholder="je@email.nl"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-premium-200">Telefoonnummer *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-5 h-5 text-premium-400" />
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 placeholder:text-premium-400 pl-11"
                          placeholder="06 12345678"
                          required
                        />
                      </div>
                    </div>

                    <Button 
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!isStep1Valid}
                      className="w-full bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Volgende: Bedrijfsgegevens
                    </Button>
                  </div>
                )}

                {/* Step 2: Business Information */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-klusdirect-gold/20 to-klusdirect-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-klusdirect-gold/30">
                        <Building className="w-8 h-8 text-klusdirect-gold" />
                      </div>
                      <h3 className="text-xl font-semibold text-premium-50 mb-2">
                        Bedrijfsverificatie
                      </h3>
                      <p className="text-premium-300">
                        Voor verificatie en bescherming tegen scammers
                      </p>
                    </div>

                    <div className="bg-klusdirect-blue/10 border border-klusdirect-blue/20 rounded-lg p-4 mb-6">
                      <div className="flex items-start space-x-3">
                        <Shield className="w-5 h-5 text-klusdirect-blue mt-0.5" />
                        <div>
                          <h4 className="text-klusdirect-blue font-medium text-sm">Waarom vragen we dit?</h4>
                          <p className="text-premium-300 text-sm mt-1">
                            We verifiëren alle bedrijfsgegevens om onze klanten te beschermen tegen 
                            onbetrouwbare aanbieders en om de kwaliteit van ons platform te waarborgen.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-premium-200">Bedrijfsnaam *</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 w-5 h-5 text-premium-400" />
                        <Input
                          id="companyName"
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange('companyName', e.target.value)}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 placeholder:text-premium-400 pl-11"
                          placeholder="Jouw Bedrijf B.V."
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="kvkNumber" className="text-premium-200">KvK Nummer *</Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 w-5 h-5 text-premium-400" />
                        <Input
                          id="kvkNumber"
                          type="text"
                          value={formData.kvkNumber}
                          onChange={(e) => handleInputChange('kvkNumber', e.target.value)}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 placeholder:text-premium-400 pl-11"
                          placeholder="12345678"
                          pattern="[0-9]{8}"
                          maxLength={8}
                          required
                        />
                      </div>
                      <p className="text-premium-400 text-xs">8 cijfers van je Kamer van Koophandel registratie</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vatNumber" className="text-premium-200">BTW Nummer *</Label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 w-5 h-5 text-premium-400" />
                        <Input
                          id="vatNumber"
                          type="text"
                          value={formData.vatNumber}
                          onChange={(e) => handleInputChange('vatNumber', e.target.value)}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 placeholder:text-premium-400 pl-11"
                          placeholder="NL123456789B01"
                          required
                        />
                      </div>
                      <p className="text-premium-400 text-xs">Je BTW identificatienummer (bijv. NL123456789B01)</p>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        type="button"
                        onClick={() => setStep(1)}
                        variant="outline"
                        className="flex-1 border-premium-600 text-premium-200 hover:bg-premium-700"
                      >
                        Vorige
                      </Button>
                      <Button 
                        type="button"
                        onClick={() => setStep(3)}
                        disabled={!isStep2Valid}
                        className="flex-1 bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Volgende: Specialisatie
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Professional Information */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-klusdirect-orange/20 to-klusdirect-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-klusdirect-orange/30">
                        <Award className="w-8 h-8 text-klusdirect-orange" />
                      </div>
                      <h3 className="text-xl font-semibold text-premium-50 mb-2">
                        Vakspecialisatie
                      </h3>
                      <p className="text-premium-300">
                        Vertel ons over je expertise en werkgebied
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialization" className="text-premium-200">Specialisatie *</Label>
                      <Textarea
                        id="specialization"
                        value={formData.specialization}
                        onChange={(e) => handleInputChange('specialization', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 placeholder:text-premium-400 min-h-[100px]"
                        placeholder="Beschrijf je specialisaties (bijv. Sanitair, CV installaties, Badkamer renovaties...)"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="workArea" className="text-premium-200">Werkgebied *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-premium-400" />
                        <Input
                          id="workArea"
                          type="text"
                          value={formData.workArea}
                          onChange={(e) => handleInputChange('workArea', e.target.value)}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 placeholder:text-premium-400 pl-11"
                          placeholder="Amsterdam en omgeving (30km)"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-premium-200">Ervaring (optioneel)</Label>
                      <Textarea
                        id="experience"
                        value={formData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 placeholder:text-premium-400 min-h-[80px]"
                        placeholder="Aantal jaren ervaring, certificaten, specialisaties..."
                      />
                    </div>

                    <div className="space-y-4 pt-4 border-t border-premium-600/30">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="acceptTerms"
                          checked={formData.acceptTerms}
                          onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
                          className="border-premium-600 data-[state=checked]:bg-klusdirect-orange data-[state=checked]:border-klusdirect-orange"
                        />
                        <Label htmlFor="acceptTerms" className="text-premium-200 text-sm">
                          Ik ga akkoord met de <span className="text-klusdirect-gold hover:underline cursor-pointer">algemene voorwaarden</span> en <span className="text-klusdirect-gold hover:underline cursor-pointer">privacybeleid</span> van KlusDirect *
                        </Label>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="acceptMarketing"
                          checked={formData.acceptMarketing}
                          onCheckedChange={(checked) => handleInputChange('acceptMarketing', checked as boolean)}
                          className="border-premium-600 data-[state=checked]:bg-klusdirect-orange data-[state=checked]:border-klusdirect-orange"
                        />
                        <Label htmlFor="acceptMarketing" className="text-premium-200 text-sm">
                          Ik wil graag updates ontvangen over nieuwe klussen en platform ontwikkelingen
                        </Label>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        type="button"
                        onClick={() => setStep(2)}
                        variant="outline"
                        className="flex-1 border-premium-600 text-premium-200 hover:bg-premium-700"
                      >
                        Vorige
                      </Button>
                      <Button 
                        type="submit"
                        disabled={!isStep3Valid}
                        className="flex-1 bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Complete Registratie
                      </Button>
                    </div>
                  </div>
                )}
              </form>

              {/* Bottom Info */}
              <div className="mt-8 pt-6 border-t border-premium-600/30">
                <div className="text-center">
                  <p className="text-premium-300 text-sm">
                    Al een account? <Link to="/craftsman/login" className="text-klusdirect-gold hover:underline">Log hier in</Link>
                  </p>
                  <p className="text-premium-400 text-xs mt-2">
                    Je gegevens worden veilig versleuteld en alleen gebruikt voor verificatie doeleinden.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
