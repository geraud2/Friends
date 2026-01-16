import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Lightbulb, Star, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Idea {
  id: string;
  content: string;
  starred: boolean;
  createdAt: Date;
  color: string;
}

const colors = [
  "bg-sunshine-light border-sunshine/30",
  "bg-sage-light border-sage/30",
  "bg-terracotta-light border-terracotta/30",
  "bg-lavender-light border-lavender/30",
  "bg-ocean-light border-ocean/30",
];

const mockIdeas: Idea[] = [
  {
    id: "1",
    content: "Créer une routine matinale de 30 minutes avec méditation, étirements et écriture",
    starred: true,
    createdAt: new Date(),
    color: colors[0],
  },
  {
    id: "2",
    content: "Essayer le journaling gratitude tous les soirs avant de dormir",
    starred: false,
    createdAt: new Date(Date.now() - 86400000),
    color: colors[1],
  },
  {
    id: "3",
    content: "Organiser une digital detox le weekend",
    starred: true,
    createdAt: new Date(Date.now() - 86400000 * 2),
    color: colors[2],
  },
  {
    id: "4",
    content: "Apprendre la respiration carrée pour gérer le stress",
    starred: false,
    createdAt: new Date(Date.now() - 86400000 * 3),
    color: colors[3],
  },
];

const Ideas = () => {
  const [ideas, setIdeas] = useState<Idea[]>(mockIdeas);
  const [newIdea, setNewIdea] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const addIdea = () => {
    if (newIdea.trim()) {
      const idea: Idea = {
        id: Date.now().toString(),
        content: newIdea.trim(),
        starred: false,
        createdAt: new Date(),
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setIdeas([idea, ...ideas]);
      setNewIdea("");
      setIsAdding(false);
    }
  };

  const toggleStar = (id: string) => {
    setIdeas(ideas.map(idea => 
      idea.id === id ? { ...idea, starred: !idea.starred } : idea
    ));
  };

  const deleteIdea = (id: string) => {
    setIdeas(ideas.filter(idea => idea.id !== id));
  };

  const starredIdeas = ideas.filter(idea => idea.starred);
  const regularIdeas = ideas.filter(idea => !idea.starred);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Mes Idées</h1>
            <p className="text-muted-foreground">Capturez vos inspirations</p>
          </div>
          <Button variant="sage" onClick={() => setIsAdding(true)}>
            <Plus className="w-4 h-4" />
            Nouvelle idée
          </Button>
        </header>

        {/* New Idea Input */}
        {isAdding && (
          <Card variant="elevated" className="animate-slide-up">
            <CardContent className="p-4">
              <textarea
                autoFocus
                placeholder="Décrivez votre idée..."
                value={newIdea}
                onChange={(e) => setNewIdea(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    addIdea();
                  }
                }}
                className="w-full min-h-[100px] bg-transparent border-0 outline-none resize-none placeholder:text-muted-foreground/50 text-lg"
              />
              <div className="flex justify-end gap-3 mt-4">
                <Button variant="ghost" onClick={() => setIsAdding(false)}>
                  Annuler
                </Button>
                <Button variant="sage" onClick={addIdea}>
                  Ajouter
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Starred Ideas */}
        {starredIdeas.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-sunshine fill-sunshine" />
              Favoris
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {starredIdeas.map((idea, index) => (
                <IdeaCard 
                  key={idea.id} 
                  idea={idea} 
                  index={index}
                  onToggleStar={toggleStar}
                  onDelete={deleteIdea}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Ideas */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-muted-foreground" />
            Toutes les idées
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {regularIdeas.map((idea, index) => (
              <IdeaCard 
                key={idea.id} 
                idea={idea} 
                index={index}
                onToggleStar={toggleStar}
                onDelete={deleteIdea}
              />
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

interface IdeaCardProps {
  idea: Idea;
  index: number;
  onToggleStar: (id: string) => void;
  onDelete: (id: string) => void;
}

function IdeaCard({ idea, index, onToggleStar, onDelete }: IdeaCardProps) {
  return (
    <Card 
      className={cn(
        "border-2 transition-all duration-200 hover:shadow-elevated animate-slide-up",
        idea.color,
        `animation-delay-${(index % 5) * 100}`
      )}
    >
      <CardContent className="p-4">
        <p className="text-foreground leading-relaxed mb-4">{idea.content}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {idea.createdAt.toLocaleDateString('fr-FR')}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onToggleStar(idea.id)}
            >
              <Star className={cn(
                "w-4 h-4",
                idea.starred && "text-sunshine fill-sunshine"
              )} />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onDelete(idea.id)}
            >
              <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Ideas;
