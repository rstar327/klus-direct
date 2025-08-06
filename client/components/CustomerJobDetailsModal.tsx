import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  MapPin,
  Euro,
  Clock,
  Calendar,
  User,
  Phone,
  Mail,
  Crown,
  FileText,
  Camera,
  Building,
  Home,
  Wrench,
  Zap,
  X,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  Star
} from "lucide-react";

interface CustomerJobDetailsModalProps {
  children: React.ReactNode;
  job: any;
  onJobUpdated?: () => void;
  onJobDeleted?: () => void;
}

export default function CustomerJobDetailsModal({ children, job, onJobUpdated, onJobDeleted }: CustomerJobDetailsModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditJob = () => {
    // For now, just close this modal and trigger refresh
    // In a real app, this would open an edit form
    setIsOpen(false);
    if (onJobUpdated) {
      onJobUpdated();
    }
  };

  const handleDeleteJob = () => {
    setIsDeleting(true);

    try {
      // Get existing jobs
      const existingJobs = JSON.parse(localStorage.getItem('customerJobs') || '[]');

      // Filter out the job to delete
      const updatedJobs = existingJobs.filter((j: any) => j.id !== job.id);

      // Update localStorage
      localStorage.setItem('customerJobs', JSON.stringify(updatedJobs));

      // Also remove from public jobs
      const publicJobs = JSON.parse(localStorage.getItem('publicJobs') || '[]');
      const updatedPublicJobs = publicJobs.filter((j: any) => j.id !== job.id);
      localStorage.setItem('publicJobs', JSON.stringify(updatedPublicJobs));

      setIsOpen(false);
      setIsDeleting(false);

      // Trigger refresh
      if (onJobDeleted) {
        onJobDeleted();
      }

      // Trigger custom event for dashboard refresh
      window.dispatchEvent(new CustomEvent('jobDeleted'));

    } catch (error) {
      console.error('Error deleting job:', error);
      setIsDeleting(false);
    }
  };

  if (!job) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'bathroom': return <Home className="w-5 h-5" />;
      case 'kitchen': return <Wrench className="w-5 h-5" />;
      case 'electrical': return <Zap className="w-5 h-5" />;
      case 'plumbing': return <Wrench className="w-5 h-5" />;
      case 'garden': return <Home className="w-5 h-5" />;
      case 'painting': return <Home className="w-5 h-5" />;
      case 'renovation': return <Building className="w-5 h-5" />;
      default: return <Wrench className="w-5 h-5" />;
    }
  };

  const getCategoryName = (category: string) => {
    const categories = {
      bathroom: 'Badkamer',
      kitchen: 'Keuken', 
      electrical: 'Elektra',
      plumbing: 'Loodgieter',
      garden: 'Tuin',
      painting: 'Schilderwerk',
      renovation: 'Renovatie'
    };
    return categories[category] || category;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass border border-premium-600/30">
        <DialogHeader>
          <DialogTitle className="text-2xl text-premium-50 flex items-center">
            <Crown className="w-6 h-6 mr-2 text-klusdirect-gold" />
            Klus Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Job Header */}
          <Card className="glass border border-premium-600/30">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl text-premium-50 mb-2">
                    {job.title}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-premium-300">
                    <div className="flex items-center">
                      {getCategoryIcon(job.category)}
                      <span className="ml-1">{getCategoryName(job.category)}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-klusdirect-orange" />
                      {formatDate(job.createdAt)}
                    </div>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-klusdirect-blue/20 to-klusdirect-blue/10 text-klusdirect-blue border border-klusdirect-blue/30">
                  <Clock className="w-3 h-3 mr-1" />
                  Actief
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-premium-200 leading-relaxed">
                {job.description}
              </p>
            </CardContent>
          </Card>

          {/* Location & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass border border-premium-600/30">
              <CardHeader>
                <CardTitle className="text-lg text-premium-50 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-klusdirect-blue" />
                  Locatie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Building className="w-4 h-4 mr-2 text-premium-400 mt-1" />
                    <div>
                      <p className="text-premium-200">{job.jobLocation || job.location}</p>
                      {job.isBusinessAccount && job.businessLocation && (
                        <p className="text-premium-400 text-sm">Bedrijfslocatie: {job.businessLocation}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border border-premium-600/30">
              <CardHeader>
                <CardTitle className="text-lg text-premium-50 flex items-center">
                  <Euro className="w-5 h-5 mr-2 text-green-400" />
                  Budget
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-premium-200">
                  {job.budgetMin && job.budgetMax ? (
                    <>
                      <p className="text-2xl font-bold text-green-400">€{job.budgetMin} - €{job.budgetMax}</p>
                      <p className="text-sm text-premium-400 mt-1">
                        {job.budgetType === 'hourly' ? 'Per uur' : 'Totaal project'} - Inclusief BTW
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-2xl font-bold text-premium-400">Nog niet ingesteld</p>
                      <p className="text-sm text-premium-400 mt-1">Budget kan later worden aangepast</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Project Timeline */}
          <Card className="glass border border-premium-600/30">
            <CardHeader>
              <CardTitle className="text-lg text-premium-50 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-klusdirect-orange" />
                Planning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-premium-400 text-sm mb-1">Gewenste startdatum</p>
                  <p className="text-premium-200">
                    {job.startDate ? formatDate(job.startDate) : 'Zo snel mogelijk'}
                  </p>
                </div>
                <div>
                  <p className="text-premium-400 text-sm mb-1">Geschatte duur</p>
                  <p className="text-premium-200">{job.estimatedDuration || 'Te bepalen'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Requirements */}
          {job.additionalRequirements && (
            <Card className="glass border border-premium-600/30">
              <CardHeader>
                <CardTitle className="text-lg text-premium-50 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-premium-400" />
                  Aanvullende Eisen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-premium-200 leading-relaxed">
                  {job.additionalRequirements}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Photos */}
          {job.photos && job.photos.length > 0 && (
            <Card className="glass border border-premium-600/30">
              <CardHeader>
                <CardTitle className="text-lg text-premium-50 flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-premium-400" />
                  Foto's ({job.photos.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {job.photos.map((photo: string, index: number) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-premium-600/30"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button size="sm" variant="ghost" className="text-white">
                          <Camera className="w-4 h-4 mr-1" />
                          Bekijk
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact Preferences */}
          <Card className="glass border border-premium-600/30">
            <CardHeader>
              <CardTitle className="text-lg text-premium-50 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-premium-400" />
                Contact Voorkeuren
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                {job.preferredContact === 'phone' && (
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-klusdirect-blue" />
                    <span className="text-premium-200">Voorkeur voor telefonisch contact</span>
                  </div>
                )}
                {job.preferredContact === 'email' && (
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-klusdirect-blue" />
                    <span className="text-premium-200">Voorkeur voor email contact</span>
                  </div>
                )}
                {job.preferredContact === 'app' && (
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2 text-klusdirect-blue" />
                    <span className="text-premium-200">Voorkeur voor app berichten</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Job Status & Actions */}
          <Card className="glass border border-premium-600/30">
            <CardHeader>
              <CardTitle className="text-lg text-premium-50 flex items-center">
                <Star className="w-5 h-5 mr-2 text-klusdirect-gold" />
                Status & Acties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-premium-200">Klus is geplaatst en zichtbaar voor vakmensen</span>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={handleEditJob}
                    variant="outline"
                    size="sm"
                    className="border-klusdirect-orange text-klusdirect-orange hover:bg-klusdirect-orange/10"
                  >
                    Bewerken
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-500 text-red-400 hover:bg-red-500/10"
                        disabled={isDeleting}
                      >
                        {isDeleting ? 'Verwijderen...' : 'Verwijderen'}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="glass border border-premium-600/30">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-premium-50">
                          Klus verwijderen?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-premium-300">
                          Weet je zeker dat je de klus "{job.title}" wilt verwijderen?
                          Deze actie kan niet ongedaan worden gemaakt. Alle bijbehorende offertes gaan ook verloren.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="border-premium-600 text-premium-200 hover:bg-premium-700">
                          Annuleren
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteJob}
                          className="bg-red-600 text-white hover:bg-red-700"
                          disabled={isDeleting}
                        >
                          {isDeleting ? 'Verwijderen...' : 'Ja, verwijderen'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            onClick={() => setIsOpen(false)}
            className="bg-gradient-to-r from-klusdirect-blue to-klusdirect-blue-dark text-white"
          >
            Sluiten
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
