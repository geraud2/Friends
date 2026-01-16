import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Shield, Palette, LogOut } from "lucide-react";

const Settings = () => {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <header>
          <h1 className="text-2xl font-bold">Paramètres</h1>
          <p className="text-muted-foreground">Personnalisez votre expérience</p>
        </header>

        {/* Profile */}
        <Card variant="elevated" className="animate-slide-up">
          <CardHeader>
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Profil</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <p className="font-semibold">Utilisateur</p>
                <p className="text-sm text-muted-foreground">utilisateur@email.com</p>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              Modifier le profil
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card variant="elevated" className="animate-slide-up animation-delay-100">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Notifications</CardTitle>
            </div>
            <CardDescription>Gérez vos rappels quotidiens</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Rappel journal</p>
                <p className="text-sm text-muted-foreground">Rappel quotidien à 21h</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Rappel humeur</p>
                <p className="text-sm text-muted-foreground">3 fois par jour</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Citations motivantes</p>
                <p className="text-sm text-muted-foreground">Une fois par jour</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card variant="elevated" className="animate-slide-up animation-delay-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Confidentialité</CardTitle>
            </div>
            <CardDescription>Vos données restent privées</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Verrouillage biométrique</p>
                <p className="text-sm text-muted-foreground">Face ID / Touch ID</p>
              </div>
              <Switch />
            </div>
            <Button variant="outline" className="w-full">
              Exporter mes données
            </Button>
            <Button variant="outline" className="w-full text-destructive hover:text-destructive">
              Supprimer mon compte
            </Button>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card variant="elevated" className="animate-slide-up animation-delay-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Apparence</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mode sombre</p>
                <p className="text-sm text-muted-foreground">Basculer entre clair et sombre</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Logout */}
        <Button variant="outline" className="w-full gap-2">
          <LogOut className="w-4 h-4" />
          Se déconnecter
        </Button>
      </div>
    </AppLayout>
  );
};

export default Settings;
