import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link, NavLink } from 'react-router-dom'
import { LogIn, UserPlus, LogOut, LayoutDashboard, Package, Home, Banknote, Navigation, PhoneCall } from 'lucide-react'
import { notifications } from '../../utils/notifications'
import { useAuth } from '../../context/AuthContext'
import uneLogo from '../../assets/logo_une.png'

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav className={`navbar-users ${scrolled ? 'scrolled' : ''}`} aria-label="Navegación principal">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={scrollToTop} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="logo-box">
              <img src={uneLogo} alt="Logo UNE" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
               <span className="logo-text-main" style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 800, lineHeight: 1 }}>UNE</span>
               <span className="logo-text-accent" style={{ marginLeft: 0, marginTop: '2px', background: 'transparent', padding: 0, color: 'var(--uneGold)', fontSize: '0.75rem', letterSpacing: '1px' }}>COSTA RICA</span>
            </div>
          </Link>
        </div>
        <ul className="navbar-links" style={{ gap: '1.5rem' }}>
          <li>
             <NavLink to="/" onClick={(e) => { if(location.pathname === '/') scrollToTop(e as unknown as React.MouseEvent); }} end style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Home size={16} /> Inicio
             </NavLink>
          </li>
          <li>
             <NavLink to="/financiamiento" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Banknote size={16} /> Créditos
             </NavLink>
          </li>
          <li>
             <a href="/#noticias" onClick={(e) => scrollToSection(e, 'noticias')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Navigation size={16} /> Noticias
             </a>
          </li>
          <li>
             <a href="/#contacto" onClick={(e) => scrollToSection(e, 'contacto')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <PhoneCall size={16} /> Contacto
             </a>
          </li>

          {user && (
            <li>
              <NavLink to="/presupuesto" className="nav-highlight" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <LayoutDashboard size={16} /> Mi Panel
              </NavLink>
            </li>
          )}

          {isAdmin && (
            <li style={{ marginLeft: '10px' }}>
              <NavLink to="/admin/dashboard" className="nav-admin-badge" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.2)', padding: '6px 15px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Package size={16} /> Administrar
              </NavLink>
            </li>
          )}

          {user ? (
            <li className="navbar-profile" style={{ position: 'relative', marginLeft: '25px' }}>
              <Link to="/perfil" className="profile-trigger" style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.08)', padding: '6px 20px 6px 6px', borderRadius: '50px', transition: 'all 0.3s', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="profile-avatar" style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  overflow: 'hidden', 
                  background: 'var(--uneGold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 800,
                  color: 'var(--uneRedDark)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}>
                  {(user as any).avatar ? (
                    <img src={(user as any).avatar} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    getInitials(user.name)
                  )}
                </div>
                <div className="profile-info" style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="profile-name" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{user.name.split(' ')[0]}</span>
                </div>
              </Link>
              <button className="btn-logout" onClick={handleLogout} title="Cerrar Sesión" style={{ marginLeft: '15px', background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer', transition: 'all 0.2s', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LogOut size={18} />
              </button>
            </li>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft: '30px' }}>
              <li>
                <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', padding: '8px 16px' }}>
                  <LogIn size={16} /> Entrar
                </Link>
              </li>
              <li>
                <Link to="/registro" className="btn-register" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 800, background: 'var(--uneGold)', color: 'var(--uneRedDark)', padding: '8px 24px', borderRadius: '50px', boxShadow: '0 4px 15px rgba(212, 168, 83, 0.4)', transition: 'transform 0.2s' }}>
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
