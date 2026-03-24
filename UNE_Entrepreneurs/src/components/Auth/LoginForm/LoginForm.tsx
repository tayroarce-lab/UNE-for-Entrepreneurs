import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { notifications } from '../../../utils/notifications';
import styles from './LoginForm.module.css';

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
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
    setLoading(true);
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        notifications.success('¡Bienvenida de vuelta!');
        setTimeout(() => navigate('/'), 1500);
      } else {
        const msg = 'El correo o la contraseña son incorrectos.';
        setError(msg);
        notifications.error(msg);
      }
    } catch (err) {
      console.error(err);
      const msg = 'Error de conexión. Inténtalo más tarde.';
      setError(msg);
      notifications.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <header className={styles.header}>
          <h2>Bienvenida de nuevo</h2>
          <p>Inicia sesión en UNE Entrepreneurs</p>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.errorAlert}>{error}</div>}

          <div className={styles.formGroup}>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email" id="email" name="email"
              value={formData.email} onChange={handleChange}
              placeholder="tu@correo.com" required disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password" id="password" name="password"
              value={formData.password} onChange={handleChange}
              placeholder="••••••••" required disabled={loading}
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Verificando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <footer className={styles.footer}>
          <p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
          <Link to="/" className={styles.backLink}>
            <ArrowLeft size={16} /> Volver al portal
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default LoginForm;
