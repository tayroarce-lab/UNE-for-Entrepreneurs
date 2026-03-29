import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link, NavLink } from 'react-router-dom';
import { LogIn, UserPlus, BookOpen, LogOut, LayoutDashboard, Home, PhoneCall, Newspaper, Users, Sparkles, Menu, X } from 'lucide-react';
import { notifications } from '../../../utils/notifications';
import { useAuth } from '../../../context/AuthContext';
const uneLogo = '/assets/logo_une.png';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== '/') navigate('/');
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    setMenuOpen(false);
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
      setTimeout(() => { window.location.href = '/'; }, 1000);
    }
  };

  const getInitials = (nombre: string) =>
    nombre.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const navClass = [
    styles.navbarUsers,
    scrolled ? styles.scrolled : '',
    menuOpen ? styles.menuIsOpen : '',
  ].filter(Boolean).join(' ');

  return (
    <nav className={navClass} aria-label="Navegación principal">
      {/* Backdrop — closes drawer when tapping outside */}
      {menuOpen && (
        <div className={styles.navbarBackdrop} onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}

      <div className={styles.navbarContainer}>
        {/* Logo */}
        <div className={styles.navbarLogo}>
          <Link to="/" onClick={scrollToTop}>
            <div className={styles.logoBox}>
              <img src={uneLogo} alt="Logo UNE" />
            </div>
            <div className={styles.logoWordmark}>
              <span className={styles.suriaWordmark}>UNE</span>
              <span className={styles.suriaFullname}>Unión Nacional de Emprendedores</span>
            </div>
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className={styles.navbarMobileToggle}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Nav links — drawer on mobile, inline on desktop */}
        <ul className={styles.navbarLinks} id="navbar-menu" role="list">
          <li>
            <NavLink to="/" onClick={(e) => { if (location.pathname === '/') scrollToTop(e); }} end>
              <Home size={16} /> Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/suria"><Sparkles size={16} /> Süria</NavLink>
          </li>
          <li>
            <NavLink to="/noticias"><Newspaper size={16} /> Noticias</NavLink>
          </li>
          <li>
            <NavLink to="/nuestra-gente"><Users size={16} /> Nuestra Gente</NavLink>
          </li>
          <li>
            <NavLink to="/recursos"><BookOpen size={16} /> Recursos</NavLink>
          </li>
          <li>
            <NavLink to="/contacto"><PhoneCall size={16} /> Contacto</NavLink>
          </li>

          {user ? (
            <>
              <li>
                <NavLink to="/presupuesto" className={styles.navHighlight}>
                  <LayoutDashboard size={16} /> Mi Panel
                </NavLink>
              </li>
              {isAdmin && (
                <li>
                  <NavLink to="/admin/dashboard" className={styles.navAdminBadge}>
                    <Sparkles size={16} /> Administrar
                  </NavLink>
                </li>
              )}
              {/* Profile + logout as a list item */}
              <li className={styles.navbarProfile}>
                <Link to="/perfil" className={styles.profileTrigger} onClick={() => setMenuOpen(false)}>
                  <div className={styles.profileAvatar}>
                    {(user as { avatar?: string }).avatar
                      ? <img src={(user as { avatar?: string }).avatar} alt="Avatar" />
                      : getInitials(user.name)
                    }
                  </div>
                  <span className={styles.profileName}>{user.name.split(' ')[0]}</span>
                </Link>
                <button className={styles.btnLogout} onClick={handleLogout} title="Cerrar Sesión">
                  <LogOut size={17} />
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className={styles.btnLoginNav}>
                  <LogIn size={16} /> Entrar
                </Link>
              </li>
              <li>
                <Link to="/registro" className={styles.navHighlight}>
                  <UserPlus size={16} /> Crear Cuenta
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
