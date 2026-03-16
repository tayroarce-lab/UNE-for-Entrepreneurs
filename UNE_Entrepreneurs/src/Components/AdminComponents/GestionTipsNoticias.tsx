import React, { useState } from 'react'
import '../../Styles/GestionTipsNoticias.css'
import Swal from 'sweetalert2'
import { toast } from 'sonner'
import { Newspaper, ArrowLeft, PenLine, Send, Edit, Trash2, List } from 'lucide-react'


interface Noticia {
    id: string;
    titulo: string;
    autor: string;
    activa: boolean;
}

function GestionTipsNoticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([
      { id: '1', titulo: 'Cómo aumentar ventas este mes', autor: 'Admin Principal', activa: true },
      { id: '2', titulo: 'Nuevo beneficio para emprendedores de UNE', autor: 'Admin Secundario', activa: false }
  ]);

  const handlePublicar = () => {
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
        toast.success('Publicado con éxito');
      }
    });
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
            <h2><PenLine size={20} /> Redactar Nuevo Tip / Noticia</h2>
            <input type="text" placeholder="Título de la publicación..." />
            <br />
            <textarea placeholder="Contenido de la publicación..." rows={5} cols={50}></textarea>
            <br />
            <button onClick={handlePublicar}><Send size={16} /> Publicar Ahora</button>
        </section>

        <section>
            <h2><List size={20} /> Publicaciones Actuales</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Estado</th>
                        <th>Acciones CRUD</th>
                    </tr>
                </thead>
                <tbody>
                    {noticias.map((noticia: Noticia) => (
                        <tr key={noticia.id}>
                            <td>{noticia.titulo}</td>
                            <td>{noticia.autor}</td>
                            <td>{noticia.activa ? 'Pública' : 'Oculta/Borrador'}</td>
                            <td>
                                <button><Edit size={14} /> Editar</button>
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