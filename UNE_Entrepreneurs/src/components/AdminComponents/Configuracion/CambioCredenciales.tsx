import { useState } from 'react'
import Swal from 'sweetalert2'
import { toast } from 'sonner'
import { KeyRound, ArrowLeft, LayoutDashboard, User, Lock, Save } from 'lucide-react'
import '../../../styles/Configuraciones.css'
import '../../../styles/CambioCredenciales.css'

function CambioCredenciales() {
  const [password, setPassword] = useState('');

  const getPasswordStrength = (pass: string) => {
      let score = 0;
      if (!pass) return { score: 0, label: '', color: '#e2e8f0' };
      
      if (pass.length > 5) score += 1;
      if (pass.length > 8) score += 1;
      if (/[A-Z]/.test(pass)) score += 1;
      if (/[0-9]/.test(pass)) score += 1;
      if (/[^A-Za-z0-9]/.test(pass)) score += 1;

      switch (score) {
          case 0:
          case 1:
              return { score, label: 'Muy Básica', color: '#ef4444' };
          case 2:
              return { score, label: 'Débil', color: '#f97316' };
          case 3:
              return { score, label: 'Regular', color: '#eab308' };
          case 4:
              return { score, label: 'Segura', color: '#84cc16' };
          case 5:
              return { score, label: 'Muy Segura', color: '#22c55e' };
          default:
              return { score: 0, label: '', color: '#e2e8f0' };
      }
  };

  const strength = getPasswordStrength(password);

  return (
    <div className="admin-container admin-container-no-nav">
      <div className="admin-main-wrap">
        <header>
            <div className="cambio-credenciales-header-title">
                <KeyRound size={28} className="cambio-credenciales-header-icon" />
                <h1>Cambio de Credenciales</h1>
            </div>
            <div className="cambio-credenciales-header-buttons">
                <button onClick={() => window.location.href = "/Configuraciones"}><ArrowLeft size={16} /> Volver</button>
                <button onClick={() => window.location.href = "/AdminDashboard"}><LayoutDashboard size={16} /> Dashboard</button>
            </div>
        </header>

        <section>
            <article className="cambio-credenciales-article">
                <form 
                    className="cambio-credenciales-form"
                    onSubmit={(e) => {
                    e.preventDefault();
                    if (password && strength.score < 3) {
                        toast.error('La contraseña es demasiado débil. Por favor usa una más segura.');
                        return;
                    }
                    Swal.fire({
                        title: '¿Actualizar credenciales?',
                        text: "Debes volver a iniciar sesión si confirmas",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#59233A',
                        cancelButtonColor: '#6b7280',
                        confirmButtonText: 'Sí, actualizar',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            toast.success('Credenciales actualizadas correctamente');
                            setTimeout(() => {
                                window.location.href = '/login';
                            }, 1500);
                        }
                    });
                }}>
                    <div className="cambio-credenciales-form-group">
                        <label htmlFor="username" className="cambio-credenciales-label">
                            <User size={16} /> Nombre de Usuario
                        </label>
                        <input type="text" id="username" name="username" placeholder="Ingrese su nuevo usuario" className="cambio-credenciales-input" />
                    </div>

                    <div className="cambio-credenciales-form-group" style={{ marginTop: '8px' }}>
                        <label htmlFor="password" className="cambio-credenciales-label">
                            <Lock size={16} /> Nueva Contraseña
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="••••••••" 
                            className="cambio-credenciales-input-password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {password && (
                            <div style={{ marginTop: '10px' }}>
                                <div style={{ display: 'flex', gap: '5px', height: '6px' }}>
                                    {[1, 2, 3, 4, 5].map((level) => (
                                        <div 
                                            key={level} 
                                            style={{ 
                                                flex: 1, 
                                                borderRadius: '3px', 
                                                background: strength.score >= level ? strength.color : '#e2e8f0',
                                                transition: 'all 0.3s'
                                            }} 
                                        />
                                    ))}
                                </div>
                                <p style={{ fontSize: '0.8rem', color: strength.color, marginTop: '5px', fontWeight: 600, textAlign: 'right', margin: 0 }}>
                                    {strength.label}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="cambio-credenciales-submit-wrapper">
                        <button type="submit" className="cambio-credenciales-submit-btn">
                            <Save size={18} /> Guardar Credenciales
                        </button>
                    </div>
                </form>
            </article>
        </section>

        <footer>
            <p>Gestione sus credenciales de acceso de forma segura.</p>
            <p>Copyright © 2026</p>
        </footer>
      </div>
    </div>
  )
}

export default CambioCredenciales