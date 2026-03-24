import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link, NavLink } from 'react-router-dom';
import { LogIn, UserPlus, LogOut, LayoutDashboard, Home, PhoneCall, Newspaper, Users, Sparkles, Menu, X } from 'lucide-react';
import { notifications } from '../../../utils/notifications';
import { useAuth } from '../../../context/AuthContext';
import uneLogo from '../../../assets/logo_une.png';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
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

  useEffect(() => {
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
    <nav className={`${styles.navbarUsers} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.menuOpen : ''}`} aria-label="Navegación principal">
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo}>
          <Link to="/" onClick={scrollToTop}>
            <div className={styles.logoBox}>
              <img src={uneLogo} alt="Logo UNE" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
               <span className={styles.logoTextMain}>UNE</span>
               <span className={styles.logoTextAccent}>COSTA RICA</span>
            </div>
          </Link>
        </div>

        <button className={styles.navbarMobileToggle} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <ul className={styles.navbarLinks}>
          <li>
             <NavLink to="/" onClick={(e) => { if(location.pathname === '/') scrollToTop(e as unknown as React.MouseEvent); }} end>
                <Home size={16} /> Inicio
             </NavLink>
          </li>
          <li>
             <NavLink to="/suria">
                <Sparkles size={16} /> Süria
             </NavLink>
          </li>
          <li>
             <NavLink to="/noticias">
                <Newspaper size={16} /> Noticias
             </NavLink>
          </li>
          <li>
             <NavLink to="/nuestra-gente">
                <Users size={16} /> Nuestra Gente
             </NavLink>
          </li>
          <li>
             <NavLink to="/contacto">
                 <PhoneCall size={16} /> Contacto
             </NavLink>
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
              <li className={styles.navbarProfile}>
                <Link to="/perfil" className={styles.profileTrigger}>
                  <div className={styles.profileAvatar}>
                    {(user as { avatar?: string }).avatar ? (
                      <img src={(user as { avatar?: string }).avatar} alt="Profile" />
                    ) : (
                      getInitials(user.name)
                    )}
                  </div>
                  <div className={styles.profileInfo}>
                    <span className={styles.profileName}>{user.name.split(' ')[0]}</span>
                  </div>
                </Link>
                <button className={styles.btnLogout} onClick={handleLogout} title="Cerrar Sesión">
                  <LogOut size={18} />
                </button>
              </li>
            </>
          ) : (
            <div className={styles.navbarAuthButtons}>
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
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
