import { NavLink, useNavigate, Link } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Newspaper, 
  Settings, 
  LogOut,
  ChevronRight,
  Package,
  Wallet,
  Landmark,
  MapPin,
  Home,
  Mailbox
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Swal from 'sweetalert2'
import { toast } from 'sonner'

export default function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: "Tendrás que volver a iniciar sesión para acceder",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8B1A1A',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      background: '#fff',
      color: '#1e293b'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        toast.success('Sesión finalizada exitosamente');
        navigate('/login');
      }
    });
  }

  const navItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/usuarios', icon: Users, label: 'Usuarios' },
    { to: '/admin/financiamiento', icon: Landmark, label: 'Catálogo de Financiamientos' },
    { to: '/admin/inventario', icon: Package, label: 'Inventario Global' },
    { to: '/admin/presupuesto', icon: Wallet, label: 'Presupuesto' },
    { to: '/admin/noticias', icon: Newspaper, label: 'Tips y Noticias' },
    { to: '/admin/solicitudes-contacto', icon: Mailbox, label: 'Solicitudes de Contacto' },
    { to: '/admin/mapa', icon: MapPin, label: 'Mapa de Sede' },
    { to: '/admin/configuraciones', icon: Settings, label: 'Configuración' },
  ];

  return (
    <nav className="admin-v2-sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">
          <Settings size={20} color="#fff" />
        </div>
        <div>
          <h3>UNE Costa Rica</h3>
          <p>PANEL ADMINISTRATIVO</p>
        </div>
      </div>

      <ul className="sidebar-nav">
        {navItems.map((item) => (
          <li key={item.label}>
            <NavLink 
              to={item.to} 
              className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
            >
              <item.icon size={20} className="nav-icon" />
              <span>{item.label}</span>
              <ChevronRight size={14} className="nav-chevron" />
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <Link 
          to="/" 
          className="btn-view-site"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '0.85rem 1.25rem',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.85)',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '0.85rem',
            transition: 'all 0.2s',
            marginBottom: '0.75rem',
            width: '100%',
          }}
        >
          <Home size={18} />
          <span>Ver Sitio Web</span>
        </Link>
        <button className="btn-logout-sidebar" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </nav>
  );
}
