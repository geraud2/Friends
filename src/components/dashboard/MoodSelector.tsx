import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const moods = [
  { emoji: "😄", label: "Super", color: "bg-mood-great" },
  { emoji: "🙂", label: "Bien", color: "bg-mood-good" },
  { emoji: "😐", label: "Neutre", color: "bg-mood-okay" },
  { emoji: "😔", label: "Bof", color: "bg-mood-low" },
  { emoji: "😢", label: "Difficile", color: "bg-mood-bad" },
];

export function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  return (
    <Card variant="elevated">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Comment vous sentez-vous ?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-2">
          {moods.map((mood, index) => (
            <button
              key={mood.label}
              onClick={() => setSelectedMood(index)}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200",
                "hover:bg-secondary hover:scale-105",
                selectedMood === index && "bg-secondary ring-2 ring-primary/30 scale-105"
              )}
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span className="text-xs font-medium text-muted-foreground">{mood.label}</span>
              <div className={cn("w-8 h-1.5 rounded-full", mood.color, "opacity-60")} />
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
