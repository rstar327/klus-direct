import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Hammer, 
  Search, 
  Users, 
  Shield, 
  Star, 
  MapPin, 
  Clock,
  CheckCircle,
  Wrench,
  Home,
  Zap,
  TreePine,
  Crown,
  Sparkles,
  TrendingUp
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: Shield,
      title: "Ultra Betrouwbaar",
      description: "Premium geverifieerde vakmensen met de hoogste kwaliteitsstandaarden"
    },
    {
      icon: MapPin,
      title: "Instant Matching",
      description: "AI-powered lokale matching binnen seconden"
    },
    {
      icon: Crown,
      title: "Luxury Service",
      description: "Exclusieve service met persoonlijke projectmanagers"
    },
    {
      icon: Sparkles,
      title: "Premium Support",
      description: "24/7 premium ondersteuning met prioritaire behandeling"
    }
  ];

  const services = [
    { icon: Wrench, name: "Loodgieter", color: "bg-gradient-to-br from-klusdirect-blue/20 to-klusdirect-blue/10 text-klusdirect-blue border border-klusdirect-blue/20" },
    { icon: Home, name: "Dakdekker", color: "bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 text-emerald-400 border border-emerald-500/20" },
    { icon: Zap, name: "Elektricien", color: "bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 text-yellow-400 border border-yellow-500/20" },
    { icon: TreePine, name: "Hovenier", color: "bg-gradient-to-br from-green-500/20 to-green-500/10 text-green-400 border border-green-500/20" },
    { icon: Hammer, name: "Timmerman", color: "bg-gradient-to-br from-klusdirect-orange/20 to-klusdirect-orange/10 text-klusdirect-orange border border-klusdirect-orange/20" },
    { icon: Users, name: "Schilder", color: "bg-gradient-to-br from-purple-500/20 to-purple-500/10 text-purple-400 border border-purple-500/20" }
  ];

  const stats = [
    { number: "25.000+", label: "Premium klanten", icon: Crown },
    { number: "5.000+", label: "Elite vakmensen", icon: Star },
    { number: "100.000+", label: "Luxury projecten", icon: TrendingUp },
    { number: "4.9/5", label: "Excellence rating", icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-premium-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-premium-900 via-premium-800 to-premium-900"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-klusdirect-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-klusdirect-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-klusdirect-gold/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 glass border-b border-premium-700/50 sticky top-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-klusdirect-orange to-klusdirect-gold rounded-xl flex items-center justify-center glow-orange">
                <Hammer className="w-7 h-7 text-black" />
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
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/login">
                <Button variant="outline" size="sm" className="border-klusdirect-gold/30 text-klusdirect-gold hover:bg-klusdirect-gold/10">
                  Inloggen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20 animate-fade-in">
            <div className="flex justify-center mb-6">
              <Badge className="bg-gradient-to-r from-klusdirect-gold/20 to-klusdirect-orange/20 text-klusdirect-gold border border-klusdirect-gold/30 px-6 py-2">
                <Crown className="w-4 h-4 mr-2" />
                Premium Platform
              </Badge>
            </div>
            <h2 className="text-6xl md:text-7xl font-bold text-premium-50 mb-6 leading-tight">
              Exclusieve verbinding met
              <span className="block text-premium-gradient animate-glow">
                elite vakmensen
              </span>
            </h2>
            <p className="text-xl text-premium-200 mb-12 max-w-3xl mx-auto">
              Het premium platform dat topklanten verbindt met de beste vakmensen van Nederland. 
              Luxe service, perfecte kwaliteit, altijd.
            </p>
          </div>

          {/* Premium Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-24 max-w-5xl mx-auto">
            <Card className="group glass border-2 border-premium-600/30 hover:border-klusdirect-blue/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-klusdirect-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-6 relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-klusdirect-blue to-klusdirect-blue-dark rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 glow-orange">
                  <Search className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl text-premium-50 mb-2">
                  Ik zoek een expert
                </CardTitle>
                <p className="text-klusdirect-blue text-sm font-medium">PREMIUM CLIENT</p>
              </CardHeader>
              <CardContent className="text-center relative z-10">
                <p className="text-premium-200 mb-8 text-lg">
                  Toegang tot onze elite vakmannen met gegarandeerde kwaliteit en premium service.
                </p>
                <ul className="space-y-4 mb-10 text-left">
                  <li className="flex items-center text-premium-100">
                    <CheckCircle className="w-6 h-6 text-klusdirect-gold mr-4 flex-shrink-0" />
                    Exclusieve toegang tot top professionals
                  </li>
                  <li className="flex items-center text-premium-100">
                    <CheckCircle className="w-6 h-6 text-klusdirect-gold mr-4 flex-shrink-0" />
                    Persoonlijke projectmanager
                  </li>
                  <li className="flex items-center text-premium-100">
                    <CheckCircle className="w-6 h-6 text-klusdirect-gold mr-4 flex-shrink-0" />
                    Premium betalingsbescherming
                  </li>
                  <li className="flex items-center text-premium-100">
                    <CheckCircle className="w-6 h-6 text-klusdirect-gold mr-4 flex-shrink-0" />
                    24/7 luxury ondersteuning
                  </li>
                </ul>
                <Link to="/customer/register">
                  <Button size="lg" className="w-full bg-gradient-to-r from-klusdirect-blue to-klusdirect-blue-dark hover:from-klusdirect-blue-dark hover:to-klusdirect-blue text-white group-hover:scale-105 transition-transform duration-300 text-lg py-6">
                    <Crown className="w-5 h-5 mr-2" />
                    Start Premium
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group glass border-2 border-premium-600/30 hover:border-klusdirect-orange/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-klusdirect-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center pb-6 relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-klusdirect-orange to-klusdirect-gold rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 glow-gold">
                  <Hammer className="w-10 h-10 text-black" />
                </div>
                <CardTitle className="text-3xl text-premium-50 mb-2">
                  Ik ben een professional
                </CardTitle>
                <p className="text-klusdirect-orange text-sm font-medium">ELITE PARTNER</p>
              </CardHeader>
              <CardContent className="text-center relative z-10">
                <p className="text-premium-200 mb-8 text-lg">
                  Word onderdeel van ons exclusieve netwerk en vind premium klanten.
                </p>
                <ul className="space-y-4 mb-10 text-left">
                  <li className="flex items-center text-premium-100">
                    <CheckCircle className="w-6 h-6 text-klusdirect-gold mr-4 flex-shrink-0" />
                    Toegang tot luxury projecten
                  </li>
                  <li className="flex items-center text-premium-100">
                    <CheckCircle className="w-6 h-6 text-klusdirect-gold mr-4 flex-shrink-0" />
                    Premium commissiestructuur
                  </li>
                  <li className="flex items-center text-premium-100">
                    <CheckCircle className="w-6 h-6 text-klusdirect-gold mr-4 flex-shrink-0" />
                    Elite marketing ondersteuning
                  </li>
                  <li className="flex items-center text-premium-100">
                    <CheckCircle className="w-6 h-6 text-klusdirect-gold mr-4 flex-shrink-0" />
                    Exclusieve klantenkring
                  </li>
                </ul>
                <Link to="/craftsman/register">
                  <Button size="lg" className="w-full bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold hover:from-klusdirect-gold hover:to-klusdirect-orange text-black group-hover:scale-105 transition-transform duration-300 text-lg py-6 font-semibold">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Word Elite Partner
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Premium Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in glass rounded-xl p-6 border border-premium-600/30" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-klusdirect-gold/20 to-klusdirect-orange/20 rounded-full flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-klusdirect-gold" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-premium-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-premium-300 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Services Section */}
      <section className="relative z-10 py-20 glass border-y border-premium-700/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-premium-50 mb-4">
              Premium Diensten
            </h3>
            <p className="text-xl text-premium-200">
              Elite specialisten voor elke luxe klus
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="text-center group cursor-pointer animate-fade-in hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-18 h-18 rounded-2xl ${service.color} flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-klusdirect-gold/20 transition-all duration-300`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <div className="text-premium-100 font-medium">
                  {service.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-premium-50 mb-4">
              Waarom KlusDirect Premium?
            </h3>
            <p className="text-xl text-premium-200">
              De meest exclusieve service in Nederland
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center glass border border-premium-600/30 hover:border-klusdirect-gold/30 hover:shadow-lg hover:shadow-klusdirect-gold/10 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-klusdirect-gold/20 to-klusdirect-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-klusdirect-gold/30">
                    <feature.icon className="w-8 h-8 text-klusdirect-gold" />
                  </div>
                  <h4 className="text-xl font-semibold text-premium-50 mb-4">
                    {feature.title}
                  </h4>
                  <p className="text-premium-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-premium-800 to-premium-700 border-y border-premium-600/50">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-klusdirect-gold/20 to-klusdirect-orange/20 px-6 py-2 rounded-full border border-klusdirect-gold/30">
              <Crown className="w-5 h-5 text-klusdirect-gold" />
              <span className="text-klusdirect-gold font-medium">PREMIUM EXPERIENCE</span>
            </div>
          </div>
          <h3 className="text-5xl font-bold text-premium-50 mb-6">
            Klaar voor luxe service?
          </h3>
          <p className="text-xl text-premium-200 mb-10 max-w-2xl mx-auto">
            Ervaar het verschil van premium kwaliteit. Word onderdeel van Nederland's meest exclusieve platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/customer/register">
              <Button size="lg" className="bg-gradient-to-r from-klusdirect-blue to-klusdirect-blue-dark hover:from-klusdirect-blue-dark hover:to-klusdirect-blue text-white px-8 py-4 text-lg">
                <Crown className="w-5 h-5 mr-2" />
                Premium Client worden
              </Button>
            </Link>
            <Link to="/craftsman/register">
              <Button size="lg" className="bg-gradient-to-r from-klusdirect-orange to-klusdirect-gold hover:from-klusdirect-gold hover:to-klusdirect-orange text-black px-8 py-4 text-lg font-semibold">
                <Sparkles className="w-5 h-5 mr-2" />
                Elite Partner worden
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="relative z-10 bg-premium-900 border-t border-premium-700/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-klusdirect-orange to-klusdirect-gold rounded-xl flex items-center justify-center glow-orange">
                  <Hammer className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-premium-gradient">KlusDirect</h4>
                  <div className="flex items-center space-x-1">
                    <Crown className="w-3 h-3 text-klusdirect-gold" />
                    <span className="text-xs text-klusdirect-gold font-medium">PREMIUM</span>
                  </div>
                </div>
              </div>
              <p className="text-premium-300 mb-6">
                Het meest exclusieve platform voor premium vakmensen en elite klanten in Nederland.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4 text-premium-50">Premium Clients</h5>
              <ul className="space-y-2 text-premium-300">
                <li><a href="#" className="hover:text-klusdirect-gold transition-colors">Luxury Projects</a></li>
                <li><a href="#" className="hover:text-klusdirect-gold transition-colors">Elite Service</a></li>
                <li><a href="#" className="hover:text-klusdirect-gold transition-colors">Premium Support</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4 text-premium-50">Elite Partners</h5>
              <ul className="space-y-2 text-premium-300">
                <li><a href="#" className="hover:text-klusdirect-gold transition-colors">Partner worden</a></li>
                <li><a href="#" className="hover:text-klusdirect-gold transition-colors">Premium Abonnementen</a></li>
                <li><a href="#" className="hover:text-klusdirect-gold transition-colors">Business Tools</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4 text-premium-50">Premium Support</h5>
              <ul className="space-y-2 text-premium-300">
                <li><a href="#" className="hover:text-klusdirect-gold transition-colors">24/7 Ondersteuning</a></li>
                <li><a href="#" className="hover:text-klusdirect-gold transition-colors">Elite Help Center</a></li>
                <li><a href="#" className="hover:text-klusdirect-gold transition-colors">Premium Voorwaarden</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-premium-700 pt-8 text-center text-premium-400">
            <p>&copy; 2024 KlusDirect Premium. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
