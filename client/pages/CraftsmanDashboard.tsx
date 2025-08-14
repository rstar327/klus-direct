import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SubscriptionUpgradeModal from "@/components/SubscriptionUpgradeModal";
import SimpleAgendaModal from "@/components/SimpleAgendaModal";
import ProfileEditModal from "@/components/ProfileEditModal";
import JobApplicationModal from "@/components/JobApplicationModal";
import OfferteDetailsModal from "@/components/OfferteDetailsModal";
import ChatModal from "@/components/ChatModal";
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
  CheckCircle,
  Crown,
  Sparkles,
  Zap,
  Settings,
  Eye,
  Target,
  Smartphone,
  CalendarCheck,
  FileText,
  AlertCircle,
  ClockIcon,
} from "lucide-react";

export default function CraftsmanDashboard() {
  const [activeOffers, setActiveOffers] = useState(8);
  const [pendingInvoices, setPendingInvoices] = useState([]);
  const [availableJobs, setAvailableJobs] = useState([]);

  const handleJobApplication = (applicationData: any) => {
    // Update active offers count
    const newCount = activeOffers + 1;
    setActiveOffers(newCount);
    localStorage.setItem("activeOffers", newCount.toString());

    // Show success message or handle further logic
    console.log("Job application submitted:", applicationData);
  };

  // Load jobs from localStorage
  const loadAvailableJobs = () => {
    const publicJobs = JSON.parse(localStorage.getItem("publicJobs") || "[]");
    setAvailableJobs(publicJobs);
  };

  // Format how long ago the job was posted
  const formatPostedTime = (job: any) => {
    // Try to get the creation date from different possible fields
    let createdDate = null;

    if (job.createdAt) {
      createdDate = new Date(job.createdAt);
    } else if (job.postedDate) {
      createdDate = new Date(job.postedDate);
    } else {
      return "Zojuist geplaatst";
    }

    if (isNaN(createdDate.getTime())) {
      return "Zojuist geplaatst";
    }

    const now = new Date();
    const diffMs = now.getTime() - createdDate.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "Zojuist geplaatst";
    if (diffMins < 60) return `${diffMins} min geleden`;
    if (diffHours < 24) return `${diffHours} uur geleden`;
    if (diffDays === 1) return "Gisteren";
    if (diffDays < 7) return `${diffDays} dagen geleden`;

    return createdDate.toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "short",
    });
  };

  useEffect(() => {
    // Ensure user plan defaults to 'free' if not set
    const currentPlan = localStorage.getItem("userPlan");
    if (!currentPlan) {
      localStorage.setItem("userPlan", "free");
    }

    // Load active offers from localStorage
    const storedOffers = localStorage.getItem("activeOffers");
    if (storedOffers) {
      setActiveOffers(parseInt(storedOffers));
    }

    // Load pending invoices from localStorage
    const storedInvoices = localStorage.getItem("pendingInvoices");
    if (storedInvoices) {
      setPendingInvoices(JSON.parse(storedInvoices));
    }

    // Load available jobs
    loadAvailableJobs();

    // Listen for job updates
    window.addEventListener("storage", loadAvailableJobs);
    window.addEventListener("jobAdded", loadAvailableJobs);
    window.addEventListener("jobUpdated", loadAvailableJobs);
    window.addEventListener("jobDeleted", loadAvailableJobs);

    return () => {
      window.removeEventListener("storage", loadAvailableJobs);
      window.removeEventListener("jobAdded", loadAvailableJobs);
      window.removeEventListener("jobUpdated", loadAvailableJobs);
      window.removeEventListener("jobDeleted", loadAvailableJobs);
    };
  }, []);

  const mockJobs = [
    {
      id: 1,
      title: "Luxe badkamer renovatie",
      client: {
        name: "Jan de Vries",
      },
      location: "Amsterdam Noord",
      budget: {
        min: 2500,
        max: 4000,
        currency: "EUR",
      },
      distance: "2.1 km",
      posted: "15 min geleden",
      urgency: "Premium",
      customerDetails: "Volledige contactgegevens beschikbaar",
      timing: {
        startDate: "2024-02-15",
        duration: "2-3 weken",
      },
      category: "Badkamer renovatie",
    },
    {
      id: 2,
      title: "Design keuken installatie",
      client: {
        name: "Marie Jansen",
      },
      location: "Amsterdam Centrum",
      budget: {
        min: 5000,
        max: 8000,
        currency: "EUR",
      },
      distance: "5.3 km",
      posted: "1 uur geleden",
      urgency: "Exclusief",
      customerDetails: "Premium klant - directe toegang",
      timing: {
        startDate: "2024-02-20",
        duration: "3-4 weken",
      },
      category: "Keuken installatie",
    },
    {
      id: 3,
      title: "Dak isolatie project",
      client: {
        name: "Peter Bakker",
      },
      location: "Amsterdam West",
      budget: {
        min: 3000,
        max: 5000,
        currency: "EUR",
      },
      distance: "3.8 km",
      posted: "2 uur geleden",
      urgency: "Premium",
      customerDetails: "Volledige contactgegevens beschikbaar",
      timing: {
        startDate: "2024-02-10",
        duration: "1 week",
      },
      category: "Isolatie werk",
    },
  ];

  const pricingTiers = [
    {
      name: "Gratis",
      price: "€0",
      period: "/maand",
      commission: "15%",
      features: [
        "Basis toegang tot klussen",
        "Beperkte klantdetails",
        "Standaard ondersteuning",
        "15% commissie per klus",
      ],
      current: true,
      buttonText: "Huidige plan",
      color: "from-premium-600 to-premium-700",
    },
    {
      name: "Professional",
      price: "€50",
      period: "/maand",
      commission: "7,5%",
      features: [
        "Volledige klantdetails",
        "Directe contactgegevens",
        "Premium ondersteuning",
        "Slechts 7,5% commissie",
        "Geavanceerde tools",
      ],
      current: false,
      buttonText: "Upgrade nu",
      color: "from-klusdirect-blue to-klusdirect-blue-dark",
      popular: true,
    },
    {
      name: "Elite",
      price: "€100",
      period: "/maand",
      commission: "5%",
      features: [
        "Alles van Professional",
        "Push notificaties voor klussen",
        "Agenda integratie",
        "Premium marketing boost",
        "Voorrang in zoekresultaten",
        "Exclusieve projecten",
      ],
      current: false,
      buttonText: "Word Elite",
      color: "from-klusdirect-orange to-klusdirect-gold",
    },
  ];

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
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-klusdirect-orange to-klusdirect-gold rounded-xl flex items-center justify-center glow-orange">
                <Hammer className="w-7 h-7 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-premium-gradient">
                  KlusDirect Pro
                </h1>
                <div className="flex items-center space-x-1">
                  <Crown className="w-3 h-3 text-klusdirect-gold" />
                  <span className="text-xs text-klusdirect-gold font-medium">
                    ELITE
                  </span>
                </div>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="relative text-premium-300 hover:text-klusdirect-gold"
              >
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-klusdirect-orange rounded-full animate-pulse"></div>
              </Button>
              <span className="text-premium-200">
                Welkom,{" "}
                <span className="text-klusdirect-gold font-medium">
                  Piet Bakker
                </span>
              </span>
              <Button
                variant="outline"
                size="sm"
                className="border-klusdirect-gold/30 text-klusdirect-gold hover:bg-klusdirect-gold/10"
              >
                Uitloggen
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold text-premium-50 mb-2">
                Elite Dashboard
              </h2>
              <p className="text-premium-200 text-lg">
                Beheer jouw premium klussen en vind exclusieve opdrachten
              </p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <ProfileEditModal>
                <Button
                  variant="outline"
                  className="border-premium-600 text-premium-200 hover:bg-premium-700"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Profiel bewerken
                </Button>
              </ProfileEditModal>
              <SimpleAgendaModal>
                <Button className="bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold">
                  <CalendarCheck className="w-4 h-4 mr-2" />
                  Agenda beheren
                </Button>
              </SimpleAgendaModal>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass border border-premium-600/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-premium-300 text-sm">Nieuwe klussen</p>
                    <p className="text-3xl font-bold text-premium-50">
                      {availableJobs.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-klusdirect-orange/20 to-klusdirect-orange/10 rounded-xl flex items-center justify-center">
                    <Bell className="w-6 h-6 text-klusdirect-orange" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border border-premium-600/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-premium-300 text-sm">Actieve offertes</p>
                    <p className="text-3xl font-bold text-premium-50">
                      {activeOffers}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-klusdirect-blue/20 to-klusdirect-blue/10 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-klusdirect-blue" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border border-premium-600/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-premium-300 text-sm">Deze maand</p>
                    <p className="text-3xl font-bold text-premium-50">€8.750</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border border-premium-600/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-premium-300 text-sm">Waardering</p>
                    <p className="text-3xl font-bold text-premium-50">4.9</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Plans */}
          <Card className="mb-8 glass border-2 border-klusdirect-orange/20">
            <CardHeader>
              <CardTitle className="text-2xl text-premium-50 flex items-center">
                <Crown className="w-6 h-6 mr-3 text-klusdirect-gold" />
                Upgrade jouw account voor meer voordelen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {pricingTiers.map((tier, index) => (
                  <Card
                    key={index}
                    className={`glass border transition-all duration-300 hover:scale-105 ${
                      tier.current
                        ? "border-premium-500/50"
                        : tier.popular
                          ? "border-klusdirect-blue/50 glow-orange"
                          : "border-premium-600/30 hover:border-klusdirect-gold/30"
                    } ${tier.popular ? "relative" : ""}`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-klusdirect-blue to-klusdirect-blue-dark text-white px-4 py-1">
                          <Star className="w-3 h-3 mr-1" />
                          Populair
                        </Badge>
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-premium-50 mb-2">
                          {tier.name}
                        </h3>
                        <div className="flex items-center justify-center mb-2">
                          <span className="text-3xl font-bold text-premium-gradient">
                            {tier.price}
                          </span>
                          <span className="text-premium-300">
                            {tier.period}
                          </span>
                        </div>
                        <div className="bg-gradient-to-r from-red-500/20 to-red-400/20 px-3 py-1 rounded-full border border-red-500/30">
                          <span className="text-red-400 text-sm font-medium">
                            {tier.commission} commissie
                          </span>
                        </div>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {tier.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-center text-premium-200"
                          >
                            <CheckCircle className="w-4 h-4 text-klusdirect-gold mr-3 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {tier.current ? (
                        <Button
                          className="w-full bg-premium-600 hover:bg-premium-500 text-premium-200"
                          disabled={true}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {tier.buttonText}
                        </Button>
                      ) : tier.name === "Professional" ? (
                        <a
                          href="https://buy.stripe.com/14A5kwgem7gs2oB2cdgw000"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Button
                            className={`w-full bg-gradient-to-r ${tier.color} text-white hover:scale-105 transition-transform`}
                          >
                            {tier.buttonText}
                          </Button>
                        </a>
                      ) : tier.name === "Elite" ? (
                        <a
                          href="https://buy.stripe.com/cNi5kwaU21W84wJ189gw001"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Button
                            className={`w-full bg-gradient-to-r ${tier.color} text-white hover:scale-105 transition-transform`}
                          >
                            {tier.buttonText}
                          </Button>
                        </a>
                      ) : (
                        <SubscriptionUpgradeModal
                          plan={{
                            name: tier.name,
                            price: parseInt(tier.price.replace("€", "")),
                            period: tier.period,
                            commission: tier.commission,
                            features: tier.features,
                            buttonText: tier.buttonText,
                            color: tier.color,
                          }}
                        >
                          <Button
                            className={`w-full bg-gradient-to-r ${tier.color} text-white hover:scale-105 transition-transform`}
                          >
                            {tier.buttonText}
                          </Button>
                        </SubscriptionUpgradeModal>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Available Jobs */}
          <Card className="mb-8 glass border border-premium-600/30">
            <CardHeader>
              <CardTitle className="text-xl text-premium-50 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-klusdirect-orange" />
                Premium klussen in jouw gebied
                <Badge className="ml-3 bg-klusdirect-orange/20 text-klusdirect-orange border border-klusdirect-orange/30">
                  Live updates
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableJobs.map((job) => (
                  <div
                    key={job.id}
                    className="glass border border-premium-600/30 rounded-lg p-6 hover:border-klusdirect-orange/30 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-semibold text-premium-50">
                            {job.title}
                          </h3>
                          <div className="flex gap-2">
                            <Badge
                              variant={
                                job.urgency === "Premium"
                                  ? "default"
                                  : "secondary"
                              }
                              className={
                                job.urgency === "Premium"
                                  ? "bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black"
                                  : "bg-gradient-to-r from-klusdirect-blue to-klusdirect-blue-dark text-white"
                              }
                            >
                              <Crown className="w-3 h-3 mr-1" />
                              {job.urgency}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center mb-3">
                          <p className="text-premium-200 mr-4">
                            Klant:{" "}
                            <span className="text-klusdirect-gold font-medium">
                              {job.client.name}
                            </span>
                          </p>
                          <div className="flex items-center text-klusdirect-blue">
                            <Eye className="w-4 h-4 mr-1" />
                            <span className="text-sm">
                              {job.customerDetails}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-premium-300 mb-4">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1 text-klusdirect-orange" />
                            {job.location} ({job.distance})
                          </div>
                          <div className="flex items-center">
                            <Euro className="w-4 h-4 mr-1 text-green-400" />
                            ���{job.budget.min.toLocaleString()}-
                            {job.budget.max.toLocaleString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1 text-klusdirect-blue" />
                            {formatPostedTime(job)}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-4 md:mt-0">
                        <Link to={`/job/${job.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-premium-600 text-premium-200 hover:bg-premium-700"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Details
                          </Button>
                        </Link>
                        <ChatModal
                          chatId={`job_${job.id}_craftsman_123`}
                          currentUser={{
                            id: "craftsman_123",
                            name: "Piet Bakker",
                            type: "craftsman",
                          }}
                          otherUser={{
                            id: job.client?.id || "customer_unknown",
                            name: job.client?.name || "Klant",
                            type: "customer",
                          }}
                          jobTitle={job.title}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-klusdirect-blue text-klusdirect-blue hover:bg-klusdirect-blue/10"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Chat
                          </Button>
                        </ChatModal>
                        <JobApplicationModal
                          job={job}
                          onApplicationSubmit={handleJobApplication}
                        >
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold text-black font-semibold hover:scale-105 transition-transform"
                          >
                            <Target className="w-4 h-4 mr-2" />
                            Aanmelden
                          </Button>
                        </JobApplicationModal>
                      </div>
                    </div>
                  </div>
                ))}

                {availableJobs.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-klusdirect-orange/20 to-klusdirect-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-klusdirect-orange/30">
                      <Zap className="w-10 h-10 text-klusdirect-orange" />
                    </div>
                    <h3 className="text-xl font-semibold text-premium-50 mb-3">
                      Geen klussen beschikbaar
                    </h3>
                    <p className="text-premium-300 mb-6">
                      Er zijn momenteel geen nieuwe klussen in jouw gebied. Kom
                      later terug of vergroot je zoekgebied.
                    </p>
                  </div>
                )}

                {availableJobs.length > 0 && (
                  <div className="text-center py-4">
                    <p className="text-premium-300 mb-4">
                      Upgrade naar Professional voor meer klantdetails of Elite
                      voor push notificaties
                    </p>
                    <div className="flex justify-center gap-3">
                      <Button
                        variant="outline"
                        className="border-klusdirect-blue/30 text-klusdirect-blue hover:bg-klusdirect-blue/10"
                      >
                        <Smartphone className="w-4 h-4 mr-2" />
                        Elite upgrade (€100/maand)
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pending Invoices Section */}
          {pendingInvoices.length > 0 && (
            <Card className="mb-8 glass border border-premium-600/30">
              <CardHeader>
                <CardTitle className="text-xl text-premium-50 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-klusdirect-gold" />
                  Facturen in behandeling ({pendingInvoices.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingInvoices.map((invoice: any, index: number) => (
                    <div
                      key={index}
                      className="glass border border-premium-600/30 rounded-lg p-4 hover:border-klusdirect-gold/30 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-lg font-semibold text-premium-50">
                              {invoice.jobTitle}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                              <span className="text-yellow-400 text-sm font-medium">
                                In behandeling
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center mb-3">
                            <p className="text-premium-200 mr-4">
                              Klant:{" "}
                              <span className="text-klusdirect-gold font-medium">
                                {invoice.clientName}
                              </span>
                            </p>
                            <div className="flex items-center text-premium-400">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span className="text-sm">
                                Ingediend:{" "}
                                {new Date(
                                  invoice.applicationDate,
                                ).toLocaleDateString("nl-NL")}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-premium-300">
                            <div className="flex items-center">
                              <Euro className="w-4 h-4 mr-1 text-green-400" />
                              Offerte: €
                              {invoice.proposedAmount?.toLocaleString()}
                            </div>
                            <div className="flex items-center">
                              <FileText className="w-4 h-4 mr-1 text-klusdirect-orange" />
                              Commissie: €
                              {invoice.commissionAmount?.toLocaleString()} (
                              {invoice.commissionRate}%)
                            </div>
                            <div className="flex items-center">
                              <Euro className="w-4 h-4 mr-1 text-green-400" />
                              Netto: €{invoice.netAmount?.toLocaleString()}
                            </div>
                            <div className="flex items-center">
                              <ClockIcon className="w-4 h-4 mr-1 text-klusdirect-blue" />
                              Factuur: {invoice.invoiceNumber}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 mt-4 md:mt-0">
                          <OfferteDetailsModal invoice={invoice}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-premium-600 text-premium-200 hover:bg-premium-700"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Bekijk offerte
                            </Button>
                          </OfferteDetailsModal>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="bg-klusdirect-blue/10 border border-klusdirect-blue/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-klusdirect-blue mt-0.5" />
                      <div>
                        <h4 className="text-klusdirect-blue font-medium text-sm mb-1">
                          Factuur status
                        </h4>
                        <p className="text-premium-300 text-sm">
                          Facturen worden automatisch gegenereerd zodra de klant
                          je offerte accepteert. De commissie wordt automatisch
                          ingehouden bij betaling.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="glass border border-premium-600/30">
              <CardHeader>
                <CardTitle className="text-lg text-premium-50 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                  Inkomsten overzicht
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-premium-300">Deze week</span>
                    <span className="font-semibold text-premium-50">
                      €2.150
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-premium-300">Deze maand</span>
                    <span className="font-semibold text-premium-50">
                      €8.750
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-premium-300">Commissie (15%)</span>
                    <span className="font-semibold text-red-400">
                      -€1.312.50
                    </span>
                  </div>
                  <div className="p-3 bg-klusdirect-blue/10 rounded-lg border border-klusdirect-blue/20">
                    <p className="text-klusdirect-blue text-sm">
                      💡 Met Professional plan: slechts €656.25 commissie (7.5%)
                    </p>
                  </div>
                  <hr className="border-premium-700" />
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold text-premium-50">Netto</span>
                    <span className="font-bold text-green-400">€7.437.50</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border border-premium-600/30">
              <CardHeader>
                <CardTitle className="text-lg text-premium-50 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  Recente beoordelingen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-klusdirect-orange pl-4 glass rounded-r-lg p-3">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-premium-300">
                        Marie J.
                      </span>
                    </div>
                    <p className="text-sm text-premium-200">
                      "Perfecte uitvoering van onze luxe badkamer. Absolute top
                      kwaliteit!"
                    </p>
                  </div>
                  <div className="border-l-4 border-klusdirect-blue pl-4 glass rounded-r-lg p-3">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-premium-300">
                        Jan D.
                      </span>
                    </div>
                    <p className="text-sm text-premium-200">
                      "Uitmuntend vakmanschap, zeer professioneel en
                      betrouwbaar!"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Development Message */}
          <Card className="glass border-2 border-dashed border-premium-600/50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-klusdirect-gold/20 to-klusdirect-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-klusdirect-gold" />
              </div>
              <h3 className="text-xl font-semibold text-premium-50 mb-4">
                Elite Dashboard in ontwikkeling
              </h3>
              <p className="text-premium-300 mb-6 max-w-2xl mx-auto">
                Dit is een preview van het elite vakman dashboard. Alle premium
                functionaliteiten worden momenteel ontwikkeld, inclusief push
                notificaties, agenda integratie, geavanceerde offerte tools en
                exclusieve klant toegang.
              </p>
              <Link to="/">
                <Button
                  variant="outline"
                  className="border-premium-600 text-premium-200 hover:bg-premium-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Terug naar overzicht
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
