import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, BookOpen, Lightbulb, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  {
    to: "/chat",
    icon: MessageCircle,
    label: "Discuter avec l'IA",
    description: "Partagez vos pensées",
    gradient: "from-sage/20 to-sage/5",
    iconBg: "bg-sage",
  },
  {
    to: "/journal",
    icon: BookOpen,
    label: "Écrire dans le journal",
    description: "Notez vos réflexions",
    gradient: "from-terracotta/20 to-terracotta/5",
    iconBg: "bg-terracotta",
  },
  {
    to: "/ideas",
    icon: Lightbulb,
    label: "Capturer une idée",
    description: "Ne perdez aucune inspiration",
    gradient: "from-sunshine/20 to-sunshine/5",
    iconBg: "bg-sunshine",
  },
];

export function QuickActions() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {actions.map((action, index) => (
        <Link key={action.to} to={action.to}>
          <Card 
            variant="interactive" 
            className={cn(
              "h-full bg-gradient-to-br",
              action.gradient,
              "animate-slide-up",
              index === 0 && "animation-delay-100",
              index === 1 && "animation-delay-200",
              index === 2 && "animation-delay-300"
            )}
          >
            <CardContent className="flex items-start gap-4 p-5">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                action.iconBg
              )}>
                <action.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{action.label}</h3>
                <p className="text-sm text-muted-foreground">{action.description}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
