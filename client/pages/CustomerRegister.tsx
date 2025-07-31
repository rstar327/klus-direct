import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, MapPin, Phone, Mail, Crown, Shield, Star } from "lucide-react";

export default function CustomerRegister() {
  return (
    <div className="min-h-screen bg-premium-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-premium-900 via-premium-800 to-premium-900"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-klusdirect-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-klusdirect-orange/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-premium-300 hover:text-klusdirect-gold transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Terug naar home
            </Link>
          </div>

          <Card className="glass border-2 border-premium-600/30">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Badge className="bg-gradient-to-r from-klusdirect-blue/20 to-klusdirect-blue/10 text-klusdirect-blue border border-klusdirect-blue/30 px-4 py-2">
                  <Crown className="w-4 h-4 mr-2" />
                  Premium Client Registratie
                </Badge>
              </div>
              <CardTitle className="text-3xl text-premium-50 mb-2">
                Word Premium Klant
              </CardTitle>
              <p className="text-premium-200">
                Toegang tot Nederland's beste vakmensen en exclusieve service
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-klusdirect-blue to-klusdirect-blue-dark rounded-2xl flex items-center justify-center mx-auto mb-6 glow-orange">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-premium-50 mb-4">
                  Premium Registratie in Ontwikkeling
                </h3>
                <p className="text-premium-200 mb-8 max-w-md mx-auto text-lg">
                  Deze exclusieve klant registratie wordt momenteel ontwikkeld. Hier komt binnenkort het complete
                  premium onboarding proces voor onze elite klanten.
                </p>

                <div className="grid grid-cols-2 gap-6 text-left max-w-lg mx-auto mb-10">
                  <div className="flex items-center text-premium-100 p-3 glass rounded-lg border border-premium-600/30">
                    <User className="w-6 h-6 text-klusdirect-blue mr-3" />
                    <span>Premium Profiel Setup</span>
                  </div>
                  <div className="flex items-center text-premium-100 p-3 glass rounded-lg border border-premium-600/30">
                    <MapPin className="w-6 h-6 text-klusdirect-blue mr-3" />
                    <span>Exclusieve Locatie Service</span>
                  </div>
                  <div className="flex items-center text-premium-100 p-3 glass rounded-lg border border-premium-600/30">
                    <Phone className="w-6 h-6 text-klusdirect-blue mr-3" />
                    <span>24/7 Premium Support</span>
                  </div>
                  <div className="flex items-center text-premium-100 p-3 glass rounded-lg border border-premium-600/30">
                    <Shield className="w-6 h-6 text-klusdirect-blue mr-3" />
                    <span>Luxury Betalingsbescherming</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <Link to="/customer/dashboard">
                    <Button className="w-full bg-gradient-to-r from-klusdirect-blue to-klusdirect-blue-dark text-white font-semibold text-lg py-6 hover:scale-105 transition-transform">
                      <Star className="w-5 h-5 mr-2" />
                      Bekijk Premium Dashboard (preview)
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button variant="outline" className="w-full border-premium-600 text-premium-200 hover:bg-premium-700">
                      Terug naar home
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
