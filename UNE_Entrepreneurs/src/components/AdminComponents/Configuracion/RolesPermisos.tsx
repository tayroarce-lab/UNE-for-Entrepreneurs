import Swal from 'sweetalert2';
import { toast } from 'sonner';
import { Shield, ArrowLeft, LayoutDashboard, UserPlus, Users } from 'lucide-react';
import '../../../styles/Configuraciones.css';
import '../../../styles/RolesPermisos.css';

function RolesPermisos() {
  return (
    <div className="admin-container admin-container-no-nav">
      <div className="admin-main-wrap">
        <header>
          <div className="roles-permisos-header-title">
            <Shield size={28} className="roles-permisos-header-icon" />
            <h1>Roles y Permisos</h1>
          </div>
          <div className="roles-permisos-header-buttons">
            <button onClick={() => window.location.href = '/Configuraciones'}><ArrowLeft size={16} /> Volver</button>
            <button onClick={() => window.location.href = '/AdminDashboard'}><LayoutDashboard size={16} /> Dashboard</button>
          </div>
        </header>

        <section>
          <article className="roles-permisos-article">
            <div className="roles-permisos-section-header">
                <Users size={20} className="roles-permisos-section-icon" />
                <h2 className="roles-permisos-section-title">Gestión de Roles</h2>
            </div>
            
            <form 
              className="roles-permisos-form"
              onSubmit={(e) => {
              e.preventDefault();
              Swal.fire({
                title: '¿Agregar Rol?',
                text: 'Se añadirá el nuevo rol seleccionado',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#59233A',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Sí, agregar',
                cancelButtonText: 'Cancelar',
              }).then((result) => {
                if (result.isConfirmed) {
                  toast.success('Rol agregado exitosamente');
                }
              });
            }}>
              <div className="roles-permisos-form-group">
                <label htmlFor="role" className="roles-permisos-label">
                  Seleccionar nuevo rol
                </label>
                <select id="role" name="role" className="roles-permisos-select">
                  <option value="">-- Seleccione un Rol --</option>
                  <option value="admin">Administrador del Sistema</option>
                  <option value="user">Usuario Regular</option>
                  <option value="editor">Editor de Contenido</option>
                </select>
              </div>

              <div className="roles-permisos-submit-wrapper">
                <button type="submit" className="roles-permisos-submit-btn">
                    <UserPlus size={18} /> Asignar Rol
                </button>
              </div>
            </form>
          </article>
        </section>

        <footer>
          <p>Gestione los niveles de acceso de los usuarios del sistema.</p>
          <p>Copyright © 2026</p>
        </footer>
      </div>
    </div>
  );
}

export default RolesPermisos;