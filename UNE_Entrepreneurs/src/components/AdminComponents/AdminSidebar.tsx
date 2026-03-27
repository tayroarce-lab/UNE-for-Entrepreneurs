import { NavLink, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Newspaper, 
  Settings, 
  LogOut,
  Wallet,
  Mailbox,
  MapPin,
  FileText,
  Home,
  Star,
  Landmark
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
    { to: '/admin/presupuesto', icon: Wallet, label: 'Presupuesto' },
    { to: '/admin/noticias', icon: Newspaper, label: 'Tips y Noticias' },
    { to: '/admin/solicitudes-contacto', icon: Mailbox, label: 'Solicitudes' },
    { to: '/admin/casos-exito', icon: Star, label: 'Casos de Éxito' },
    { to: '/admin/mapa', icon: MapPin, label: 'Sedes y Mapa' },
    { to: '/admin/recursos', icon: FileText, label: 'Recursos' },
    { to: '/admin/configuraciones', icon: Settings, label: 'Configuración' },
  ];

  return (
    <nav className="admin-v2-sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">
          <Landmark size={20} color="#fff" />
        </div>
        <div className="sidebar-header-text">
          <h3 className="sidebar-title">UNE Costa Rica</h3>
          <p className="sidebar-subtitle">PANEL ADMINISTRATIVO</p>
        </div>
      </div>

      <ul className="sidebar-nav">
        {navItems.map((item) => (
          <li key={item.label}>
            <NavLink 
              to={item.to} 
              className={({ isActive }: { isActive: boolean }) => isActive ? 'nav-item active' : 'nav-item'}
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
