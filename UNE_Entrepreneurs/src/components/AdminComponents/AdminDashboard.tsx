import AdminLayout from './AdminLayout'
import AdminHeader from './AdminHeader'
import { 
  Users, 
  Newspaper, 
  Plus,
  Download,
  ShieldCheck,
  Lightbulb
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  return (
    <AdminLayout>
        <AdminHeader placeholder="Buscar usuarios, noticias o recursos..." />
        
        <main className="admin-main">
          <div className="admin-page-header">
            <div>
              <h1 className="admin-page-title">Dashboard Principal</h1>
              <p className="admin-page-subtitle">Resumen de actividad para UNE Costa Rica</p>
            </div>
            <button className="btn-admin btn-admin-outline">
              <Download size={18} /> Exportar Reporte
            </button>
          </div>

          {/* KPIs */}
          <div className="kpi-row-v4">
            <div className="admin-card kpi-card-v4" style={{ marginBottom: 0 }}>
              <div className="growth-badge growth-plus">+5.2%</div>
              <div className="kpi-icon-square" style={{ background: '#E0F2FE', color: '#0284C7' }}>
                <Users size={24} />
              </div>
              <p className="admin-label">Total Usuarios</p>
              <h2 className="admin-card-title" style={{ fontSize: '2rem' }}>1,254</h2>
            </div>

            <div className="admin-card kpi-card-v4" style={{ marginBottom: 0 }}>
              <div className="growth-badge growth-minus">-1.5%</div>
              <div className="kpi-icon-square" style={{ background: '#F3E8FF', color: '#9333EA' }}>
                <Lightbulb size={24} />
              </div>
              <p className="admin-label">Nuevos Tips</p>
              <h2 className="admin-card-title" style={{ fontSize: '2rem' }}>12</h2>
            </div>
          </div>

          <div className="dashboard-split-layout">
            {/* Left: Quick Actions */}
            <div className="admin-card">
               <div className="admin-card-header">
                 <h3 className="admin-card-title">Acciones Rápidas</h3>
                 <button className="btn-admin" style={{ background: 'none', color: '#94A3B8', padding: 0 }}>•••</button>
               </div>
               
               <div className="quick-actions-box-grid">
                  <Link to="/admin/usuarios" className="action-card-sq">
                    <div className="action-icon-circle" style={{ background: '#FCA5A5' }}><Users size={20} /></div>
                    <span>Gestionar Usuarios</span>
                  </Link>

                  <Link to="/admin/noticias" className="action-card-sq">
                    <div className="action-icon-circle" style={{ background: '#991B1B' }}><Newspaper size={20} /></div>
                    <span>Administrar Noticias</span>
                  </Link>

                  <Link to="/admin/configuraciones" className="action-card-sq">
                    <div className="action-icon-circle" style={{ background: '#1E293B' }}><ShieldCheck size={20} /></div>
                    <span>Ver Auditoría</span>
                  </Link>
               </div>
            </div>

            {/* Right: Activity (Mockup) */}
            <div className="admin-card activity-card-mockup">
               <h3 className="admin-card-title">Notificaciones Recientes</h3>
               
               <div className="activity-list">
                  <div style={{ display: 'flex', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px', marginBottom: '10px', marginTop: '1rem' }}>
                    <span style={{ flex: 1, fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8' }}>ACTIVIDAD</span>
                    <span style={{ width: '100px', fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8', textAlign: 'center' }}>ESTADO</span>
                  </div>

                  <div className="activity-item">
                    <div className="user-snippet">
                      <div className="snippet-avatar" style={{ background: '#FEE2E2', color: '#B91C1C' }}>RM</div>
                      <div className="snippet-name">Nuevo Usuario: Ricardo Mora</div>
                    </div>
                    <div className="status-badge-mockup status-pend">Pendiente</div>
                  </div>

                  <div className="activity-item">
                    <div className="user-snippet">
                      <div className="snippet-avatar" style={{ background: '#D1FAE5', color: '#065F46' }}>AV</div>
                      <div className="snippet-name">Consejo publicado: Ana Valverde</div>
                    </div>
                    <div className="status-badge-mockup status-appr">Aceptado</div>
                  </div>
               </div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="news-banner-plum">
            <div className="news-banner-content">
              <h2>Centralizar Noticias para Pymes</h2>
              <p>Actualice los consejos financieros y noticias del sector para que los usuarios de UNE Costa Rica estén siempre informados.</p>
            </div>
            <button className="btn-admin btn-admin-secondary">
              <Plus size={20} /> Publicar Noticia
            </button>
          </div>
        </main>
    </AdminLayout>
  )
}