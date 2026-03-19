import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../../styles/AdminDashboard.css'
import { 
  Users, 
  Banknote, 
  Newspaper, 
  Search, 
  Bell,
  TrendingUp,
  FileText,
  Clock,
  ExternalLink,
  Plus
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import AdminLayout from './AdminLayout'
import UserServices from '../../services/UserServices'
import { getApplications } from '../../services/FinancingService'
import { getNews } from '../../services/NewsService'
import { toast } from 'sonner'

type KPIProps = {
  titulo: string;
  valor: string | number;
  crecimiento: string;
  tendencia: 'up' | 'down';
  icono: any;
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
  const [totalApps, setTotalApps] = useState(0);
  const [totalNews, setTotalNews] = useState(0);
  const [recentLoans, setRecentLoans] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, appsRes, newsRes] = await Promise.all([
          UserServices.getUser(),
          getApplications(),
          getNews()
        ]);
        
        setTotalUsers(usersRes?.length || 0);
        setTotalApps(appsRes?.length || 0);
        setTotalNews(newsRes?.length || 0);

        // Sorting by newest first if possible, or just taking the last 3 from exactly the list
        const latestApps = (appsRes || []).slice(-3).reverse();
        setRecentLoans(latestApps);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
        toast.error("Error al cargar algunas métricas reales");
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
                titulo="Solicitudes Crédito" 
                valor={totalApps} 
                crecimiento="2.1" 
                tendencia="up" 
                icono={FileText} 
            />
            <KPICard 
                titulo="Total Noticias" 
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
                  <Link to="/admin/financiaciones" className="action-card">
                     <div className="action-icon" style={{ backgroundColor: '#60a5fa' }}><Banknote size={20} /></div>
                     <h4>Manejar Financiaciones</h4>
                  </Link>
                  <Link to="/admin/noticias" className="action-card">
                     <div className="action-icon" style={{ backgroundColor: '#991b1b' }}><Newspaper size={20} /></div>
                     <h4>Administrar Noticias</h4>
                  </Link>
                  <Link to="/admin/configuraciones" className="action-card">
                     <div className="action-icon" style={{ backgroundColor: '#1e293b' }}><Clock size={20} /></div>
                     <h4>Ver Auditoría</h4>
                  </Link>
               </div>
            </div>

            <div className="grid-card">
               <div className="grid-card-label">
                  <h3>Solicitudes de Crédito Recientes</h3>
               </div>
               <table className="admin-table-v2">
                  <thead>
                     <tr>
                        <th>CÉDULA APLICANTE</th>
                        <th>MONTO</th>
                        <th>ESTADO</th>
                        <th>ACCIÓN</th>
                     </tr>
                  </thead>
                  <tbody>
                     {recentLoans.length > 0 ? recentLoans.map(loan => (
                        <tr key={loan.id}>
                           <td>
                              <div className="row-user">
                                 <div className="row-avatar">{loan.userId ? loan.userId.substring(0,2).toUpperCase() : 'U'}</div>
                                 <div style={{ fontWeight: 800 }}>ID: {loan.userId}</div>
                              </div>
                           </td>
                           <td style={{ fontWeight: 700 }}>{loan.amountRequested ? `₡${loan.amountRequested.toLocaleString()}` : 'N/A'}</td>
                           <td>
                              <span className={`status-tag ${loan.status === 'pending' ? 'pending' : (loan.status === 'approved' ? 'success' : 'pending')}`}>
                                 {loan.status || 'pending'}
                              </span>
                           </td>
                           <td style={{ textAlign: 'center' }}>
                              <Link to={`/admin/financiaciones`} style={{ color: '#3b82f6' }}>Detalles</Link>
                           </td>
                        </tr>
                     )) : (
                         <tr>
                             <td colSpan={4} style={{ textAlign: 'center', color: '#64748b' }}>No hay solicitudes de crédito recientes</td>
                         </tr>
                     )}
                  </tbody>
               </table>
               <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <Link to="/admin/financiaciones" style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    Ver todas las transacciones <ExternalLink size={14} />
                  </Link>
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