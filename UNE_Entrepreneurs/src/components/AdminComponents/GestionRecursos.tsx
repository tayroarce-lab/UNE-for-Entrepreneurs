import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { FileText, Plus, Edit, Trash2, ExternalLink, Loader, X, Save } from 'lucide-react';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
import { getRecursos, createRecurso, updateRecurso, deleteRecurso } from '../../services/RecursosService';
import type { Recurso } from '../../services/RecursosService';
import '../../styles/GestionRecursos.css';
import '../../styles/AdminDashboard.css';

export default function GestionRecursos() {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('Guía');
  const [enlace, setEnlace] = useState('');
  const [activo, setActivo] = useState(true);

  const fetchRecursos = async () => {
    setLoading(true);
    try {
      const data = await getRecursos();
      setRecursos(data || []);
    } catch (error) {
      console.error('Error al cargar recursos:', error);
      toast.error('Error al cargar los recursos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecursos();
  }, []);

  const clearForm = () => {
    setEditandoId(null);
    setTitulo('');
    setDescripcion('');
    setTipo('Guía');
    setEnlace('');
    setActivo(true);
  };

  const handleEdit = (recurso: Recurso) => {
    setEditandoId(recurso.id);
    setTitulo(recurso.titulo);
    setDescripcion(recurso.descripcion);
    setTipo(recurso.tipo);
    setEnlace(recurso.enlace);
    setActivo(recurso.activo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !enlace.trim()) {
      toast.error('El título y el enlace son requeridos');
      return;
    }

    try {
      if (editandoId) {
        await updateRecurso(editandoId, { titulo, descripcion, tipo, enlace, activo });
        toast.success('Recurso actualizado con éxito');
      } else {
        await createRecurso({
          titulo,
          descripcion,
          tipo,
          enlace,
          activo,
          fecha: new Date().toISOString()
        });
        toast.success('Recurso creado con éxito');
      }
      clearForm();
      fetchRecursos();
    } catch (error) {
      toast.error('Error al guardar el recurso');
    }
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: '¿Eliminar recurso?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteRecurso(id);
          toast.success('Recurso eliminado');
          if (editandoId === id) clearForm();
          fetchRecursos();
        } catch (error) {
          toast.error('Error al eliminar recurso');
        }
      }
    });
  };

  const handleToggleStatus = async (recurso: Recurso) => {
    try {
      await updateRecurso(recurso.id, { activo: !recurso.activo });
      toast.success(recurso.activo ? 'Recurso desactivado' : 'Recurso activado');
      fetchRecursos();
    } catch (error) {
      toast.error('Error al cambiar estado');
    }
  };

  return (
    <AdminLayout>
      <header className="admin-top-header">
        <h1 style={{ fontSize: '2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FileText size={28} /> Recursos para Emprendedores
        </h1>
      </header>

      <main style={{ padding: 0 }}>
        {/* Formulario de Creación / Edición */}
        <div className="grid-card" style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--admin-text-primary)' }}>
            {editandoId ? <Edit size={24} color="#f59e0b" /> : <Plus size={24} color="var(--uneRed)" />} 
            {editandoId ? 'Editar Recurso' : 'Crear Nuevo Recurso'}
          </h3>

          <form onSubmit={handleSubmit} className="recurso-form">
            <div className="form-group-recurso">
              <label>Título del Recurso *</label>
              <input 
                type="text" 
                value={titulo} 
                onChange={(e) => setTitulo(e.target.value)} 
                placeholder="Ej. Guía para Registro Pyme"
                required
              />
            </div>

            <div className="form-group-recurso">
              <label>Descripción corta</label>
              <textarea 
                value={descripcion} 
                onChange={(e) => setDescripcion(e.target.value)} 
                placeholder="Breve explicación de qué trata el recurso..."
                rows={3}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group-recurso">
                <label>Tipo de Documento / Recurso</label>
                <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                  <option value="Guía">Guía Instructiva</option>
                  <option value="Plantilla">Plantilla / Formato</option>
                  <option value="Trámite">Enlace de Trámite</option>
                  <option value="Video">Video Tutorial</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div className="form-group-recurso">
                <label>Estado</label>
                <select value={activo ? "true" : "false"} onChange={(e) => setActivo(e.target.value === "true")}>
                  <option value="true">Activo (Visible)</option>
                  <option value="false">Oculto</option>
                </select>
              </div>
            </div>

            <div className="form-group-recurso">
              <label>Enlace (URL) *</label>
              <input 
                type="url" 
                value={enlace} 
                onChange={(e) => setEnlace(e.target.value)} 
                placeholder="https://..."
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
              <button 
                type="submit"
                className="btn-publish-v2" 
                style={{ padding: '12px 30px', background: editandoId ? '#f59e0b' : 'var(--uneRed)' }}
              >
                {editandoId ? <Save size={18} /> : <Plus size={18} />}
                {editandoId ? 'Guardar Cambios' : 'Crear Recurso'}
              </button>
              {editandoId && (
                <button 
                  type="button"
                  onClick={clearForm}
                  style={{ padding: '12px 25px', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <X size={18} /> Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Lista de Recursos */}
        <div className="grid-card">
          <div className="grid-card-label" style={{ marginBottom: '20px' }}>
            <h3>Recursos Disponibles</h3>
          </div>

          {loading ? (
             <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                <Loader className="animate-spin" size={32} style={{ marginBottom: '10px' }} />
                <p>Cargando recursos...</p>
             </div>
          ) : recursos.length > 0 ? (
            <div className="recursos-grid">
              {recursos.map(recurso => (
                <div key={recurso.id} className="recurso-card" style={{ opacity: recurso.activo ? 1 : 0.75 }}>
                  <div className="recurso-card-header">
                    <span className="recurso-type">{recurso.tipo}</span>
                    <span className={`recurso-status ${recurso.activo ? 'active' : 'inactive'}`}>
                      {recurso.activo ? 'Visible' : 'Oculto'}
                    </span>
                  </div>
                  <h4 className="recurso-title">{recurso.titulo}</h4>
                  <p className="recurso-desc">{recurso.descripcion}</p>
                  
                  <a href={recurso.enlace} target="_blank" rel="noopener noreferrer" className="recurso-link">
                     <ExternalLink size={16} /> Ver Recurso Original
                  </a>

                  <div className="recurso-actions">
                    <button className="btn-action btn-toggle" onClick={() => handleToggleStatus(recurso)}>
                      {recurso.activo ? 'Ocultar' : 'Mostrar'}
                    </button>
                    <button className="btn-action btn-edit" onClick={() => handleEdit(recurso)}>
                      <Edit size={16} /> Editar
                    </button>
                    <button className="btn-action btn-delete" onClick={() => handleDelete(recurso.id)}>
                      <Trash2 size={16} /> Borrar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <div style={{ padding: '40px', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: '12px', border: '2px dashed #e2e8f0' }}>
                 <FileText size={48} style={{ marginBottom: '15px', color: '#cbd5e1' }} />
                 <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>No hay recursos registrados</p>
                 <p style={{ fontSize: '0.9rem' }}>Agrega el primer recurso usando el formulario superior.</p>
             </div>
          )}
        </div>
      </main>
    </AdminLayout>
  );
}
