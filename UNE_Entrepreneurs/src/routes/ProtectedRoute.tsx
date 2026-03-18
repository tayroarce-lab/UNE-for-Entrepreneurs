import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  adminOnly?: boolean;
  redirectPath?: string;
}

/**
 * Componente para proteger rutas basadas en autenticación y roles.
 */
export default function ProtectedRoute({ 
  adminOnly = false, 
  redirectPath = '/login' 
}: ProtectedRouteProps) {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
