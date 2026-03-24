import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User as UserIcon, 
  Mail, 
  Lock, 
  Camera, 
  Save, 
  ArrowLeft,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import UserServices from '../../services/UserServices';
import { notifications } from '../../utils/notifications';
import Navbar from '../../components/Shared/Navbar';
import Footer from '../../components/Shared/Footer';

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    avatar: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        nombre: user.name,
        email: user.email,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        avatar: (user as any).avatar || ''
      }));
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      notifications.error('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updatePayload: any = {
        nombre: formData.nombre,
        email: formData.email,
        avatar: formData.avatar
      };

      if (formData.newPassword) {
        updatePayload.password = formData.newPassword;
      }

      const updated = await UserServices.patchUsuarios(updatePayload, user.id);
      
      if (updated) {
        refreshUser({
          name: updated.nombre,
          email: updated.email,
          avatar: updated.avatar
        });
        
        notifications.success('Perfil actualizado correctamente');
        setFormData(prev => ({ ...prev, newPassword: '', confirmPassword: '' }));
      }
    } catch (error) {
      console.error(error);
      notifications.error('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="profile-page-container" style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Navbar />
      
      <main className="container" style={{ paddingTop: '120px', paddingBottom: '80px', maxWidth: '1000px' }}>
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', background: 'none', color: '#64748b', fontWeight: 600, cursor: 'pointer', marginBottom: '2rem' }}>
          <ArrowLeft size={20} /> Volver
        </button>

        <div className="profile-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem' }}>
          
          {/* Sidebar - Profile Card */}
          <aside>
            <div style={{ background: '#fff', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'center' }}>
              <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1.5rem' }}>
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, var(--uneRed), var(--uneRedDark))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  fontWeight: 800,
                  color: '#fff',
                  overflow: 'hidden',
                  boxShadow: '0 8px 16px rgba(139, 26, 26, 0.2)'
                }}>
                  {formData.avatar ? (
                    <img src={formData.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    formData.nombre.charAt(0).toUpperCase()
                  )}
                </div>
                <label style={{ 
                  position: 'absolute', 
                  bottom: '0', 
                  right: '0', 
                  width: '36px', 
                  height: '36px', 
                  background: '#fff', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  cursor: 'pointer',
                  color: 'var(--uneGold)'
                }}>
                  <Camera size={18} />
                  <input type="text" placeholder="URL de avatar" name="avatar" value={formData.avatar} onChange={handleChange} style={{ display: 'none' }} />
                </label>
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{user.name}</h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{user.email}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left', borderTop: '1px solid #f1f5f9', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontSize: '0.85rem' }}>
                  <ShieldCheck size={16} /> <span>Rol: <strong>{user.isAdmin ? 'Administrador' : 'Emprendedor'}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontSize: '0.85rem' }}>
                  <Calendar size={16} /> <span>Miembro desde: <strong>2024</strong></span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Form */}
          <div style={{ background: '#fff', borderRadius: '24px', padding: '3rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>Configuración de Perfil</h1>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="input-group">
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem', color: '#444' }}>Nombre Completo</label>
                  <div style={{ position: 'relative' }}>
                    <UserIcon size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input 
                      type="text" 
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem' }} 
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem', color: '#444' }}>Correo Electrónico</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem' }} 
                    />
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem', color: '#444' }}>Avatar URL (Opcional)</label>
                <div style={{ position: 'relative' }}>
                  <Camera size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input 
                    type="text" 
                    name="avatar"
                    placeholder="https://ejemplo.com/mi-foto.jpg"
                    value={formData.avatar}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem' }} 
                  />
                </div>
              </div>

              <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #f1f5f9' }} />

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Cambiar Contraseña</h3>
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1rem' }}>Dejar en blanco si no desea cambiarla.</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="input-group">
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem', color: '#444' }}>Nueva Contraseña</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input 
                      type="password" 
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem' }} 
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem', color: '#444' }}>Confirmar Contraseña</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input 
                      type="password" 
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem' }} 
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <button 
                  type="submit" 
                  disabled={loading}
                  style={{ 
                    background: 'var(--uneRed)', 
                    color: '#fff', 
                    padding: '1rem 2.5rem', 
                    borderRadius: '12px', 
                    border: 'none', 
                    fontWeight: 700, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    boxShadow: '0 10px 15px -3px rgba(139, 26, 26, 0.3)'
                  }}>
                  <Save size={20} />
                  {loading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
