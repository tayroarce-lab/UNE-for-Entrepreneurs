import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../types/user';
import UserServices from '../services/UserServices';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshUser: (updatedData: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Usuarios simulados para pruebas
const MOCK_USERS: (AuthUser & { password: string })[] = [
  {
    id: '1',
    name: 'Admin UNE',
    email: 'admin@une.cr',
    password: 'admin123',
    isAdmin: true,
  },
  {
    id: '2',
    name: 'María López',
    email: 'maria@example.com',
    password: 'user123',
    isAdmin: false,
  },
];

const MOCK_ADMIN = MOCK_USERS[0];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('userSession');
    if (!stored) return null;
    try {
      const parsed = JSON.parse(stored);
      return {
        id: String(parsed.id),
        name: parsed.nombre || parsed.name || 'Usuario',
        email: parsed.email,
        avatar: parsed.avatar,
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
        const adminUser: AuthUser = {
          id: MOCK_ADMIN.id,
          name: MOCK_ADMIN.name,
          email: MOCK_ADMIN.email,
          isAdmin: true
        };
        setUser(adminUser);
        localStorage.setItem('userSession', JSON.stringify({
          id: adminUser.id,
          nombre: adminUser.name,
          email: adminUser.email,
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
          id: String(found.id),
          name: found.nombre || 'Usuario',
          email: found.email,
          avatar: found.avatar,
          isAdmin: found.role === 'admin' || found.email === 'admin@une.cr',
        };
        setUser(authUser);
        localStorage.setItem('userSession', JSON.stringify({
          id: authUser.id,
          nombre: authUser.name,
          email: authUser.email,
          avatar: authUser.avatar,
          isAdmin: authUser.isAdmin,
          loggedAt: new Date().toISOString()
        }));
        // Limpiamos tokens viejos si existen
        localStorage.removeItem('uneUser');
        localStorage.removeItem('token');
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

  const refreshUser = (updatedData: Partial<AuthUser>) => {
    if (!user) return;
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    
    // Update localStorage
    const stored = localStorage.getItem('userSession');
    if (stored) {
      const parsed = JSON.parse(stored);
      localStorage.setItem('userSession', JSON.stringify({
        ...parsed,
        nombre: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
        isAdmin: newUser.isAdmin
      }));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin: user?.isAdmin ?? false, login, logout, refreshUser }}>
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
