import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Save,
  X,
  Euro,
  MapPin,
  Calendar,
  Clock,
  Home,
  Building,
  Wrench,
  Zap
} from "lucide-react";

interface EditJobModalProps {
  children: React.ReactNode;
  job: any;
  onJobUpdated: () => void;
}

export default function EditJobModal({ children, job, onJobUpdated }: EditJobModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState({
    title: '',
    category: '',
    description: '',
    budgetMin: '',
    budgetMax: '',
    budgetType: 'fixed',
    startDate: '',
    estimatedDuration: '',
    additionalRequirements: '',
    preferredContact: 'phone'
  });

  const categories = [
    { id: 'bathroom', name: 'Badkamer renovatie', icon: Home },
    { id: 'kitchen', name: 'Keuken installatie', icon: Building },
    { id: 'plumbing', name: 'Loodgieter werk', icon: Wrench },
    { id: 'electrical', name: 'Elektra werk', icon: Zap },
    { id: 'tiling', name: 'Tegelwerk', icon: Home },
    { id: 'garden', name: 'Tuinonderhoud', icon: Home },
    { id: 'painting', name: 'Schilderwerk', icon: Home },
    { id: 'renovation', name: 'Verbouwing', icon: Building }
  ];

  useEffect(() => {
    if (job && isOpen) {
      setEditData({
        title: job.title || '',
        category: job.category || '',
        description: job.description || '',
        budgetMin: job.budgetMin || '',
        budgetMax: job.budgetMax || '',
        budgetType: job.budgetType || 'fixed',
        startDate: job.startDate || '',
        estimatedDuration: job.estimatedDuration || '',
        additionalRequirements: job.additionalRequirements || '',
        preferredContact: job.preferredContact || 'phone'
      });
    }
  }, [job, isOpen]);

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Get existing jobs
      const existingJobs = JSON.parse(localStorage.getItem('customerJobs') || '[]');
      
      // Find and update the job
      const updatedJobs = existingJobs.map((j: any) => {
        if (j.id === job.id) {
          return {
            ...j,
            ...editData,
            updatedAt: new Date().toISOString()
          };
        }
        return j;
      });
      
      // Save back to localStorage
      localStorage.setItem('customerJobs', JSON.stringify(updatedJobs));
      
      // Also update in public jobs
      const publicJobs = JSON.parse(localStorage.getItem('publicJobs') || '[]');
      const updatedPublicJobs = publicJobs.map((j: any) => {
        if (j.id === job.id) {
          return {
            ...j,
            title: editData.title,
            budget: {
              min: parseInt(editData.budgetMin) || 0,
              max: parseInt(editData.budgetMax) || 0,
              currency: 'EUR'
            }
          };
        }
        return j;
      });
      localStorage.setItem('publicJobs', JSON.stringify(updatedPublicJobs));
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSaving(false);
      setIsOpen(false);
      
      // Trigger refresh
      onJobUpdated();
      window.dispatchEvent(new CustomEvent('jobUpdated'));
      
    } catch (error) {
      console.error('Error updating job:', error);
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto glass border border-premium-600/30">
        <DialogHeader>
          <DialogTitle className="text-2xl text-premium-50 flex items-center">
            <Save className="w-6 h-6 mr-2 text-klusdirect-orange" />
            Klus Bewerken
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <Card className="glass border border-premium-600/30">
            <CardHeader>
              <CardTitle className="text-lg text-premium-50">Basis Informatie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-premium-200">Titel van de klus</Label>
                <Input
                  value={editData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                  placeholder="Bijv. Badkamer renovatie"
                />
              </div>

              <div>
                <Label className="text-premium-200">Categorie</Label>
                <Select value={editData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1">
                    <SelectValue placeholder="Selecteer een categorie" />
                  </SelectTrigger>
                  <SelectContent className="glass border border-premium-600/30">
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id} className="text-premium-50">
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-premium-200">Beschrijving</Label>
                <Textarea
                  value={editData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1 min-h-[80px]"
                  placeholder="Beschrijf je klus in detail..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Budget */}
          <Card className="glass border border-premium-600/30">
            <CardHeader>
              <CardTitle className="text-lg text-premium-50 flex items-center">
                <Euro className="w-5 h-5 mr-2 text-green-400" />
                Budget
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-premium-200">Minimum budget (€)</Label>
                  <Input
                    type="number"
                    value={editData.budgetMin}
                    onChange={(e) => handleInputChange('budgetMin', e.target.value)}
                    className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                    placeholder="500"
                  />
                </div>
                <div>
                  <Label className="text-premium-200">Maximum budget (€)</Label>
                  <Input
                    type="number"
                    value={editData.budgetMax}
                    onChange={(e) => handleInputChange('budgetMax', e.target.value)}
                    className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                    placeholder="1000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="glass border border-premium-600/30">
            <CardHeader>
              <CardTitle className="text-lg text-premium-50 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-klusdirect-orange" />
                Planning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-premium-200">Gewenste startdatum</Label>
                  <Input
                    type="date"
                    value={editData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-premium-200">Geschatte duur</Label>
                  <Input
                    value={editData.estimatedDuration}
                    onChange={(e) => handleInputChange('estimatedDuration', e.target.value)}
                    className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 mt-1"
                    placeholder="Bijv. 2 weken"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Requirements */}
          <Card className="glass border border-premium-600/30">
            <CardHeader>
              <CardTitle className="text-lg text-premium-50">Aanvullende Eisen</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={editData.additionalRequirements}
                onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
                className="glass border-premium-600/30 bg-premium-800/50 text-premium-50 min-h-[80px]"
                placeholder="Bijv. gebruik van specifieke materialen, werktijden..."
              />
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            className="border-premium-600 text-premium-200 hover:bg-premium-700"
            disabled={isSaving}
          >
            <X className="w-4 h-4 mr-2" />
            Annuleren
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-klusdirect-orange to-klusdirect-orange-dark text-white"
            disabled={isSaving || !editData.title || !editData.category || !editData.description}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Opslaan...' : 'Wijzigingen Opslaan'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
