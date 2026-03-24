import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import UserServices from '../../../services/UserServices';
import { notifications } from '../../../utils/notifications';
import { User } from '../../../types/user';
import styles from './RegisterForm.module.css';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.nombre.trim()) {
      notifications.error('El nombre es obligatorio.');
      return;
    }

    if (!formData.email.trim()) {
      notifications.error('El correo electrónico es obligatorio.');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      notifications.error('Contraseña insegura: debe incluir mayúscula, número y especial.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      notifications.error('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);

    try {
      let usuariosExistentes: unknown[] = [];
      try {
        usuariosExistentes = (await UserServices.getUser()) || [];
      } catch {
        console.warn('Conexión directa intentada por fallo en verificación previa.');
      }

      const existe = (usuariosExistentes as User[]).some((u: User) => u.email === formData.email);
      if (existe) {
        notifications.error('Este correo electrónico ya está registrado.');
        setLoading(false);
        return;
      }

      const nuevoUsuario: Omit<User, 'id'> = {
        nombre: formData.nombre.trim(),
        email: formData.email.trim(),
        password: formData.password as string,
        role: 'user',
        createdAt: new Date().toISOString()
      };

      const resultado = await UserServices.postUser(nuevoUsuario);

      if (resultado && resultado.id) {
        notifications.success('¡Bienvenida a la comunidad UNE!');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        notifications.error('Error al procesar el registro.');
      }
    } catch (err) {
      console.error('Registration flow failed:', err);
      notifications.error('Error de red: intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <header className={styles.header}>
          <h2>Únete a la Comunidad</h2>
          <p>Crea tu cuenta para empezar a emprender con la UNE</p>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.errorAlert}>{error}</div>}

          <div className={styles.formGroup}>
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej. Ashley Pérez"
              required
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@correo.com"
              required
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 8 caracteres (A, 1, @)"
              required
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repite tu contraseña"
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Sincronizando...' : 'Crear Cuenta'}
          </button>
        </form>

        <footer className={styles.footer}>
          <p>¿Ya eres parte? <Link to="/login">Inicia Sesión</Link></p>
          <Link to="/" className={styles.backLink}>
            <ArrowLeft size={16} /> Volver al portal
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default RegisterForm;
