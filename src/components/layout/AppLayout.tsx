import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  MessageCircle, 
  BookOpen, 
  Smile, 
  Lightbulb, 
  Settings,
  Menu,
  X,
  Sparkles,
  LogOut,
  User,
  TrendingUp,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

// Items de navigation PRINCIPAUX (prioritaires)
const primaryNavItems = [
  { to: "/", icon: LayoutDashboard, label: "Accueil", gradient: "from-violet-500 to-purple-500", priority: 1 },
  { to: "/mood", icon: Smile, label: "Humeur", gradient: "from-amber-500 to-orange-500", priority: 2 },
  { to: "/ideas", icon: Lightbulb, label: "Idées", gradient: "from-emerald-500 to-teal-500", priority: 3 },
  { to: "/chat", icon: MessageCircle, label: "Chat", gradient: "from-fuchsia-500 to-pink-500", priority: 4 },
];

// Items de navigation SECONDAIRES
const secondaryNavItems = [
   { to: "/journal", icon: BookOpen, label: "Journal", gradient: "from-cyan-500 to-blue-500" },
  // { to: "/stats", icon: TrendingUp, label: "Stats", gradient: "from-indigo-500 to-violet-500" },
  // { to: "/wellness", icon: Heart, label: "Bien-être", gradient: "from-rose-500 to-pink-500" },
  { to: "/settings", icon: Settings, label: "Paramètres", gradient: "from-slate-600 to-gray-600" },
];

