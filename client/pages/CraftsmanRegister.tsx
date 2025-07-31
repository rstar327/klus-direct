import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Hammer, Building, Award, MapPin } from "lucide-react";

export default function CraftsmanRegister() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-klusdirect-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-klusdirect-gray-600 hover:text-klusdirect-orange transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Terug naar home
            </Link>
          </div>

          <Card className="border-2 border-klusdirect-gray-200">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-klusdirect-gray-900 mb-2">
                Registreer als vakman
              </CardTitle>
              <p className="text-klusdirect-gray-600">
                Word partner en vind nieuwe klanten
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-br from-klusdirect-orange/10 to-klusdirect-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Hammer className="w-8 h-8 text-klusdirect-orange" />
                </div>
                <h3 className="text-xl font-semibold text-klusdirect-gray-900 mb-4">
                  Vakman registratie coming soon
                </h3>
                <p className="text-klusdirect-gray-600 mb-8 max-w-md mx-auto">
                  Deze pagina wordt momenteel ontwikkeld. Hier komt binnenkort het registratieformulier 
                  voor vakmensen met alle benodigde verificatie en bedrijfsgegevens.
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-left max-w-md mx-auto mb-8">
                  <div className="flex items-center text-klusdirect-gray-700">
                    <Building className="w-5 h-5 text-klusdirect-orange mr-3" />
                    Bedrijfsgegevens
                  </div>
                  <div className="flex items-center text-klusdirect-gray-700">
                    <Award className="w-5 h-5 text-klusdirect-orange mr-3" />
                    Specialisaties
                  </div>
                  <div className="flex items-center text-klusdirect-gray-700">
                    <MapPin className="w-5 h-5 text-klusdirect-orange mr-3" />
                    Werkgebied
                  </div>
                  <div className="flex items-center text-klusdirect-gray-700">
                    <Hammer className="w-5 h-5 text-klusdirect-orange mr-3" />
                    Portfolio
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to="/craftsman/dashboard">
                    <Button className="w-full bg-gradient-to-r from-klusdirect-orange to-klusdirect-orange-dark">
                      Ga naar vakman dashboard (demo)
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button variant="outline" className="w-full">
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
