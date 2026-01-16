import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, MessageCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

const entries = [
  {
    type: "journal",
    icon: BookOpen,
    title: "Réflexions du matin",
    preview: "Aujourd'hui je me sens reconnaissant pour...",
    time: "Il y a 2h",
    color: "text-terracotta",
    bgColor: "bg-terracotta-light",
  },
  {
    type: "chat",
    icon: MessageCircle,
    title: "Conversation IA",
    preview: "Discussion sur la gestion du stress...",
    time: "Hier",
    color: "text-sage",
    bgColor: "bg-sage-light",
  },
  {
    type: "idea",
    icon: Lightbulb,
    title: "Nouvelle idée",
    preview: "Créer une routine matinale structurée...",
    time: "Il y a 2 jours",
    color: "text-sunshine",
    bgColor: "bg-sunshine-light",
  },
];

export function RecentEntries() {
  return (
    <Card variant="elevated">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Activité récente</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {entries.map((entry, index) => (
          <div 
            key={index} 
            className={cn(
              "flex items-start gap-4 p-3 rounded-xl transition-colors cursor-pointer",
              "hover:bg-secondary/50"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
              entry.bgColor
            )}>
              <entry.icon className={cn("w-5 h-5", entry.color)} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h4 className="font-medium truncate">{entry.title}</h4>
                <span className="text-xs text-muted-foreground flex-shrink-0">{entry.time}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{entry.preview}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
