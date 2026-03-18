// ============================================================
// Barra de Navegación — UNE Costa Rica
// ============================================================

import { NavLink, Link, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, UserCircle } from 'lucide-react';
import uneLogo from '../../assets/logo_une.png';
import { useAuth } from '../../context/AuthContext';

export default function FinancingNavbar() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="financingNavbar" aria-label="Navegación principal">
      {/* Logo */}
      <Link to="/" className="financingNavbarBrand" aria-label="Volver al inicio">
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '50%', width: '38px', height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <img src={uneLogo} alt="Logo UNE" style={{ height: '28px', width: '28px', objectFit: 'contain' }} />
        </div>
        <span className="financingNavbarLogo">UNE</span>
        <span className="financingNavbarLogoAccent">Unión Nacional de Emprendedores</span>
      </Link>

      {/* Navigation Links */}
      <div className="financingNavbarLinks">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active' : '')}
          end
        >
          Inicio
        </NavLink>
        <NavLink
          to="/financiamiento"
          className={({ isActive }) => (isActive ? 'active' : '')}
          end
        >
          Créditos
        </NavLink>
        <NavLink
          to="/finanzas"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Finanzas
        </NavLink>

        {user && (
          <NavLink
            to="/presupuesto"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Mi Panel
          </NavLink>
        )}

        {isAdmin && (
          <NavLink
            to="/admin/financiamiento"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            <LayoutDashboard size={18} style={{ marginRight: '6px', verticalAlign: 'middle', display: 'inline-block' }} />
            Admin
          </NavLink>
        )}

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '8px' }}>
            <span style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 500, display: 'flex', alignItems: 'center' }}>
              <UserCircle size={18} style={{ marginRight: '6px' }} />
              {user.name}
            </span>
            <button
              className="navbarCta"
              onClick={handleLogout}
              style={{ marginLeft: '12px', border: 'none', display: 'flex', alignItems: 'center' }}
            >
              <LogOut size={16} style={{ marginRight: '6px' }} /> Salir
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '8px' }}>
            <Link to="/login" style={{ fontSize: '0.875rem' }}>
              Iniciar Sesión
            </Link>
            <Link to="/registro" className="navbarCta">
              Registrar Mi PyME
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
