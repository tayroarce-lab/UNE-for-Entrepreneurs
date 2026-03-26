import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, Lock, Camera, Save, ArrowLeft, ShieldCheck, Calendar, Trash2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import UserServices from '../../../services/UserServices';
import { notifications } from '../../../utils/notifications';
import Swal from 'sweetalert2';
import styles from './ProfileEditor.module.css';

const ProfileEditor: React.FC = () => {
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

  const updateAvatarInstant = async (newAvatarStr: string) => {
    if (!user) return;
    refreshUser({ avatar: newAvatarStr });
    try {
      const payload = { avatar: newAvatarStr };
      await UserServices.patchUsuarios(payload, user.id);
    } catch (error) {
      console.error(error);
      notifications.error('Error al actualizar la foto de perfil');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Límite de 2MB
        notifications.error('La imagen es muy grande. El tamaño máximo es de 2MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 250;
          const MAX_HEIGHT = 250;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const base64Str = canvas.toDataURL('image/jpeg', 0.6);
            
            setFormData(prev => ({ ...prev, avatar: base64Str }));
            await updateAvatarInstant(base64Str);
            notifications.success('Foto de perfil actualizada exitosamente.');
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
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
      const payload: any = { nombre: formData.nombre, email: formData.email, avatar: formData.avatar };
      if (formData.newPassword) payload.password = formData.newPassword;

      const updated = await UserServices.patchUsuarios(payload, user.id);
      if (updated) {
        refreshUser({ name: updated.nombre, email: updated.email, avatar: updated.avatar });
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
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          <ArrowLeft size={20} /> Volver
        </button>

        <div className={styles.grid}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatarCircle}>
                {formData.avatar
                  ? <img src={formData.avatar} alt="Avatar" />
                  : formData.nombre.charAt(0).toUpperCase()
                }
              </div>
              <label className={styles.cameraLabel} title="Editar avatar" style={{ cursor: 'pointer' }}>
                <Camera size={18} />
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              </label>
              {formData.avatar && (
                <button 
                  type="button" 
                  className={styles.trashLabel} 
                  title="Eliminar foto"
                  onClick={() => {
                    Swal.fire({
                      title: '¿Eliminar foto de perfil?',
                      text: "Esta acción no se puede deshacer.",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: 'var(--suria-crimson)',
                      cancelButtonColor: '#94a3b8',
                      confirmButtonText: 'Sí, eliminar',
                      cancelButtonText: 'Cancelar'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        setFormData(prev => ({ ...prev, avatar: '' }));
                        updateAvatarInstant('');
                        notifications.success('Foto eliminada correctamente.');
                      }
                    });
                  }}
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            <h2 className={styles.sidebarName}>{user.name}</h2>
            <p className={styles.sidebarEmail}>{user.email}</p>
            <div className={styles.metaList}>
              <div className={styles.metaItem}>
                <ShieldCheck size={16} />
                <span>Rol: <strong>{user.isAdmin ? 'Administradora' : 'Emprendedora'}</strong></span>
              </div>
              <div className={styles.metaItem}>
                <Calendar size={16} />
                <span>Miembro desde: <strong>2024</strong></span>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className={styles.formPanel}>
            <h1 className={styles.panelTitle}>Configuración de Perfil</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.twoCol}>
                <div className={styles.inputGroup}>
                  <label>Nombre Completo</label>
                  <div className={styles.inputWrapper}>
                    <UserIcon size={18} className={styles.inputIcon} />
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className={styles.input} />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Correo Electrónico</label>
                  <div className={styles.inputWrapper}>
                    <Mail size={18} className={styles.inputIcon} />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} />
                  </div>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Avatar URL (Opcional)</label>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '8px', lineHeight: 1.4 }}>
                  Puedes pegar un enlace aquí, o <strong>hacer clic en el ícono de cámara</strong> sobre tu inicial arriba a la izquierda para subir una foto desde tu galería.
                </p>
                <div className={styles.inputWrapper}>
                  <Camera size={18} className={styles.inputIcon} />
                  <input 
                    type="text" 
                    name="avatar" 
                    placeholder="https://ejemplo.com/mi-foto.jpg" 
                    value={formData.avatar.startsWith('data:image') ? '(Foto seleccionada desde galería)' : formData.avatar} 
                    onChange={(e) => {
                      if (!formData.avatar.startsWith('data:image')) {
                        handleChange(e);
                        refreshUser({ avatar: e.target.value });
                      }
                    }} 
                    onBlur={(e) => {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const currentAvatar = (user as any)?.avatar || '';
                      if (!formData.avatar.startsWith('data:image') && e.target.value !== currentAvatar) {
                        updateAvatarInstant(e.target.value);
                      }
                    }}
                    readOnly={formData.avatar.startsWith('data:image')}
                    className={styles.input} 
                  />
                </div>
              </div>

              <hr className={styles.divider} />
              <h3 className={styles.sectionTitle}>Cambiar Contraseña</h3>
              <p className={styles.sectionHint}>Dejar en blanco si no desea cambiarla.</p>

              <div className={styles.twoCol}>
                <div className={styles.inputGroup}>
                  <label>Nueva Contraseña</label>
                  <div className={styles.inputWrapper}>
                    <Lock size={18} className={styles.inputIcon} />
                    <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} className={styles.input} />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Confirmar Contraseña</label>
                  <div className={styles.inputWrapper}>
                    <Lock size={18} className={styles.inputIcon} />
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={styles.input} />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading} className={styles.submitBtn}>
                <Save size={20} />
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
