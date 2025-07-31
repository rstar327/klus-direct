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
  TreePine
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: Shield,
      title: "Betrouwbaar & Veilig",
      description: "Alle vakmensen zijn geverifieerd en beoordeeld door andere klanten"
    },
    {
      icon: MapPin,
      title: "Lokaal & Snel",
      description: "Vind vakmensen in jouw buurt die snel beschikbaar zijn"
    },
    {
      icon: Star,
      title: "Kwaliteitsgarantie",
      description: "Alleen de beste professionals met hoge beoordelingen"
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Altijd hulp beschikbaar wanneer je het nodig hebt"
    }
  ];

  const services = [
    { icon: Wrench, name: "Loodgieter", color: "bg-blue-100 text-blue-700" },
    { icon: Home, name: "Dakdekker", color: "bg-green-100 text-green-700" },
    { icon: Zap, name: "Elektricien", color: "bg-yellow-100 text-yellow-700" },
    { icon: TreePine, name: "Hovenier", color: "bg-emerald-100 text-emerald-700" },
    { icon: Hammer, name: "Timmerman", color: "bg-orange-100 text-orange-700" },
    { icon: Users, name: "Schilder", color: "bg-purple-100 text-purple-700" }
  ];

  const stats = [
    { number: "10.000+", label: "Tevreden klanten" },
    { number: "2.500+", label: "Vakmensen" },
    { number: "50.000+", label: "Voltooide klussen" },
    { number: "4.8/5", label: "Gemiddelde beoordeling" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-klusdirect-gray-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-klusdirect-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-klusdirect-orange to-klusdirect-orange-dark rounded-xl flex items-center justify-center">
                <Hammer className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-klusdirect-orange to-klusdirect-blue bg-clip-text text-transparent">
                KlusDirect
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#hoe-werkt-het" className="text-klusdirect-gray-600 hover:text-klusdirect-orange transition-colors">
                Hoe werkt het?
              </a>
              <a href="#voor-vakmensen" className="text-klusdirect-gray-600 hover:text-klusdirect-orange transition-colors">
                Voor vakmensen
              </a>
              <Button variant="outline" size="sm">
                Inloggen
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold text-klusdirect-gray-900 mb-6 leading-tight">
              Verbind met de beste
              <span className="block bg-gradient-to-r from-klusdirect-orange to-klusdirect-blue bg-clip-text text-transparent">
                vakmensen
              </span>
              in jouw buurt
            </h2>
            <p className="text-xl text-klusdirect-gray-600 mb-12 max-w-3xl mx-auto">
              Of je nu op zoek bent naar een vakman voor jouw klus, of je eigen diensten wilt aanbieden - 
              KlusDirect brengt vraag en aanbod samen.
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 hover:border-klusdirect-orange/30 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-klusdirect-blue to-klusdirect-blue-dark rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-klusdirect-gray-900">
                  Ik zoek een vakman
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-klusdirect-gray-600 mb-6">
                  Plaats jouw klus en ontvang offertes van gekwalificeerde vakmensen in jouw omgeving.
                </p>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center text-klusdirect-gray-700">
                    <CheckCircle className="w-5 h-5 text-klusdirect-orange mr-3 flex-shrink-0" />
                    Gratis klus plaatsen
                  </li>
                  <li className="flex items-center text-klusdirect-gray-700">
                    <CheckCircle className="w-5 h-5 text-klusdirect-orange mr-3 flex-shrink-0" />
                    Meerdere offertes vergelijken
                  </li>
                  <li className="flex items-center text-klusdirect-gray-700">
                    <CheckCircle className="w-5 h-5 text-klusdirect-orange mr-3 flex-shrink-0" />
                    Veilig betalen via de app
                  </li>
                  <li className="flex items-center text-klusdirect-gray-700">
                    <CheckCircle className="w-5 h-5 text-klusdirect-orange mr-3 flex-shrink-0" />
                    Beoordeel jouw ervaring
                  </li>
                </ul>
                <Link to="/customer/register">
                  <Button size="lg" className="w-full bg-gradient-to-r from-klusdirect-blue to-klusdirect-blue-dark hover:from-klusdirect-blue-dark hover:to-klusdirect-blue text-white group-hover:scale-105 transition-transform">
                    Start als klant
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 hover:border-klusdirect-orange/30 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-klusdirect-orange to-klusdirect-orange-dark rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Hammer className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-klusdirect-gray-900">
                  Ik bied mijn diensten aan
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-klusdirect-gray-600 mb-6">
                  Registreer je als vakman en vind nieuwe klanten voor jouw specialisatie.
                </p>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center text-klusdirect-gray-700">
                    <CheckCircle className="w-5 h-5 text-klusdirect-orange mr-3 flex-shrink-0" />
                    Gratis account aanmaken
                  </li>
                  <li className="flex items-center text-klusdirect-gray-700">
                    <CheckCircle className="w-5 h-5 text-klusdirect-orange mr-3 flex-shrink-0" />
                    Ontvang relevante klussen
                  </li>
                  <li className="flex items-center text-klusdirect-gray-700">
                    <CheckCircle className="w-5 h-5 text-klusdirect-orange mr-3 flex-shrink-0" />
                    Zet jezelf op de kaart
                  </li>
                  <li className="flex items-center text-klusdirect-gray-700">
                    <CheckCircle className="w-5 h-5 text-klusdirect-orange mr-3 flex-shrink-0" />
                    Groei jouw bedrijf
                  </li>
                </ul>
                <Link to="/craftsman/register">
                  <Button size="lg" className="w-full bg-gradient-to-r from-klusdirect-orange to-klusdirect-orange-dark hover:from-klusdirect-orange-dark hover:to-klusdirect-orange text-white group-hover:scale-105 transition-transform">
                    Start als vakman
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-3xl md:text-4xl font-bold text-klusdirect-orange mb-2">
                  {stat.number}
                </div>
                <div className="text-klusdirect-gray-600 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-klusdirect-gray-900 mb-4">
              Populaire diensten
            </h3>
            <p className="text-xl text-klusdirect-gray-600">
              Van klein onderhoud tot grote projecten
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="text-center group cursor-pointer animate-fade-in hover:scale-105 transition-transform"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-shadow`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <div className="text-klusdirect-gray-700 font-medium">
                  {service.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-klusdirect-gray-900 mb-4">
              Waarom KlusDirect?
            </h3>
            <p className="text-xl text-klusdirect-gray-600">
              De betrouwbare manier om vakmensen te vinden
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-klusdirect-orange/10 to-klusdirect-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-klusdirect-orange" />
                  </div>
                  <h4 className="text-xl font-semibold text-klusdirect-gray-900 mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-klusdirect-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-klusdirect-orange to-klusdirect-blue">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Klaar om te beginnen?
          </h3>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Word onderdeel van het grootste platform voor vakmensen en klanten in Nederland
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/customer/register">
              <Button size="lg" variant="secondary" className="bg-white text-klusdirect-orange hover:bg-klusdirect-gray-50">
                Zoek een vakman
              </Button>
            </Link>
            <Link to="/craftsman/register">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-klusdirect-orange">
                Word vakman partner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-klusdirect-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-klusdirect-orange to-klusdirect-orange-dark rounded-xl flex items-center justify-center">
                  <Hammer className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold">KlusDirect</h4>
              </div>
              <p className="text-klusdirect-gray-400 mb-6">
                Het platform dat klanten en vakmensen verbindt voor een betere klusservaring.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Voor klanten</h5>
              <ul className="space-y-2 text-klusdirect-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Klus plaatsen</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Offertes vergelijken</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Beoordelingen</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Voor vakmensen</h5>
              <ul className="space-y-2 text-klusdirect-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Registreren</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Klussen vinden</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Abonnementen</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-klusdirect-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Voorwaarden</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-klusdirect-gray-800 mt-12 pt-8 text-center text-klusdirect-gray-400">
            <p>&copy; 2024 KlusDirect. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
