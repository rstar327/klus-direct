import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import JobApplicationModal from "@/components/JobApplicationModal";
import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Euro,
  Clock,
  Calendar,
  User,
  Phone,
  Mail,
  Crown,
  Target,
  AlertTriangle,
  CheckCircle,
  Star,
  Camera,
  FileText,
  Hammer,
  Eye,
  MessageCircle
} from "lucide-react";

export default function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [hasApplied, setHasApplied] = useState(false);

  // Mock job data - in real app this would come from API
  const jobData = {
    1: {
      id: 1,
      title: "Luxe badkamer renovatie",
      description: "Complete renovatie van een luxe badkamer inclusief tegels, sanitair en elektrische installaties. De huidige badkamer is verouderd en moet volledig vervangen worden. We zoeken een ervaren vakman die kan adviseren over materiaalkeuze en de volledige uitvoering kan verzorgen.",
      client: {
        name: "Jan de Vries",
        phone: "06 12345678",
        email: "jan@example.com",
        verified: true
      },
      location: {
        address: "Damrak 123, Amsterdam Noord",
        distance: "2.1 km"
      },
      budget: {
        min: 2500,
        max: 4000,
        currency: "€"
      },
      timing: {
        posted: "15 min geleden",
        deadline: "20 december 2024",
        duration: "2-3 weken",
        startDate: "Begin januari 2025"
      },
      urgency: "Premium",
      category: "Sanitair & Badkamer",
      requirements: [
        "Minimaal 5 jaar ervaring met badkamer renovaties",
        "Eigen gereedschap en transport",
        "Beschikbaar voor volledige renovatie",
        "Portfolio met vergelijkbare projecten"
      ],
      photos: [
        "/placeholder.svg",
        "/placeholder.svg",
        "/placeholder.svg"
      ],
      responses: 3,
      views: 12,
      customerDetails: "Volledige contactgegevens beschikbaar",
      category: "Sanitair & Badkamer"
    },
    2: {
      id: 2,
      title: "Design keuken installatie",
      description: "Installatie van een high-end design keuken van SieMatic. Alle apparatuur is al besteld en geleverd. We zoeken een ervaren keukenmonteur die precies kan werken en oog heeft voor detail. De keuken heeft een aantal complexe hoekoplossingen.",
      client: {
        name: "Marie Jansen",
        phone: "06 87654321", 
        email: "marie@example.com",
        verified: true
      },
      location: {
        address: "Prinsengracht 456, Amsterdam Centrum",
        distance: "5.3 km"
      },
      budget: {
        min: 5000,
        max: 8000,
        currency: "€"
      },
      timing: {
        posted: "1 uur geleden",
        deadline: "15 januari 2025",
        duration: "1-2 weken",
        startDate: "Flexibel in januari"
      },
      urgency: "Exclusief",
      category: "Keuken Installatie",
      requirements: [
        "Ervaring met design/luxe keukens",
        "Referenties van soortgelijke projecten",
        "Eigen professioneel gereedschap",
        "Verzekering en garantie"
      ],
      photos: [
        "/placeholder.svg",
        "/placeholder.svg"
      ],
      responses: 5,
      views: 18,
      customerDetails: "Premium klant - directe toegang"
    }
  };

  const job = jobData[jobId as keyof typeof jobData] || jobData[1];

  const handleApplicationSubmit = (applicationData: any) => {
    setHasApplied(true);
    // Store the application state in localStorage to persist across navigation
    localStorage.setItem(`applied_job_${job.id}`, 'true');
    // Increment the active offers counter
    const currentOffers = parseInt(localStorage.getItem('activeOffers') || '8');
    localStorage.setItem('activeOffers', (currentOffers + 1).toString());

    console.log('Application submitted:', applicationData);

    // Navigate back to dashboard after a brief delay
    setTimeout(() => {
      navigate('/craftsman/dashboard');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-premium-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-premium-900 via-premium-800 to-premium-900"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-klusdirect-orange/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-klusdirect-blue/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 glass border-b border-premium-700/50 sticky top-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/craftsman/dashboard" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-klusdirect-orange to-klusdirect-gold rounded-xl flex items-center justify-center glow-orange">
                <Hammer className="w-7 h-7 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-premium-gradient">
                  KlusDirect Pro
                </h1>
                <div className="flex items-center space-x-1">
                  <Crown className="w-3 h-3 text-klusdirect-gold" />
                  <span className="text-xs text-klusdirect-gold font-medium">ELITE</span>
                </div>
              </div>
            </Link>
            <Link to="/craftsman/dashboard">
              <Button variant="outline" className="border-premium-600 text-premium-200 hover:bg-premium-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Terug naar dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Job Header */}
          <Card className="glass border border-premium-600/30 mb-8">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-3xl font-bold text-premium-50">
                      {job.title}
                    </h1>
                    <Badge 
                      className={job.urgency === "Premium" 
                        ? "bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black" 
                        : "bg-gradient-to-r from-klusdirect-blue to-klusdirect-blue-dark text-white"
                      }
                    >
                      <Crown className="w-3 h-3 mr-1" />
                      {job.urgency}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-premium-300 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-klusdirect-orange" />
                      {job.location.address}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-klusdirect-blue" />
                      {job.timing.posted}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-2 text-premium-400" />
                      {job.views} bekeken
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2 text-yellow-400" />
                      {job.responses} aanmeldingen
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold text-premium-gradient mb-2">
                    {job.budget.currency}{job.budget.min.toLocaleString()} - {job.budget.currency}{job.budget.max.toLocaleString()}
                  </div>
                  <div className="text-premium-300 text-sm">
                    Indicatief budget
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Job Description */}
              <Card className="glass border border-premium-600/30">
                <CardHeader>
                  <CardTitle className="text-xl text-premium-50 flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-klusdirect-orange" />
                    Beschrijving
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-premium-200 leading-relaxed mb-6">
                    {job.description}
                  </p>
                  
                  <div className="bg-premium-800/50 rounded-lg p-4 border border-premium-600/30">
                    <h4 className="text-premium-50 font-medium mb-3">Categorie:</h4>
                    <Badge variant="outline" className="border-klusdirect-orange/30 text-klusdirect-orange">
                      {job.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card className="glass border border-premium-600/30">
                <CardHeader>
                  <CardTitle className="text-xl text-premium-50 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    Vereisten
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-klusdirect-orange mt-0.5 flex-shrink-0" />
                        <span className="text-premium-200">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Photos */}
              <Card className="glass border border-premium-600/30">
                <CardHeader>
                  <CardTitle className="text-xl text-premium-50 flex items-center">
                    <Camera className="w-5 h-5 mr-2 text-klusdirect-blue" />
                    Foto's ({job.photos.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {job.photos.map((photo, index) => (
                      <div key={index} className="aspect-square bg-premium-700 rounded-lg border border-premium-600/30 flex items-center justify-center">
                        <Camera className="w-8 h-8 text-premium-400" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Apply Card */}
              <Card className="glass border-2 border-klusdirect-orange/30 bg-gradient-to-br from-klusdirect-orange/5 to-transparent">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-premium-50 mb-2">
                      Interesse in deze klus?
                    </h3>
                    <p className="text-premium-300 text-sm">
                      Meld je aan en neem contact op met de klant
                    </p>
                  </div>
                  
                  {hasApplied ? (
                    <div className="text-center">
                      <div className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg py-6 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Aangemeld
                      </div>
                      <p className="text-premium-300 text-sm mt-3">
                        Je bent succesvol aangemeld voor deze klus
                      </p>
                    </div>
                  ) : (
                    <JobApplicationModal
                      job={job}
                      onApplicationSubmit={handleApplicationSubmit}
                    />
                  )}
                  
                  <div className="mt-4 text-center">
                    <p className="text-premium-400 text-xs">
                      Gratis aanmelden • Direct contact mogelijk
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Client Info */}
              <Card className="glass border border-premium-600/30">
                <CardHeader>
                  <CardTitle className="text-lg text-premium-50 flex items-center">
                    <User className="w-5 h-5 mr-2 text-klusdirect-blue" />
                    Klantgegevens
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-premium-300">Naam:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-premium-50 font-medium">{job.client.name}</span>
                      {job.client.verified && (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                  </div>
                  
                  <Separator className="bg-premium-700" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-premium-300">Telefoon:</span>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-klusdirect-orange" />
                      <span className="text-premium-50">{job.client.phone}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-premium-300">Email:</span>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-klusdirect-blue" />
                      <span className="text-premium-50">{job.client.email}</span>
                    </div>
                  </div>

                  <div className="bg-klusdirect-blue/10 border border-klusdirect-blue/20 rounded-lg p-3 mt-4">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4 text-klusdirect-blue" />
                      <span className="text-klusdirect-blue text-sm font-medium">
                        {job.customerDetails}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timing Info */}
              <Card className="glass border border-premium-600/30">
                <CardHeader>
                  <CardTitle className="text-lg text-premium-50 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-klusdirect-gold" />
                    Planning
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-premium-300">Gewenste start:</span>
                    <span className="text-premium-50">{job.timing.startDate}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-premium-300">Duur project:</span>
                    <span className="text-premium-50">{job.timing.duration}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-premium-300">Deadline:</span>
                    <span className="text-premium-50">{job.timing.deadline}</span>
                  </div>
                  
                  <Separator className="bg-premium-700" />
                  
                  <div className="flex justify-between">
                    <span className="text-premium-300">Afstand:</span>
                    <span className="text-premium-50">{job.location.distance}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Warning */}
              <Card className="glass border border-yellow-500/30 bg-yellow-500/5">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-yellow-400 font-medium text-sm mb-1">
                        Belangrijk
                      </h4>
                      <p className="text-premium-300 text-sm">
                        Alleen aanmelden als je daadwerkelijk beschikbaar bent en aan alle vereisten voldoet.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
