import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  User,
  Building,
  Phone,
  Mail,
  MapPin,
  Euro,
  Camera,
  Plus,
  X,
  Save,
  Star,
  Award,
  Briefcase,
  Clock,
  Bell,
  Shield,
  Eye,
  Settings,
  CreditCard,
  Globe,
  ChevronDown,
  Upload,
  Trash2,
  Edit,
  CheckCircle
} from "lucide-react";

interface ProfileEditModalProps {
  children: React.ReactNode;
}

interface UserProfile {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  profilePhoto: string;
  
  // Business Info
  companyName: string;
  kvkNumber: string;
  vatNumber: string;
  website: string;
  bio: string;
  
  // Location & Service Area
  address: string;
  city: string;
  postalCode: string;
  serviceRadius: number;
  
  // Skills & Specializations
  primarySkills: string[];
  specializations: string[];
  experience: number;
  certifications: string[];
  
  // Rates & Availability
  hourlyRate: number;
  minimumRate: number;
  workingDays: string[];
  workingHours: {
    start: string;
    end: string;
  };
  
  // Portfolio
  portfolioImages: string[];
  recentProjects: Array<{
    title: string;
    description: string;
    date: string;
    value: number;
    images: string[];
  }>;
  
  // Payment & Banking
  iban: string;
  bankName: string;
  taxRate: number;
  
  // Preferences
  notifications: {
    email: boolean;
    sms: boolean;
    pushJobs: boolean;
    reviews: boolean;
    payments: boolean;
  };
  privacy: {
    showPhone: boolean;
    showEmail: boolean;
    showRates: boolean;
    profileVisible: boolean;
  };
}

