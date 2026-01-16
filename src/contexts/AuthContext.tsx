import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("compagnon-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // For demo, accept any valid email/password combo
    if (email && password.length >= 6) {
      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        name: email.split("@")[0],
      };
      setUser(newUser);
      localStorage.setItem("compagnon-user", JSON.stringify(newUser));
    } else {
      throw new Error("Identifiants invalides");
    }
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (name && email && password.length >= 6) {
      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        name,
      };
      setUser(newUser);
      localStorage.setItem("compagnon-user", JSON.stringify(newUser));
    } else {
      throw new Error("Veuillez remplir tous les champs correctement");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("compagnon-user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
