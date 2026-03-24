import { useState, useEffect } from 'react'
import '../../styles/AdminDashboard.css'
import { 
  UsersRound, 
  UserRoundSearch, 
  Eye, 
  X, 
  Activity, 
  UserCircle,
  Trash2,
  Save,
  PlusCircle
} from 'lucide-react'
import UserServices from '../../services/UserServices'
import type { User } from '../../types/user'
import { toast } from 'sonner'
import Swal from 'sweetalert2'
import AdminLayout from './AdminLayout'

function ManejarClientes() {
  const [clientes, setClientes] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState<string>('');
  const [modalAbierto, setModalAbierto] = useState<boolean>(false);
  
  // Selection
  const [clienteSeleccionado, setClienteSeleccionado] = useState<User | null>(null);
  const [isCreando, setIsCreando] = useState<boolean>(false);

  // Form State
  const [editNombre, setEditNombre] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState<'user' | 'admin'>('user');
  const [editPassword, setEditPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    setLoading(true);
    try {
      const data = await UserServices.getUser();
      setClientes(data || []);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
      toast.error('No se pudo conectar con el servidor de usuarios');
    } finally {
      setLoading(false);
    }
  };

  const clientesFiltrados = clientes.filter((cliente) => 
      (cliente.nombre || '').toLowerCase().includes(busqueda.toLowerCase()) || 
      (cliente.email || '').toLowerCase().includes(busqueda.toLowerCase())
  );

  const abrirModalEditar = (cliente: User) => {
      setIsCreando(false);
      setClienteSeleccionado(cliente);
      setEditNombre(cliente.nombre || '');
      setEditEmail(cliente.email || '');
      setEditRole(cliente.role || 'user');
      setEditPassword('');
      setModalAbierto(true);
  }

  const abrirModalCrear = () => {
      setIsCreando(true);
      setClienteSeleccionado(null);
      setEditNombre('');
      setEditEmail('');
      setEditRole('user');
      setEditPassword('');
      setModalAbierto(true);
  }

  const handleDeleteUser = () => {
      if (!clienteSeleccionado || !clienteSeleccionado.id) return;
      Swal.fire({
          title: '¿Eliminar este usuario?',
          text: `Se eliminará permanentemente la cuenta de ${clienteSeleccionado.nombre}.`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#dc2626',
          cancelButtonColor: '#64748b',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
      }).then(async (result) => {
          if (result.isConfirmed) {
              try {
                  await UserServices.deleteUsuarios(clienteSeleccionado.id!);
                  toast.success('Usuario eliminado exitosamente');
                  setModalAbierto(false);
                  cargarClientes();
                } catch {
                    toast.error('Ocurrió un error al eliminar');
                }
          }
      });
  };

  const handleUpdateUser = async () => {
      if (!editNombre.trim() || !editEmail.trim() || (isCreando && !editPassword.trim())) {
          toast.error('Nombre, Email y Contraseña (en creación) son campos requeridos.');
          return;
      }
      setIsSaving(true);
      try {
          if (isCreando) {
              await UserServices.postUser({
                  nombre: editNombre,
                  email: editEmail,
                  password: editPassword,
                  role: editRole,
                  createdAt: new Date().toISOString()
              });
              toast.success('Usuario creado exitosamente');
          } else if (clienteSeleccionado?.id) {
              const updates: Partial<User> = {
                  nombre: editNombre,
                  email: editEmail,
                  role: editRole
              };
              if (editPassword) updates.password = editPassword;
              await UserServices.patchUsuarios(updates, clienteSeleccionado.id);
              toast.success('Información de usuario actualizada');
          }
          setModalAbierto(false);
          cargarClientes();
      } catch {
          toast.error('Hubo un error guardando el usuario');
      } finally {
          setIsSaving(false);
      }
  };

  return (
    <AdminLayout>
        <header className="admin-top-header">
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}><UsersRound size={28} /> Manejo de Clientes</h1>
            <button 
                onClick={abrirModalCrear}
                style={{ padding: '10px 20px', background: '#1e293b', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
                <PlusCircle size={18} /> Nuevo Usuario
            </button>
        </header>

        <main style={{ padding: 0 }}>
            <div className="grid-card" style={{ marginBottom: '20px' }}>
                <div className="search-bar-v2" style={{ width: '100%', maxWidth: '100%' }}>
                    <UserRoundSearch size={18} className="search-icon-header" />
                    <input 
                        type="text" 
                        placeholder="Buscar cliente por nombre o email..." 
                        value={busqueda}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBusqueda(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid-card">
                <div className="grid-card-label">
                    <h3>Lista de Clientes de la Red UNE</h3>
                </div>
                
                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                        <Activity className="animate-spin" size={32} style={{ marginBottom: '10px' }} />
                        <p>Cargando lista de emprendedores...</p>
                    </div>
                ) : (
                    <table className="admin-table-v2">
                        <thead>
                            <tr>
                                <th>CLIENTE</th>
                                <th>CORREO ELECTRÓNICO</th>
                                <th>ROL</th>
                                <th>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientesFiltrados.length > 0 ? clientesFiltrados.map((cliente) => (
                                <tr key={cliente.id}>
                                    <td>
                                        <div className="row-user">
                                            <div className="row-avatar" style={{ background: '#f1f5f9', color: '#1e293b' }}>
                                                {cliente.nombre ? cliente.nombre.charAt(0).toUpperCase() : 'U'}
                                            </div>
                                            <div style={{ fontWeight: 800 }}>{cliente.nombre || 'Sin nombre'}</div>
                                        </div>
                                    </td>
                                    <td style={{ color: '#64748b' }}>{cliente.email}</td>
                                    <td>
                                        <span className={`status-tag ${cliente.role === 'admin' ? 'success' : 'pending'}`}>
                                            {cliente.role}
                                        </span>
                                    </td>
                                    <td>
                                        <button 
                                            onClick={() => abrirModalEditar(cliente)} 
                                            style={{ background: 'none', border: 'none', color: '#8B1A1A', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                                        >
                                            <Eye size={16} /> Editar
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>No se encontraron clientes registrados</td></tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </main>

        {modalAbierto && (
            <div className="modal-overlay-admin" style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
              <div className="grid-card" style={{ width: '90%', maxWidth: '600px', padding: '40px', maxHeight: '90vh', overflowY: 'auto' }}>
                <div className="grid-card-label">
                    <h2>
                        <UserCircle size={24} style={{ color: '#D4A853', verticalAlign: 'middle', marginRight: '10px' }} /> 
                        {isCreando ? 'Crear Nuevo Usuario' : `Perfil de ${clienteSeleccionado?.nombre}`}
                    </h2>
                    <button onClick={() => setModalAbierto(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={24} /></button>
                </div>
                
                <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1.5rem' }}>
                    <div style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        
                        <div>
                            <label style={{ fontWeight: 600, color: '#475569', display: 'block', marginBottom: '8px' }}>Nombre:</label>
                            <input 
                                type="text"
                                value={editNombre}
                                onChange={(e) => setEditNombre(e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
                                placeholder="Nombre completo"
                            />
                        </div>

                        <div>
                            <label style={{ fontWeight: 600, color: '#475569', display: 'block', marginBottom: '8px' }}>Email:</label>
                            <input 
                                type="email"
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
                                placeholder="correo@ejemplo.com"
                            />
                        </div>

                        <div>
                            <label style={{ fontWeight: 600, color: '#475569', display: 'block', marginBottom: '8px' }}>{isCreando ? 'Contraseña:' : 'Nueva Contraseña (Opcional):'}</label>
                            <input 
                                type="password"
                                value={editPassword}
                                onChange={(e) => setEditPassword(e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
                                placeholder={isCreando ? "Contraseña requerida" : "Dejar en blanco para no cambiar"}
                            />
                        </div>

                        <div>
                          <label style={{ fontWeight: 600, color: '#475569', display: 'block', marginBottom: '8px' }}>Rol en Plataforma:</label>
                          <select 
                              value={editRole}
                              onChange={(e) => setEditRole(e.target.value as 'user' | 'admin')}
                              style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontWeight: 600, background: '#fff' }}
                          >
                              <option value="user">Usuario Regular</option>
                              <option value="admin">Administrador</option>
                          </select>
                        </div>

                    </div>

                    <button 
                        onClick={handleUpdateUser} 
                        disabled={isSaving}
                        style={{ padding: '12px 20px', background: '#D4A853', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: isSaving ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: isSaving ? 0.7 : 1 }}
                    >
                        <Save size={18} /> {isCreando ? 'Crear Usuario' : 'Guardar Cambios'}
                    </button>

                    {!isCreando && (
                        <div style={{ padding: '20px', background: '#fef2f2', border: '1px dashed #fca5a5', borderRadius: '16px', marginTop: '10px' }}>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#dc2626', marginBottom: '10px' }}>Zona de Peligro</h4>
                            <p style={{ fontSize: '0.9rem', color: '#991b1b', marginBottom: '15px' }}>Al eliminar a este usuario, no pódra volver a iniciar sesión.</p>
                            <button 
                                onClick={handleDeleteUser}
                                style={{ padding: '10px 20px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                                <Trash2 size={16} /> Eliminar Permanente
                            </button>
                        </div>
                    )}
                </div>
              </div>
            </div>
        )}
    </AdminLayout>
  )
}

export default ManejarClientes