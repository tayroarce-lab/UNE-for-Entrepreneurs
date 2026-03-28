import React, { useState, useEffect } from 'react'
import '../../styles/AdminDashboard.css'
import Swal from 'sweetalert2'
import { toast } from 'sonner'
import { PenLine, Send, Edit, Trash2, X, Image as ImageIcon, Activity, Eye, EyeOff, Search, Save } from 'lucide-react'
import { getNews, createNews, updateNews, deleteNews } from '../../services/NewsService'
import AdminLayout from './AdminLayout'
import AdminHeader from './AdminHeader'

export interface Noticia {
    id: string;
    titulo: string;
    contenido?: string;
    imagen?: string;
    autor: string;
    activa: boolean;
    fecha?: string;
}

function GestionTipsNoticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [tituloInput, setTituloInput] = useState('');
  const [contenidoInput, setContenidoInput] = useState('');
  const [imagenInput, setImagenInput] = useState('');
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const filteredNoticias = noticias.filter(n =>
    n.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.autor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    cargarNoticias();
  }, []);

  const cargarNoticias = async () => {
    setLoading(true);
    try {
      const data = await getNews();
      setNoticias(data || []);
    } catch (error) {
      console.error('Error al cargar noticias:', error);
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
      setTituloInput('');
      setContenidoInput('');
      setImagenInput('');
      const fileInput = document.getElementById('imagen-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
  };

  const handlePublicar = async () => {
    if (!tituloInput.trim()) {
        toast.error('El título es requerido para la publicación');
        return;
    }

    if (editandoId) {
      Swal.fire({
        title: '¿Guardar cambios?',
        text: "Se actualizará esta publicación",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: 'var(--suria-crimson)',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await updateNews(editandoId, { titulo: tituloInput, contenido: contenidoInput, imagen: imagenInput });
            setEditandoId(null);
            clearInputs();
            toast.success('Publicación actualizada con éxito');
            await cargarNoticias();
          } catch {
            toast.error('Error al guardar cambios');
          }
        }
      });
    } else {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "Se publicará este nuevo tip/noticia",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: 'var(--suria-crimson)',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Sí, publicar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const nuevaNoticia: Omit<Noticia, 'id'> = {
              titulo: tituloInput,
              contenido: contenidoInput,
              imagen: imagenInput,
              autor: 'Admin UNE',
              activa: true,
              fecha: new Date().toISOString()
          };
          try {
            await createNews(nuevaNoticia);
            clearInputs();
            toast.success('Publicado con éxito en la plataforma');
            await cargarNoticias();
          } catch {
            toast.error('Error al publicar noticia');
          }
        }
      });
    }
  };

  const handleEditar = (noticia: Noticia) => {
      setEditandoId(noticia.id);
      setTituloInput(noticia.titulo);
      setContenidoInput(noticia.contenido || '');
      setImagenInput(noticia.imagen || '');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelarEdicion = () => {
      setEditandoId(null);
      clearInputs();
  };

  const handleEliminar = (id: string) => {
    Swal.fire({
      title: '¿Eliminar publicación?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--suria-crimson)',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteNews(id);
          if (editandoId === id) handleCancelarEdicion();
          toast.success('Publicación eliminada correctamente');
          await cargarNoticias();
        } catch {
          toast.error('Error al eliminar');
        }
      }
    });
  };

  const handleToggleActiva = async (noticia: Noticia) => {
    try {
      await updateNews(noticia.id, { activa: !noticia.activa });
      toast.success(noticia.activa ? 'Publicación ocultada' : 'Publicación visible');
      await cargarNoticias();
    } catch {
      toast.error('Error al cambiar estado');
    }
  };

  return (
    <AdminLayout>
        <AdminHeader 
            placeholder="Buscar noticias o consejos por título o autor..." 
            onSearch={(val) => setSearchTerm(val)}
        />

        <main className="admin-main">
          <div className="admin-page-header">
            <div>
              <h1 className="admin-page-title">Tips y Noticias</h1>
              <p className="admin-page-subtitle">Administra el contenido informativo y educativo para la comunidad de UNE Costa Rica.</p>
            </div>
          </div>

          <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">
                    {editandoId ? <Edit size={22} style={{ color: 'var(--suria-gold)' }} /> : <PenLine size={22} style={{ color: 'var(--suria-gold)' }} />} 
                    {editandoId ? 'Editar Publicación' : 'Crear Nueva Publicación'}
                </h3>
              </div>
              
              <div className="admin-form-grid" style={{ gridTemplateColumns: '1fr' }}>
                  <div className="admin-form-group">
                      <label className="admin-label">Título de la Publicación:</label>
                      <input 
                          type="text" 
                          className="admin-input"
                          placeholder="Título impactante para la noticia..." 
                          value={tituloInput}
                          onChange={(e) => setTituloInput(e.target.value)}
                      />
                  </div>
                  
                  <div className="admin-form-group">
                      <label className="admin-label">Contenido:</label>
                      <textarea 
                          placeholder="Contenido detallado de la noticia o tip para emprendedores..." 
                          rows={6} 
                          value={contenidoInput}
                          onChange={(e) => setContenidoInput(e.target.value)}
                          className="admin-textarea"
                      ></textarea>
                  </div>
                  
                  <div style={{ padding: '1.5rem', border: '2px dashed var(--admin-border)', borderRadius: '16px', background: '#f8fafc', marginBottom: '1rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800, color: 'var(--admin-text-primary)', marginBottom: '1rem', cursor: 'pointer' }}>
                          <ImageIcon size={20} /> 
                          <span>Subir Imagen de Portada</span>
                          <input 
                              id="imagen-upload"
                              type="file" 
                              accept="image/*" 
                              onChange={handleImageChange} 
                              style={{ display: 'none' }}
                          />
                      </label>
                      
                      {imagenInput && (
                          <div style={{ position: 'relative', width: '240px', height: '140px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', border: '1px solid var(--admin-border)' }}>
                              <img src={imagenInput} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              <button 
                                  onClick={() => { setImagenInput(''); const f = document.getElementById('imagen-upload') as HTMLInputElement; if(f) f.value = ''; }}
                                  style={{ position: 'absolute', top: '0', right: '0', background: 'var(--suria-crimson)', color: '#fff', border: 'none', borderBottomLeftRadius: '10px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                              >
                                  <X size={16} />
                              </button>
                          </div>
                      )}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '15px' }}>
                      <button 
                          className="btn-admin btn-admin-secondary" 
                          onClick={handlePublicar}
                          style={{ flex: 1 }}
                      >
                          {editandoId ? <Save size={18} /> : <Send size={18} />}
                          {editandoId ? 'Guardar Cambios' : 'Publicar Noticia'}
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
              <div className="admin-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 className="admin-card-title">Mural de Novedades UNE</h3>
                  <div style={{ position: 'relative', width: '300px' }}>
                    <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-secondary)' }} />
                    <input
                        type="text"
                        placeholder="Filtrar noticias..."
                        className="admin-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ paddingLeft: '40px', fontSize: '0.85rem' }}
                    />
                  </div>
              </div>

              <div className="admin-table-container">
                  {loading ? (
                    <div className="admin-loading">
                        <Activity className="animate-spin" size={32} />
                        <p>Sincronizando feed de noticias...</p>
                    </div>
                  ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>PORTADA</th>
                                <th>TÍTULO / INFO</th>
                                <th>AUTOR</th>
                                <th style={{ textAlign: 'center' }}>VISIBILIDAD</th>
                                <th style={{ textAlign: 'center' }}>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredNoticias.length === 0 ? (
                                <tr><td colSpan={5} className="admin-empty-state">No se encontraron noticias publicadas.</td></tr>
                            ) : filteredNoticias.map((noticia: Noticia) => (
                                <tr key={noticia.id} style={{ opacity: noticia.activa ? 1 : 0.6 }}>
                                    <td>
                                        {noticia.imagen ? (
                                            <img src={noticia.imagen} alt="Preview" style={{ width: '80px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                                        ) : (
                                            <div style={{ width: '80px', height: '50px', background: '#f1f5f9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: '#94a3b8', fontWeight: 800 }}>S/I</div>
                                        )}
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 800, color: 'var(--suria-plum)', fontSize: '1rem' }}>{noticia.titulo}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)' }}>
                                            {noticia.fecha ? new Date(noticia.fecha).toLocaleDateString('es-CR', { dateStyle: 'long' }) : 'Sin fecha'}
                                        </div>
                                    </td>
                                    <td style={{ color: 'var(--admin-text-secondary)', fontSize: '0.85rem', fontWeight: 600 }}>{noticia.autor}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <span className={`status-tag ${noticia.activa ? 'success' : 'pending'}`}>
                                            {noticia.activa ? 'VISIBLE' : 'OCULTO'}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                            <button 
                                                onClick={() => handleToggleActiva(noticia)} 
                                                className="btn-admin btn-admin-outline"
                                                style={{ padding: '8px' }}
                                                title={noticia.activa ? 'Ocultar' : 'Mostrar'}
                                            >
                                                {noticia.activa ? <Eye size={16} /> : <EyeOff size={16} />}
                                            </button>
                                            <button onClick={() => handleEditar(noticia)} className="btn-admin btn-admin-outline" style={{ padding: '8px' }}><Edit size={16} /></button>
                                            <button onClick={() => handleEliminar(noticia.id)} className="btn-admin btn-admin-danger" style={{ padding: '8px' }}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                  )}
              </div>
          </div>
        </main>
    </AdminLayout>
  )
}

export default GestionTipsNoticias