import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import NewJobModal from "@/components/NewJobModal";
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
  Home,
  Crown
} from "lucide-react";

export default function CustomerDashboard() {
  const [customerJobs, setCustomerJobs] = useState([]);

  useEffect(() => {
    // Load customer jobs from localStorage
    const loadCustomerJobs = () => {
      const jobs = JSON.parse(localStorage.getItem('customerJobs') || '[]');
      setCustomerJobs(jobs);
    };

    loadCustomerJobs();

    // Listen for storage changes (when new job is added)
    window.addEventListener('storage', loadCustomerJobs);

    // Custom event for when job is added in same tab
    window.addEventListener('jobAdded', loadCustomerJobs);

    return () => {
      window.removeEventListener('storage', loadCustomerJobs);
      window.removeEventListener('jobAdded', loadCustomerJobs);
    };
  }, []);

  // Format jobs to match display structure
  const formatJobForDisplay = (job: any) => {
    return {
      id: job.id,
      title: job.title,
      status: "Wacht op offertes",
      location: job.jobLocation || job.location,
      budget: job.budget,
      date: new Date(job.createdAt).toLocaleDateString('nl-NL', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      quotes: 0 // Start with 0 quotes for new jobs
    };
  };

  return (
    <div className="min-h-screen bg-premium-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-premium-900 via-premium-800 to-premium-900"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-klusdirect-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-klusdirect-orange/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 glass border-b border-premium-700/50 sticky top-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-klusdirect-blue to-klusdirect-blue-dark rounded-xl flex items-center justify-center glow-orange">
                <Home className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-premium-gradient">
                  KlusDirect
                </h1>
                <div className="flex items-center space-x-1">
                  <Crown className="w-3 h-3 text-klusdirect-gold" />
                  <span className="text-xs text-klusdirect-gold font-medium">PREMIUM</span>
                </div>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-premium-200">Welkom, <span className="text-klusdirect-blue font-medium">Jan</span></span>
              <Button variant="outline" size="sm" className="border-klusdirect-blue/30 text-klusdirect-blue hover:bg-klusdirect-blue/10">
                Uitloggen
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold text-premium-50 mb-2">
                Premium Dashboard
              </h2>
              <p className="text-premium-200 text-lg">
                Beheer jouw exclusive klussen en bekijk elite offertes
              </p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Link to="/customer/quotes">
                <Button variant="outline" className="border-premium-600 text-premium-200 hover:bg-premium-700">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Mijn Offertes
                </Button>
              </Link>
              <NewJobModal>
                <Button className="bg-gradient-to-r from-klusdirect-blue to-klusdirect-blue-dark text-white font-semibold">
                  <Plus className="w-4 h-4 mr-2" />
                  Nieuwe Premium Klus
                </Button>
              </NewJobModal>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass border border-premium-600/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-premium-300 text-sm">Premium klussen</p>
                    <p className="text-3xl font-bold text-premium-50">{customerJobs.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-klusdirect-blue/20 to-klusdirect-blue/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-klusdirect-blue" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border border-premium-600/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-premium-300 text-sm">Elite offertes</p>
                    <p className="text-3xl font-bold text-premium-50">8</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-klusdirect-orange/20 to-klusdirect-orange/10 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-klusdirect-orange" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border border-premium-600/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-premium-300 text-sm">Voltooide projecten</p>
                    <p className="text-3xl font-bold text-premium-50">15</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border border-premium-600/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-premium-300 text-sm">Luxe waardering</p>
                    <p className="text-3xl font-bold text-premium-50">4.9</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Jobs */}
          <Card className="glass border border-premium-600/30 mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-premium-50 flex items-center">
                <Crown className="w-5 h-5 mr-2 text-klusdirect-gold" />
                Mijn Premium Klussen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customerJobs.map((job) => {
                  const displayJob = formatJobForDisplay(job);
                  return (
                    <div key={displayJob.id} className="glass border border-premium-600/30 rounded-lg p-6 hover:border-klusdirect-gold/30 transition-all duration-300">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-premium-50">
                              {displayJob.title}
                            </h3>
                            <Badge className="bg-gradient-to-r from-klusdirect-blue/20 to-klusdirect-blue/10 text-klusdirect-blue border border-klusdirect-blue/30">
                              <Clock className="w-3 h-3 mr-1" />
                              {displayJob.status}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-premium-300 mb-4">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1 text-klusdirect-blue" />
                              {displayJob.location}
                            </div>
                            <div className="flex items-center">
                              <Euro className="w-4 h-4 mr-1 text-green-400" />
                              {displayJob.budget}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1 text-klusdirect-orange" />
                              {displayJob.date}
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1 text-yellow-400" />
                              {displayJob.quotes} offertes
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 mt-4 md:mt-0">
                          <Button variant="outline" size="sm" className="border-premium-600 text-premium-200 hover:bg-premium-700">
                            Details
                          </Button>
                          {displayJob.quotes > 0 && (
                            <Button size="sm" className="bg-gradient-to-r from-klusdirect-gold to-klusdirect-orange text-black font-semibold hover:scale-105 transition-transform">
                              Bekijk Premium Offertes
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {customerJobs.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-klusdirect-gold/20 to-klusdirect-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-klusdirect-gold/30">
                    <Plus className="w-10 h-10 text-klusdirect-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-premium-50 mb-3">
                    Nog geen premium klussen geplaatst
                  </h3>
                  <p className="text-premium-200 mb-8">
                    Plaats jouw eerste premium klus en ontvang elite offertes van de beste vakmensen
                  </p>
                  <Button className="bg-gradient-to-r from-klusdirect-blue to-klusdirect-blue-dark text-white font-semibold">
                    <Plus className="w-4 h-4 mr-2" />
                    Plaats Premium Klus
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Coming Soon Message */}
          <Card className="glass border-2 border-dashed border-premium-600/50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-klusdirect-blue/20 to-klusdirect-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-klusdirect-blue/30">
                <Star className="w-8 h-8 text-klusdirect-blue" />
              </div>
              <h3 className="text-xl font-semibold text-premium-50 mb-4">
                Premium Dashboard in ontwikkeling
              </h3>
              <p className="text-premium-200 mb-6 max-w-2xl mx-auto">
                Dit is een preview van het premium klant dashboard. Alle luxury functionaliteiten worden momenteel ontwikkeld,
                inclusief exclusive klus plaatsen, elite offertes beheren, premium betalingen en directe communicatie met top vakmensen.
              </p>
              <Link to="/">
                <Button variant="outline" className="border-premium-600 text-premium-200 hover:bg-premium-700">
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
