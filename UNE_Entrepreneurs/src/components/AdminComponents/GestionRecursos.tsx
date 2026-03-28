import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import AdminHeader from './AdminHeader';
import { Edit, Trash2, Activity, X, Save, PlusCircle, Globe } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
import { getRecursos, createRecurso, updateRecurso, deleteRecurso } from '../../services/RecursosService';
import type { Recurso } from '../../types/recurso';
import '../../styles/AdminDashboard.css';

const GestionRecursos: React.FC = () => {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecurso, setEditingRecurso] = useState<Recurso | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form states
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('Guía');
  const [enlace, setEnlace] = useState('');
  const [imagen, setImagen] = useState('');
  const [activo, setActivo] = useState(true);

  useEffect(() => {
    fetchRecursos();
  }, []);

  const fetchRecursos = async () => {
    setLoading(true);
    try {
      const data = await getRecursos();
      setRecursos(data);
    } catch (error) {
      console.error('Error fetching recursos:', error);
      toast.error('Error al cargar recursos');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (recurso?: Recurso) => {
    if (recurso) {
      setEditingRecurso(recurso);
      setTitulo(recurso.titulo);
      setDescripcion(recurso.descripcion);
      setTipo(recurso.tipo);
      setEnlace(recurso.enlace);
      setImagen(recurso.imagen || '');
      setActivo(recurso.activo);
    } else {
      setEditingRecurso(null);
      setTitulo('');
      setDescripcion('');
      setTipo('Guía');
      setEnlace('');
      setImagen('');
      setActivo(true);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      titulo,
      descripcion,
      tipo,
      enlace,
      imagen,
      activo,
      fecha: new Date().toISOString()
    };

    try {
      if (editingRecurso) {
        await updateRecurso(editingRecurso.id, data);
        toast.success('Recurso actualizado');
      } else {
        await createRecurso(data);
        toast.success('Recurso creado');
      }
      setIsModalOpen(false);
      fetchRecursos();
    } catch (error) {
      console.error('Error saving recurso:', error);
      toast.error('Error al guardar el recurso');
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--suria-crimson)',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await deleteRecurso(id);
        toast.success('Recurso eliminado');
        fetchRecursos();
      } catch (error) {
        console.error('Error deleting recurso:', error);
        toast.error('Error al eliminar the recurso');
      }
    }
  };

  const filteredRecursos = recursos.filter(r => 
    r.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <AdminHeader 
        placeholder="Buscar recursos (guías, plantillas, etc)..." 
        onSearch={(val) => setSearchTerm(val)}
      />

      <main className="admin-main">
        <div className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Recursos para Emprendedores</h1>
            <p className="admin-page-subtitle">Gestiona las guías y herramientas disponibles para la comunidad.</p>
          </div>
          <button className="btn-admin btn-admin-primary" onClick={() => handleOpenModal()}>
            <PlusCircle size={18} /> Nuevo Recurso
          </button>
        </div>

        {/* List Content */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Listado de Material Digital</h3>
          </div>

          {loading ? (
            <div className="admin-loading">
              <Activity className="animate-spin" size={32} />
              <p>Cargando recursos...</p>
            </div>
          ) : (
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>RECURSO</th>
                    <th>TIPO</th>
                    <th style={{ textAlign: 'center' }}>VISIBILIDAD</th>
                    <th style={{ textAlign: 'center' }}>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecursos.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="admin-empty-state">No se encontraron recursos.</td>
                    </tr>
                  ) : (
                    filteredRecursos.map((r) => (
                      <tr key={r.id}>
                        <td>
                           <div style={{ fontWeight: 800, color: 'var(--suria-plum)' }}>{r.titulo}</div>
                           <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-secondary)', maxWidth: '400px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.descripcion}</div>
                        </td>
                        <td>
                          <span className="status-tag info">{r.tipo}</span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <span className={`status-tag ${r.activo ? 'success' : 'pending'}`}>
                            {r.activo ? 'Visible' : 'Oculto'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <a href={r.enlace} target="_blank" rel="noopener noreferrer" className="btn-admin btn-admin-outline" style={{ padding: '8px' }} title="Ver enlace">
                              <Globe size={16} />
                            </a>
                            <button onClick={() => handleOpenModal(r)} className="btn-admin btn-admin-outline" style={{ padding: '8px' }} title="Editar">
                              <Edit size={16} />
                            </button>
                            <button onClick={() => handleDelete(r.id)} className="btn-admin btn-admin-danger" style={{ padding: '8px' }} title="Eliminar">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal simplified */}
        {isModalOpen && (
          <div className="modal-overlay-admin">
            <div className="modal-content-admin" style={{ maxWidth: '600px' }}>
              <div className="admin-card">
                <div className="admin-card-header">
                   <h3 className="admin-card-title">{editingRecurso ? 'Editar Recurso' : 'Nuevo Recurso'}</h3>
                   <button onClick={() => setIsModalOpen(false)} className="btn-admin btn-admin-outline" style={{ padding: '4px' }}><X size={20} /></button>
                </div>
                
                <form onSubmit={handleSave} className="admin-form-grid" style={{ gridTemplateColumns: '1fr', padding: '1rem' }}>
                  <div className="admin-form-group">
                    <label className="admin-label">Título del Recurso:</label>
                    <input type="text" className="admin-input" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                  </div>
                  
                  <div className="admin-form-group">
                    <label className="admin-label">Descripción Detallada:</label>
                    <textarea className="admin-textarea" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} rows={3} required />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="admin-form-group">
                      <label className="admin-label">Tipo de Recurso:</label>
                      <select className="admin-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        <option value="Guía">Guía PDF/Web</option>
                        <option value="Plantilla">Plantilla (Excel/Word)</option>
                        <option value="Video">Video Tutorial</option>
                        <option value="Herramienta">Herramienta Interactiva</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">URL del Recurso:</label>
                      <input type="url" className="admin-input" value={enlace} onChange={(e) => setEnlace(e.target.value)} placeholder="https://..." required />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">URL de Imagen (Opcional):</label>
                    <input type="text" className="admin-input" value={imagen} onChange={(e) => setImagen(e.target.value)} />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                    <input type="checkbox" id="activo" checked={activo} onChange={(e) => setActivo(e.target.checked)} />
                    <label htmlFor="activo" className="admin-label" style={{ marginBottom: 0 }}>Habilitar este recurso para los usuarios</label>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                    <button type="button" className="btn-admin btn-admin-outline" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                    <button type="submit" className="btn-admin btn-admin-primary">
                      <Save size={18} /> {editingRecurso ? 'Guardar Cambios' : 'Crear Recurso'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </AdminLayout>
  );
};

export default GestionRecursos;
