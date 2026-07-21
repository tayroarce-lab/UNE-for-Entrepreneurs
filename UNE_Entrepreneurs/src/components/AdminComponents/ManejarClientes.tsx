import { useState, useEffect } from 'react'
import '../../styles/AdminDashboard.css'
import { 
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
import AdminHeader from './AdminHeader'

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
        <AdminHeader 
            placeholder="Buscar emprendedores por nombre o email..." 
            onSearch={(val) => setBusqueda(val)}
        />
        
        <main className="admin-main">
          <div className="admin-page-header">
            <div>
              <h1 className="admin-page-title">Gestión de Usuarios</h1>
              <p className="admin-page-subtitle">Administra la red de emprendedores y roles de acceso de UNE Costa Rica.</p>
            </div>
            <button 
              onClick={abrirModalCrear}
              className="btn-admin btn-admin-primary"
            >
              <PlusCircle size={20} /> Nuevo Usuario
            </button>
          </div>

            <div className="admin-card">
                <div className="admin-card-header">
                    <h3 className="admin-card-title">Lista de Clientes de la Red UNE</h3>
                </div>
                
                {loading ? (
                    <div className="admin-loading">
                        <Activity className="animate-spin" size={32} />
                        <p>Cargando lista de emprendedores...</p>
                    </div>
                ) : (
                    <>
                        {/* MOBILE VIEW (CARDS) */}
                        <div className="mobile-only mobile-card-list">
                            {clientesFiltrados.length > 0 ? clientesFiltrados.map((cliente) => (
                                <div key={cliente.id} className="mobile-record-card">
                                    <div className="card-row" style={{ alignItems: 'center', marginBottom: '1rem' }}>
                                        <div className="row-avatar" style={{ background: 'var(--suria-peach)', color: 'var(--suria-plum)', marginRight: '12px' }}>
                                            {cliente.nombre ? cliente.nombre.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <span className="card-value" style={{ textAlign: 'left', fontSize: '1rem' }}>{cliente.nombre || 'Sin nombre'}</span>
                                    </div>
                                    <div className="card-row">
                                        <span className="card-label">Email</span>
                                        <span className="card-value" style={{ wordBreak: 'break-all' }}>{cliente.email}</span>
                                    </div>
                                    <div className="card-row">
                                        <span className="card-label">Rol</span>
                                        <span className={`status-tag ${cliente.role === 'admin' ? 'success' : 'pending'}`}>
                                            {cliente.role}
                                        </span>
                                    </div>
                                    <div className="card-actions">
                                        <button 
                                            onClick={() => abrirModalEditar(cliente)} 
                                            className="btn-admin btn-admin-outline"
                                            style={{ width: '100%' }}
                                        >
                                            <Eye size={16} /> Ver Detalles / Editar
                                        </button>
                                    </div>
                                </div>
                            )) : (
                                <div className="admin-empty-state">No se encontraron clientes registrados</div>
                            )}
                        </div>

                        {/* DESKTOP VIEW (TABLE) */}
                        <div className="desktop-only admin-table-container">
                            <table className="admin-table">
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
                                            <td style={{ color: 'var(--admin-text-secondary)' }}>{cliente.email}</td>
                                            <td>
                                                <span className={`status-tag ${cliente.role === 'admin' ? 'success' : 'pending'}`}>
                                                    {cliente.role}
                                                </span>
                                            </td>
                                            <td>
                                                <button 
                                                    onClick={() => abrirModalEditar(cliente)} 
                                                    className="btn-admin btn-admin-outline"
                                                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                                                >
                                                    <Eye size={14} /> Editar
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={4} className="admin-empty-state">No se encontraron clientes registrados</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </main>

        {modalAbierto && (
            <div className="modal-overlay-admin">
              <div className="admin-card modal-content-admin" style={{ maxWidth: '600px', padding: '2.5rem' }}>
                <div className="admin-card-header">
                    <h2 className="admin-card-title">
                        <UserCircle size={24} style={{ color: 'var(--suria-gold)' }} /> 
                        {isCreando ? 'Crear Nuevo Usuario' : `Perfil de ${clienteSeleccionado?.nombre}`}
                    </h2>
                    <button onClick={() => setModalAbierto(false)} className="btn-close-modal"><X size={24} /></button>
                </div>
                
                <div className="admin-form-grid">
                    <div className="admin-form-section">
                        <div className="admin-form-group">
                            <label className="admin-label">Nombre:</label>
                            <input 
                                type="text"
                                className="admin-input"
                                value={editNombre}
                                onChange={(e) => setEditNombre(e.target.value)}
                                placeholder="Nombre completo"
                            />
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-label">Email:</label>
                            <input 
                                type="email"
                                className="admin-input"
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                                placeholder="correo@ejemplo.com"
                            />
                        </div>

                        <div className="admin-form-group">
                            <label className="admin-label">{isCreando ? 'Contraseña:' : 'Nueva Contraseña (Opcional):'}</label>
                            <input 
                                type="password"
                                className="admin-input"
                                value={editPassword}
                                onChange={(e) => setEditPassword(e.target.value)}
                                placeholder={isCreando ? "Contraseña requerida" : "Dejar en blanco para no cambiar"}
                            />
                        </div>

                        <div className="admin-form-group">
                          <label className="admin-label">Rol en Plataforma:</label>
                          <select 
                              className="admin-select"
                              value={editRole}
                              onChange={(e) => setEditRole(e.target.value as 'user' | 'admin')}
                          >
                              <option value="user">Usuario Regular</option>
                              <option value="admin">Administrador</option>
                          </select>
                        </div>
                    </div>

                    <button 
                        onClick={handleUpdateUser} 
                        disabled={isSaving}
                        className="btn-admin btn-admin-secondary"
                        style={{ width: '100%', opacity: isSaving ? 0.7 : 1 }}
                    >
                        <Save size={18} /> {isCreando ? 'Crear Usuario' : 'Guardar Cambios'}
                    </button>

                    {!isCreando && (
                        <div className="danger-zone-v2">
                            <h4 className="danger-zone-title">Zona de Peligro</h4>
                            <p className="danger-zone-text">Al eliminar a este usuario, no podrá volver a iniciar sesión.</p>
                            <button 
                                onClick={handleDeleteUser}
                                className="btn-admin btn-admin-danger"
                                style={{ width: '100%' }}
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