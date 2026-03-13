import React from 'react'
import Swal from 'sweetalert2'
import { toast } from 'sonner'
import { KeyRound, ArrowLeft, LayoutDashboard, User, Lock, Save } from 'lucide-react'

function CambioCredenciales() {
  return (
    <div>
        <h1><KeyRound size={24} /> Cambio de Credenciales</h1>
        <button onClick={() => window.location.href = "./Configuraciones"}><ArrowLeft size={16} /> Volver</button>
        <button onClick={() => window.location.href = "./AdminDashboard"}><LayoutDashboard size={16} /> Dashboard</button>

        <form onSubmit={(e) => {
            e.preventDefault();
            Swal.fire({
                title: '¿Actualizar credenciales?',
                text: "Debes volver a iniciar sesión si confirmas",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
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
            <label htmlFor="username"><User size={14} /> Nombre de Usuario:</label>
            <input type="text" id="username" name="username" />

            <label htmlFor="password"><Lock size={14} /> Contraseña:</label>
            <input type="password" id="password" name="password" />

            <button type="submit"><Save size={16} /> Cambiar Credenciales</button>
        </form>
    </div>
  )
}

export default CambioCredenciales