import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { MoodSelector } from "@/components/dashboard/MoodSelector";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentEntries } from "@/components/dashboard/RecentEntries";
import { DailyQuote } from "@/components/dashboard/DailyQuote";
import { StreakCard } from "@/components/dashboard/StreakCard";
// import { DailyProverb } from "@/components/dashboard/DailyProverb"; // Nouveau composant
import { useAuth } from "@/contexts/AuthContext";

// Liste de proverbes/journal (un par jour du mois)
const dailyProverbs = [
  "La gratitude transforme ce que nous avons en assez.",
  "Un petit pas chaque jour conduit à de grands changements.",
  "Prenez un moment pour respirer et être présent.",
  "La bienveillance envers soi-même est la clé du bien-être.",
  "Chaque jour est une nouvelle page de votre histoire.",
  "Écoutez votre cœur, il connaît le chemin.",
  "Les petites joies font les grands bonheurs.",
  "Soyez fier de vos progrès, même les plus petits.",
  "La paix commence par un sourire intérieur.",
  "Prenez soin de votre esprit comme de votre corps.",
  "Chaque émotion a quelque chose à vous apprendre.",
  "La patience est un arbre dont la racine est amère.",
  "Souriez à la vie, elle vous sourira en retour.",
  "Le présent est un cadeau, c'est pourquoi on l'appelle présent.",
  "Vos pensées créent votre réalité.",
  "Un esprit calme est un esprit puissant.",
  "La simplicité est la sophistication suprême.",
  "Cultivez la joie comme une fleur précieuse.",
  "Votre bien-être est votre responsabilité la plus importante.",
  "Les défis d'aujourd'hui sont les forces de demain.",
  "La lumière intérieure brille même dans l'obscurité.",
  "Soyez doux avec vous-même, vous faites de votre mieux.",
  "Le bonheur se trouve dans l'instant présent.",
  "Votre parcours est unique, ne le comparez pas.",
  "La paix intérieure est le plus grand trésor.",
  "Chaque jour est une chance de recommencer.",
  "La confiance en soi s'apprend pas à pas.",
  "Votre valeur ne dépend pas de votre productivité.",
  "Prenez le temps de rêver, c'est ainsi que tout commence.",
  "La résilience se construit dans l'adversité.",
  "Soyez le changement que vous voulez voir en vous."
];

// Fonction pour obtenir le proverbe du jour
const getTodaysProverb = () => {
  const today = new Date();
  const dayOfMonth = today.getDate(); // 1-31
  const proverbIndex = (dayOfMonth - 1) % dailyProverbs.length;
  return dailyProverbs[proverbIndex];
};

const Index = () => {
  const { user } = useAuth();
  const greeting = getGreeting();
  const today = new Date().toLocaleDateString('fr-FR', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });
  
  // Proverbe du jour
  const todaysProverb = getTodaysProverb();

  return (
    <AppLayout>
      <div className="w-full px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-4 sm:pt-6"
        >
          <p className="text-sm md:text-base text-muted-foreground capitalize">{today}</p>
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mt-1">
            {greeting},{" "}
            <span className="text-gradient text-xl xs:text-2xl sm:text-3xl md:text-4xl">
              {user?.name || "ami"}
            </span>
            !
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Comment allez-vous aujourd'hui ?
          </p>
        </motion.header>

        {/* Mood Selector */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full"
        >
          <MoodSelector />
        </motion.section>

        {/* Daily Proverb - Nouvelle section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* <DailyProverb proverb={todaysProverb} /> */}
        </motion.section>

        {/* Quick Actions */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6"
        >
          <QuickActions />
        </motion.section>

        {/* Stats and Activity */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StreakCard />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <DailyQuote />
          </motion.div>
        </section>

        {/* Recent Activity */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="pb-6"
        >
          <RecentEntries />
        </motion.section>
      </div>
    </AppLayout>
  );
};

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Bonjour";
  if (hour < 18) return "Bon après-midi";
  return "Bonsoir";
}

export default Index;