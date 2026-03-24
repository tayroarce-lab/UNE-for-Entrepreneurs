import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../../styles/AdminDashboard.css'
import { 
  Users, 
  Newspaper, 
  Search, 
  Bell,
  TrendingUp,
  Clock,
  Plus,
  LayoutGrid,
  FileText,
  Star
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import AdminLayout from './AdminLayout'
import UserServices from '../../services/UserServices'
import { getNews } from '../../services/NewsService'
import { toast } from 'sonner'

type KPIProps = {
  titulo: string;
  valor: string | number;
  crecimiento: string;
  tendencia: 'up' | 'down';
  icono: React.ElementType;
}

const KPICard = ({ titulo, valor, crecimiento, tendencia, icono: Icon }: KPIProps) => (
  <div className="kpi-card-v2">
    <div className="kpi-icon-wrap">
      <Icon size={24} />
    </div>
    <div className="kpi-stats">
      <p>{titulo}</p>
      <h2>{valor}</h2>
    </div>
    <div className={`growth-badge ${tendencia === 'up' ? 'growth-positive' : 'growth-negative'}`}>
       {tendencia === 'up' ? '+' : ''}{crecimiento}%
    </div>
  </div>
)

function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalNews, setTotalNews] = useState(0);
  const [activeNews, setActiveNews] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, newsRes] = await Promise.all([
          UserServices.getUser(),
          getNews()
        ]);
        
        setTotalUsers(usersRes?.length || 0);
        setTotalNews(newsRes?.length || 0);
        setActiveNews(newsRes?.filter((n: { activa?: boolean }) => n.activa).length || 0);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
        toast.error("Error al cargar métricas");
      }
    };
    fetchData();
  }, []);

  return (
    <AdminLayout>
        {/* TOP HEADER */}
        <header className="admin-top-header">
          <div className="search-bar-v2">
            <Search size={18} className="search-icon-header" />
            <input type="text" placeholder="Buscar préstamos, usuarios o noticias..." />
          </div>

          <div className="header-user-meta">
            <div className="notification-bell">
              <Bell size={22} color="#64748b" />
              <div className="bell-dot"></div>
            </div>

            <button className="profile-button-v2">
                <div className="user-tag">
                    <div style={{ fontSize: '0.85rem' }}>{user?.name || 'Admin UNE'}</div>
                    <div style={{ fontSize: '0.7rem' }}>Gestor Principal</div>
                </div>
                <div className="profile-circle-v2">
                   {user?.name ? user.name.charAt(0) : 'A'}
                </div>
            </button>
          </div>
        </header>

        <main style={{ padding: 0 }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '10px' }}>Dashboard Principal</h1>
          <p style={{ color: '#64748b', marginBottom: '30px' }}>Resumen de actividad para UNE Costa Rica</p>

          <div className="kpi-row">
            <KPICard 
                titulo="Total Usuarios" 
                valor={totalUsers} 
                crecimiento="5.2" 
                tendencia="up" 
                icono={Users} 
            />
            <KPICard 
                titulo="Noticias Activas" 
                valor={activeNews} 
                crecimiento="100" 
                tendencia="up" 
                icono={Newspaper} 
            />
            <KPICard 
                titulo="Total Publicaciones" 
                valor={totalNews} 
                crecimiento="1.5" 
                tendencia="up" 
                icono={TrendingUp} 
            />
          </div>

          <div className="dashboard-grid-v2">
            <div className="grid-card">
               <div className="grid-card-label">
                  <h3>Acciones Rápidas</h3>
                  <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>•••</button>
               </div>
               <div className="quick-actions-box">
                  <Link to="/admin/usuarios" className="action-card">
                     <div className="action-icon" style={{ backgroundColor: '#f87171' }}><Users size={20} /></div>
                     <h4>Gestionar Usuarios</h4>
                  </Link>
                  <Link to="/admin/noticias" className="action-card">
                     <div className="action-icon" style={{ backgroundColor: '#991b1b' }}><Newspaper size={20} /></div>
                     <h4>Administrar Noticias</h4>
                  </Link>
                  <Link to="/admin/financiamiento" className="action-card">
                     <div className="action-icon" style={{ backgroundColor: '#D4A853' }}><LayoutGrid size={20} /></div>
                     <h4>Financiamiento Suria</h4>
                  </Link>
                  <Link to="/admin/configuraciones" className="action-card">
                     <div className="action-icon" style={{ backgroundColor: '#1e293b' }}><Clock size={20} /></div>
                     <h4>Ver Auditoría</h4>
                  </Link>
                  <Link to="/admin/calificaciones" className="action-card">
                     <div className="action-icon" style={{ backgroundColor: '#fbbf24' }}><Star size={20} /></div>
                     <h4>Gestionar Feedback</h4>
                  </Link>
               </div>
            </div>

            <div className="grid-card">
               <div className="grid-card-label">
                  <h3>Estado del Sistema</h3>
               </div>
               <div style={{ padding: '20px', textAlign: 'center' }}>
                  <div style={{ padding: '30px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                     <TrendingUp size={48} color="var(--uneRed)" style={{ marginBottom: '15px' }} />
                     <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px' }}>Sistema Operativo</h4>
                     <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Todas las bases de datos están sincronizadas y el portal de noticias está activo para los usuarios.</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="news-center-banner">
             <div className="banner-content">
                <span><Plus size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> NOVEDAD UNE</span>
                <h2>Centralizar Noticias para Pymes</h2>
                <p>Actualice los consejos financieros y noticias del sector para que los usuarios de UNE Costa Rica estén siempre informados.</p>
             </div>
             <button className="btn-publish-v2" onClick={() => navigate('/admin/noticias')}>
                <FileText size={20} />
                Publicar Noticia
             </button>
          </div>
        </main>
    </AdminLayout>
  )
}

export default AdminDashboard