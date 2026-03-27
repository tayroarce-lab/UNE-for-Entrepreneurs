import { useState } from 'react'
import '../../styles/AdminDashboard.css'
import Swal from 'sweetalert2'
import { toast } from 'sonner'
import { Palette, Sun, Moon, UserCircle, Save, Shield, KeyRound, Edit, History } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from './AdminLayout'
import AdminHeader from './AdminHeader'

type Tema = 'light' | 'dark';

function Configuraciones() {
    const [tema, setTema] = useState<Tema>((localStorage.getItem('theme') as Tema) || 'light');
    const [nombre, setNombre] = useState<string>('Administrador UNE');
    const [perfilImg, setPerfilImg] = useState<string | null>(localStorage.getItem('adminProfileImg') || null);
    const navigate = useNavigate();

    const alternarTema = () => {
        const nuevoTema = tema === 'light' ? 'dark' : 'light';
        setTema(nuevoTema);
        localStorage.setItem('theme', nuevoTema);
        document.documentElement.setAttribute('data-theme', nuevoTema);
        toast.info(`Cambiado a Modo ${nuevoTema === 'light' ? 'Claro' : 'Oscuro'}`);
    };

    const guardarNombre = () => {
        if (!nombre.trim()) {
            toast.error('El nombre no puede estar vacío');
            return;
        }

        Swal.fire({
            title: 'Guardar cambios',
            text: "¿Confirmas el cambio de nombre de administrador?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: 'var(--suria-plum)',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Sí, actualizar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                toast.success('Perfil actualizado correctamente');
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
                toast.success('Foto de perfil actualizada');
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AdminLayout>
            <AdminHeader placeholder="Configurar sistema, perfil o seguridad..." />

            <main className="admin-main">
                <div className="admin-top-header">
                    <div>
                        <h1 className="admin-page-title">Configuración Global</h1>
                        <p className="admin-page-subtitle">Personaliza tu entorno de trabajo, seguridad y perfil administrativo.</p>
                    </div>
                </div>

                <div className="admin-grid-layout">
                    
                    {/* APARIENCIA */}
                    <div className="admin-card" style={{ marginBottom: 0 }}>
                        <div className="admin-card-header">
                            <h3 className="admin-card-title">
                                <Palette size={22} style={{ color: 'var(--suria-gold)' }} /> 
                                Personalización
                            </h3>
                        </div>
                        <p style={{ color: 'var(--admin-text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Ajusta el tema visual para una mejor experiencia de uso.</p>
                        
                        <div style={{ padding: '1.5rem', background: '#F8FAF6', borderRadius: '16px', border: '1px solid var(--admin-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ background: 'white', padding: '10px', borderRadius: '10px', color: 'var(--suria-plum)', border: '1px solid var(--admin-border)' }}>
                                    {tema === 'light' ? <Sun size={20} /> : <Moon size={20} />}
                                </div>
                                <span style={{ fontWeight: 700, color: 'var(--suria-plum)' }}>Tema del Panel</span>
                            </div>
                            <button 
                                onClick={alternarTema}
                                className={`btn-admin ${tema === 'light' ? 'btn-admin-primary' : 'btn-admin-outline'}`}
                                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                            >
                                {tema === 'light' ? 'Activar Oscuro' : 'Activar Claro'}
                            </button>
                        </div>
                    </div>

                    {/* PERFIL */}
                    <div className="admin-card" style={{ marginBottom: 0 }}>
                        <div className="admin-card-header">
                            <h3 className="admin-card-title">
                                <UserCircle size={22} style={{ color: '#10B981' }} /> 
                                Perfil Administrador
                            </h3>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '1.5rem', background: '#F8FAF6', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--admin-border)' }}>
                            <div style={{ position: 'relative' }}>
                                {perfilImg ? (
                                    <img src={perfilImg} alt="Admin" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '4px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                                ) : (
                                    <div style={{ width: '80px', height: '80px', background: '#E2E8F0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', border: '4px solid white' }}>
                                        <UserCircle size={44} />
                                    </div>
                                )}
                                <label style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--suria-gold)', color: 'white', padding: '6px', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)', border: '2px solid white' }}>
                                    <Edit size={12} />
                                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                </label>
                            </div>
                            <div style={{ flex: 1 }}>
                                <div className="admin-form-group">
                                    <input 
                                        type="text" 
                                        className="admin-input"
                                        placeholder="Nombre del Administrador"
                                        value={nombre} 
                                        onChange={(e) => setNombre(e.target.value)} 
                                        style={{ fontSize: '0.95rem', fontWeight: 800, padding: '10px 14px' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <button onClick={guardarNombre} className="btn-admin btn-admin-secondary" style={{ width: '100%', padding: '12px' }}>
                            <Save size={18} /> Aplicar Cambios al Perfil
                        </button>
                    </div>

                    {/* SEGURIDAD */}
                    <div className="admin-card" style={{ marginBottom: 0 }}>
                        <div className="admin-card-header">
                            <h3 className="admin-card-title">
                                <Shield size={22} style={{ color: 'var(--suria-crimson)' }} /> 
                                Seguridad y Auditoría
                            </h3>
                        </div>
                        <div style={{ display: 'grid', gap: '12px' }}>
                            <button 
                                onClick={() => navigate('/admin/configuraciones/credenciales')}
                                className="btn-admin btn-admin-outline"
                                style={{ width: '100%', justifyContent: 'flex-start', padding: '16px' }}
                            >
                                <div style={{ background: '#F1F5F9', padding: '8px', borderRadius: '8px' }}>
                                     <KeyRound size={18} />
                                </div>
                                <span>Cambiar Credenciales de Acceso</span>
                            </button>
                            <button 
                                onClick={() => {
                                    Swal.fire({
                                        title: 'Historial de Auditoría',
                                        html: `
                                        <div style="text-align: left; font-size: 0.9rem; max-height: 300px; overflow-y: auto; font-family: 'Outfit', sans-serif;">
                                            <div style="padding: 12px; border-bottom: 1px solid #f1f5f9; display: flex; gap: 10px;">
                                                <div style="background: var(--suria-plum); width: 8px; height: 8px; border-radius: 50%; margin-top: 6px;"></div>
                                                <div>
                                                    <strong style="display: block;">Sesión iniciada</strong>
                                                    <span style="color: #64748b; font-size: 0.8rem;">Hoy 10:05 AM desde IP 192.168.1.45</span>
                                                </div>
                                            </div>
                                            <div style="padding: 12px; border-bottom: 1px solid #f1f5f9; display: flex; gap: 10px;">
                                                <div style="background: var(--suria-gold); width: 8px; height: 8px; border-radius: 50%; margin-top: 6px;"></div>
                                                <div>
                                                    <strong style="display: block;">Actualización de recursos</strong>
                                                    <span style="color: #64748b; font-size: 0.8rem;">Ayer 15:30 por Admin Principal</span>
                                                </div>
                                            </div>
                                            <div style="padding: 12px; border-bottom: 1px solid #f1f5f9; display: flex; gap: 10px;">
                                                <div style="background: var(--suria-crimson); width: 8px; height: 8px; border-radius: 50%; margin-top: 6px;"></div>
                                                <div>
                                                    <strong style="display: block;">Cambio de contraseña</strong>
                                                    <span style="color: #64748b; font-size: 0.8rem;">20 Mar 11:20 - Operación exitosa</span>
                                                </div>
                                            </div>
                                        </div>
                                        `,
                                        confirmButtonText: 'Entendido',
                                        confirmButtonColor: 'var(--suria-plum)',
                                        width: '500px'
                                    });
                                }}
                                className="btn-admin btn-admin-outline"
                                style={{ width: '100%', justifyContent: 'flex-start', padding: '16px' }}
                            >
                                <div style={{ background: '#F1F5F9', padding: '8px', borderRadius: '8px' }}>
                                     <History size={18} />
                                </div>
                                <span>Ver Registro de Actividad</span>
                            </button>
                        </div>
                    </div>

                </div>
            </main>
        </AdminLayout>
    )
}

export default Configuraciones