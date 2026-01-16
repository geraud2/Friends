import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export function DailyQuote() {
  return (
    <Card variant="glass" className="overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
      <CardContent className="p-6 relative">
        <Quote className="w-8 h-8 text-primary/30 mb-4" />
        <blockquote className="font-serif text-lg italic text-foreground/90 mb-4">
          "Le bonheur n'est pas quelque chose de prêt à l'emploi. Il vient de vos propres actions."
        </blockquote>
        <cite className="text-sm text-muted-foreground not-italic">— Dalaï Lama</cite>
      </CardContent>
    </Card>
  );
}
