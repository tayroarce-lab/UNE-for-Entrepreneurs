import React, { useState, useEffect } from 'react'
import '../../styles/AdminDashboard.css'
import Swal from 'sweetalert2'
import { toast } from 'sonner'
import { Newspaper, PenLine, Send, Edit, Trash2, X, Image as ImageIcon, Loader } from 'lucide-react'
import { getNews, createNews, updateNews, deleteNews } from '../../services/NewsService'
import AdminLayout from './AdminLayout'

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
  
  const [tituloInput, setTituloInput] = useState('');
  const [contenidoInput, setContenidoInput] = useState('');
  const [imagenInput, setImagenInput] = useState('');
  const [editandoId, setEditandoId] = useState<string | null>(null);

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
        confirmButtonColor: '#8B1A1A',
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
          } catch (error) {
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
        confirmButtonColor: '#8B1A1A',
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
          } catch (error) {
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
      confirmButtonColor: '#dc2626',
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
        } catch (error) {
          toast.error('Error al eliminar');
        }
      }
    });
  };

  return (
    <AdminLayout>
        <header className="admin-top-header">
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}><Newspaper size={28} /> Tips y Noticias</h1>
        </header>

        <main style={{ padding: 0 }}>
            <div className="grid-card" style={{ marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {editandoId ? <Edit size={24} color="#f59e0b" /> : <PenLine size={24} color="#3b82f6" />} 
                    {editandoId ? 'Editar Publicación' : 'Crear Nueva Publicación'}
                </h3>
                
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div className="search-bar-v2" style={{ width: '100%', maxWidth: '100%' }}>
                        <Edit size={18} className="search-icon-header" />
                        <input 
                            type="text" 
                            placeholder="Título impactante para la noticia..." 
                            value={tituloInput}
                            onChange={(e) => setTituloInput(e.target.value)}
                        />
                    </div>
                    
                    <textarea 
                        placeholder="Contenido detallado de la noticia o tip para emprendedores..." 
                        rows={6} 
                        value={contenidoInput}
                        onChange={(e) => setContenidoInput(e.target.value)}
                        style={{ width: '100%', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '1rem', outline: 'none', transition: 'all 0.2s' }}
                    ></textarea>
                    
                    <div style={{ padding: '20px', border: '2px dashed #cbd5e1', borderRadius: '16px', background: '#f1f5f9' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 800, color: '#475569', marginBottom: '15px', cursor: 'pointer' }}>
                            <ImageIcon size={20} /> Seleccionar Imagen de Portada
                            <input 
                                id="imagen-upload"
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageChange} 
                                style={{ display: 'none' }}
                            />
                        </label>
                        
                        {imagenInput && (
                            <div style={{ position: 'relative', width: '200px', height: '120px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                                <img src={imagenInput} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <button 
                                    onClick={() => { setImagenInput(''); const f = document.getElementById('imagen-upload') as HTMLInputElement; if(f) f.value = ''; }}
                                    style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(239, 68, 68, 0.9)', color: '#fff', border: 'none', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        )}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button 
                            className="btn-publish-v2" 
                            onClick={handlePublicar}
                            style={{ padding: '15px 35px' }}
                        >
                            <Send size={18} />
                            {editandoId ? 'Actualizar Noticia' : 'Publicar Noticia'}
                        </button>
                        {editandoId && (
                            <button 
                                onClick={handleCancelarEdicion}
                                style={{ padding: '12px 25px', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                                <X size={18} /> Cancelar
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid-card">
                <div className="grid-card-label">
                    <h3>Mural de Novedades UNE</h3>
                </div>

                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                        <Loader className="animate-spin" size={32} style={{ marginBottom: '10px' }} />
                        <p>Sincronizando feed de noticias...</p>
                    </div>
                ) : (
                    <table className="admin-table-v2">
                        <thead>
                            <tr>
                                <th>PORTADA</th>
                                <th>TÍTULO</th>
                                <th>AUTOR</th>
                                <th>FECHA</th>
                                <th style={{ textAlign: 'center' }}>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {noticias.map((noticia: Noticia) => (
                                <tr key={noticia.id}>
                                    <td>
                                        {noticia.imagen ? (
                                            <img src={noticia.imagen} alt="Preview" style={{ width: '60px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                                        ) : (
                                            <div style={{ width: '60px', height: '40px', background: '#f1f5f9', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: '#94a3b8', fontWeight: 800 }}>S/I</div>
                                        )}
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 800, maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{noticia.titulo}</div>
                                    </td>
                                    <td style={{ color: '#64748b', fontSize: '0.85rem' }}>{noticia.autor}</td>
                                    <td style={{ color: '#64748b', fontSize: '0.85rem' }}>{noticia.fecha ? new Date(noticia.fecha).toLocaleDateString() : 'N/A'}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                                            <button onClick={() => handleEditar(noticia)} style={{ background: '#fef3c7', color: '#d97706', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer' }}><Edit size={16} /></button>
                                            <button onClick={() => handleEliminar(noticia.id)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </main>
    </AdminLayout>
  )
}

export default GestionTipsNoticias