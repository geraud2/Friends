import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const moods = [
  { emoji: "😄", label: "Super", color: "bg-mood-great", value: 5 },
  { emoji: "🙂", label: "Bien", color: "bg-mood-good", value: 4 },
  { emoji: "😐", label: "Neutre", color: "bg-mood-okay", value: 3 },
  { emoji: "😔", label: "Bof", color: "bg-mood-low", value: 2 },
  { emoji: "😢", label: "Difficile", color: "bg-mood-bad", value: 1 },
];

const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const moodHistory = [
  { day: "Lun", mood: 4 },
  { day: "Mar", mood: 5 },
  { day: "Mer", mood: 3 },
  { day: "Jeu", mood: 4 },
  { day: "Ven", mood: 5 },
  { day: "Sam", mood: 4 },
  { day: "Dim", mood: null },
];

const getMoodColor = (value: number | null) => {
  if (value === null) return "bg-muted";
  const mood = moods.find(m => m.value === value);
  return mood?.color || "bg-muted";
};

const getMoodEmoji = (value: number | null) => {
  if (value === null) return "?";
  const mood = moods.find(m => m.value === value);
  return mood?.emoji || "?";
};

const Mood = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");

  const handleSaveMood = () => {
    if (selectedMood !== null) {
      // Save mood logic here
      console.log({ mood: selectedMood, note });
      setSelectedMood(null);
      setNote("");
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 space-y-6 md:space-y-8">
        {/* Header */}
        <header className="pt-4 sm:pt-6 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Suivi d'humeur</h1>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg mt-1 md:mt-2">
            Suivez votre bien-être émotionnel
          </p>
        </header>

        {/* Today's Mood */}
        <Card variant="elevated" className="animate-slide-up">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl md:text-2xl">
              Comment vous sentez-vous aujourd'hui ?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 md:space-y-8">
            {/* Émojis en grid pour une disposition parfaite */}
            <div className="grid grid-cols-5 gap-1 sm:gap-2 md:gap-3 lg:gap-4">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={cn(
                    "flex flex-col items-center p-2 sm:p-3 md:p-4 rounded-xl md:rounded-2xl",
                    "transition-all duration-300 hover:bg-secondary/80",
                    "active:scale-95 hover:scale-105",
                    selectedMood === mood.value && cn(
                      "bg-secondary ring-2 ring-primary scale-105",
                      "shadow-elevated"
                    )
                  )}
                >
                  {/* Émoji avec taille responsive */}
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-1 sm:mb-2">
                    {mood.emoji}
                  </span>
                  {/* Label avec taille responsive */}
                  <span className="text-xs sm:text-sm md:text-base font-medium text-muted-foreground">
                    {mood.label}
                  </span>
                </button>
              ))}
            </div>

            {selectedMood !== null && (
              <div className="animate-slide-up space-y-4 md:space-y-6">
                <textarea
                  placeholder="Ajoutez une note sur votre journée (optionnel)..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full min-h-[80px] sm:min-h-[100px] md:min-h-[120px] 
                           bg-secondary/30 rounded-lg md:rounded-xl 
                           p-3 sm:p-4 md:p-5 border-0 outline-none 
                           resize-none placeholder:text-muted-foreground/50 
                           focus:ring-2 focus:ring-primary/20 
                           text-sm sm:text-base md:text-lg"
                  rows={3}
                />
                <div className="flex justify-end">
                  <Button 
                    variant="sage" 
                    onClick={handleSaveMood} 
                    className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3"
                    size="lg"
                  >
                    Enregistrer mon humeur
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Week Overview */}
        <Card variant="elevated" className="animate-slide-up animation-delay-100">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl md:text-2xl">
              Cette semaine
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Grille pour les jours de la semaine */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 md:gap-3">
              {moodHistory.map((day) => (
                <div 
                  key={day.day} 
                  className="flex flex-col items-center gap-1 sm:gap-2"
                >
                  <span className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {day.day}
                  </span>
                  <div className={cn(
                    "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12",
                    "rounded-lg md:rounded-xl flex items-center justify-center",
                    "text-lg sm:text-xl md:text-2xl transition-all",
                    getMoodColor(day.mood),
                    day.mood !== null && "shadow-soft"
                  )}>
                    {getMoodEmoji(day.mood)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          <Card variant="feature" className="animate-slide-up animation-delay-200">
            <CardContent className="p-4 sm:p-5 md:p-6 text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-sage">
                4.2
              </p>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-1 sm:mt-2">
                Moyenne du mois
              </p>
            </CardContent>
          </Card>
          
          <Card variant="feature" className="animate-slide-up animation-delay-300">
            <CardContent className="p-4 sm:p-5 md:p-6 text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-terracotta">
                5
              </p>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-1 sm:mt-2">
                Jours "Super"
              </p>
            </CardContent>
          </Card>
          
          <Card variant="feature" className="animate-slide-up animation-delay-400 sm:col-span-2 lg:col-span-1">
            <CardContent className="p-4 sm:p-5 md:p-6 text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-ocean">
                12
              </p>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mt-1 sm:mt-2">
                Jours enregistrés
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Mood;