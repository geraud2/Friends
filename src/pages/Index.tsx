import { motion } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { MoodSelector } from "@/components/dashboard/MoodSelector";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentEntries } from "@/components/dashboard/RecentEntries";
import { DailyQuote } from "@/components/dashboard/DailyQuote";
import { StreakCard } from "@/components/dashboard/StreakCard";
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
      <div className="min-h-screen w-full px-3 xs:px-4 sm:px-5 md:px-6 lg:px-8 xl:px-12 py-4 sm:py-6 space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Header avec layout responsive */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-2 sm:pt-4 md:pt-6"
        >
          <div className="max-w-7xl mx-auto">
            <p className="text-xs xs:text-sm md:text-base text-muted-foreground capitalize mb-1">{today}</p>
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
              {greeting},{" "}
              <span className="text-gradient text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                {user?.name || "ami"}
              </span>
              !
            </h1>
            <p className="text-muted-foreground mt-2 text-sm xs:text-base md:text-lg">
              Comment allez-vous aujourd'hui ?
            </p>
          </div>
        </motion.header>

        {/* Contenu principal avec conteneur responsive */}
        <div className="max-w-7xl mx-auto w-full space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Mood Selector - Pleine largeur */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full"
          >
            {/* MODIFICATION ICI : Utilisation du MoodSelector avec seulement 4 émotions */}
            <div className=" dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 border shadow-sm">
              <h2 className="font-semibold text-sm xs:text-base sm:text-lg md:text-xl mb-3 xs:mb-4 sm:mb-5 text-center">
                Sélectionnez votre humeur
              </h2>
              <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                {/* Seulement 4 émotions */}
                <button className="flex flex-col items-center p-2 sm:p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 hover:bg-secondary/80 active:scale-95 hover:scale-105">
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-2">😄</span>
                  <span className="text-xs sm:text-sm md:text-base font-medium text-muted-foreground">Super</span>
                </button>
                
                <button className="flex flex-col items-center p-2 sm:p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 hover:bg-secondary/80 active:scale-95 hover:scale-105">
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-2">🙂</span>
                  <span className="text-xs sm:text-sm md:text-base font-medium text-muted-foreground">Bien</span>
                </button>
                
                <button className="flex flex-col items-center p-2 sm:p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 hover:bg-secondary/80 active:scale-95 hover:scale-105">
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-2">😐</span>
                  <span className="text-xs sm:text-sm md:text-base font-medium text-muted-foreground">Neutre</span>
                </button>
                
                <button className="flex flex-col items-center p-2 sm:p-3 md:p-4 rounded-xl md:rounded-2xl transition-all duration-300 hover:bg-secondary/80 active:scale-95 hover:scale-105">
                  <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-2">😢</span>
                  <span className="text-xs sm:text-sm md:text-base font-medium text-muted-foreground">Difficile</span>
                </button>
              </div>
              <p className="text-center text-xs sm:text-sm text-muted-foreground mt-3 xs:mt-4">
                Cliquez sur une émotion pour l'enregistrer
              </p>
            </div>
          </motion.section>

          {/* Daily Proverb - Section responsive */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="w-full"
          >
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 border border-blue-100 dark:border-blue-800/30 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs xs:text-sm sm:text-base">💭</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm xs:text-base sm:text-lg md:text-xl text-blue-800 dark:text-blue-200 mb-1 xs:mb-2">
                    Pensée du jour
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed">
                    {todaysProverb}
                  </p>
                  <div className="flex items-center justify-between mt-3 xs:mt-4">
                    <span className="text-xs xs:text-sm text-blue-600 dark:text-blue-400">
                      {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                      <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                      <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Quick Actions - Layout responsive */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 sm:mt-4"
          >
            <QuickActions />
          </motion.section>

          {/* Stats and Activity - Grille responsive améliorée */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
            {/* StreakCard - Occupe 2 colonnes sur mobile, 1 sur desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <StreakCard />
            </motion.div>
            
            {/* DailyQuote - Occupe 1 colonne sur desktop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <DailyQuote />
            </motion.div>
          </section>

          {/* Recent Activity - Pleine largeur */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="pb-6 sm:pb-8 lg:pb-12"
          >
            <RecentEntries />
          </motion.section>
        </div>
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