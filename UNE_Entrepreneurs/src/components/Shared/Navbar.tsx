import { useNavigate, useLocation, Link, NavLink } from 'react-router-dom'
import { LogIn, UserPlus, LogOut, LayoutDashboard } from 'lucide-react'
import { notifications } from '../../utils/notifications'
import { useAuth } from '../../context/AuthContext'
import uneLogo from '../../assets/logo_une.png'

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        window.location.href = '/';
      }, 1000);
    }
  };

  const getInitials = (nombre: string) => {
    return nombre.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <nav className="navbar-users" aria-label="Navegación principal">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/" onClick={scrollToTop} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ background: 'var(--uneRed)', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <img src={uneLogo} alt="Logo UNE" style={{ height: '20px', width: '20px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
            </div>
            UNE Entrepreneurs
          </a>
        </div>
        <ul className="navbar-links">
          <li><NavLink to="/" onClick={(e) => { if(location.pathname === '/') scrollToTop(e as unknown as React.MouseEvent); }} end>Inicio</NavLink></li>
          <li><NavLink to="/financiamiento">Catálogo</NavLink></li>
          <li><a href="/#noticias" onClick={(e) => scrollToSection(e, 'noticias')}>Noticias</a></li>
          <li><a href="/#contacto" onClick={(e) => scrollToSection(e, 'contacto')}>Contacto</a></li>

          {isAdmin && (
            <li>
              <NavLink to="/admin/financiamiento" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <LayoutDashboard size={18} /> Admin
              </NavLink>
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
                <Link to="/login">
                  <LogIn size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Ingresar
                </Link>
              </li>
              <li>
                <Link to="/registro" className="btn-register">
                  <UserPlus size={18} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Registrarse
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}
