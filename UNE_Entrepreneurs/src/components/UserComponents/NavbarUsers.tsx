import { useNavigate, useLocation } from 'react-router-dom'
import { notifications } from '../../utils/notifications'
import { LogIn, UserPlus, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

/**
 * NavbarUsers: Barra de navegación principal.
 * - Utiliza AuthContext para detectar sesión activa.
 * - Los enlaces de sección hacen scroll suave al id correspondiente.
 */
export default function NavbarUsers() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * scrollToSection: Hace scroll suave a una sección por su id.
   */
  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    const confirmed = await notifications.confirm(
      '¿Cerrar sesión?',
      '¿Estás seguro de que deseas salir de tu cuenta?',
      'question',
      'Sí, salir',
      'Cancelar'
    );

    if (confirmed) {
      logout();
      notifications.success('Sesión cerrada correctamente');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
  };

  const getInitials = (nombre: string) => {
    return nombre
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="navbar-users">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/" onClick={scrollToTop}>UNE Entrepreneurs</a>
        </div>
        <ul className="navbar-links">
          <li><a href="/" onClick={scrollToTop}>Inicio</a></li>
          <li><a href="/financiamiento" onClick={(e) => { e.preventDefault(); navigate('/financiamiento'); }}>Financiamiento</a></li>
          <li><a href="/finanzas" onClick={(e) => { e.preventDefault(); navigate('/finanzas'); }}>Finanzas</a></li>
          <li><a href="/#noticias" onClick={(e) => scrollToSection(e, 'noticias')}>Noticias</a></li>
          <li><a href="/#contacto" onClick={(e) => scrollToSection(e, 'contacto')}>Contacto</a></li>
          
          {user && (
            <li>
              <a href="/presupuesto" onClick={(e) => { e.preventDefault(); navigate('/presupuesto'); }} className="nav-highlight">
                <LayoutDashboard size={18} /> Mi Panel
              </a>
            </li>
          )}

          {user ? (
            <li className="navbar-profile">
              <div className="profile-avatar">{getInitials(user.name)}</div>
              <div className="profile-info">
                <span className="profile-name">{user.name}</span>
                <span className="profile-email">{user.email}</span>
              </div>
              <button className="btn-logout" onClick={handleLogout}>
                <LogOut size={16} /> Salir
              </button>
            </li>
          ) : (
            <>
              <li>
                <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
                  <LogIn size={18} /> Ingresar
                </a>
              </li>
              <li>
                <a href="/registro" onClick={(e) => { e.preventDefault(); navigate('/registro'); }} className="btn-register">
                  <UserPlus size={18} /> Registrarse
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}