// Tous les items combinés
const allNavItems = [...primaryNavItems, ...secondaryNavItems];

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background ambient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-600/8 rounded-full blur-3xl" />
      </div>

      {/* Top Header - Desktop seulement */}
      <header className="hidden lg:block fixed top-0 left-0 right-0 z-40 h-16 glass safe-top border-b border-border/50">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-glow"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h1 className="font-bold text-lg">Compagnon</h1>
              <p className="text-xs text-muted-foreground">Votre bien-être au quotidien</p>
            </div>
          </div>

          {/* User info top right */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-muted/30">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center border border-border/50">
                  <span className="text-sm font-medium text-primary">{user.name.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                </div>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-foreground hover:bg-muted"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Header - En haut sur mobile */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 glass safe-top">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-glow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg">Compagnon</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-foreground hover:bg-muted"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="lg:hidden fixed left-0 top-0 bottom-0 z-40 w-72 bg-sidebar/95 backdrop-blur-2xl border-r border-sidebar-border"
          >
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="h-20 flex items-center gap-3 px-6 border-b border-sidebar-border/50">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-glow">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg text-sidebar-foreground">Compagnon</h1>
                  <p className="text-xs text-muted-foreground">Votre bien-être</p>
                </div>
              </div>

              {/* User info */}
              {user && (
                <div className="px-4 py-4 border-b border-sidebar-border/50">
                  <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-muted/30">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center border border-border/50">
                      <span className="text-sm font-medium text-primary">{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Mobile */}
              <nav className="flex-1 p-4 space-y-1.5">
                {/* Section PRIORITAIRE */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-4">
                    Principaux
                  </p>
                  <div className="space-y-1.5">
                    {primaryNavItems.map((item) => {
                      const isActive = location.pathname === item.to;
                      return (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={() => setSidebarOpen(false)}
                          className={cn(
                            "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden",
                            "hover:bg-muted/50",
                            isActive && "bg-gradient-to-r from-primary/20 to-accent/10 shadow-sm"
                          )}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="mobileActiveNav"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gradient-to-b from-primary to-accent"
                            />
                          )}
                          <div className={cn(
                            "w-9 h-9 rounded-lg flex items-center justify-center transition-all",
                            isActive 
                              ? `bg-gradient-to-br ${item.gradient} shadow-md` 
                              : "bg-muted/50 group-hover:bg-muted"
                          )}>
                            <item.icon className={cn(
                              "w-5 h-5 transition-colors",
                              isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground"
                            )} />
                          </div>
                          <span className={cn(
                            "font-medium transition-colors",
                            isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                          )}>
                            {item.label}
                          </span>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>

                {/* Section secondaire */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-4">
                    Explorer
                  </p>
                  <div className="space-y-1.5">
                    {secondaryNavItems.map((item) => {
                      const isActive = location.pathname === item.to;
                      return (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={() => setSidebarOpen(false)}
                          className={cn(
                            "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative overflow-hidden",
                            "hover:bg-muted/50",
                            isActive && "bg-gradient-to-r from-primary/10 to-accent/5"
                          )}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="mobileSecondaryActiveNav"
                              className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gradient-to-b from-primary/60 to-accent/60"
                            />
                          )}
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                            isActive 
                              ? "bg-muted" 
                              : "bg-muted/30 group-hover:bg-muted/50"
                          )}>
                            <item.icon className={cn(
                              "w-4 h-4 transition-colors",
                              isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                            )} />
                          </div>
                          <span className={cn(
                            "font-medium text-sm transition-colors",
                            isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                          )}>
                            {item.label}
                          </span>
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              </nav>

              {/* Logout Button Mobile */}
              <div className="p-4 border-t border-sidebar-border/50">
                <button
                  onClick={handleLogout}
                  className="w-full group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-destructive/10"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center">
                    <LogOut className="w-5 h-5 text-muted-foreground group-hover:text-destructive transition-colors" />
                  </div>
                  <span className="font-medium text-muted-foreground group-hover:text-destructive transition-colors">
                    Déconnexion
                  </span>
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300 relative pb-20 lg:pb-0",
        "pt-16 lg:pt-16",
        "lg:ml-0" // Pas de marge gauche pour plus d'espace
      )}>
        <div className="p-4 lg:p-6 safe-bottom">
          {children}
        </div>
      </main>

      {/* Bottom Navigation - Mobile seulement */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-20 bg-background/95 backdrop-blur-xl border-t border-border/50 safe-bottom">
        {/* Navigation principale (4 items prioritaires) */}
        <div className="grid grid-cols-4 h-full">
          {primaryNavItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 relative",
                  "active:scale-95 transition-transform"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all -mt-2",
                  isActive 
                    ? `bg-gradient-to-br ${item.gradient} shadow-lg shadow-primary/20` 
                    : "bg-transparent"
                )}>
                  <item.icon className={cn(
                    "w-6 h-6 transition-colors",
                    isActive ? "text-white" : "text-muted-foreground"
                  )} />
                </div>
                <span className={cn(
                  "text-xs font-medium transition-colors text-center",
                  isActive ? "text-foreground font-semibold" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
                
                {/* Indicateur actif */}
                {isActive && (
                  <motion.div
                    layoutId="bottomNavActive"
                    className="absolute top-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-b-full"
                  />
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bouton plus pour les options secondaires */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-slate-600 to-gray-600 flex items-center justify-center shadow-lg"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      </nav>

      {/* Desktop Navigation - Barre latérale complète */}
      <aside className="hidden lg:block fixed left-0 top-16 bottom-0 z-30 w-20 bg-sidebar/95 backdrop-blur-xl border-r border-sidebar-border/50">
        <div className="flex flex-col h-full py-6">
          {/* Navigation principale */}
          <div className="flex-1 flex flex-col items-center gap-4">
            {primaryNavItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex flex-col items-center justify-center relative group w-full py-3",
                    "active:scale-95 transition-transform"
                  )}
                  title={item.label}
                >
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all mb-2",
                    isActive 
                      ? `bg-gradient-to-br ${item.gradient} shadow-lg shadow-primary/20` 
                      : "bg-muted/30 group-hover:bg-muted/50"
                  )}>
                    <item.icon className={cn(
                      "w-7 h-7 transition-colors",
                      isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground"
                    )} />
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute left-full ml-3 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-50">
                    {item.label}
                    <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-popover rotate-45"></div>
                  </div>
                  
                  {/* Indicateur actif */}
                  {isActive && (
                    <motion.div
                      layoutId="desktopNavActive"
                      className="absolute -right-1 w-2 h-10 bg-gradient-to-b from-primary to-accent rounded-l-full"
                    />
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-8 h-px bg-border/50 mx-auto my-4"></div>

          {/* Navigation secondaire */}
          <div className="flex flex-col items-center gap-3 mb-4">
            {secondaryNavItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center justify-center relative group w-12 h-12 rounded-xl",
                    "active:scale-95 transition-all",
                    isActive 
                      ? "bg-muted shadow-sm" 
                      : "bg-muted/30 hover:bg-muted/50"
                  )}
                  title={item.label}
                >
                  <item.icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )} />
                  
                  {/* Tooltip */}
                  <div className="absolute left-full ml-3 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-50">
                    {item.label}
                    <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-popover rotate-45"></div>
                  </div>
                </NavLink>
              );
            })}
          </div>

          {/* Logout Button */}
          <div className="mt-auto pt-4 border-t border-border/30">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center group relative w-12 h-12 rounded-xl mx-auto bg-muted/30 hover:bg-destructive/10 transition-colors"
              title="Déconnexion"
            >
              <LogOut className="w-5 h-5 text-muted-foreground group-hover:text-destructive" />
            </button>
          </div>
        </div>
      </aside>

      {/* Ajustement du padding pour la sidebar desktop */}
      <style>
        {`
          @media (min-width: 1024px) {
            main {
              margin-left: 5rem; /* 80px pour w-20 */
            }
          }
        `}
      </style>
    </div>
  );
}