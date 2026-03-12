// ============================================================
// Contexto de autenticación simulado
// ============================================================
import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthUser {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Usuarios simulados
const MOCK_USERS: (AuthUser & { password: string })[] = [
  {
    id: 1,
    name: 'Admin UNE',
    email: 'admin@une.cr',
    password: 'admin123',
    isAdmin: true,
  },
  {
    id: 2,
    name: 'María López',
    email: 'maria@example.com',
    password: 'user123',
    isAdmin: false,
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('uneUser');
    return stored ? (JSON.parse(stored) as AuthUser) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular delay de red
    await new Promise((resolve) => setTimeout(resolve, 500));

    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      const authUser: AuthUser = {
        id: found.id,
        name: found.name,
        email: found.email,
        isAdmin: found.isAdmin,
      };
      setUser(authUser);
      localStorage.setItem('uneUser', JSON.stringify(authUser));
      localStorage.setItem('token', 'mock-jwt-token');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('uneUser');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin: user?.isAdmin ?? false, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
