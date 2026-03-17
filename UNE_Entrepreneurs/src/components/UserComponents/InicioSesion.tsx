import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Shared/Navbar'
import Footer from '../Shared/Footer'
import { notifications } from '../../utils/notifications'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

/**
 * InicioSesionComponent: Página de login con Navbar y Footer integrados.
 */
export default function InicioSesionComponent() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setLoading(true);

    try {
      const success = await login(formData.email, formData.password);

      if (success) {
        notifications.success('¡Inicio de sesión exitoso!');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        const msg = 'El correo o la contraseña son incorrectos.';
        setError(msg);
        notifications.error(msg);
      }
    } catch (err) {
      console.error('Error en el proceso de login:', err);
      const msg = 'Error de conexión. Inténtalo más tarde.';
      setError(msg);
      notifications.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-layout">
      <Navbar />

      <div className="login-container">
        <div className="login-box">
          <header className="login-header">
            <h2>Bienvenido de nuevo</h2>
            <p>Inicia sesión en UNE Entrepreneurs</p>
          </header>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-alert">{error}</div>}
            
            <div className="form-group">
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

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                disabled={loading}
              />
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Verificando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="login-footer">
            <p>¿No tienes una cuenta? <a href="/registro" onClick={(e) => { e.preventDefault(); navigate('/registro'); }}>Regístrate</a></p>
            <a href="/" className="link-back" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
              <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Volver al inicio
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
