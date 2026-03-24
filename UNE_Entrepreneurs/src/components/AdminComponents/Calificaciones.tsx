import { useState, useEffect } from 'react';
import { 
  Star, 
  Trash2, 
  Eye, 
  EyeOff, 
  Users, 
  Award, 
  MessageCircle,
  Clock
} from 'lucide-react';
import AdminLayout from './AdminLayout';
import AdminHeader from './AdminHeader';
import { 
  getTestimonials, 
  getRatings, 
  updateTestimonial, 
  deleteTestimonial, 
  deleteRating,
  type Testimonio,
  type Calificacion
} from '../../services/CalificacionesService';
import '../../styles/Calificaciones.css';
import Swal from 'sweetalert2';
import { toast } from 'sonner';

export default function Calificaciones() {
  const [activeTab, setActiveTab] = useState<'testimonios' | 'calificaciones'>('testimonios');
  const [testimonials, setTestimonials] = useState<Testimonio[]>([]);
  const [ratings, setRatings] = useState<Calificacion[]>([]);

  const fetchData = async () => {
    try {
      const [tRes, rRes] = await Promise.all([
        getTestimonials(),
        getRatings()
      ]);
      setTestimonials(tRes);
      setRatings(rRes);
    } catch (error) {
      console.error("Error al cargar calificaciones y testimonios", error);
      toast.error("Error al cargar la información");
    } finally { /* empty */ }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await updateTestimonial(id, { active: !currentStatus });
      setTestimonials(prev => prev.map(t => t.id === id ? { ...t, active: !currentStatus } : t));
      toast.success(currentStatus ? 'Testimonio ocultado' : 'Testimonio activado');
    } catch {
      toast.error('Error al actualizar estado');
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    const res = await Swal.fire({
      title: '¿Eliminar testimonio?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (res.isConfirmed) {
      try {
        await deleteTestimonial(id);
        setTestimonials(prev => prev.filter(t => t.id !== id));
        toast.success('Testimonio eliminado');
      } catch {
        toast.error('Error al eliminar');
      }
    }
  };

  const handleDeleteRating = async (id: string) => {
    const res = await Swal.fire({
      title: '¿Eliminar calificación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (res.isConfirmed) {
      try {
        await deleteRating(id);
        setRatings(prev => prev.filter(r => r.id !== id));
        toast.success('Calificación eliminada');
      } catch {
        toast.error('Error al eliminar');
      }
    }
  };

  const avgRating = ratings.length > 0 
    ? (ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length).toFixed(1)
    : '0.0';

  return (
    <AdminLayout>
      <AdminHeader placeholder="Buscar calificaciones o testimonios..." />
      
      <div className="calificaciones-container" style={{ padding: 0 }}>
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#3A0D23', marginBottom: '4px' }}>Gestión de Feedback</h1>
          <p style={{ color: '#64748B', fontSize: '1.1rem' }}>Administre los testimonios y calificaciones de los usuarios de UNE Costa Rica.</p>
        </div>

        <section className="stats-grid-small">
          <div className="stat-box-v3">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Total Testimonios</span>
              <MessageCircle size={18} color="var(--uneRed)" />
            </div>
            <h3>{testimonials.length}</h3>
          </div>
          <div className="stat-box-v3">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Rating Promedio</span>
              <Star size={18} fill="#fbbf24" color="#fbbf24" />
            </div>
            <h3>{avgRating} <small style={{ fontSize: '0.9rem', color: '#94a3b8' }}>/ 5.0</small></h3>
          </div>
          <div className="stat-box-v3">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Testimonios Activos</span>
              <Award size={18} color="var(--color-success)" />
            </div>
            <h3>{testimonials.filter(t => t.active).length}</h3>
          </div>
          <div className="stat-box-v3">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Total Calificaciones</span>
                <Users size={18} color="var(--admin-accent)" />
            </div>
            <h3>{ratings.length}</h3>
          </div>
        </section>

        <div className="calificaciones-tabs">
          <button 
            className={`tab-btn ${activeTab === 'testimonios' ? 'active' : ''}`}
            onClick={() => setActiveTab('testimonios')}
          >
            Testimonios de Éxito
          </button>
          <button 
            className={`tab-btn ${activeTab === 'calificaciones' ? 'active' : ''}`}
            onClick={() => setActiveTab('calificaciones')}
          >
            Calificaciones del Sistema
          </button>
        </div>

        {activeTab === 'testimonios' ? (
          <div className="testimonials-view">
            {testimonials.length > 0 ? (
              <div className="testimonials-grid">
                {testimonials.map(item => (
                  <div className="testimonial-admin-card" key={item.id} style={{ opacity: item.active ? 1 : 0.7 }}>
                    <div>
                      <div className="t-card-header">
                        <div className="t-user-info">
                          <img src={item.avatar || '/avatar_placeholder.png'} alt={item.userName} className="t-avatar" />
                          <div className="t-meta">
                            <h4>{item.userName}</h4>
                            <p>{item.userRole}</p>
                          </div>
                        </div>
                        <div className="status-tag" style={{ background: item.active ? '#f0fdf4' : '#f1f5f9', color: item.active ? '#16a34a' : '#64748b' }}>
                          {item.active ? 'Activo' : 'Oculto'}
                        </div>
                      </div>
                      <div className="t-content">"{item.content}"</div>
                    </div>

                    <div className="t-actions">
                      <button className="btn-toggle-active" 
                        onClick={() => handleToggleActive(item.id, item.active)}
                        style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', color: 'var(--admin-text-secondary)' }}
                      >
                        {item.active ? <EyeOff size={16} /> : <Eye size={16} />}
                        {item.active ? 'Ocultar' : 'Mostrar en Home'}
                      </button>
                      <button className="btn-delete-small" onClick={() => handleDeleteTestimonial(item.id)}>
                        <Trash2 size={16} />
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
                <div className="empty-state">
                    <MessageCircle size={48} style={{ marginBottom: '15px' }} />
                    <p>No hay testimonios registrados actualmente.</p>
                </div>
            )}
          </div>
        ) : (
          <div className="ratings-view">
            {ratings.length > 0 ? (
              <div className="ratings-table-wrap">
                <table className="admin-table-v2">
                  <thead>
                    <tr>
                      <th>Usuario / ID</th>
                      <th>Rating</th>
                      <th>Comentario</th>
                      <th>Fecha</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ratings.map(item => (
                      <tr key={item.id}>
                        <td>
                          <div className="row-user">
                            <div className="row-avatar">{item.userId.charAt(0)}</div>
                            <span>ID: {item.userId}</span>
                          </div>
                        </td>
                        <td>
                          <div className="rating-stars">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} fill={i < item.rating ? "#fbbf24" : "none"} color="#fbbf24" />
                            ))}
                          </div>
                        </td>
                        <td>{item.comment}</td>
                        <td style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Clock size={12} />
                                {new Date(item.date).toLocaleDateString()}
                            </div>
                        </td>
                        <td>
                          <button className="btn-delete-small" onClick={() => handleDeleteRating(item.id)}>
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
                <div className="empty-state">
                    <Star size={48} style={{ marginBottom: '15px' }} />
                    <p>No hay calificaciones registradas actualmente.</p>
                </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
