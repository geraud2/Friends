import { Card, CardContent } from "@/components/ui/card";
import { Flame, Trophy, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export function StreakCard() {
  const streak = 7;
  const longestStreak = 14;
  const daysThisMonth = 12;

  return (
    <Card variant="feature">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Série actuelle</p>
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-terracotta animate-pulse-soft" />
              <span className="text-3xl font-bold">{streak}</span>
              <span className="text-muted-foreground">jours</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-background/50">
            <Trophy className="w-5 h-5 text-sunshine" />
            <div>
              <p className="text-xs text-muted-foreground">Record</p>
              <p className="font-semibold">{longestStreak} jours</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-background/50">
            <Calendar className="w-5 h-5 text-ocean" />
            <div>
              <p className="text-xs text-muted-foreground">Ce mois</p>
              <p className="font-semibold">{daysThisMonth} jours</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
