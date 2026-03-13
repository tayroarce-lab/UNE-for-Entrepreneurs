import React, { useState } from 'react'
import '../../Styles/Configuraciones.css'
import Swal from 'sweetalert2'
import { toast } from 'sonner'
import { Settings, ArrowLeft, LogOut, Palette, Sun, Moon, UserCircle, Save, Shield, Bell, KeyRound } from 'lucide-react'


type Tema = 'light' | 'dark';

function Configuraciones() {
    const [tema, setTema] = useState<Tema>('light');
    const [nombre, setNombre] = useState<string>('Admin Principal');

    const alternarTema = () => {
        setTema((prevTema: Tema) => prevTema === 'light' ? 'dark' : 'light');
    };

    const handleLogout = () => {
        Swal.fire({
            title: '¿Cerrar sesión?',
            text: "Tendrás que volver a iniciar sesión para acceder",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('token');
                toast.success('Sesión finalizada exitosamente');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 1000);
            }
        });
    }

    const guardarNombre = () => {
        if (!nombre.trim()) {
            toast.error('El nombre no puede estar vacío');
            return;
        }

        Swal.fire({
            title: 'Guardar cambios',
            text: "¿Estás seguro de que deseas actualizar el nombre a " + nombre + "?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                toast.success('Nombre actualizado correctamente');
            }
        });
    }

    return (
        <div className="admin-container admin-container-no-nav">
            <div className="admin-main-wrap">
                <header>
                <h1><Settings size={24} /> Configuraciones</h1>
                <button onClick={() => window.location.href = "./AdminDashboard"}><ArrowLeft size={16} /> Volver</button>
                <button onClick={handleLogout}><LogOut size={16} /> Cerrar Sesión</button>
            </header>

            <section>
                <article>
                    <h2><Palette size={20} /> Apariencia</h2>
                    <p>Tema actual implementado por estado: {tema.toUpperCase()}</p>
                    <button onClick={alternarTema}>
                        {tema === 'light' ? <Moon size={16} /> : <Sun size={16} />} Cambiar a Modo {tema === 'light' ? 'Oscuro' : 'Claro'}
                    </button>
                </article>

                <article>
                    <h2><UserCircle size={20} /> Perfil Rápido</h2>
                    <label>
                        Nombre del Administrador: 
                        <input 
                            type="text" 
                            value={nombre} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)} 
                        />
                    </label>
                    <button onClick={guardarNombre}><Save size={16} /> Guardar Nombre</button>
                </article>

                <article>
                    <h2><Shield size={20} /> Roles y Permisos</h2>
                    <button onClick={() => window.location.href = "./Configuraciones/RolesPermisos"}><Shield size={16} /> Gestionar Roles y Permisos</button>
                </article>
                <article>
                    <h2><Bell size={20} /> Notificaciones</h2>
                    <button onClick={() => window.location.href = "./Configuraciones/Notificaciones"}><Bell size={16} /> Gestionar Notificaciones</button>
                </article>
                <article>
                    <h2><KeyRound size={20} /> Cambio de Credenciales</h2>
                    <button onClick={() => window.location.href = "./Configuraciones/CambioCredenciales"}><KeyRound size={16} /> Gestionar Cambio de Credenciales</button>
                </article>
            </section>
            
            <footer>
                <p>Footer</p>
                <p>Copyright © 2026</p>
            </footer>
            </div>
        </div>
    )
}

export default Configuraciones