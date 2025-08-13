import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Mail,
  Shield,
  Crown,
  Sparkles,
  Home,
  Eye,
  EyeOff,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Special test account - 111 always gets access
      if (formData.email === "111" && formData.password === "111") {
        toast({
          title: "Admin toegang verleend",
          description: "Welkom admin bij KlusDirect.",
        });
        window.location.href = "/craftsman/dashboard";
        return;
      }

      // Validate email format
      if (!isValidEmail(formData.email)) {
        toast({
          title: "Ongeldig email adres",
          description: "Voer een geldig email adres in (bijv. naam@email.nl)",
          variant: "destructive",
        });
        return;
      }

      // Validate password length
      if (formData.password.length < 6) {
        toast({
          title: "Wachtwoord te kort",
          description: "Wachtwoord moet minimaal 6 karakters zijn",
          variant: "destructive",
        });
        return;
      }

      // Try to sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        // Specific error messages for different scenarios
        if (error.message.includes("Invalid login credentials")) {
          toast({
            title: "Onjuiste gegevens",
            description: "Email of wachtwoord is incorrect. Heb je al een account?",
            variant: "destructive",
          });
        } else if (error.message.includes("Email not confirmed")) {
          toast({
            title: "Email niet bevestigd",
            description: "Check je mailbox en bevestig je account eerst.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Login mislukt",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      if (!data.user) {
        toast({
          title: "Account niet gevonden",
          description: "Er bestaat geen account met deze gegevens. Registreer je eerst.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Login succesvol!",
        description: "Welkom terug bij KlusDirect.",
      });

      // Redirect to dashboard
      window.location.href = "/craftsman/dashboard";
    } catch (error) {
      toast({
        title: "Er ging iets mis",
        description: "Controleer je internetverbinding en probeer opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.email && formData.password;

  return (
    <div className="min-h-screen bg-premium-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-premium-900 via-premium-800 to-premium-900"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-klusdirect-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-klusdirect-orange/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 glass border-b border-premium-700/50">
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
                  <span className="text-xs text-klusdirect-gold font-medium">
                    PREMIUM
                  </span>
                </div>
              </div>
            </Link>
            <Link to="/">
              <Button
                variant="outline"
                size="sm"
                className="border-premium-600 text-premium-200 hover:bg-premium-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Terug naar home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card className="glass border border-premium-600/30">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-klusdirect-blue/20 to-klusdirect-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-klusdirect-blue/30">
                <Shield className="w-10 h-10 text-klusdirect-blue" />
              </div>
              <CardTitle className="text-2xl text-premium-50 flex items-center justify-center">
                <Crown className="w-6 h-6 mr-2 text-klusdirect-gold" />
                Premium Login
              </CardTitle>
              <p className="text-premium-300">
                Log in op je KlusDirect Pro account
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-premium-200">
                    E-mailadres
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-premium-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 placeholder:text-premium-400 pl-11"
                      placeholder="je@email.nl"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-premium-200">
                    Wachtwoord
                  </Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-3 w-5 h-5 text-premium-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 placeholder:text-premium-400 pl-11 pr-11"
                      placeholder="Je wachtwoord"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-premium-400 hover:text-premium-200"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className="w-full bg-gradient-to-r from-klusdirect-blue to-klusdirect-blue-dark text-white font-semibold text-lg py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {isLoading ? "Bezig met inloggen..." : "Premium Inloggen"}
                </Button>
              </form>

              <div className="mt-8 text-center space-y-4">
                <div className="flex items-center justify-center space-x-2 text-premium-300">
                  <div className="h-px bg-premium-600 flex-1"></div>
                  <span className="text-sm">Nog geen account?</span>
                  <div className="h-px bg-premium-600 flex-1"></div>
                </div>

                <div className="space-y-3">
                  <Link to="/craftsman/register">
                    <Button
                      variant="outline"
                      className="w-full border-klusdirect-orange/30 text-klusdirect-orange hover:bg-klusdirect-orange/10"
                    >
                      Registreer als Vakman
                    </Button>
                  </Link>
                  <Link to="/customer/register">
                    <Button
                      variant="outline"
                      className="w-full border-klusdirect-blue/30 text-klusdirect-blue hover:bg-klusdirect-blue/10"
                    >
                      Registreer als Klant
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-premium-400 text-sm">
                  Wachtwoord vergeten?
                  <button className="text-klusdirect-blue hover:text-klusdirect-blue-dark ml-1">
                    Reset hier
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
