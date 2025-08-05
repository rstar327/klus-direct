import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Target,
  Send,
  CheckCircle,
  Euro,
  Clock,
  User,
  MessageCircle,
  Crown,
  AlertTriangle,
  FileText,
  Calendar,
  Building,
  Percent,
  Calculator
} from "lucide-react";

interface JobApplicationModalProps {
  job: {
    id: number;
    title: string;
    client: {
      name: string;
    };
    budget: {
      min: number;
      max: number;
      currency: string;
    };
    timing: {
      startDate: string;
      duration: string;
    };
    category: string;
  };
  onApplicationSubmit: (applicationData: any) => void;
}

export default function JobApplicationModal({ job, onApplicationSubmit }: JobApplicationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Application data
  const [applicationData, setApplicationData] = useState({
    message: "",
    proposedBudget: "",
    estimatedHours: "",
    startDate: "",
    materials: "",
    includesMaterials: false,
    warranty: "12",
    commission: 15, // Default commission based on plan
    acceptTerms: false
  });

  // Get commission rate based on plan (this would come from user's subscription)
  const getCommissionRate = () => {
    const plan = localStorage.getItem('userPlan') || 'free';
    switch (plan) {
      case 'professional': return 7.5;
      case 'elite': return 5;
      default: return 15;
    }
  };

  const commissionRate = getCommissionRate();
  const proposedAmount = parseFloat(applicationData.proposedBudget) || 0;
  const commissionAmount = (proposedAmount * commissionRate) / 100;
  const netAmount = proposedAmount - commissionAmount;

  const handleInputChange = (field: string, value: string | boolean) => {
    setApplicationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Generate application with invoice data
    const applicationWithInvoice = {
      ...applicationData,
      jobId: job.id,
      jobTitle: job.title,
      clientName: job.client.name,
      applicationDate: new Date().toISOString(),
      status: 'pending',
      proposedAmount,
      commissionAmount,
      netAmount,
      commissionRate,
      invoiceNumber: `INV-${Date.now()}`,
      estimatedStartDate: applicationData.startDate
    };
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store the pending invoice
    const existingInvoices = JSON.parse(localStorage.getItem('pendingInvoices') || '[]');
    existingInvoices.push(applicationWithInvoice);
    localStorage.setItem('pendingInvoices', JSON.stringify(existingInvoices));

    // Add to agenda automatically when application is submitted
    const agendaItem = {
      id: `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: job.title,
      clientName: job.client.name,
      clientEmail: '', // Would be filled from actual job data
      clientPhone: '', // Would be filled from actual job data
      location: 'Locatie nog te bepalen',
      date: applicationData.startDate,
      startTime: '09:00',
      endTime: '17:00',
      status: 'scheduled' as const,
      amount: proposedAmount,
      commissionRate: commissionRate,
      notes: `Aangenomen offerte - ${applicationData.message.substring(0, 100)}...`,
      jobType: job.category || 'Klus',
      estimatedDuration: parseInt(applicationData.estimatedHours) || 8
    };

    const existingAgenda = JSON.parse(localStorage.getItem('agendaItems') || '[]');
    existingAgenda.push(agendaItem);
    localStorage.setItem('agendaItems', JSON.stringify(existingAgenda));

    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Wait a moment to show success, then close and update parent
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setStep(1);
      setApplicationData({
        message: "",
        proposedBudget: "",
        estimatedHours: "",
        startDate: "",
        materials: "",
        includesMaterials: false,
        warranty: "12",
        commission: commissionRate,
        acceptTerms: false
      });
      onApplicationSubmit(applicationWithInvoice);
    }, 3000);
  };

  const isStep1Valid = applicationData.message.length >= 10 && applicationData.proposedBudget && applicationData.startDate;
  const isStep2Valid = applicationData.estimatedHours && applicationData.acceptTerms;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold text-lg py-6 hover:scale-105 transition-transform">
          <Target className="w-5 h-5 mr-2" />
          Aanmelden voor deze klus
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-3xl glass border-2 border-premium-600/30 bg-premium-800/95 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-premium-50 flex items-center">
            <Target className="w-6 h-6 mr-3 text-klusdirect-orange" />
            Aanmelden voor klus
          </DialogTitle>
          <DialogDescription className="text-premium-300">
            Stap {step} van 2: Bevestig je aanmelding en maak een offerte
          </DialogDescription>
        </DialogHeader>

        {!isSubmitted ? (
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

            {/* Job Summary */}
            <Card className="glass border border-premium-600/30">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-premium-50 mb-3">{job.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-klusdirect-blue" />
                    <span className="text-premium-200">Klant: {job.client.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Euro className="w-4 h-4 text-green-400" />
                    <span className="text-premium-200">
                      {job.budget.currency}{job.budget.min.toLocaleString()} - {job.budget.currency}{job.budget.max.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-klusdirect-orange" />
                    <span className="text-premium-200">{job.timing.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-klusdirect-gold" />
                    <span className="text-premium-200">{job.category}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 1: Application Details */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="message" className="text-premium-200 text-base font-medium">
                      Persoonlijk bericht *
                    </Label>
                    <Textarea
                      id="message"
                      value={applicationData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 placeholder:text-premium-400 min-h-[120px] mt-2"
                      placeholder="Beschrijf je ervaring met dit type project, je aanpak en waarom je de juiste keuze bent voor deze klus..."
                    />
                    <p className="text-premium-400 text-sm mt-1">
                      Minimum 10 karakters ({applicationData.message.length}/10)
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="proposedBudget" className="text-premium-200">Voorgestelde prijs *</Label>
                      <div className="relative mt-2">
                        <Euro className="absolute left-3 top-3 w-4 h-4 text-premium-400" />
                        <Input
                          id="proposedBudget"
                          type="number"
                          value={applicationData.proposedBudget}
                          onChange={(e) => handleInputChange('proposedBudget', e.target.value)}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 pl-10"
                          placeholder="3500"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="startDate" className="text-premium-200">Gewenste startdatum *</Label>
                      <div className="relative mt-2">
                        <Calendar className="absolute left-3 top-3 w-4 h-4 text-premium-400" />
                        <Input
                          id="startDate"
                          type="date"
                          value={applicationData.startDate}
                          onChange={(e) => handleInputChange('startDate', e.target.value)}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="materials" className="text-premium-200">Materialen en leveranciers</Label>
                    <Textarea
                      id="materials"
                      value={applicationData.materials}
                      onChange={(e) => handleInputChange('materials', e.target.value)}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 placeholder:text-premium-400 min-h-[80px] mt-2"
                      placeholder="Beschrijf welke materialen je gebruikt en of deze in de prijs inbegrepen zijn..."
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="includesMaterials"
                      checked={applicationData.includesMaterials}
                      onCheckedChange={(checked) => handleInputChange('includesMaterials', checked as boolean)}
                      className="border-premium-600 data-[state=checked]:bg-klusdirect-orange data-[state=checked]:border-klusdirect-orange"
                    />
                    <Label htmlFor="includesMaterials" className="text-premium-200 text-sm">
                      Materialen zijn inbegrepen in de genoemde prijs
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
                    onClick={() => {
                      console.log('Volgende button clicked, step 1 valid:', isStep1Valid);
                      console.log('Application data:', applicationData);
                      setStep(2);
                    }}
                    disabled={!isStep1Valid}
                    className="flex-1 bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Volgende: Offerte details
                  </Button>
                </div>

                {/* Validation feedback */}
                {!isStep1Valid && (
                  <div className="text-center mt-4">
                    <p className="text-premium-400 text-sm mb-2">
                      Vul alle verplichte velden in om door te gaan:
                    </p>
                    <ul className="text-premium-400 text-xs space-y-1">
                      {applicationData.message.length < 10 && (
                        <li>• Persoonlijk bericht (minimaal 10 karakters - nu: {applicationData.message.length})</li>
                      )}
                      {!applicationData.proposedBudget && (
                        <li>• Voorgestelde prijs</li>
                      )}
                      {!applicationData.startDate && (
                        <li>• Gewenste startdatum</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Invoice & Commission Details */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="estimatedHours" className="text-premium-200">Geschatte uren *</Label>
                      <div className="relative mt-2">
                        <Clock className="absolute left-3 top-3 w-4 h-4 text-premium-400" />
                        <Input
                          id="estimatedHours"
                          type="number"
                          value={applicationData.estimatedHours}
                          onChange={(e) => handleInputChange('estimatedHours', e.target.value)}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 pl-10"
                          placeholder="40"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="warranty" className="text-premium-200">Garantie (maanden)</Label>
                      <Input
                        id="warranty"
                        type="number"
                        value={applicationData.warranty}
                        onChange={(e) => handleInputChange('warranty', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-2"
                        placeholder="12"
                      />
                    </div>
                  </div>

                  {/* Commission Breakdown */}
                  <Card className="glass border border-klusdirect-orange/30 bg-klusdirect-orange/5">
                    <CardHeader>
                      <CardTitle className="text-lg text-premium-50 flex items-center">
                        <Calculator className="w-5 h-5 mr-2 text-klusdirect-gold" />
                        Commissie berekening
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-premium-300">Voorgestelde prijs:</span>
                        <span className="text-premium-50 font-medium">€{proposedAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-premium-300 flex items-center">
                          <Percent className="w-4 h-4 mr-1" />
                          KlusDirect commissie ({commissionRate}%):
                        </span>
                        <span className="text-red-400 font-medium">-€{commissionAmount.toLocaleString()}</span>
                      </div>
                      <div className="border-t border-premium-600 pt-2">
                        <div className="flex justify-between text-lg">
                          <span className="text-premium-50 font-semibold">Jouw netto ontvangst:</span>
                          <span className="text-green-400 font-bold">€{netAmount.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="bg-klusdirect-blue/10 border border-klusdirect-blue/20 rounded-lg p-3 mt-4">
                        <p className="text-klusdirect-blue text-sm">
                          💡 Upgrade naar Professional (€50/mnd) voor 7.5% commissie of Elite (€100/mnd) voor 5% commissie
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4 pt-4 border-t border-premium-600/30">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="acceptTerms"
                        checked={applicationData.acceptTerms}
                        onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
                        className="border-premium-600 data-[state=checked]:bg-klusdirect-orange data-[state=checked]:border-klusdirect-orange"
                      />
                      <Label htmlFor="acceptTerms" className="text-premium-200 text-sm cursor-pointer">
                        Ik ga akkoord met de <span className="text-klusdirect-gold hover:underline">voorwaarden</span> en
                        bevestig dat alle informatie correct is. Bij acceptatie door de klant wordt de commissie automatisch
                        ingehouden bij betaling. <span className="text-red-400 font-semibold">*</span>
                      </Label>
                    </div>
                  </div>

                  {/* Warning */}
                  <Card className="glass border border-yellow-500/30 bg-yellow-500/5">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="text-yellow-400 font-medium text-sm mb-1">
                            Belangrijke informatie
                          </h4>
                          <p className="text-premium-300 text-sm">
                            Na acceptatie door de klant wordt je offerte bindend. Een factuur wordt automatisch 
                            gegenereerd en je commissie wordt ingehouden bij betaling door de klant.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="flex-1 border-premium-600 text-premium-200 hover:bg-premium-700"
                    disabled={isSubmitting}
                  >
                    Vorige
                  </Button>
                  <Button
                    onClick={() => {
                      console.log('Verzend offerte button clicked');
                      console.log('Step 2 valid:', isStep2Valid);
                      console.log('Estimated hours:', applicationData.estimatedHours);
                      console.log('Accept terms:', applicationData.acceptTerms);
                      console.log('Is submitting:', isSubmitting);
                      handleSubmit();
                    }}
                    disabled={!isStep2Valid || isSubmitting}
                    className="flex-1 bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        Offerte verzenden...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Verzend offerte
                      </>
                    )}
                  </Button>
                </div>

                {/* Step 2 Validation feedback */}
                {!isStep2Valid && (
                  <div className="text-center mt-4">
                    <p className="text-premium-400 text-sm mb-2">
                      Vul alle verplichte velden in om de offerte te verzenden:
                    </p>
                    <ul className="text-premium-400 text-xs space-y-1">
                      {!applicationData.estimatedHours && (
                        <li>• Geschatte uren</li>
                      )}
                      {!applicationData.acceptTerms && (
                        <li>• Accepteer de voorwaarden</li>
                      )}
                    </ul>
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
              Offerte succesvol verzonden!
            </h3>
            <p className="text-premium-200 mb-4">
              Je offerte is verzonden naar <span className="text-klusdirect-gold font-medium">{job.client.name}</span>.
            </p>
            <div className="bg-premium-700/50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 text-klusdirect-orange mb-2">
                <FileText className="w-5 h-5" />
                <span className="font-medium">Factuur in behandeling</span>
              </div>
              <p className="text-premium-300 text-sm">
                Een concept-factuur is aangemaakt en staat klaar voor wanneer de klant je selecteert.
                Je kunt de status volgen in je dashboard onder "Actieve offertes".
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
