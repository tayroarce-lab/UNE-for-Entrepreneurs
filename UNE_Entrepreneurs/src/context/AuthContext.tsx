// ============================================================
// Contexto de autenticación simulado
// ============================================================
import { createContext, useContext, useState, type ReactNode } from 'react';
import UserServices from '../services/UserServices';

interface AuthUser {
  id: string;
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


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('uneUser');
    return stored ? (JSON.parse(stored) as AuthUser) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = await UserServices.getUser();
      if (!users) return false;

      const found = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (found) {
        const authUser: AuthUser = {
          id: String(found.id),
          name: found.nombre || found.name || 'Usuario',
          email: found.email,
          isAdmin: found.role === 'admin' || found.email === 'admin@une.cr',
        };
        setUser(authUser);
        localStorage.setItem('uneUser', JSON.stringify(authUser));
        localStorage.setItem('token', 'mock-jwt-token');
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error logging in:', err);
      return false;
    }
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
