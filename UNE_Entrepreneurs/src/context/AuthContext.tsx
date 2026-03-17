import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../types/user';
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

// Usuarios simulados (fallback opcional o remover si ya se usa db.json)
const MOCK_ADMIN: AuthUser & { password: string } = {
  id: 'admin-1',
  name: 'Admin UNE',
  email: 'admin@une.cr',
  password: 'admin123',
  isAdmin: true,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('userSession');
    if (!stored) return null;
    try {
      const parsed = JSON.parse(stored);
      return {
        id: parsed.id,
        name: parsed.nombre || parsed.name,
        email: parsed.email,
        isAdmin: parsed.isAdmin || parsed.role === 'admin'
      };
    } catch {
      return null;
    }
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // 1. Check Hardcoded Admin
      if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
        setUser(MOCK_ADMIN);
        localStorage.setItem('userSession', JSON.stringify({
          id: MOCK_ADMIN.id,
          nombre: MOCK_ADMIN.name,
          email: MOCK_ADMIN.email,
          isAdmin: true,
          loggedAt: new Date().toISOString()
        }));
        return true;
      }

      // 2. Check DB Users
      const users: User[] = await UserServices.getUser();
      const found = users?.find(u => u.email === email && u.password === password);

      if (found) {
        const authUser: AuthUser = {
          id: found.id,
          name: found.nombre,
          email: found.email,
          isAdmin: found.role === 'admin',
        };
        setUser(authUser);
        localStorage.setItem('userSession', JSON.stringify({
          id: authUser.id,
          nombre: authUser.name,
          email: authUser.email,
          isAdmin: authUser.isAdmin,
          loggedAt: new Date().toISOString()
        }));
        return true;
      }
    } catch (err) {
      console.error('Error in login process:', err);
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userSession');
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
