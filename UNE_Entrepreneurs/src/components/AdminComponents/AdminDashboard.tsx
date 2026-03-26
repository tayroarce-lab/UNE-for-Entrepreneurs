import AdminLayout from './AdminLayout'
import AdminHeader from './AdminHeader'
import { 
  Users, 
  Newspaper, 
  Plus,
  FileText,
  Star,
  Download,
  CreditCard,
  ShieldCheck,
  Lightbulb
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  return (
    <AdminLayout>
        <AdminHeader placeholder="Buscar préstamos, usuarios o noticias..." />
        
        <main style={{ padding: 0 }}>
          <div className="admin-main-header">
            <div>
              <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#3A0D23', margin: 0 }}>Dashboard Principal</h1>
              <p style={{ color: '#64748B', margin: 0, marginTop: '4px', fontSize: '1rem' }}>Resumen de actividad para UNE Costa Rica</p>
            </div>
            <button style={{ background: '#fff', border: '1px solid #E2E8F0', padding: '12px 20px', borderRadius: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px', color: '#1E293B', cursor: 'pointer' }}>
              <Download size={18} /> Exportar Reporte
            </button>
          </div>

          {/* KPIs */}
          <div className="kpi-row-v4">
            <div className="kpi-card-v4">
              <div className="growth-badge growth-plus">+5.2%</div>
              <div className="kpi-icon-square" style={{ background: '#E0F2FE', color: '#0284C7' }}>
                <Users size={24} />
              </div>
              <p style={{ color: '#64748B', fontSize: '0.9rem', fontWeight: 600, margin: '0 0 8px 0' }}>Total Usuarios</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: '#1E293B' }}>1,254</h2>
            </div>

            <div className="kpi-card-v4">
              <div className="growth-badge growth-plus">+2.1%</div>
              <div className="kpi-icon-square" style={{ background: '#FEE2E2', color: '#DC2626' }}>
                <FileText size={24} />
              </div>
              <p style={{ color: '#64748B', fontSize: '0.9rem', fontWeight: 600, margin: '0 0 8px 0' }}>Préstamos Activos</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: '#1E293B' }}>86</h2>
            </div>

            <div className="kpi-card-v4">
              <div className="growth-badge growth-minus">-1.5%</div>
              <div className="kpi-icon-square" style={{ background: '#F3E8FF', color: '#9333EA' }}>
                <Lightbulb size={24} />
              </div>
              <p style={{ color: '#64748B', fontSize: '0.9rem', fontWeight: 600, margin: '0 0 8px 0' }}>Nuevos Tips</p>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: '#1E293B' }}>12</h2>
            </div>
          </div>

          <div className="dashboard-split-layout">
            {/* Left: Quick Actions */}
            <div className="recent-activity-card">
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>Acciones Rápidas</h3>
                 <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '1.25rem' }}>•••</button>
               </div>
               
               <div className="quick-actions-box-grid">
                  <Link to="/admin/usuarios" className="action-card-sq">
                    <div className="action-icon-circle" style={{ background: '#FCA5A5' }}><Users size={20} /></div>
                    <span>Gestionar Usuarios</span>
                  </Link>

                  <Link to="/admin/financiamiento" className="action-card-sq">
                    <div className="action-icon-circle" style={{ background: '#60A5FA' }}><CreditCard size={20} /></div>
                    <span>Manejar Financiaciones</span>
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

            {/* Right: Recent Transactions */}
            <div className="activity-card-mockup">
               <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E293B', margin: 0 }}>Actividad de Préstamos Recientes</h3>
               
               <div className="activity-list">
                  <div style={{ display: 'flex', borderBottom: '1px solid #F1F5F9', paddingBottom: '12px', marginBottom: '10px', marginTop: '1rem' }}>
                    <span style={{ flex: 1, fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8' }}>CLIENTE</span>
                    <span style={{ width: '100px', fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8' }}>MONTO</span>
                    <span style={{ width: '100px', fontSize: '0.7rem', fontWeight: 800, color: '#94A3B8', textAlign: 'center' }}>ESTADO</span>
                  </div>

                  <div className="activity-item">
                    <div className="user-snippet">
                      <div className="snippet-avatar" style={{ background: '#FEE2E2', color: '#B91C1C' }}>RM</div>
                      <div className="snippet-name">Ricardo Mora</div>
                    </div>
                    <div className="activity-amount">₡2.500.000</div>
                    <div className="status-badge-mockup status-pend" style={{ textAlign: 'center' }}>Pendiente</div>
                  </div>

                  <div className="activity-item">
                    <div className="user-snippet">
                      <div className="snippet-avatar" style={{ background: '#D1FAE5', color: '#065F46' }}>AV</div>
                      <div className="snippet-name">Ana Valverde</div>
                    </div>
                    <div className="activity-amount">₡5.000.000</div>
                    <div className="status-badge-mockup status-appr" style={{ textAlign: 'center' }}>Aprobado</div>
                  </div>

                  <div className="activity-item">
                    <div className="user-snippet">
                      <div className="snippet-avatar" style={{ background: '#F3E8FF', color: '#6B21A8' }}>JC</div>
                      <div className="snippet-name">Jose Castro</div>
                    </div>
                    <div className="activity-amount">₡850.000</div>
                    <div className="status-badge-mockup status-appr" style={{ textAlign: 'center' }}>Aprobado</div>
                  </div>
               </div>

               <div style={{ textAlign: 'center', marginTop: '20px' }}>
                 <button style={{ background: 'none', border: 'none', color: '#64748B', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer' }}>Ver todas las transacciones</button>
               </div>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="news-banner-plum">
            <div className="news-banner-content">
              <div style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                <Star size={14} fill="#fff" /> Novedad UNE
              </div>
              <h2>Centralizar Noticias para Pymes</h2>
              <p>Actualice los consejos financieros y noticias del sector para que los <br/> usuarios de UNE Costa Rica estén siempre informados.</p>
            </div>
            <button className="btn-publish-mockup">
              <Plus size={20} /> Publicar Noticia
            </button>
          </div>
        </main>
    </AdminLayout>
  )
}