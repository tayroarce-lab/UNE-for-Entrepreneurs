import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link, NavLink } from 'react-router-dom'
import { LogIn, UserPlus, LogOut, LayoutDashboard, Package, Home, PhoneCall, Newspaper, Users, Sparkles, Menu, X, Banknote } from 'lucide-react'
import { notifications } from '../../utils/notifications'
import { useAuth } from '../../context/AuthContext'
import uneLogo from '../../assets/logo_une.png'
import '../../styles/Navbar.css'

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [location]);


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
    <nav className={`navbar-users ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`} aria-label="Navegación principal">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={scrollToTop} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="logo-box">
              <img src={uneLogo} alt="Logo UNE" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
               <span className="logo-text-main">UNE</span>
               <span className="logo-text-accent">COSTA RICA</span>
            </div>
          </Link>
        </div>

        {/* Hamburger Menu Icon */}
        <button className="navbar-mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <ul className={`navbar-links ${menuOpen ? 'active' : ''}`} style={{ gap: '1.5rem' }}>
          <li>
             <NavLink to="/" onClick={(e) => { if(location.pathname === '/') scrollToTop(e as unknown as React.MouseEvent); }} end style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Home size={16} /> Inicio
             </NavLink>
          </li>
          <li>
             <NavLink to="/suria" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} /> Süria
             </NavLink>
          </li>
          <li>
             <NavLink to="/noticias" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Newspaper size={16} /> Noticias
             </NavLink>
          </li>
          <li>
             <NavLink to="/nuestra-gente" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={16} /> Nuestra Gente
             </NavLink>
          </li>
          <li>
             <NavLink to="/contacto" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <PhoneCall size={16} /> Contacto
             </NavLink>
          </li>

          {user && (
            <li>
              <NavLink to="/presupuesto" className="nav-highlight" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LayoutDashboard size={16} /> Mi Panel
              </NavLink>
            </li>
          )}

          {isAdmin && (
            <li className="nav-admin-li">
              <NavLink to="/admin/dashboard" className="nav-admin-badge" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Package size={16} /> Administrar
              </NavLink>
            </li>
          )}

          {user ? (
            <li className="navbar-profile">
              <Link to="/perfil" className="profile-trigger">
                <div className="profile-avatar">
                  {(user as Record<string, unknown>).avatar ? (
                    <img src={(user as Record<string, unknown>).avatar} alt="Profile" />
                  ) : (
                    getInitials(user.name)
                  )}
                </div>
                <div className="profile-info">
                  <span className="profile-name">{user.name.split(' ')[0]}</span>
                </div>
              </Link>
              <button className="btn-logout" onClick={handleLogout} title="Cerrar Sesión">
                <LogOut size={18} />
              </button>
            </li>
          ) : (
            <div className="navbar-auth-buttons">
              <li>
                <Link to="/login" className="btn-login-nav">
                  <LogIn size={16} /> Entrar
                </Link>
              </li>
              <li>
                <Link to="/registro" className="btn-register">
                  <UserPlus size={16} /> Crear Cuenta
                </Link>
              </li>
            </div>
          )}
        </ul>
      </div>
    </nav>
  )
}
