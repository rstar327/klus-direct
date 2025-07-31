import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Hammer, 
  Calendar, 
  MapPin, 
  Euro, 
  MessageCircle,
  Bell,
  TrendingUp,
  Star,
  Users,
  Clock,
  CheckCircle
} from "lucide-react";

export default function CraftsmanDashboard() {
  const mockJobs = [
    {
      id: 1,
      title: "Lekkage badkamer repareren",
      client: "Jan de Vries",
      location: "Amsterdam Noord",
      budget: "€150-250",
      distance: "2.1 km",
      posted: "2 uur geleden",
      urgency: "Urgent"
    },
    {
      id: 2,
      title: "Keuken tegels plaatsen",
      client: "Marie Jansen",
      location: "Amsterdam Centrum",
      budget: "€800-1200",
      distance: "5.3 km",
      posted: "1 dag geleden",
      urgency: "Normaal"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-klusdirect-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-klusdirect-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-klusdirect-orange to-klusdirect-orange-dark rounded-xl flex items-center justify-center">
                <Hammer className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-klusdirect-orange to-klusdirect-blue bg-clip-text text-transparent">
                KlusDirect Pro
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-klusdirect-orange rounded-full"></div>
              </Button>
              <span className="text-klusdirect-gray-600">Welkom, Piet Bakker</span>
              <Button variant="outline" size="sm">
                Uitloggen
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-klusdirect-gray-900 mb-2">
                Vakman Dashboard
              </h2>
              <p className="text-klusdirect-gray-600">
                Beheer jouw klussen en vind nieuwe opdrachten
              </p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button variant="outline">
                Profiel bewerken
              </Button>
              <Button className="bg-gradient-to-r from-klusdirect-orange to-klusdirect-orange-dark">
                Beschikbaarheid instellen
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-klusdirect-gray-600 text-sm">Nieuwe klussen</p>
                    <p className="text-2xl font-bold text-klusdirect-gray-900">5</p>
                  </div>
                  <Bell className="w-8 h-8 text-klusdirect-orange" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-klusdirect-gray-600 text-sm">Actieve offertes</p>
                    <p className="text-2xl font-bold text-klusdirect-gray-900">3</p>
                  </div>
                  <MessageCircle className="w-8 h-8 text-klusdirect-blue" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-klusdirect-gray-600 text-sm">Deze maand</p>
                    <p className="text-2xl font-bold text-klusdirect-gray-900">€2.450</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-klusdirect-gray-600 text-sm">Waardering</p>
                    <p className="text-2xl font-bold text-klusdirect-gray-900">4.9</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Status */}
          <Card className="mb-8 border-2 border-klusdirect-orange/20 bg-gradient-to-r from-klusdirect-orange/5 to-klusdirect-blue/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-klusdirect-gray-900 mb-2">
                    Gratis Account - Upgrade beschikbaar
                  </h3>
                  <p className="text-klusdirect-gray-600">
                    Je hebt een gratis account met 7% commissie. Upgrade naar Pro voor lagere commissie en meer voordelen.
                  </p>
                </div>
                <Button className="bg-gradient-to-r from-klusdirect-orange to-klusdirect-orange-dark">
                  Upgrade naar Pro
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Available Jobs */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-klusdirect-gray-900 flex items-center">
                <Bell className="w-5 h-5 mr-2 text-klusdirect-orange" />
                Nieuwe klussen in jouw gebied
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockJobs.map((job) => (
                  <div key={job.id} className="border border-klusdirect-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-klusdirect-gray-900">
                            {job.title}
                          </h3>
                          <Badge 
                            variant={job.urgency === "Urgent" ? "destructive" : "secondary"}
                          >
                            {job.urgency}
                          </Badge>
                        </div>
                        
                        <p className="text-klusdirect-gray-600 mb-3">
                          Klant: {job.client}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-klusdirect-gray-600 mb-4">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location} ({job.distance})
                          </div>
                          <div className="flex items-center">
                            <Euro className="w-4 h-4 mr-1" />
                            {job.budget}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {job.posted}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4 md:mt-0">
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                        <Button size="sm" className="bg-klusdirect-orange hover:bg-klusdirect-orange-dark">
                          Offerte maken
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-klusdirect-gray-900 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                  Inkomsten overzicht
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-klusdirect-gray-600">Deze week</span>
                    <span className="font-semibold text-klusdirect-gray-900">€650</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-klusdirect-gray-600">Deze maand</span>
                    <span className="font-semibold text-klusdirect-gray-900">€2.450</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-klusdirect-gray-600">Commissie (7%)</span>
                    <span className="font-semibold text-red-600">-€171.50</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold text-klusdirect-gray-900">Netto</span>
                    <span className="font-bold text-green-600">€2.278.50</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-klusdirect-gray-900 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Recente beoordelingen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-klusdirect-orange pl-4">
                    <div className="flex items-center mb-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-klusdirect-gray-600">Marie J.</span>
                    </div>
                    <p className="text-sm text-klusdirect-gray-700">
                      "Uitstekend werk, netjes en op tijd!"
                    </p>
                  </div>
                  <div className="border-l-4 border-klusdirect-blue pl-4">
                    <div className="flex items-center mb-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-klusdirect-gray-600">Jan D.</span>
                    </div>
                    <p className="text-sm text-klusdirect-gray-700">
                      "Zeer tevreden, zeker aan te bevelen!"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coming Soon Message */}
          <Card className="border-2 border-dashed border-klusdirect-gray-300">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold text-klusdirect-gray-900 mb-4">
                Vakman dashboard in ontwikkeling
              </h3>
              <p className="text-klusdirect-gray-600 mb-6">
                Dit is een preview van het vakman dashboard. Alle functionaliteiten worden momenteel ontwikkeld, 
                inclusief offerte maken, klant communicatie, facturen genereren en abonnement beheer.
              </p>
              <Link to="/">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Terug naar home
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
