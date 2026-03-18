import { useState } from 'react'
import '../../styles/Configuraciones.css'
import Swal from 'sweetalert2'
import { toast } from 'sonner'
import { Settings, ArrowLeft, LogOut, Palette, Sun, Moon, UserCircle, Save, Shield, Bell, KeyRound } from 'lucide-react'


type Tema = 'light' | 'dark';

function Configuraciones() {
    const [tema, setTema] = useState<Tema>((localStorage.getItem('theme') as Tema) || 'light');
    const [nombre, setNombre] = useState<string>('Admin Principal');
    const [perfilImg, setPerfilImg] = useState<string | null>(localStorage.getItem('adminProfileImg') || null);


    const alternarTema = () => {
        const nuevoTema = tema === 'light' ? 'dark' : 'light';
        setTema(nuevoTema);
        localStorage.setItem('theme', nuevoTema);
        document.documentElement.setAttribute('data-theme', nuevoTema);
        toast.info(`Cambiado a Modo ${nuevoTema === 'light' ? 'Claro' : 'Oscuro'}`);
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setPerfilImg(base64String);
                localStorage.setItem('adminProfileImg', base64String);
                toast.success('Foto de perfil actualizada correctamente');
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="admin-container admin-container-no-nav">
            <div className="admin-main-wrap">
                <header>
                <h1><Settings size={24} /> Configuraciones</h1>
                <button onClick={() => window.location.href = "/AdminDashboard"}><ArrowLeft size={16} /> Volver</button>
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
                    
                    <div className="perfil-img-container" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', marginTop: '10px' }}>
                        {perfilImg ? (
                            <img src={perfilImg} alt="Perfil Admin" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ccc' }} />
                        ) : (
                            <UserCircle size={80} color="#ccc" />
                        )}
                        <div>
                            <label style={{ display: 'inline-block', cursor: 'pointer', backgroundColor: '#e2e8f0', color: '#1e293b', padding: '8px 12px', borderRadius: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                                Cambiar Foto
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleImageChange} 
                                    style={{ display: 'none' }}
                                />
                            </label>
                            {perfilImg && (
                                <button 
                                    style={{ display: 'inline-block', marginLeft: '10px', fontSize: '14px', padding: '8px 12px', backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                                    onClick={() => {
                                        setPerfilImg(null);
                                        localStorage.removeItem('adminProfileImg');
                                        toast.success('Foto de perfil eliminada');
                                    }}
                                >
                                    Eliminar Foto
                                </button>
                            )}
                        </div>
                    </div>

                    <label style={{ display: 'block', marginTop: '15px' }}>
                        Nombre del Administrador: 
                        <input 
                            type="text" 
                            value={nombre} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNombre(e.target.value)} 
                            style={{ display: 'block', marginTop: '5px', padding: '8px', width: '100%', maxWidth: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </label>
                    <button onClick={guardarNombre} style={{ marginTop: '15px' }}><Save size={16} /> Guardar Nombre</button>
                </article>

                <article>
                    <h2><Shield size={20} /> Roles y Permisos</h2>
                    <button onClick={() => window.location.href = "/Configuraciones/RolesPermisos"}><Shield size={16} /> Gestionar Roles y Permisos</button>
                </article>
                <article>
                    <h2><Bell size={20} /> Notificaciones</h2>
                    <button onClick={() => window.location.href = "/Configuraciones/Notificaciones"}><Bell size={16} /> Gestionar Notificaciones</button>
                </article>
                <article>
                    <h2><KeyRound size={20} /> Cambio de Credenciales</h2>
                    <button onClick={() => window.location.href = "/Configuraciones/CambioCredenciales"}><KeyRound size={16} /> Gestionar Cambio de Credenciales</button>
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