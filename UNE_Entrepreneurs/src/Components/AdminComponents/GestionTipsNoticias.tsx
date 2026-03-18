import React, { useState } from 'react'
import '../../styles/GestionTipsNoticias.css'
import Swal from 'sweetalert2'
import { toast } from 'sonner'
import { Newspaper, ArrowLeft, PenLine, Send, Edit, Trash2, List, X, Image as ImageIcon } from 'lucide-react'


interface Noticia {
    id: string;
    titulo: string;
    contenido?: string;
    imagen?: string;
    autor: string;
    activa: boolean;
}

function GestionTipsNoticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([
      { id: '1', titulo: 'Cómo aumentar ventas este mes', contenido: '', imagen: '', autor: 'Admin Principal', activa: true },
      { id: '2', titulo: 'Nuevo beneficio para emprendedores de UNE', contenido: '', imagen: '', autor: 'Admin Secundario', activa: false }
  ]);

  const [tituloInput, setTituloInput] = useState('');
  const [contenidoInput, setContenidoInput] = useState('');
  const [imagenInput, setImagenInput] = useState('');
  const [editandoId, setEditandoId] = useState<string | null>(null);

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

  const handlePublicar = () => {
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
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, guardar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          setNoticias(prev => prev.map(n => n.id === editandoId ? { ...n, titulo: tituloInput, contenido: contenidoInput, imagen: imagenInput } : n));
          setEditandoId(null);
          clearInputs();
          toast.success('Publicación actualizada con éxito');
        }
      });
    } else {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "Se publicará este nuevo tip/noticia",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, publicar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          const nuevaNoticia: Noticia = {
              id: Date.now().toString(),
              titulo: tituloInput,
              contenido: contenidoInput,
              imagen: imagenInput,
              autor: 'Admin Principal',
              activa: true
          };
          setNoticias(prev => [...prev, nuevaNoticia]);
          clearInputs();
          toast.success('Publicado con éxito');
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
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setNoticias(prev => prev.filter(n => n.id !== id));
        if (editandoId === id) {
            handleCancelarEdicion();
        }
        toast.success('Publicación eliminada correctamente');
      }
    });
  };

  return (
    <div className="admin-container admin-container-no-nav">
      <div className="admin-main-wrap">
        <header>
            <h1><Newspaper size={24} /> Gestión de Tips y Noticias</h1>
            <button onClick={() => window.location.href = "/AdminDashboard"}><ArrowLeft size={16} /> Volver a Dashboard</button>
        </header>
        
        <section>
            <h2><PenLine size={20} /> {editandoId ? 'Editar Tip / Noticia' : 'Redactar Nuevo Tip / Noticia'}</h2>
            <input 
              type="text" 
              placeholder="Título de la publicación..." 
              value={tituloInput}
              onChange={(e) => setTituloInput(e.target.value)}
            />
            <br />
            <textarea 
              placeholder="Contenido de la publicación..." 
              rows={5} 
              cols={50}
              value={contenidoInput}
              onChange={(e) => setContenidoInput(e.target.value)}
            ></textarea>
            <br />
            
            <div style={{ margin: '15px 0', padding: '15px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px dashed #ced4da' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontWeight: 'bold', color: '#495057' }}>
                <ImageIcon size={18} /> Subir Imagen (Opcional)
              </label>
              <input 
                  id="imagen-upload"
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  style={{ display: 'block', marginBottom: '10px' }}
              />
              {imagenInput && (
                  <div style={{ position: 'relative', display: 'inline-block', border: '1px solid #ddd', padding: '5px', borderRadius: '8px', backgroundColor: '#fff' }}>
                      <img src={imagenInput} alt="Vista previa" style={{ maxWidth: '250px', maxHeight: '150px', borderRadius: '4px', display: 'block' }} />
                      <button 
                          onClick={() => { setImagenInput(''); const f = document.getElementById('imagen-upload') as HTMLInputElement; if(f) f.value = ''; }}
                          title="Remover imagen"
                          style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '50%', width: '26px', height: '26px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}
                      >
                          <X size={16} />
                      </button>
                  </div>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={handlePublicar}>
                {editandoId ? <><Send size={16} /> Guardar Cambios</> : <><Send size={16} /> Publicar Ahora</>}
              </button>
              {editandoId && (
                  <button onClick={handleCancelarEdicion} style={{ backgroundColor: '#6c757d', color: 'white' }}>
                    <X size={16} /> Cancelar Edición
                  </button>
              )}
            </div>
        </section>

        <section style={{ overflowX: 'auto' }}>
            <h2><List size={20} /> Publicaciones Actuales</h2>
            <table border={1} style={{ width: '100%', minWidth: '600px' }}>
                <thead>
                    <tr>
                        <th style={{ width: '80px', textAlign: 'center' }}>Imagen</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Estado</th>
                        <th>Acciones CRUD</th>
                    </tr>
                </thead>
                <tbody>
                    {noticias.map((noticia: Noticia) => (
                        <tr key={noticia.id}>
                            <td style={{ textAlign: 'center', padding: '10px' }}>
                                {noticia.imagen ? (
                                    <img src={noticia.imagen} alt="Miniatura" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #eee' }} />
                                ) : (
                                    <div style={{ width: '60px', height: '60px', backgroundColor: '#f1f3f5', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', margin: '0 auto' }}>
                                        <span style={{ color: '#adb5bd', fontSize: '10px', textAlign: 'center', lineHeight: '1.2' }}>Sin imagen</span>
                                    </div>
                                )}
                            </td>
                            <td>{noticia.titulo}</td>
                            <td>{noticia.autor}</td>
                            <td>{noticia.activa ? 'Pública' : 'Oculta/Borrador'}</td>
                            <td>
                                <button onClick={() => handleEditar(noticia)}><Edit size={14} /> Editar</button>
                                <button onClick={() => handleEliminar(noticia.id)}><Trash2 size={14} /> Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
      </div>
    </div>
  )
}

export default GestionTipsNoticias