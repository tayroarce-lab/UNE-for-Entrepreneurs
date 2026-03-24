import { NavLink, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Newspaper, 
  Settings, 
  LogOut,
  Wallet,
  Landmark,
  Package,
  Mailbox,
  MapPin,
  Star,
  FileText,
  Home
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
    { to: '/', icon: Home, label: 'Volver a Inicio' },
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/usuarios', icon: Users, label: 'Gestión de Usuarios' },
    { to: '/admin/financiamiento', icon: Landmark, label: 'Financiaciones' },
    { to: '/admin/inventario', icon: Package, label: 'Inventario Global' },
    { to: '/admin/presupuesto', icon: Wallet, label: 'Presupuesto' },
    { to: '/admin/noticias', icon: Newspaper, label: 'Tips y Noticias' },
    { to: '/admin/solicitudes-contacto', icon: Mailbox, label: 'Solicitudes' },
    { to: '/admin/casos-exito', icon: Star, label: 'Casos de Éxito' },
    { to: '/admin/mapa', icon: MapPin, label: 'Sedes y Mapa' },
    { to: '/admin/calificaciones', icon: Star, label: 'Calificaciones' },
    { to: '/admin/recursos', icon: FileText, label: 'Recursos' },
    { to: '/admin/configuraciones', icon: Settings, label: 'Configuración' },
  ];

  return (
    <nav className="admin-v2-sidebar">
      <div className="sidebar-header" style={{ display: 'flex', gap: '15px', padding: '30px 24px' }}>
        <div className="logo-icon" style={{ width: '40px', height: '40px', background: 'var(--admin-accent)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Landmark size={20} color="#fff" />
        </div>
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>UNE Costa Rica</h3>
          <p style={{ margin: 0, fontSize: '0.65rem', opacity: 0.6, letterSpacing: '0.5px', textTransform: 'uppercase' }}>PANEL ADMINISTRATIVO</p>
        </div>
      </div>

      <ul className="sidebar-nav" style={{ padding: '0 12px', flex: 1, overflowY: 'auto' }}>
        {navItems.map((item) => (
          <li key={item.label} style={{ marginBottom: '5px' }}>
            <NavLink 
              to={item.to} 
              className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
              style={{ padding: '14px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}
            >
              <item.icon size={20} className="nav-icon" />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer-mockup">
        <button className="btn-logout-red" onClick={handleLogout}>
          <LogOut size={18} /> Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}
