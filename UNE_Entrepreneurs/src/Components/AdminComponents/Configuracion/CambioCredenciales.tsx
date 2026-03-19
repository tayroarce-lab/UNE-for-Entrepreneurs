import Swal from 'sweetalert2'
import { toast } from 'sonner'
import { KeyRound, ArrowLeft, LayoutDashboard, User, Lock, Save } from 'lucide-react'
import '../../../styles/Configuraciones.css'
import '../../../styles/CambioCredenciales.css'

function CambioCredenciales() {
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
                        <input type="password" id="password" name="password" placeholder="••••••••" className="cambio-credenciales-input-password" />
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