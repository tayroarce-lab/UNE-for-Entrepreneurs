import { useState } from 'react'
import '../../styles/AdminDashboard.css'
import Swal from 'sweetalert2'
import { toast } from 'sonner'
import { Settings, Palette, Sun, Moon, UserCircle, Save, Shield, KeyRound, Edit } from 'lucide-react'
import AdminLayout from './AdminLayout'

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
            confirmButtonColor: '#8B1A1A',
            cancelButtonColor: '#64748b',
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
        <AdminLayout>
            <header className="admin-top-header">
                <h1 style={{ fontSize: '2rem', fontWeight: 800 }}><Settings size={28} /> Configuración del Sistema</h1>
            </header>

            <main style={{ padding: 0 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    
                    {/* APARIENCIA */}
                    <div className="grid-card">
                        <div className="grid-card-label">
                            <h3><Palette size={20} color="#D4A853" style={{ verticalAlign: 'middle', marginRight: '10px' }} /> Apariencia</h3>
                        </div>
                        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px' }}>Personaliza el aspecto visual del panel administrativo.</p>
                        
                        <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 700 }}>Tema del Sistema</span>
                            <button 
                                onClick={alternarTema}
                                style={{ 
                                    padding: '8px 16px', 
                                    background: tema === 'light' ? '#1e293b' : '#fff', 
                                    color: tema === 'light' ? '#fff' : '#1e293b',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                {tema === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                                Modo {tema === 'light' ? 'Oscuro' : 'Claro'}
                            </button>
                        </div>
                    </div>

                    {/* PERFIL RÁPIDO */}
                    <div className="grid-card">
                        <div className="grid-card-label">
                            <h3><UserCircle size={20} color="#10b981" style={{ verticalAlign: 'middle', marginRight: '10px' }} /> Perfil Rápido</h3>
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px' }}>
                            <div style={{ position: 'relative' }}>
                                {perfilImg ? (
                                    <img src={perfilImg} alt="Admin" style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #f1f5f9' }} />
                                ) : (
                                    <div style={{ width: '70px', height: '70px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                                        <UserCircle size={40} />
                                    </div>
                                )}
                                <label style={{ position: 'absolute', bottom: 0, right: 0, background: '#fff', padding: '5px', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                                    <Edit size={12} />
                                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                </label>
                            </div>
                            <div style={{ flex: 1 }}>
                                <input 
                                    type="text" 
                                    value={nombre} 
                                    onChange={(e) => setNombre(e.target.value)} 
                                    style={{ width: '100%', padding: '10px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 700 }}
                                />
                                <button onClick={guardarNombre} style={{ width: '100%', padding: '8px', background: '#f1f5f9', color: '#1e293b', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.8rem' }}>
                                    <Save size={14} style={{ marginRight: '5px' }} /> Guardar Nombre
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* SEGURIDAD */}
                    <div className="grid-card">
                        <div className="grid-card-label">
                            <h3><Shield size={20} color="#f59e0b" style={{ verticalAlign: 'middle', marginRight: '10px' }} /> Seguridad</h3>
                        </div>
                        <div style={{ display: 'grid', gap: '10px' }}>
                            <button style={{ padding: '12px', textAlign: 'left', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <KeyRound size={16} /> Cambiar Contraseña
                            </button>
                            <button style={{ padding: '12px', textAlign: 'left', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Shield size={16} /> Ver Log de Auditoría
                            </button>
                        </div>
                    </div>

                </div>
            </main>
        </AdminLayout>
    )
}

export default Configuraciones