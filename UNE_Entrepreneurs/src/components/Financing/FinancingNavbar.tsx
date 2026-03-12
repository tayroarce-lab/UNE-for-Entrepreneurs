// ============================================================
// Barra de Navegación — UNE Entrepreneurs
// ============================================================
import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Landmark, LogOut, LayoutDashboard, UserCircle, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function FinancingNavbar() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="financingNavbar" aria-label="Navegación principal">
      <div className="financingContainer financingNavContainer">
        {/* Logo */}
        <Link to="/" className="financingLogoGroup" aria-label="Volver al inicio">
          <div className="financingLogoIcon">
            <Landmark size={24} color="#fff" />
          </div>
          <div>
            <div className="financingLogoTitle">FinanciaPyme CR</div>
            <div className="financingLogoSubtitle">Red Empresarial UNE</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="financingNavLinks">
          <NavLink
            to="/financiamiento"
            className={({ isActive }) =>
              `financingNavLink ${isActive ? 'active' : ''}`
            }
            end
          >
            Catálogo de Financiamientos
          </NavLink>

          {isAdmin && (
            <NavLink
              to="/admin/financiamiento"
              className={({ isActive }) =>
                `financingNavLink ${isActive ? 'active' : ''}`
              }
            >
              <LayoutDashboard size={18} style={{ marginRight: '6px' }} />
              Admin
            </NavLink>
          )}

          {user ? (
            <div className="financingUserActions">
              <span className="financingUserName">
                <UserCircle size={18} style={{ marginRight: '6px' }} />
                {user.name}
              </span>
              <button
                className="financingBtn financingBtnSecondary financingBtnSm"
                onClick={handleLogout}
              >
                <LogOut size={16} style={{ marginRight: '6px' }} /> Salir
              </button>
            </div>
          ) : (
            <div className="financingUserActions">
              <Link to="/login" className="financingBtn financingBtnSecondary">
                Iniciar Sesión
              </Link>
              <Link to="/registro" className="financingBtn financingBtnPrimary">
                Registrarse
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="financingMobileMenuBtn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menú principal"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="financingMobileMenu">
          <NavLink
            to="/financiamiento"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `financingNavLink ${isActive ? 'active' : ''}`
            }
            end
          >
            Catálogo de Financiamientos
          </NavLink>

          {isAdmin && (
            <NavLink
              to="/admin/financiamiento"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `financingNavLink ${isActive ? 'active' : ''}`
              }
            >
              <LayoutDashboard size={18} style={{ marginRight: '6px' }} />
              Dashboard Admin
            </NavLink>
          )}

          <div style={{ padding: '1rem', borderTop: '1px solid var(--borderLight)' }}>
            {user ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <span className="financingUserName">
                  <UserCircle size={18} style={{ marginRight: '6px' }} />
                  {user.name}
                </span>
                <button
                  className="financingBtn financingBtnSecondary"
                  style={{ width: '100%' }}
                  onClick={handleLogout}
                >
                  <LogOut size={16} style={{ marginRight: '6px' }} /> Cerrar Sesión
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Link
                  to="/login"
                  className="financingBtn financingBtnSecondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/registro"
                  className="financingBtn financingBtnPrimary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
