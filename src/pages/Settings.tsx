import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Shield, Palette, LogOut, Sun, Moon, Monitor, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type Theme = 'light' | 'dark' | 'system';

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'system';
  });
  
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const applyTheme = (themeToApply: 'light' | 'dark') => {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(themeToApply);
      setActiveTheme(themeToApply);
    };

    let themeToApply: 'light' | 'dark';
    
    if (theme === 'system') {
      themeToApply = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      themeToApply = theme;
    }
    
    applyTheme(themeToApply);
    localStorage.setItem('theme', theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppLayout>
      {/* Effets d'arrière-plan */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-4xl mx-auto space-y-8 px-4 py-8">
        {/* Header */}
        <header className="text-center animate-slide-up">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl gradient-hero mb-4 border border-border/50">
            <Palette className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gradient">
            Paramètres
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Personnalisez votre expérience
          </p>
        </header>

        {/* Grille de cartes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Carte Profil */}
          <Card className="animate-slide-up border border-border/50 gradient-card overflow-hidden group hover:shadow-elevated transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary text-primary-foreground">
                  <User className="w-5 h-5" />
                </div>
                <CardTitle className="text-xl font-bold">Profil</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl gradient-primary p-0.5">
                  <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                    <span className="text-3xl">👤</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg">{user?.name || "Utilisateur"}</p>
                  <p className="text-sm text-muted-foreground">{user?.email || "utilisateur@email.com"}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
                      Premium
                    </span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full border-primary/30 hover:border-primary hover:bg-primary/5">
                Modifier le profil
              </Button>
            </CardContent>
          </Card>

          {/* Carte Notifications */}
          <Card className="animate-slide-up animation-delay-100 border border-border/50 gradient-card overflow-hidden group hover:shadow-elevated transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-accent text-accent-foreground">
                  <Bell className="w-5 h-5" />
                </div>
                <CardTitle className="text-xl font-bold">Notifications</CardTitle>
              </div>
              <CardDescription>Gérez vos rappels quotidiens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Rappel journal", desc: "Rappel quotidien à 21h", checked: true },
                { label: "Rappel humeur", desc: "3 fois par jour", checked: true },
                { label: "Citations motivantes", desc: "Une fois par jour", checked: false },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch 
                    defaultChecked={item.checked}
                    className="data-[state=checked]:bg-primary"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Carte Confidentialité */}
          <Card className="animate-slide-up animation-delay-200 border border-border/50 gradient-card overflow-hidden group hover:shadow-elevated transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-sage text-white">
                  <Shield className="w-5 h-5" />
                </div>
                <CardTitle className="text-xl font-bold">Confidentialité</CardTitle>
              </div>
              <CardDescription>Vos données restent privées</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium">Verrouillage biométrique</p>
                  <p className="text-sm text-muted-foreground">Face ID / Touch ID</p>
                </div>
                <Switch />
              </div>
              <Button variant="outline" className="w-full border-sage/30 hover:border-sage hover:bg-sage/5 text-sage">
                <Sparkles className="w-4 h-4 mr-2" />
                Exporter mes données
              </Button>
              <Button variant="outline" className="w-full border-destructive/30 hover:border-destructive hover:bg-destructive/5 text-destructive">
                Supprimer mon compte
              </Button>
            </CardContent>
          </Card>

          {/* Carte Apparence */}
          <Card className="animate-slide-up animation-delay-300 border border-border/50 gradient-card overflow-hidden group hover:shadow-elevated transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl gradient-primary">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">Apparence</CardTitle>
              </div>
              <CardDescription className="flex items-center gap-2">
                <span>Thème actuel: </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  activeTheme === 'light' 
                    ? 'bg-sunshine/20 text-sunshine' 
                    : 'bg-lavender/20 text-lavender'
                }`}>
                  {activeTheme === 'light' ? 'Clair ☀️' : 'Sombre 🌙'}
                  {theme === 'system' && ' (Système)'}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Bouton toggle principal */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/50">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${
                    activeTheme === 'dark' 
                      ? 'bg-lavender-light shadow-glow' 
                      : 'bg-sunshine-light'
                  }`}>
                    {activeTheme === 'dark' ? (
                      <Moon className="w-6 h-6 text-lavender" />
                    ) : (
                      <Sun className="w-6 h-6 text-sunshine" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-lg">Mode {activeTheme === 'light' ? 'clair' : 'sombre'}</p>
                    <p className="text-sm text-muted-foreground">
                      {activeTheme === 'light' 
                        ? 'Éclatant et énergisant' 
                        : 'Calme et reposant'}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setTheme(activeTheme === 'light' ? 'dark' : 'light')}
                  className="gradient-primary hover:opacity-90 shadow-lg hover:shadow-xl transition-all"
                >
                  {activeTheme === 'light' ? (
                    <>
                      <Moon className="w-4 h-4 mr-2" />
                      Passer en sombre
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4 mr-2" />
                      Passer en clair
                    </>
                  )}
                </Button>
              </div>

              {/* Options de thème */}
              <div className="grid grid-cols-3 gap-4">
                {/* Clair */}
                <button
                  onClick={() => setTheme('light')}
                  className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${
                    theme === 'light'
                      ? 'border-primary bg-primary/10 shadow-glow'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    theme === 'light'
                      ? 'bg-gradient-to-br from-sunshine to-orange-400 shadow-lg'
                      : 'bg-muted'
                  }`}>
                    <Sun className={`w-7 h-7 ${
                      theme === 'light' ? 'text-white' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="text-center">
                    <p className={`font-bold ${
                      theme === 'light' ? 'text-primary' : 'text-foreground'
                    }`}>
                      Clair
                    </p>
                    <div className={`w-3 h-3 rounded-full mx-auto mt-2 ${
                      theme === 'light' ? 'bg-primary' : 'bg-transparent'
                    }`} />
                  </div>
                </button>

                {/* Sombre */}
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${
                    theme === 'dark'
                      ? 'border-primary bg-primary/10 shadow-glow'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    theme === 'dark'
                      ? 'bg-gradient-to-br from-lavender to-purple-600 shadow-lg'
                      : 'bg-muted'
                  }`}>
                    <Moon className={`w-7 h-7 ${
                      theme === 'dark' ? 'text-white' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="text-center">
                    <p className={`font-bold ${
                      theme === 'dark' ? 'text-primary' : 'text-foreground'
                    }`}>
                      Sombre
                    </p>
                    <div className={`w-3 h-3 rounded-full mx-auto mt-2 ${
                      theme === 'dark' ? 'bg-primary' : 'bg-transparent'
                    }`} />
                  </div>
                </button>

                {/* Système */}
                <button
                  onClick={() => setTheme('system')}
                  className={`flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${
                    theme === 'system'
                      ? 'border-primary bg-primary/10 shadow-glow'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    theme === 'system'
                      ? 'bg-gradient-to-br from-ocean to-cyan-500 shadow-lg'
                      : 'bg-muted'
                  }`}>
                    <Monitor className={`w-7 h-7 ${
                      theme === 'system' ? 'text-white' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div className="text-center">
                    <p className={`font-bold ${
                      theme === 'system' ? 'text-primary' : 'text-foreground'
                    }`}>
                      Système
                    </p>
                    <div className={`w-3 h-3 rounded-full mx-auto mt-2 ${
                      theme === 'system' ? 'bg-primary' : 'bg-transparent'
                    }`} />
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bouton Déconnexion */}
        <div className="flex justify-center pt-6">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="px-8 py-6 rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive transition-all duration-300"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-bold">Se déconnecter</span>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;