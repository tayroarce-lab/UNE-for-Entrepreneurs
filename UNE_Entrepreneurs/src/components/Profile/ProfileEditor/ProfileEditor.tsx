import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, Lock, Camera, Save, ArrowLeft, ShieldCheck, Calendar } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import UserServices from '../../../services/UserServices';
import { notifications } from '../../../utils/notifications';
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        notifications.error('La imagen no debe superar los 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
        notifications.success('Foto cargada. ¡No olvides guardar los cambios!');
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
              <label className={styles.cameraLabel} title="Editar avatar">
                <Camera size={18} />
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              </label>
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
                <label>Sube una foto de perfil (Opcional)</label>
                <div className={styles.inputWrapper}>
                  <Camera size={18} className={styles.inputIcon} />
                  <input type="file" accept="image/*" onChange={handleImageUpload} className={styles.input} style={{ padding: '0.5rem 1rem' }} />
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
