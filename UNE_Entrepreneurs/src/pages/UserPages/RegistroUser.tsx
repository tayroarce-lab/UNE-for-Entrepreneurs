import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserServices from '../../services/UserServices'
import Navbar from '../../components/Shared/Navbar'
import Footer from '../../components/Shared/Footer'
import { notifications } from '../../utils/notifications'
import { ArrowLeft } from 'lucide-react'

import type { User } from '../../types/user'
import '../../styles/Auth.css'

/**
 * RegistroUserComponent: Página de registro con Navbar y Footer integrados.
 */
export default function RegistroUserComponent() {
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

    // Validaciones del formulario
    if (!formData.nombre.trim()) {
      const msg = 'El nombre es obligatorio.';
      setError(msg);
      notifications.error(msg);
      return;
    }

    if (!formData.email.trim()) {
      const msg = 'El correo electrónico es obligatorio.';
      setError(msg);
      notifications.error(msg);
      return;
    }

    if (formData.password.length < 6) {
      const msg = 'La contraseña debe tener al menos 6 caracteres.';
      setError(msg);
      notifications.error(msg);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      const msg = 'Las contraseñas no coinciden.';
      setError(msg);
      notifications.error(msg);
      return;
    }

    setLoading(true);

    try {
      // Verificar si el correo ya está registrado
      let usuariosExistentes: any[] = [];
      try {
        usuariosExistentes = (await UserServices.getUser()) || [];
      } catch {
        // Si no se puede conectar al servidor para verificar, continuamos con el registro
        console.warn('No se pudo verificar usuarios existentes, se intentará registrar directamente.');
      }

      const existe = usuariosExistentes.some((u: any) => u.email === formData.email);
      if (existe) {
        const msg = 'Este correo electrónico ya está registrado.';
        setError(msg);
        notifications.error(msg);
        setLoading(false);
        return;
      }

      // Crear el objeto del nuevo usuario
      const nuevoUsuario: Omit<User, 'id'> = {
        nombre: formData.nombre.trim(),
        email: formData.email.trim(),
        password: formData.password as string,
        role: 'user',
        createdAt: new Date().toISOString()
      };

      // Registrar usuario en db.json
      const resultado = await UserServices.postUser(nuevoUsuario);

      if (resultado && resultado.id) {
        notifications.success('¡Registro exitoso! Ahora puedes iniciar sesión.');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        const msg = 'Hubo un problema al crear la cuenta. Inténtalo de nuevo.';
        setError(msg);
        notifications.error(msg);
      }
    } catch (err: any) {
      console.error('Error en el proceso de registro:', err);
      const msg = 'Error de conexión con el servidor.';
      setError(msg);
      notifications.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page-layout">
      <Navbar />

      <div className="register-container">
        <div className="register-box">
          <header className="register-header">
            <h2>Únete a la Comunidad</h2>
            <p>Crea tu cuenta para empezar a emprender con la UNE</p>
          </header>

          <form onSubmit={handleSubmit} className="register-form">
            {error && <div className="error-alert">{error}</div>}

            <div className="form-group">
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
                placeholder="Mínimo 6 caracteres"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
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

            <button type="submit" className="btn-register" disabled={loading}>
              {loading ? 'Creando cuenta...' : 'Registrarse'}
            </button>
          </form>

          <div className="register-footer">
            <p>¿Ya tienes una cuenta? <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Inicia Sesión</a></p>
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