export default function ProfileEditModal({ children }: ProfileEditModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    // Personal Info
    firstName: 'Piet',
    lastName: 'Bakker',
    email: 'piet@bakker-timmer.nl',
    phone: '06 12345678',
    dateOfBirth: '1985-03-15',
    profilePhoto: '',
    
    // Business Info
    companyName: 'Bakker Timmerwerken B.V.',
    kvkNumber: '12345678',
    vatNumber: 'NL123456789B01',
    website: 'www.bakker-timmer.nl',
    bio: 'Ervaren timmerman gespecialiseerd in maatwerk keukens en badkamers. Al 15 jaar actief in de regio Amsterdam.',
    
    // Location & Service Area
    address: 'Hoofdstraat 123',
    city: 'Amsterdam',
    postalCode: '1012 AB',
    serviceRadius: 25,
    
    // Skills & Specializations
    primarySkills: ['Timmerwerk', 'Keuken installatie', 'Badkamer renovatie'],
    specializations: ['Maatwerk keukens', 'Luxe badkamers', 'Dakkappellen'],
    experience: 15,
    certifications: ['VCA Basis', 'Erkend Installateur'],
    
    // Rates & Availability
    hourlyRate: 85,
    minimumRate: 150,
    workingDays: ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag'],
    workingHours: {
      start: '08:00',
      end: '17:00'
    },
    
    // Portfolio
    portfolioImages: [],
    recentProjects: [
      {
        title: 'Luxe keuken renovatie',
        description: 'Complete keuken vernieuwing met maatwerk kasten',
        date: '2024-01-15',
        value: 15000,
        images: []
      }
    ],
    
    // Payment & Banking
    iban: 'NL91 ABNA 0417 1643 00',
    bankName: 'ABN AMRO',
    taxRate: 21,
    
    // Preferences
    notifications: {
      email: true,
      sms: true,
      pushJobs: true,
      reviews: true,
      payments: true
    },
    privacy: {
      showPhone: true,
      showEmail: false,
      showRates: false,
      profileVisible: true
    }
  });

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile({ ...profile, ...JSON.parse(savedProfile) });
    }
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(profile));
    
    setIsSaving(false);
    setIsOpen(false);
  };

  const updateProfile = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedProfile = (section: string, field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof UserProfile],
        [field]: value
      }
    }));
  };

  const addSkill = (skill: string, type: 'primarySkills' | 'specializations' | 'certifications') => {
    if (skill && !profile[type].includes(skill)) {
      setProfile(prev => ({
        ...prev,
        [type]: [...prev[type], skill]
      }));
    }
  };

  const removeSkill = (skill: string, type: 'primarySkills' | 'specializations' | 'certifications') => {
    setProfile(prev => ({
      ...prev,
      [type]: prev[type].filter(s => s !== skill)
    }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('Bestand is te groot. Maximaal 5MB toegestaan.');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Alleen afbeeldingen zijn toegestaan.');
        return;
      }

      // Create file reader to convert to base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        updateProfile('profilePhoto', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    updateProfile('profilePhoto', '');
  };

  const handlePortfolioUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('Bestand is te groot. Maximaal 5MB toegestaan.');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Alleen afbeeldingen zijn toegestaan.');
        return;
      }

      // Create file reader to convert to base64
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result as string;
        const newPortfolioImages = [...profile.portfolioImages];
        newPortfolioImages[index] = base64String;
        updateProfile('portfolioImages', newPortfolioImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePortfolioPhoto = (index: number) => {
    const newPortfolioImages = [...profile.portfolioImages];
    newPortfolioImages[index] = '';
    updateProfile('portfolioImages', newPortfolioImages);
  };

  const tabs = [
    { id: 'personal', label: 'Persoonlijk', icon: User },
    { id: 'business', label: 'Bedrijf', icon: Building },
    { id: 'skills', label: 'Vaardigheden', icon: Award },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'rates', label: 'Tarieven', icon: Euro },
    { id: 'payment', label: 'Betaling', icon: CreditCard },
    { id: 'preferences', label: 'Voorkeuren', icon: Settings }
  ];

  const availableDays = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'];
  const skillOptions = ['Timmerwerk', 'Schilderwerk', 'Loodgieter', 'Elektricien', 'Tegelwerk', 'Stucwerk', 'Dakwerk', 'Isolatie'];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-4xl glass border-2 border-premium-600/30 bg-premium-800/95 max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl text-premium-50 flex items-center">
            <User className="w-6 h-6 mr-3 text-klusdirect-orange" />
            Profiel bewerken
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-[70vh]">
          {/* Sidebar */}
          <div className="w-48 border-r border-premium-600/30 pr-4">
            <div className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-klusdirect-orange text-black font-medium'
                        : 'text-premium-300 hover:bg-premium-700/50 hover:text-premium-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 pl-6 overflow-y-auto">
            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-premium-50 mb-4">Persoonlijke gegevens</h3>
                  
                  {/* Profile Photo */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative w-20 h-20 bg-gradient-to-br from-klusdirect-orange/20 to-klusdirect-gold/20 rounded-full flex items-center justify-center border border-klusdirect-orange/30">
                      {profile.profilePhoto ? (
                        <>
                          <img src={profile.profilePhoto} alt="Profiel" className="w-full h-full rounded-full object-cover" />
                          <button
                            onClick={removePhoto}
                            className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                          >
                            <X className="w-3 h-3 text-white" />
                          </button>
                        </>
                      ) : (
                        <User className="w-8 h-8 text-klusdirect-orange" />
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        id="photo-upload"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('photo-upload')?.click()}
                        className="border-premium-600 text-premium-200 hover:bg-premium-700"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        {profile.profilePhoto ? 'Foto wijzigen' : 'Foto toevoegen'}
                      </Button>
                      <p className="text-xs text-premium-400 mt-1">JPG, PNG max 5MB</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-premium-200">Voornaam *</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => updateProfile('firstName', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-premium-200">Achternaam *</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => updateProfile('lastName', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-premium-200">Email adres *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profile.email}
                        onChange={(e) => updateProfile('email', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-premium-200">Telefoonnummer *</Label>
                      <Input
                        id="phone"
                        value={profile.phone}
                        onChange={(e) => updateProfile('phone', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth" className="text-premium-200">Geboortedatum</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => updateProfile('dateOfBirth', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h4 className="text-md font-medium text-premium-50 mb-3">Adresgegevens</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="address" className="text-premium-200">Straat en huisnummer *</Label>
                      <Input
                        id="address"
                        value={profile.address}
                        onChange={(e) => updateProfile('address', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode" className="text-premium-200">Postcode *</Label>
                      <Input
                        id="postalCode"
                        value={profile.postalCode}
                        onChange={(e) => updateProfile('postalCode', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-premium-200">Plaats *</Label>
                      <Input
                        id="city"
                        value={profile.city}
                        onChange={(e) => updateProfile('city', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Business Info Tab */}
            {activeTab === 'business' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-premium-50 mb-4">Bedrijfsinformatie</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="companyName" className="text-premium-200">Bedrijfsnaam *</Label>
                      <Input
                        id="companyName"
                        value={profile.companyName}
                        onChange={(e) => updateProfile('companyName', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="kvkNumber" className="text-premium-200">KvK nummer *</Label>
                      <Input
                        id="kvkNumber"
                        value={profile.kvkNumber}
                        onChange={(e) => updateProfile('kvkNumber', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="vatNumber" className="text-premium-200">BTW nummer</Label>
                      <Input
                        id="vatNumber"
                        value={profile.vatNumber}
                        onChange={(e) => updateProfile('vatNumber', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="website" className="text-premium-200">Website</Label>
                      <Input
                        id="website"
                        value={profile.website}
                        onChange={(e) => updateProfile('website', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                        placeholder="www.jouwebsite.nl"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio" className="text-premium-200">Bedrijfsomschrijving</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => updateProfile('bio', e.target.value)}
                    className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1 min-h-[100px]"
                    placeholder="Vertel over je bedrijf, ervaring en specialisaties..."
                  />
                </div>

                <div>
                  <h4 className="text-md font-medium text-premium-50 mb-3">Werkgebied</h4>
                  <div>
                    <Label htmlFor="serviceRadius" className="text-premium-200">Werkradius (km) *</Label>
                    <div className="flex items-center space-x-3 mt-1">
                      <Input
                        id="serviceRadius"
                        type="number"
                        value={profile.serviceRadius}
                        onChange={(e) => updateProfile('serviceRadius', parseInt(e.target.value) || 0)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 w-24"
                      />
                      <span className="text-premium-300 text-sm">km rondom {profile.city}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="experience" className="text-premium-200">Jaren ervaring *</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={profile.experience}
                    onChange={(e) => updateProfile('experience', parseInt(e.target.value) || 0)}
                    className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1 w-24"
                  />
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-premium-50 mb-4">Vaardigheden & Specialisaties</h3>
                  
                  {/* Primary Skills */}
                  <div className="mb-6">
                    <Label className="text-premium-200 mb-2 block">Primaire vaardigheden *</Label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {profile.primarySkills.map((skill, index) => (
                        <Badge 
                          key={index}
                          className="bg-klusdirect-orange/20 text-klusdirect-orange border border-klusdirect-orange/30 flex items-center"
                        >
                          {skill}
                          <button
                            onClick={() => removeSkill(skill, 'primarySkills')}
                            className="ml-2 hover:text-red-400"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          addSkill(e.target.value, 'primarySkills');
                          e.target.value = '';
                        }
                      }}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 rounded-md px-3 py-2"
                    >
                      <option value="">Selecteer vaardigheid...</option>
                      {skillOptions.map(skill => (
                        <option key={skill} value={skill}>{skill}</option>
                      ))}
                    </select>
                  </div>

                  {/* Specializations */}
                  <div className="mb-6">
                    <Label className="text-premium-200 mb-2 block">Specialisaties</Label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {profile.specializations.map((spec, index) => (
                        <Badge 
                          key={index}
                          className="bg-klusdirect-blue/20 text-klusdirect-blue border border-klusdirect-blue/30 flex items-center"
                        >
                          {spec}
                          <button
                            onClick={() => removeSkill(spec, 'specializations')}
                            className="ml-2 hover:text-red-400"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <Input
                      placeholder="Voeg specialisatie toe..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.target as HTMLInputElement;
                          addSkill(input.value, 'specializations');
                          input.value = '';
                        }
                      }}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50"
                    />
                  </div>

                  {/* Certifications */}
                  <div>
                    <Label className="text-premium-200 mb-2 block">Certificaten & Diploma's</Label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {profile.certifications.map((cert, index) => (
                        <Badge 
                          key={index}
                          className="bg-green-500/20 text-green-400 border border-green-500/30 flex items-center"
                        >
                          <Award className="w-3 h-3 mr-1" />
                          {cert}
                          <button
                            onClick={() => removeSkill(cert, 'certifications')}
                            className="ml-2 hover:text-red-400"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <Input
                      placeholder="Voeg certificaat toe..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.target as HTMLInputElement;
                          addSkill(input.value, 'certifications');
                          input.value = '';
                        }
                      }}
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-premium-50 mb-4">Portfolio & Werkvoorbeelden</h3>
                  
                  {/* Portfolio Images */}
                  <div className="mb-6">
                    <Label className="text-premium-200 mb-2 block">Portfolio foto's</Label>
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      {[...Array(6)].map((_, index) => (
                        <div key={index} className="relative aspect-square bg-premium-700/30 border border-premium-600/30 rounded-lg flex items-center justify-center hover:bg-premium-600/30 transition-all">
                          {profile.portfolioImages?.[index] ? (
                            <>
                              <img
                                src={profile.portfolioImages[index]}
                                alt={`Portfolio ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <button
                                onClick={() => removePortfolioPhoto(index)}
                                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                              >
                                <X className="w-3 h-3 text-white" />
                              </button>
                              <button
                                onClick={() => document.getElementById(`portfolio-upload-${index}`)?.click()}
                                className="absolute inset-0 bg-black/0 hover:bg-black/50 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-all cursor-pointer"
                              >
                                <Camera className="w-6 h-6 text-white" />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => document.getElementById(`portfolio-upload-${index}`)?.click()}
                              className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                            >
                              <Upload className="w-6 h-6 text-premium-400 mb-1" />
                              <span className="text-xs text-premium-400">Upload foto</span>
                            </button>
                          )}
                          <input
                            type="file"
                            id={`portfolio-upload-${index}`}
                            accept="image/*"
                            onChange={(e) => handlePortfolioUpload(e, index)}
                            className="hidden"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-premium-400">
                      Upload tot 6 foto's van je beste werk. JPG, PNG max 5MB per foto.
                    </p>
                  </div>

                  {/* Recent Projects */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-premium-200">Recent uitgevoerde projecten</Label>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-premium-600 text-premium-200 hover:bg-premium-700"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Project toevoegen
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {profile.recentProjects.map((project, index) => (
                        <Card key={index} className="glass border border-premium-600/30">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-premium-50 mb-1">{project.title}</h4>
                                <p className="text-premium-300 text-sm mb-2">{project.description}</p>
                                <div className="flex items-center space-x-4 text-xs text-premium-400">
                                  <span>{new Date(project.date).toLocaleDateString('nl-NL')}</span>
                                  <span>€{project.value.toLocaleString()}</span>
                                </div>
                              </div>
                              <div className="flex gap-1">
                                <Button variant="outline" size="sm" className="border-premium-600 text-premium-300 hover:bg-premium-700 p-1 h-7 w-7">
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button variant="outline" size="sm" className="border-red-500/30 text-red-400 hover:bg-red-500/10 p-1 h-7 w-7">
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Rates Tab */}
            {activeTab === 'rates' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-premium-50 mb-4">Tarieven & Beschikbaarheid</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label htmlFor="hourlyRate" className="text-premium-200">Uurtarief (€) *</Label>
                      <Input
                        id="hourlyRate"
                        type="number"
                        value={profile.hourlyRate}
                        onChange={(e) => updateProfile('hourlyRate', parseInt(e.target.value) || 0)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="minimumRate" className="text-premium-200">Minimum tarief (€) *</Label>
                      <Input
                        id="minimumRate"
                        type="number"
                        value={profile.minimumRate}
                        onChange={(e) => updateProfile('minimumRate', parseInt(e.target.value) || 0)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      />
                    </div>
                  </div>

                  {/* Working Days */}
                  <div className="mb-6">
                    <Label className="text-premium-200 mb-2 block">Werkdagen *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {availableDays.map(day => (
                        <label key={day} className="flex items-center space-x-2 cursor-pointer">
                          <Checkbox
                            checked={profile.workingDays.includes(day)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                updateProfile('workingDays', [...profile.workingDays, day]);
                              } else {
                                updateProfile('workingDays', profile.workingDays.filter(d => d !== day));
                              }
                            }}
                            className="border-premium-600 data-[state=checked]:bg-klusdirect-orange data-[state=checked]:border-klusdirect-orange"
                          />
                          <span className="text-premium-200 text-sm capitalize">{day}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div>
                    <Label className="text-premium-200 mb-2 block">Werktijden</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startTime" className="text-premium-300 text-sm">Start tijd</Label>
                        <Input
                          id="startTime"
                          type="time"
                          value={profile.workingHours.start}
                          onChange={(e) => updateNestedProfile('workingHours', 'start', e.target.value)}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="endTime" className="text-premium-300 text-sm">Eind tijd</Label>
                        <Input
                          id="endTime"
                          type="time"
                          value={profile.workingHours.end}
                          onChange={(e) => updateNestedProfile('workingHours', 'end', e.target.value)}
                          className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Tab */}
            {activeTab === 'payment' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-premium-50 mb-4">Betaalgegevens</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="iban" className="text-premium-200">IBAN rekening *</Label>
                      <Input
                        id="iban"
                        value={profile.iban}
                        onChange={(e) => updateProfile('iban', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                        placeholder="NL91 ABNA 0417 1643 00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bankName" className="text-premium-200">Bank naam</Label>
                      <Input
                        id="bankName"
                        value={profile.bankName}
                        onChange={(e) => updateProfile('bankName', e.target.value)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="taxRate" className="text-premium-200">BTW tarief (%)</Label>
                      <Input
                        id="taxRate"
                        type="number"
                        value={profile.taxRate}
                        onChange={(e) => updateProfile('taxRate', parseInt(e.target.value) || 0)}
                        className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                      />
                    </div>
                  </div>

                  <div className="bg-klusdirect-blue/10 border border-klusdirect-blue/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-klusdirect-blue mt-0.5" />
                      <div>
                        <h4 className="text-klusdirect-blue font-medium text-sm mb-1">
                          Veilige betaalgegevens
                        </h4>
                        <p className="text-premium-300 text-sm">
                          Je betaalgegevens worden veilig opgeslagen en gebruikt voor automatische uitbetalingen.
                          KlusDirect werkt samen met Mollie voor veilige betalingsverwerking.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-premium-50 mb-4">Voorkeuren & Privacy</h3>
                  
                  {/* Notifications */}
                  <div className="mb-6">
                    <h4 className="text-md font-medium text-premium-50 mb-3">Notificaties</h4>
                    <div className="space-y-3">
                      {Object.entries(profile.notifications).map(([key, value]) => (
                        <label key={key} className="flex items-center justify-between cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <Bell className="w-4 h-4 text-klusdirect-orange" />
                            <span className="text-premium-200">
                              {key === 'email' ? 'Email notificaties' :
                               key === 'sms' ? 'SMS notificaties' :
                               key === 'pushJobs' ? 'Push notificaties voor nieuwe klussen' :
                               key === 'reviews' ? 'Beoordelingen notificaties' :
                               key === 'payments' ? 'Betaling notificaties' : key}
                            </span>
                          </div>
                          <Checkbox
                            checked={value}
                            onCheckedChange={(checked) => updateNestedProfile('notifications', key, checked)}
                            className="border-premium-600 data-[state=checked]:bg-klusdirect-orange data-[state=checked]:border-klusdirect-orange"
                          />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Privacy */}
                  <div>
                    <h4 className="text-md font-medium text-premium-50 mb-3">Privacy instellingen</h4>
                    <div className="space-y-3">
                      {Object.entries(profile.privacy).map(([key, value]) => (
                        <label key={key} className="flex items-center justify-between cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <Eye className="w-4 h-4 text-klusdirect-blue" />
                            <span className="text-premium-200">
                              {key === 'showPhone' ? 'Telefoonnummer tonen op profiel' :
                               key === 'showEmail' ? 'Email adres tonen op profiel' :
                               key === 'showRates' ? 'Tarieven tonen op profiel' :
                               key === 'profileVisible' ? 'Profiel zichtbaar in zoekresultaten' : key}
                            </span>
                          </div>
                          <Checkbox
                            checked={value}
                            onCheckedChange={(checked) => updateNestedProfile('privacy', key, checked)}
                            className="border-premium-600 data-[state=checked]:bg-klusdirect-blue data-[state=checked]:border-klusdirect-blue"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-premium-600/30">
          <div className="text-sm text-premium-400">
            * Verplichte velden
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="border-premium-600 text-premium-200 hover:bg-premium-700"
            >
              Annuleren
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Opslaan...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Profiel opslaan
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
