import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, Mail, Lock, Camera, Save, ArrowLeft, ShieldCheck, Calendar, Trash2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import UserServices from '../../../services/UserServices';
import type { User } from '../../../types/user';
import { notifications } from '../../../utils/notifications';
import Swal from 'sweetalert2';
import styles from './ProfileEditor.module.css';

const ProfileEditor: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    avatar: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        nombre: user.name,
        email: user.email,
        avatar: user.avatar || ''
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
      if (file.size > 2 * 1024 * 1024) {
        notifications.error('La imagen es muy grande. El tamaño máximo es de 2MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 200;
          const MAX_HEIGHT = 200;
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
            // Use lower quality to keep size within localStorage limits
            const base64Str = canvas.toDataURL('image/jpeg', 0.5);
            
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

  // Validate password strength
  const validatePassword = (password: string): string | null => {
    if (password.length < 8) return 'La contraseña debe tener mínimo 8 caracteres';
    if (!/[A-Z]/.test(password)) return 'La contraseña debe contener al menos una mayúscula';
    if (!/[0-9]/.test(password)) return 'La contraseña debe contener al menos un número';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const nameChanged = formData.nombre !== user.name;
    const passwordChanging = !!formData.newPassword;

    // If changing name, require current password
    if (nameChanged && !formData.currentPassword) {
      notifications.error('Debes ingresar tu contraseña actual para cambiar el nombre');
      return;
    }

    // If changing password, require current password
    if (passwordChanging && !formData.currentPassword) {
      notifications.error('Debes ingresar tu contraseña actual para cambiar la contraseña');
      return;
    }

    // Validate current password if provided
    if (formData.currentPassword && (nameChanged || passwordChanging)) {
      const users = await UserServices.getUser();
      const dbUser = users?.find(u => u.id === user.id);
      if (!dbUser || dbUser.password !== formData.currentPassword) {
        notifications.error('La contraseña actual es incorrecta');
        return;
      }
    }

    // Validate new password
    if (passwordChanging) {
      const pwError = validatePassword(formData.newPassword);
      if (pwError) {
        notifications.error(pwError);
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        notifications.error('Las contraseñas nuevas no coinciden');
        return;
      }

      // Confirm password change
      const confirmed = await Swal.fire({
        title: '¿Cambiar contraseña?',
        text: '¿Estás seguro de que deseas cambiar tu contraseña?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: 'var(--suria-crimson)',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Sí, cambiarla',
        cancelButtonText: 'Cancelar'
      });
      if (!confirmed.isConfirmed) return;
    }

    setLoading(true);
    try {
      const payload: Partial<User> = { nombre: formData.nombre, avatar: formData.avatar };
      if (user.isAdmin) payload.email = formData.email;
      if (passwordChanging) payload.password = formData.newPassword;

      const updated = await UserServices.patchUsuarios(payload, user.id);
      if (updated) {
        refreshUser({ name: updated.nombre, email: updated.email, avatar: updated.avatar });
        notifications.success('Perfil actualizado correctamente');
        setFormData(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
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
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={user.isAdmin ? handleChange : undefined}
                      className={`${styles.input} ${!user.isAdmin ? styles.inputDisabled : ''}`}
                      disabled={!user.isAdmin}
                      readOnly={!user.isAdmin}
                      title={!user.isAdmin ? 'Contacta al administrador para cambiar tu correo.' : ''}
                    />
                  </div>
                  {!user.isAdmin && (
                    <p className={styles.fieldHint}>🔒 Contacta al administrador para cambiar tu correo.</p>
                  )}
                </div>
              </div>

              <hr className={styles.divider} />
              <h3 className={styles.sectionTitle}>Seguridad</h3>
              <p className={styles.sectionHint}>Para cambiar tu nombre o contraseña, primero ingresa tu contraseña actual.</p>

              {/* Current Password — shown when name or password change is detected */}
              <div className={styles.inputGroup}>
                <label>Contraseña Actual <span style={{ color: 'var(--suria-crimson)' }}>*</span></label>
                <div className={styles.inputWrapper}>
                  <Lock size={18} className={styles.inputIcon} />
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Requerida para cambiar nombre o contraseña"
                    style={{ paddingRight: '2.8rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className={styles.eyeBtn}
                    tabIndex={-1}
                  >
                    {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className={styles.twoCol}>
                <div className={styles.inputGroup}>
                  <label>Nueva Contraseña</label>
                  <div className={styles.inputWrapper}>
                    <Lock size={18} className={styles.inputIcon} />
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className={styles.input}
                      placeholder="Mínimo 8 chars, 1 mayúscula, 1 número"
                      style={{ paddingRight: '2.8rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className={styles.eyeBtn}
                      tabIndex={-1}
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Confirmar Contraseña</label>
                  <div className={styles.inputWrapper}>
                    <Lock size={18} className={styles.inputIcon} />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={styles.input}
                      style={{ paddingRight: '2.8rem' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={styles.eyeBtn}
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>
              {formData.newPassword && (
                <div className={styles.passwordStrength}>
                  {[
                    { ok: formData.newPassword.length >= 8, label: 'Mínimo 8 caracteres' },
                    { ok: /[A-Z]/.test(formData.newPassword), label: 'Una mayúscula' },
                    { ok: /[0-9]/.test(formData.newPassword), label: 'Un número' },
                  ].map(req => (
                    <span key={req.label} className={req.ok ? styles.reqOk : styles.reqFail}>
                      {req.ok ? '✓' : '✗'} {req.label}
                    </span>
                  ))}
                </div>
              )}

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
