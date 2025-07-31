import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Plus, 
  Calendar, 
  MapPin, 
  Euro, 
  MessageCircle,
  Clock,
  CheckCircle,
  Star,
  Home
} from "lucide-react";

export default function CustomerDashboard() {
  const mockJobs = [
    {
      id: 1,
      title: "Lekkage badkamer repareren",
      status: "Wachten op offertes",
      location: "Amsterdam",
      budget: "€150-250",
      date: "15 dec 2024",
      quotes: 0
    },
    {
      id: 2,
      title: "Keuken tegels plaatsen",
      status: "Offerte ontvangen",
      location: "Amsterdam",
      budget: "€800-1200",
      date: "10 jan 2025",
      quotes: 3
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
                <Home className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-klusdirect-orange to-klusdirect-blue bg-clip-text text-transparent">
                KlusDirect
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-klusdirect-gray-600">Welkom, Jan</span>
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
                Mijn Dashboard
              </h2>
              <p className="text-klusdirect-gray-600">
                Beheer jouw klussen en bekijk offertes
              </p>
            </div>
            <Button className="bg-gradient-to-r from-klusdirect-orange to-klusdirect-orange-dark mt-4 md:mt-0">
              <Plus className="w-4 h-4 mr-2" />
              Nieuwe klus plaatsen
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-klusdirect-gray-600 text-sm">Actieve klussen</p>
                    <p className="text-2xl font-bold text-klusdirect-gray-900">2</p>
                  </div>
                  <Clock className="w-8 h-8 text-klusdirect-blue" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-klusdirect-gray-600 text-sm">Ontvangen offertes</p>
                    <p className="text-2xl font-bold text-klusdirect-gray-900">3</p>
                  </div>
                  <MessageCircle className="w-8 h-8 text-klusdirect-orange" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-klusdirect-gray-600 text-sm">Afgeronde klussen</p>
                    <p className="text-2xl font-bold text-klusdirect-gray-900">7</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-klusdirect-gray-600 text-sm">Gemiddelde beoordeling</p>
                    <p className="text-2xl font-bold text-klusdirect-gray-900">4.8</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Jobs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-klusdirect-gray-900">
                Mijn klussen
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
                            variant={job.status === "Offerte ontvangen" ? "default" : "secondary"}
                            className={job.status === "Offerte ontvangen" ? "bg-green-100 text-green-800" : ""}
                          >
                            {job.status}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-klusdirect-gray-600 mb-4">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Euro className="w-4 h-4 mr-1" />
                            {job.budget}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {job.date}
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {job.quotes} offertes
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4 md:mt-0">
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                        {job.quotes > 0 && (
                          <Button size="sm" className="bg-klusdirect-orange hover:bg-klusdirect-orange-dark">
                            Bekijk offertes
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {mockJobs.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-klusdirect-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-klusdirect-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-klusdirect-gray-900 mb-2">
                    Nog geen klussen geplaatst
                  </h3>
                  <p className="text-klusdirect-gray-600 mb-6">
                    Plaats jouw eerste klus en ontvang offertes van vakmensen
                  </p>
                  <Button className="bg-gradient-to-r from-klusdirect-orange to-klusdirect-orange-dark">
                    <Plus className="w-4 h-4 mr-2" />
                    Plaats eerste klus
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Coming Soon Message */}
          <Card className="mt-8 border-2 border-dashed border-klusdirect-gray-300">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold text-klusdirect-gray-900 mb-4">
                Dashboard in ontwikkeling
              </h3>
              <p className="text-klusdirect-gray-600 mb-6">
                Dit is een preview van het klant dashboard. Alle functionaliteiten worden momenteel ontwikkeld, 
                inclusief klus plaatsen, offertes beheren, betalingen en communicatie met vakmensen.
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
