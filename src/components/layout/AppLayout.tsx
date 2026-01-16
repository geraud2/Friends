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
  LogOut,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

// Navigation items principaux pour la barre du bas
const mainNavItems = [
  { to: "/", icon: LayoutDashboard, label: "Accueil", gradient: "from-violet-500 to-purple-500" },
  { to: "/mood", icon: Smile, label: "Humeur", gradient: "from-amber-500 to-orange-500" },
  { to: "/ideas", icon: Lightbulb, label: "Idées", gradient: "from-emerald-500 to-teal-500" },
  { to: "/chat", icon: MessageCircle, label: "Chat", gradient: "from-fuchsia-500 to-pink-500" },
  { to: "/journal", icon: BookOpen, label: "Journal", gradient: "from-cyan-500 to-blue-500" },
];

// Items pour le menu drawer (settings + autres)
const drawerItems = [
  { to: "/settings", icon: Settings, label: "Paramètres", gradient: "from-slate-600 to-gray-600" },
  // Ajoutez d'autres items ici si nécessaire
];

export function AppLayout({ children }: AppLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Tous les items combinés pour desktop
  const allItems = [...mainNavItems, ...drawerItems];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10 flex flex-col">
      {/* Background subtle gradient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-violet-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-fuchsia-500/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content Area */}
      <main className={cn(
        "flex-1 relative z-10",
        "pb-20 lg:pb-6", // Plus d'espace en bas sur mobile pour la navigation
        "pt-6 lg:pt-6"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 safe-bottom">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation - 5 items principaux + menu */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-background/95 backdrop-blur-xl border-t border-border/40 safe-bottom">
        <div className="grid grid-cols-5 h-full">
          {mainNavItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-col items-center justify-center relative group",
                  "active:scale-95 transition-transform duration-150"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                  isActive 
                    ? `bg-gradient-to-br ${item.gradient} shadow-md` 
                    : "bg-transparent"
                )}>
                  <item.icon className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground"
                  )} />
                </div>
                <span className={cn(
                  "text-xs mt-1 transition-colors truncate max-w-full px-1",
                  isActive ? "text-foreground font-medium" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveIndicator"
                    className="absolute top-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-b-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  />
                )}
              </NavLink>
            );
          })}
        </div>
        
        {/* Menu Button (hamburger) */}
        <button
          onClick={() => setDrawerOpen(true)}
          className={cn(
            "absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center",
            "bg-gradient-to-br from-slate-700 to-gray-700 shadow-lg",
            "hover:from-slate-600 hover:to-gray-600 transition-all",
            "active:scale-95"
          )}
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      </nav>

      {/* Mobile Drawer (Menu) */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setDrawerOpen(false)}
            />
            
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 z-50 w-80 bg-background border-l border-border/40 shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border/40">
                  <h2 className="text-xl font-semibold">Menu</h2>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* User Info */}
                {user && (
                  <div className="p-6 border-b border-border/40">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center border border-border/40">
                        <User className="w-6 h-6 text-foreground/80" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{user.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Drawer Navigation Items */}
                <nav className="flex-1 p-4">
                  <div className="space-y-2">
                    {drawerItems.map((item) => {
                      const isActive = location.pathname === item.to;
                      return (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={() => setDrawerOpen(false)}
                          className={cn(
                            "flex items-center gap-4 p-3 rounded-xl transition-all",
                            "hover:bg-muted/50 active:scale-95",
                            isActive && "bg-muted/30"
                          )}
                        >
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            isActive && `bg-gradient-to-br ${item.gradient}`
                          )}>
                            <item.icon className={cn(
                              "w-5 h-5",
                              isActive ? "text-white" : "text-muted-foreground"
                            )} />
                          </div>
                          <span className={cn(
                            "font-medium",
                            isActive ? "text-foreground" : "text-muted-foreground"
                          )}>
                            {item.label}
                          </span>
                        </NavLink>
                      );
                    })}
                  </div>
                </nav>

                {/* Logout Button */}
                <div className="p-6 border-t border-border/40">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-3 p-3 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Déconnexion</span>
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 z-30 w-20 bg-background/80 backdrop-blur-xl border-r border-border/40">
        <div className="flex flex-col h-full py-6">
          {/* Logo/Brand */}
          <div className="flex flex-col items-center mb-8 px-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mb-2 shadow-md">
              <Smile className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-medium text-muted-foreground tracking-wider">BIEN-ÊTRE</span>
          </div>

          {/* Navigation - Tous les items */}
          <nav className="flex-1 flex flex-col items-center gap-2">
            {allItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "group relative flex items-center justify-center w-14 h-14 rounded-xl transition-all",
                    "hover:bg-muted/50 active:scale-95",
                    isActive && "bg-muted/30"
                  )}
                  title={item.label}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                    isActive && `bg-gradient-to-br ${item.gradient} shadow-sm`
                  )}>
                    <item.icon className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground"
                    )} />
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute left-full ml-3 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-50">
                    {item.label}
                    <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-popover rotate-45"></div>
                  </div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="desktopActiveIndicator"
                      className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-l-full"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* User & Logout */}
          <div className="mt-auto pt-6 border-t border-border/40">
            {user && (
              <div className="flex flex-col items-center gap-3 px-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center border border-border/40">
                  <span className="text-sm font-medium text-foreground/80">{user.name.charAt(0).toUpperCase()}</span>
                </div>
              </div>
            )}
            
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-14 h-14 mx-auto rounded-xl hover:bg-destructive/10 group"
              title="Déconnexion"
            >
              <LogOut className="w-5 h-5 text-muted-foreground group-hover:text-destructive transition-colors" />
            </button>
          </div>
        </div>
      </aside>

      {/* Desktop margin for sidebar */}
      <style>
        {`
          @media (min-width: 1024px) {
            main {
              margin-left: 5rem;
            }
          }
        `}
      </style>
    </div>
  );
}