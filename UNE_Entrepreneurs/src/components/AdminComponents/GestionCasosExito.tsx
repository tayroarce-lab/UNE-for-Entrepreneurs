import React, { useState, useEffect } from 'react'
import '../../styles/AdminDashboard.css'
import Swal from 'sweetalert2'
import { toast } from 'sonner'
import { Quote, Send, Edit, Trash2, X, Image as ImageIcon, Activity, Eye, EyeOff } from 'lucide-react'
import { getCasosExito, createCasoExito, updateCasoExito, deleteCasoExito } from '../../services/CasosExitoService'
import type { CasoExito } from '../../services/CasosExitoService'
import AdminLayout from './AdminLayout'
import AdminHeader from './AdminHeader'

function GestionCasosExito() {
  const [casos, setCasos] = useState<CasoExito[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [nombreInput, setNombreInput] = useState('');
  const [profesionInput, setProfesionInput] = useState('');
  const [ubicacionInput, setUbicacionInput] = useState('');
  const [citaInput, setCitaInput] = useState('');
  const [imagenInput, setImagenInput] = useState('');
  const [colorTagInput, setColorTagInput] = useState('#D4A853');
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const filteredCasos = casos.filter(c =>
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.profesion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.ubicacion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    cargarCasos();
  }, []);

  const cargarCasos = async () => {
    setLoading(true);
    try {
      const data = await getCasosExito();
      setCasos(data || []);
    } catch (error) {
      console.error('Error al cargar casos de éxito:', error);
      toast.error('Error al cargar casos de éxito');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setImagenInput(reader.result as string);
          };
          reader.readAsDataURL(file);
      }
  };

  const clearInputs = () => {
      setNombreInput('');
      setProfesionInput('');
      setUbicacionInput('');
      setCitaInput('');
      setImagenInput('');
      setColorTagInput('#D4A853');
      const fileInput = document.getElementById('imagen-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
  };

  const handleGuardar = async () => {
    if (!nombreInput.trim() || !citaInput.trim()) {
        toast.error('El nombre y la cita son requeridos');
        return;
    }

    const data: Omit<CasoExito, 'id'> = {
        nombre: nombreInput,
        profesion: profesionInput,
        ubicacion: ubicacionInput,
        cita: citaInput,
        imagen: imagenInput,
        colorTag: colorTagInput,
        activo: true,
        fecha: new Date().toISOString()
    };

    if (editandoId) {
      Swal.fire({
        title: '¿Guardar cambios?',
        text: "Se actualizará este caso de éxito",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: 'var(--suria-crimson)',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await updateCasoExito(editandoId, data);
            setEditandoId(null);
            clearInputs();
            toast.success('Caso de éxito actualizado');
            await cargarCasos();
          } catch {
            toast.error('Error al guardar cambios');
          }
        }
      });
    } else {
      Swal.fire({
        title: '¿Registrar nuevo caso?',
        text: "Se añadirá a la galería de Nuestra Gente",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: 'var(--suria-crimson)',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Sí, registrar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await createCasoExito(data);
            clearInputs();
            toast.success('Caso de éxito registrado con éxito');
            await cargarCasos();
          } catch {
            toast.error('Error al registrar caso');
          }
        }
      });
    }
  };

  const handleEditar = (caso: CasoExito) => {
      setEditandoId(caso.id);
      setNombreInput(caso.nombre);
      setProfesionInput(caso.profesion);
      setUbicacionInput(caso.ubicacion);
      setCitaInput(caso.cita);
      setImagenInput(caso.imagen);
      setColorTagInput(caso.colorTag);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelarEdicion = () => {
      setEditandoId(null);
      clearInputs();
  };

  const handleEliminar = (id: string) => {
    Swal.fire({
      title: '¿Eliminar caso de éxito?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--suria-crimson)',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCasoExito(id);
          if (editandoId === id) handleCancelarEdicion();
          toast.success('Caso de éxito eliminado');
          await cargarCasos();
        } catch {
          toast.error('Error al eliminar');
        }
      }
    });
  };

  const handleToggleActivo = async (caso: CasoExito) => {
    try {
      await updateCasoExito(caso.id, { activo: !caso.activo });
      toast.success(caso.activo ? 'Caso ocultado' : 'Caso visible');
      await cargarCasos();
    } catch {
      toast.error('Error al cambiar estado');
    }
  };

  return (
    <AdminLayout>
        <AdminHeader 
            placeholder="Buscar por nombre, profesión o ubicación..." 
            onSearch={(val) => setSearchTerm(val)}
        />

        <main className="admin-main">
          <div className="admin-page-header">
            <div>
              <h1 className="admin-page-title">Casos de Éxito</h1>
              <p className="admin-page-subtitle">Gestiona las historias inspiradoras que se muestran en "Nuestra Gente".</p>
            </div>
          </div>

          <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">
                    {editandoId ? <Edit size={22} style={{ color: 'var(--suria-gold)' }} /> : <Quote size={22} style={{ color: 'var(--suria-gold)' }} />} 
                    {editandoId ? 'Editar Historia' : 'Registrar Nueva Historia'}
                </h3>
              </div>
              
              <div className="admin-form-grid">
                  <div className="admin-form-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                      <div className="admin-form-group">
                          <label className="admin-label">Nombre del Protagonista:</label>
                          <input 
                              type="text" 
                              className="admin-input"
                              placeholder="Ej: María Rodríguez" 
                              value={nombreInput}
                              onChange={(e) => setNombreInput(e.target.value)}
                          />
                      </div>
                      <div className="admin-form-group">
                          <label className="admin-label">Profesión / Ocupación:</label>
                          <input 
                              type="text" 
                              className="admin-input"
                              placeholder="Ej: Emprendedora Textil" 
                              value={profesionInput}
                              onChange={(e) => setProfesionInput(e.target.value)}
                          />
                      </div>
                      <div className="admin-form-group">
                          <label className="admin-label">Ubicación (Opcional):</label>
                          <input 
                              type="text" 
                              className="admin-input"
                              placeholder="Ej: San José, Costa Rica" 
                              value={ubicacionInput}
                              onChange={(e) => setUbicacionInput(e.target.value)}
                          />
                      </div>
                  </div>
                  
                  <div className="admin-form-group">
                      <label className="admin-label">Testimonio o Cita:</label>
                      <textarea 
                          placeholder="Escriba aquí el extracto más relevante de la historia..." 
                          rows={4} 
                          value={citaInput}
                          onChange={(e) => setCitaInput(e.target.value)}
                          className="admin-textarea"
                      ></textarea>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '30px' }}>
                      <div className="admin-card" style={{ padding: '1.5rem', background: '#f8fafc', borderStyle: 'dashed', marginBottom: 0 }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 800, color: 'var(--admin-text-primary)', marginBottom: '1rem', cursor: 'pointer' }}>
                              <ImageIcon size={20} /> 
                              <span>Subir Fotografía</span>
                              <input 
                                  id="imagen-upload"
                                  type="file" 
                                  accept="image/*" 
                                  onChange={handleImageChange} 
                                  style={{ display: 'none' }}
                              />
                          </label>
                          
                          {imagenInput ? (
                              <div style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '16px', overflow: 'hidden', border: `3px solid ${colorTagInput}` }}>
                                  <img src={imagenInput} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                  <button 
                                      onClick={() => { setImagenInput(''); const f = document.getElementById('imagen-upload') as HTMLInputElement; if(f) f.value = ''; }}
                                      style={{ position: 'absolute', top: '0', right: '0', background: 'var(--suria-crimson)', color: '#fff', border: 'none', borderBottomLeftRadius: '10px', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                  >
                                      <X size={14} />
                                  </button>
                              </div>
                          ) : (
                            <div style={{ width: '100px', height: '100px', borderRadius: '16px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                                <ImageIcon size={32} />
                            </div>
                          )}
                      </div>

                      <div className="admin-form-group">
                          <label className="admin-label">Color de Marca:</label>
                          <input 
                              type="color" 
                              className="admin-input"
                              value={colorTagInput} 
                              onChange={(e) => setColorTagInput(e.target.value)}
                              style={{ height: '60px', padding: '4px', cursor: 'pointer' }}
                          />
                      </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '15px', marginTop: '1rem' }}>
                      <button 
                          className="btn-admin btn-admin-secondary" 
                          onClick={handleGuardar}
                          style={{ flex: 1 }}
                      >
                          <Send size={18} />
                          {editandoId ? 'Actualizar Historia' : 'Publicar Historia'}
                      </button>
                      {editandoId && (
                          <button 
                              onClick={handleCancelarEdicion}
                              className="btn-admin btn-admin-outline"
                          >
                              <X size={18} /> Cancelar
                          </button>
                      )}
                  </div>
              </div>
          </div>

          <div className="admin-card">
              <div className="admin-card-header">
                  <h3 className="admin-card-title">Listado de Historias de Éxito</h3>
              </div>

              {loading ? (
                  <div className="admin-loading">
                      <Activity className="animate-spin" size={32} />
                      <p>Cargando historias...</p>
                  </div>
              ) : (
                  <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>CLIENTE</th>
                                <th>PROFESIÓN</th>
                                <th>UBICACIÓN</th>
                                <th>TAG</th>
                                <th style={{ textAlign: 'center' }}>VISIBILIDAD</th>
                                <th style={{ textAlign: 'center' }}>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCasos.length === 0 ? (
                                <tr><td colSpan={6} className="admin-empty-state">No se encontraron casos de éxito registrados.</td></tr>
                            ) : filteredCasos.map((caso: CasoExito) => (
                                <tr key={caso.id} style={{ opacity: caso.activo ? 1 : 0.6 }}>
                                    <td>
                                        <div className="row-user">
                                            {caso.imagen ? (
                                                <img src={caso.imagen} alt={caso.nombre} style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover', border: `2px solid ${caso.colorTag}` }} />
                                            ) : (
                                                <div className="row-avatar" style={{ background: '#f1f5f9', color: caso.colorTag }}>{caso.nombre.charAt(0)}</div>
                                            )}
                                            <div style={{ fontWeight: 800 }}>{caso.nombre}</div>
                                        </div>
                                    </td>
                                    <td style={{ color: 'var(--admin-text-secondary)', fontSize: '0.85rem' }}>{caso.profesion}</td>
                                    <td style={{ color: 'var(--admin-text-secondary)', fontSize: '0.85rem' }}>{caso.ubicacion}</td>
                                    <td>
                                        <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: caso.colorTag, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)' }}></div>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <span className={`status-tag ${caso.activo ? 'success' : 'pending'}`}>
                                            {caso.activo ? 'Público' : 'Oculto'}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                            <button 
                                                onClick={() => handleToggleActivo(caso)} 
                                                className="btn-admin btn-admin-outline"
                                                style={{ padding: '8px' }}
                                                title={caso.activo ? 'Ocultar' : 'Mostrar'}
                                            >
                                                {caso.activo ? <Eye size={16} /> : <EyeOff size={16} />}
                                            </button>
                                            <button onClick={() => handleEditar(caso)} className="btn-admin btn-admin-outline" style={{ padding: '8px' }}><Edit size={16} /></button>
                                            <button onClick={() => handleEliminar(caso.id)} className="btn-admin btn-admin-danger" style={{ padding: '8px' }}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                  </div>
              )}
          </div>
        </main>
    </AdminLayout>
  )
}

export default GestionCasosExito
