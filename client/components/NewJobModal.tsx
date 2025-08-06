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
  Plus,
  MapPin,
  Euro,
  Calendar,
  Clock,
  Building,
  Home,
  Wrench,
  Zap,
  Camera,
  Upload,
  X,
  Save,
  Star,
  Shield,
  CheckCircle,
  AlertCircle,
  User,
  Phone,
  Mail
} from "lucide-react";

interface NewJobModalProps {
  children: React.ReactNode;
}

export default function NewJobModal({ children }: NewJobModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [jobData, setJobData] = useState({
    // Basic Job Info
    title: '',
    category: '',
    description: '',
    urgency: 'normal', // 'normal', 'urgent', 'premium'
    
    // Location Info
    useBusinessAddress: true,
    jobAddress: '',
    jobCity: '',
    jobPostalCode: '',
    jobLocationNotes: '',
    
    // Budget & Timeline
    budgetMin: '',
    budgetMax: '',
    budgetType: 'fixed', // 'fixed', 'hourly'
    startDate: '',
    deadline: '',
    estimatedDuration: '',
    
    // Images & Details
    images: [] as string[],
    materialsIncluded: false,
    materialsDetails: '',
    additionalRequirements: '',
    
    // Contact & Preferences
    preferredContact: 'phone', // 'phone', 'email', 'app'
    allowViewings: true,
    maxQuotes: '5',
    
    // Terms
    acceptTerms: false,
    acceptMarketing: false
  });

  const [customerInfo] = useState({
    name: 'Marie Jansen',
    email: 'marie@example.com',
    phone: '06 12345678',
    businessAddress: 'Hoofdstraat 123, 1012 AB Amsterdam'
  });

  const categories = [
    { id: 'bathroom', name: 'Badkamer renovatie', icon: Home },
    { id: 'kitchen', name: 'Keuken installatie', icon: Building },
    { id: 'plumbing', name: 'Loodgieter werk', icon: Wrench },
    { id: 'electrical', name: 'Elektra werk', icon: Zap },
    { id: 'tiling', name: 'Tegelwerk', icon: Home },
    { id: 'painting', name: 'Schilderwerk', icon: Home },
    { id: 'flooring', name: 'Vloeren', icon: Home },
    { id: 'roofing', name: 'Dakwerk', icon: Home },
    { id: 'other', name: 'Overig', icon: Wrench }
  ];

  const handleInputChange = (field: string, value: any) => {
    setJobData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.size > 5 * 1024 * 1024) {
          alert('Bestand te groot. Maximum 5MB per foto.');
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const base64String = e.target?.result as string;
          setJobData(prev => ({
            ...prev,
            images: [...prev.images, base64String]
          }));
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setJobData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Generate job posting
    const newJob = {
      id: `job-${Date.now()}`,
      ...jobData,
      postedBy: customerInfo.name,
      postedDate: new Date().toISOString(),
      status: 'active',
      quotesReceived: 0,
      views: 0,
      location: jobData.useBusinessAddress ? customerInfo.businessAddress : `${jobData.jobAddress}, ${jobData.jobPostalCode} ${jobData.jobCity}`
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Store job posting
    const existingJobs = JSON.parse(localStorage.getItem('customerJobs') || '[]');
    existingJobs.push(newJob);
    localStorage.setItem('customerJobs', JSON.stringify(existingJobs));

    // Add to the general job pool that craftsmen see
    const publicJobs = JSON.parse(localStorage.getItem('publicJobs') || '[]');
    const publicJob = {
      id: newJob.id,
      title: newJob.title,
      client: { name: customerInfo.name },
      location: newJob.location.split(',')[0], // Just city part
      budget: {
        min: parseInt(newJob.budgetMin) || 0,
        max: parseInt(newJob.budgetMax) || 0,
        currency: 'EUR'
      },
      distance: "0.5 km", // Would be calculated
      posted: "Net geplaatst",
      urgency: newJob.urgency === 'premium' ? 'Premium' : newJob.urgency === 'urgent' ? 'Urgent' : 'Normal',
      customerDetails: "Contactgegevens beschikbaar",
      timing: {
        startDate: newJob.startDate,
        duration: newJob.estimatedDuration
      },
      category: newJob.category
    };
    publicJobs.push(publicJob);
    localStorage.setItem('publicJobs', JSON.stringify(publicJobs));

    setIsSubmitting(false);
    setIsSuccess(true);

    // Trigger event to notify dashboard about new job
    window.dispatchEvent(new CustomEvent('jobAdded'));

    // Close modal after success
    setTimeout(() => {
      setIsOpen(false);
      setIsSuccess(false);
      setStep(1);
      // Reset form
      setJobData({
        title: '',
        category: '',
        description: '',
        urgency: 'normal',
        useBusinessAddress: true,
        jobAddress: '',
        jobCity: '',
        jobPostalCode: '',
        jobLocationNotes: '',
        budgetMin: '',
        budgetMax: '',
        budgetType: 'fixed',
        startDate: '',
        deadline: '',
        estimatedDuration: '',
        images: [],
        materialsIncluded: false,
        materialsDetails: '',
        additionalRequirements: '',
        preferredContact: 'phone',
        allowViewings: true,
        maxQuotes: '5',
        acceptTerms: false,
        acceptMarketing: false
      });
    }, 3000);
  };

  const isStep1Valid = jobData.title && jobData.category && jobData.description;
  const isStep2Valid = jobData.budgetMin && jobData.budgetMax && jobData.startDate;
  const isStep3Valid = jobData.acceptTerms;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-4xl glass border-2 border-premium-600/30 bg-premium-800/95 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-premium-50 flex items-center">
            <Plus className="w-6 h-6 mr-3 text-klusdirect-orange" />
            Nieuwe Klus Plaatsen
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
                <div className={`w-12 h-1 ${step > 2 ? 'bg-klusdirect-orange' : 'bg-premium-700'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  step >= 3 ? 'bg-klusdirect-orange border-klusdirect-orange text-black' : 'border-premium-600 text-premium-400'
                }`}>
                  {step > 3 ? <CheckCircle className="w-4 h-4" /> : '3'}
                </div>
              </div>
            </div>

            {/* Step 1: Job Details */}
            {step === 1 && !isSubmitting && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-klusdirect-blue/20 to-klusdirect-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-klusdirect-blue/30">
                    <Building className="w-8 h-8 text-klusdirect-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-premium-50 mb-2">
                    Wat voor klus wilt u laten uitvoeren?
                  </h3>
                  <p className="text-premium-300">
                    Geef een duidelijke beschrijving zodat vakmensen de juiste offerte kunnen maken
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-premium-200">Titel van de klus *</Label>
                    <Input
                      id="title"
                      value={jobData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      placeholder="Bijv. Badkamer volledig renoveren"
                    />
                  </div>

                  <div>
                    <Label className="text-premium-200 mb-3 block">Categorie *</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                          <button
                            key={category.id}
                            type="button"
                            onClick={() => handleInputChange('category', category.id)}
                            className={`p-3 rounded-lg border text-center transition-all ${
                              jobData.category === category.id
                                ? 'border-klusdirect-orange bg-klusdirect-orange/10'
                                : 'border-premium-600/30 hover:border-premium-500/50'
                            }`}
                          >
                            <Icon className="w-6 h-6 mx-auto mb-1 text-premium-300" />
                            <span className="text-xs text-premium-200">{category.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-premium-200">Beschrijving van de werkzaamheden *</Label>
                    <Textarea
                      id="description"
                      value={jobData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1 min-h-[120px]"
                      placeholder="Beschrijf zo gedetailleerd mogelijk wat er moet gebeuren, welke materialen nodig zijn, en wat uw wensen zijn..."
                    />
                  </div>

                  <div>
                    <Label className="text-premium-200 mb-3 block">Urgentie</Label>
                    <RadioGroup 
                      value={jobData.urgency} 
                      onValueChange={(value) => handleInputChange('urgency', value)}
                    >
                      <div className="space-y-2">
                        <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-premium-600/30 hover:border-premium-500/50">
                          <RadioGroupItem value="normal" id="normal" className="border-premium-600 text-klusdirect-orange" />
                          <div>
                            <span className="text-premium-50 font-medium">Normaal</span>
                            <p className="text-premium-400 text-sm">Binnen 2-4 weken starten</p>
                          </div>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-premium-600/30 hover:border-premium-500/50">
                          <RadioGroupItem value="urgent" id="urgent" className="border-premium-600 text-klusdirect-orange" />
                          <div>
                            <span className="text-premium-50 font-medium">Urgent</span>
                            <p className="text-premium-400 text-sm">Binnen 1 week starten - meer aandacht</p>
                          </div>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-premium-600/30 hover:border-premium-500/50">
                          <RadioGroupItem value="premium" id="premium" className="border-premium-600 text-klusdirect-orange" />
                          <div className="flex items-center">
                            <div>
                              <span className="text-premium-50 font-medium">Premium</span>
                              <p className="text-premium-400 text-sm">Hoogste prioriteit - alleen top vakmensen</p>
                            </div>
                            <Badge className="ml-2 bg-klusdirect-gold/20 text-klusdirect-gold border border-klusdirect-gold/30">
                              <Star className="w-3 h-3 mr-1" />
                              Exclusief
                            </Badge>
                          </div>
                        </label>
                      </div>
                    </RadioGroup>
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
                    Volgende: Locatie & Budget
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Location & Budget */}
            {step === 2 && !isSubmitting && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-klusdirect-gold/20 to-klusdirect-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-klusdirect-gold/30">
                    <MapPin className="w-8 h-8 text-klusdirect-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-premium-50 mb-2">
                    Waar en tegen welk budget?
                  </h3>
                  <p className="text-premium-300">
                    Geef de locatie en uw budgetindicatie voor de beste matches
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Location */}
                  <div>
                    <Label className="text-premium-200 mb-3 block">Waar moet de klus uitgevoerd worden?</Label>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <Checkbox
                          checked={jobData.useBusinessAddress}
                          onCheckedChange={(checked) => handleInputChange('useBusinessAddress', checked)}
                          className="border-premium-600 data-[state=checked]:bg-klusdirect-orange data-[state=checked]:border-klusdirect-orange"
                        />
                        <span className="text-premium-200">Op mijn bedrijfsadres ({customerInfo.businessAddress})</span>
                      </label>
                      
                      {!jobData.useBusinessAddress && (
                        <div className="ml-6 space-y-3 p-4 bg-premium-700/30 rounded-lg">
                          <div>
                            <Label htmlFor="jobAddress" className="text-premium-200">Adres van de klus *</Label>
                            <Input
                              id="jobAddress"
                              value={jobData.jobAddress}
                              onChange={(e) => handleInputChange('jobAddress', e.target.value)}
                              className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                              placeholder="Straat en huisnummer"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor="jobPostalCode" className="text-premium-200">Postcode *</Label>
                              <Input
                                id="jobPostalCode"
                                value={jobData.jobPostalCode}
                                onChange={(e) => handleInputChange('jobPostalCode', e.target.value)}
                                className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                                placeholder="1234 AB"
                              />
                            </div>
                            <div>
                              <Label htmlFor="jobCity" className="text-premium-200">Plaats *</Label>
                              <Input
                                id="jobCity"
                                value={jobData.jobCity}
                                onChange={(e) => handleInputChange('jobCity', e.target.value)}
                                className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                                placeholder="Amsterdam"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="jobLocationNotes" className="text-premium-200">Aanvullende locatie informatie</Label>
                            <Input
                              id="jobLocationNotes"
                              value={jobData.jobLocationNotes}
                              onChange={(e) => handleInputChange('jobLocationNotes', e.target.value)}
                              className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                              placeholder="Bijv. 2e verdieping, achterkant gebouw, etc."
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <Label className="text-premium-200 mb-3 block">Budget indicatie *</Label>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <Label htmlFor="budgetMin" className="text-premium-300 text-sm">Minimum budget (€)</Label>
                        <Input
                          id="budgetMin"
                          type="number"
                          value={jobData.budgetMin}
                          onChange={(e) => handleInputChange('budgetMin', e.target.value)}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                          placeholder="1500"
                        />
                      </div>
                      <div>
                        <Label htmlFor="budgetMax" className="text-premium-300 text-sm">Maximum budget (€)</Label>
                        <Input
                          id="budgetMax"
                          type="number"
                          value={jobData.budgetMax}
                          onChange={(e) => handleInputChange('budgetMax', e.target.value)}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                          placeholder="3000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="startDate" className="text-premium-200">Gewenste startdatum *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={jobData.startDate}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="estimatedDuration" className="text-premium-200">Geschatte duur</Label>
                      <Input
                        id="estimatedDuration"
                        value={jobData.estimatedDuration}
                        onChange={(e) => handleInputChange('estimatedDuration', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                        placeholder="Bijv. 2 dagen, 1 week"
                      />
                    </div>
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
                    className="flex-1 bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold disabled:opacity-50"
                  >
                    Volgende: Afwerking
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Images & Final Details */}
            {step === 3 && !isSubmitting && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                    <Camera className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-premium-50 mb-2">
                    Foto's en laatste details
                  </h3>
                  <p className="text-premium-300">
                    Voeg foto's toe voor betere offertes en stel uw voorkeuren in
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Images */}
                  <div>
                    <Label className="text-premium-200 mb-2 block">Foto's van de situatie (optioneel)</Label>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      {jobData.images.map((image, index) => (
                        <div key={index} className="relative aspect-square">
                          <img src={image} alt={`Upload ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center"
                          >
                            <X className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      ))}
                      {jobData.images.length < 6 && (
                        <button
                          onClick={() => document.getElementById('image-upload')?.click()}
                          className="aspect-square bg-premium-700/30 border-2 border-dashed border-premium-600/30 rounded-lg flex flex-col items-center justify-center hover:border-premium-500/50 transition-all"
                        >
                          <Upload className="w-6 h-6 text-premium-400 mb-1" />
                          <span className="text-xs text-premium-400">Upload foto</span>
                        </button>
                      )}
                    </div>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <p className="text-xs text-premium-400">Maximaal 6 foto's, 5MB per foto</p>
                  </div>

                  {/* Additional Requirements */}
                  <div>
                    <Label htmlFor="additionalRequirements" className="text-premium-200">Aanvullende eisen of wensen</Label>
                    <Textarea
                      id="additionalRequirements"
                      value={jobData.additionalRequirements}
                      onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1 min-h-[80px]"
                      placeholder="Bijv. gebruik van specifieke materialen, werktijden, toegang tot de locatie..."
                    />
                  </div>

                  {/* Contact Preferences */}
                  <div>
                    <Label className="text-premium-200 mb-3 block">Hoe wilt u benaderd worden?</Label>
                    <div className="grid grid-cols-3 gap-3">
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name="contact"
                          value="phone"
                          checked={jobData.preferredContact === 'phone'}
                          onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                          className="sr-only"
                        />
                        <div className={`p-3 rounded-lg border text-center transition-all ${
                          jobData.preferredContact === 'phone'
                            ? 'border-klusdirect-orange bg-klusdirect-orange/10'
                            : 'border-premium-600/30 hover:border-premium-500/50'
                        }`}>
                          <Phone className="w-6 h-6 mx-auto mb-1 text-premium-300" />
                          <span className="text-xs text-premium-200">Telefoon</span>
                        </div>
                      </label>
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name="contact"
                          value="email"
                          checked={jobData.preferredContact === 'email'}
                          onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                          className="sr-only"
                        />
                        <div className={`p-3 rounded-lg border text-center transition-all ${
                          jobData.preferredContact === 'email'
                            ? 'border-klusdirect-orange bg-klusdirect-orange/10'
                            : 'border-premium-600/30 hover:border-premium-500/50'
                        }`}>
                          <Mail className="w-6 h-6 mx-auto mb-1 text-premium-300" />
                          <span className="text-xs text-premium-200">Email</span>
                        </div>
                      </label>
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name="contact"
                          value="app"
                          checked={jobData.preferredContact === 'app'}
                          onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                          className="sr-only"
                        />
                        <div className={`p-3 rounded-lg border text-center transition-all ${
                          jobData.preferredContact === 'app'
                            ? 'border-klusdirect-orange bg-klusdirect-orange/10'
                            : 'border-premium-600/30 hover:border-premium-500/50'
                        }`}>
                          <Shield className="w-6 h-6 mx-auto mb-1 text-premium-300" />
                          <span className="text-xs text-premium-200">Via app</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="space-y-4 pt-4 border-t border-premium-600/30">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="acceptTerms"
                        checked={jobData.acceptTerms}
                        onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
                        className="border-premium-600 data-[state=checked]:bg-klusdirect-orange data-[state=checked]:border-klusdirect-orange"
                      />
                      <Label htmlFor="acceptTerms" className="text-premium-200 text-sm cursor-pointer">
                        Ik ga akkoord met de <span className="text-klusdirect-gold hover:underline">algemene voorwaarden</span> en 
                        geef toestemming voor het delen van mijn contactgegevens met geïnteresseerde vakmensen. 
                        <span className="text-red-400 font-semibold"> *</span>
                      </Label>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="acceptMarketing"
                        checked={jobData.acceptMarketing}
                        onCheckedChange={(checked) => handleInputChange('acceptMarketing', checked as boolean)}
                        className="border-premium-600 data-[state=checked]:bg-klusdirect-orange data-[state=checked]:border-klusdirect-orange"
                      />
                      <Label htmlFor="acceptMarketing" className="text-premium-200 text-sm cursor-pointer">
                        Ik wil updates ontvangen over de status van mijn klus en interessante aanbiedingen
                      </Label>
                    </div>
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
                    className="flex-1 bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        Klus plaatsen...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Klus plaatsen
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
              Klus succesvol geplaatst!
            </h3>
            <p className="text-premium-200 mb-6 text-lg">
              Uw klus is nu zichtbaar voor vakmensen. U ontvangt binnen 24 uur de eerste offertes.
            </p>
            
            <div className="bg-premium-700/50 rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
              <h4 className="text-premium-50 font-medium mb-4 text-center">Wat gebeurt er nu?</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-klusdirect-orange rounded-full flex items-center justify-center mr-3">
                    <span className="text-black font-bold text-xs">1</span>
                  </div>
                  <span className="text-premium-200">Vakmensen kunnen uw klus zien</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-klusdirect-orange rounded-full flex items-center justify-center mr-3">
                    <span className="text-black font-bold text-xs">2</span>
                  </div>
                  <span className="text-premium-200">U ontvangt offertes via de app</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-klusdirect-orange rounded-full flex items-center justify-center mr-3">
                    <span className="text-black font-bold text-xs">3</span>
                  </div>
                  <span className="text-premium-200">Vergelijk en kies de beste vakman</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-klusdirect-orange rounded-full flex items-center justify-center mr-3">
                    <span className="text-black font-bold text-xs">4</span>
                  </div>
                  <span className="text-premium-200">Betaal veilig via de app</span>
                </div>
              </div>
            </div>

            <p className="text-premium-400 text-sm">
              Deze popup sluit automatisch...
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
