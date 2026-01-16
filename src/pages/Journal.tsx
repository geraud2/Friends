import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, BookOpen, Calendar, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: Date;
  mood?: string;
}

const mockEntries: JournalEntry[] = [
  {
    id: "1",
    title: "Gratitude du matin",
    content: "Aujourd'hui je suis reconnaissant pour ma santé, ma famille et cette belle journée ensoleillée...",
    date: new Date(),
    mood: "😊",
  },
  {
    id: "2",
    title: "Réflexions sur mes objectifs",
    content: "J'ai fait le point sur mes priorités. Ce qui compte vraiment pour moi c'est...",
    date: new Date(Date.now() - 86400000),
    mood: "🤔",
  },
  {
    id: "3",
    title: "Moment de calme",
    content: "J'ai pris 10 minutes pour méditer ce matin. Cela m'a aidé à me recentrer...",
    date: new Date(Date.now() - 86400000 * 2),
    mood: "😌",
  },
];

const Journal = () => {
  const [entries] = useState<JournalEntry[]>(mockEntries);
  const [isWriting, setIsWriting] = useState(false);
  const [newEntry, setNewEntry] = useState({ title: "", content: "" });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Journal</h1>
            <p className="text-muted-foreground">Vos pensées et réflexions</p>
          </div>
          <Button variant="sage" onClick={() => setIsWriting(!isWriting)}>
            <Plus className="w-4 h-4" />
            Nouvelle entrée
          </Button>
        </header>

        {/* New Entry Form */}
        {isWriting && (
          <Card variant="elevated" className="animate-slide-up">
            <CardContent className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Titre de votre entrée..."
                value={newEntry.title}
                onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                className="w-full text-xl font-semibold bg-transparent border-0 outline-none placeholder:text-muted-foreground/50"
              />
              <textarea
                placeholder="Que ressentez-vous aujourd'hui ? Quelles sont vos pensées ?"
                value={newEntry.content}
                onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                className="w-full min-h-[200px] bg-secondary/30 rounded-xl p-4 border-0 outline-none resize-none placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/20"
              />
              <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setIsWriting(false)}>
                  Annuler
                </Button>
                <Button variant="sage">
                  Enregistrer
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Entries List */}
        <div className="space-y-4">
          {entries.map((entry, index) => (
            <Card 
              key={entry.id} 
              variant="interactive"
              className={cn(
                "animate-slide-up",
                `animation-delay-${(index + 1) * 100}`
              )}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-terracotta-light flex items-center justify-center flex-shrink-0">
                    {entry.mood ? (
                      <span className="text-2xl">{entry.mood}</span>
                    ) : (
                      <BookOpen className="w-5 h-5 text-terracotta" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-semibold truncate">{entry.title}</h3>
                      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {entry.content}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span className="capitalize">{formatDate(entry.date)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Journal;
