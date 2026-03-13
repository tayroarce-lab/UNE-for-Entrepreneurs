import React from 'react'
import Swal from 'sweetalert2'
import { toast } from 'sonner'
import { Shield, ArrowLeft, LayoutDashboard, UserPlus } from 'lucide-react'

function RolesPermisos() {
  return (
    <div>
        <h1><Shield size={24} /> Roles y Permisos</h1>
        <button onClick={() => window.location.href = "./Configuraciones"}><ArrowLeft size={16} /> Volver</button>
        <button onClick={() => window.location.href = "./AdminDashboard"}><LayoutDashboard size={16} /> Dashboard</button>

        <main>
          <section>
            <h2>Roles</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                Swal.fire({
                    title: '¿Agregar Rol?',
                    text: "Se añadirá el nuevo rol seleccionado",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, agregar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        toast.success('Rol agregado exitosamente');
                    }
                });
            }}>
              <label htmlFor="role">Nombre del Rol:</label>
              <select id="role" name="role" />
              <option value="">Seleccione un Rol</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <button type="submit"><UserPlus size={16} /> Agregar Rol</button>
            </form>
          </section>
        </main>
    </div>
  )
}

export default RolesPermisos