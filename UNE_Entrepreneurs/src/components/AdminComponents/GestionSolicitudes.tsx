import { useState, useEffect } from 'react';
import '../../styles/AdminDashboard.css';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
import { Mailbox, Search, Trash2, MessageSquare, FileText } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getContactos, updateContacto, deleteContacto, type SolicitudContacto } from '../../services/ContactService';

export default function GestionSolicitudes() {
  const [solicitudes, setSolicitudes] = useState<SolicitudContacto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const cargarSolicitudes = async () => {
    setLoading(true);
    try {
      const data = await getContactos();
      // Ordenar más recientes primero
      setSolicitudes(data.sort((a, b) => new Date(b.fechaRegistro).getTime() - new Date(a.fechaRegistro).getTime()));
    } catch {
      toast.error('Error al cargar solicitudes');
    } finally {
      setLoading(false);
    }
  };

  const handleEstadoChange = async (id: string, nuevoEstado: SolicitudContacto['estado']) => {
    try {
      await updateContacto(id, { estado: nuevoEstado });
      setSolicitudes(prev => prev.map(s => s.id === id ? { ...s, estado: nuevoEstado } : s));
      toast.success(`Estado actualizado a ${nuevoEstado}`);
    } catch {
      toast.error('Error al actualizar estado');
    }
  };

  const handleNotasAdmin = async (solicitud: SolicitudContacto) => {
    const { value: text } = await Swal.fire({
      title: 'Notas Internas',
      input: 'textarea',
      inputLabel: `Notas sobre: ${solicitud.nombre}`,
      inputPlaceholder: 'Ingresa detalles sobre este contacto, estado, etc...',
      inputValue: solicitud.notasAdmin || '',
      showCancelButton: true,
      confirmButtonText: 'Guardar Nota',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: 'var(--uneRed)',
    });

    if (text !== undefined && text !== solicitud.notasAdmin) {
      try {
        await updateContacto(solicitud.id, { notasAdmin: text });
        setSolicitudes(prev => prev.map(s => s.id === solicitud.id ? { ...s, notasAdmin: text } : s));
        toast.success('Notas guardadas');
      } catch {
        toast.error('Error al guardar notas');
      }
    }
  };

  const handleEliminar = (id: string) => {
    Swal.fire({
      title: '¿Eliminar solicitud?',
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
          await deleteContacto(id);
          setSolicitudes(prev => prev.filter(s => s.id !== id));
          toast.success('Solicitud eliminada');
        } catch {
          toast.error('Error al eliminar');
        }
      }
    });
  };

  const handleVerDetalles = (solicitud: SolicitudContacto) => {
    Swal.fire({
      title: `Solicitud de ${solicitud.nombre}`,
      html: `
        <div style="text-align: left; font-size: 0.95rem;">
          <p><strong>Email:</strong> <a href="mailto:${solicitud.email}">${solicitud.email}</a></p>
          <p><strong>Teléfono:</strong> <a href="tel:${solicitud.telefono}">${solicitud.telefono}</a></p>
          <p><strong>Ubicación:</strong> ${solicitud.ubicacion}</p>
          <hr style="margin: 15px 0; border: none; border-top: 1px solid #e2e8f0;"/>
          <p><strong>Negocio/Idea:</strong></p>
          <p style="background: #f8fafc; padding: 10px; border-radius: 8px;">${solicitud.negocio}</p>
          <p><strong>Motivo/Mensaje:</strong></p>
          <p style="background: #f8fafc; padding: 10px; border-radius: 8px;">${solicitud.mensaje}</p>
        </div>
      `,
      confirmButtonText: 'Cerrar',
      confirmButtonColor: 'var(--uneRed)',
      width: '600px'
    });
  };

  const filteredSolicitudes = solicitudes.filter(s =>
    s.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.negocio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'Contactado': return { bg: '#dcfce7', text: '#166534' };
      case 'Descartado': return { bg: '#fee2e2', text: '#991b1b' };
      default: return { bg: '#fef9c3', text: '#854d0e' }; // Pendiente
    }
  };

  return (
    <AdminLayout>
      <header className="admin-top-header">
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}><Mailbox size={28} /> Solicitudes de Contacto</h1>
      </header>

      <main style={{ padding: 0 }}>
        <div className="grid-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="grid-card-label" style={{ margin: 0 }}>
              <h3 style={{ margin: 0 }}>Bandeja de Entrada</h3>
            </div>
            <div style={{ position: 'relative', minWidth: '260px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Buscar por nombre, correo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '0.65rem 2.2rem 0.65rem 2.5rem', borderRadius: '10px', border: '1.5px solid #e2e8f0', width: '100%', fontSize: '0.9rem', outline: 'none', background: '#f8fafc' }}
              />
            </div>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Cargando solicitudes...</div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table-v2">
                <thead>
                  <tr>
                    <th>CONTACTO</th>
                    <th>NEGOCIO</th>
                    <th>FECHA</th>
                    <th style={{ textAlign: 'center' }}>ESTADO</th>
                    <th style={{ textAlign: 'center' }}>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSolicitudes.length === 0 ? (
                    <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No hay solicitudes de contacto.</td></tr>
                  ) : filteredSolicitudes.map((sol) => {
                    const statusColors = getStatusColor(sol.estado);
                    return (
                      <tr key={sol.id}>
                        <td>
                          <div style={{ fontWeight: 800 }}>{sol.nombre}</div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}><a href={`mailto:${sol.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>{sol.email}</a></div>
                          <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{sol.telefono}</div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sol.negocio}</div>
                          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{sol.ubicacion}</div>
                        </td>
                        <td style={{ color: '#64748b', fontSize: '0.85rem' }}>
                          {new Date(sol.fechaRegistro).toLocaleDateString()}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <select 
                            value={sol.estado}
                            onChange={(e) => handleEstadoChange(sol.id, e.target.value as any)}
                            style={{ 
                              padding: '4px 10px', 
                              borderRadius: '50px', 
                              fontSize: '0.75rem', 
                              fontWeight: 700,
                              background: statusColors.bg,
                              color: statusColors.text,
                              border: 'none',
                              outline: 'none',
                              cursor: 'pointer',
                              appearance: 'none',
                              textAlign: 'center'
                            }}
                          >
                            <option value="Pendiente">Pendiente</option>
                            <option value="Contactado">Contactado</option>
                            <option value="Descartado">Descartado</option>
                          </select>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <button 
                              onClick={() => handleVerDetalles(sol)}
                              title="Ver Mensaje"
                              style={{ background: '#eff6ff', color: '#2563eb', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer' }}
                            ><MessageSquare size={16} /></button>
                            <button 
                              onClick={() => handleNotasAdmin(sol)}
                              title="Notas Internas"
                              style={{ background: sol.notasAdmin ? '#fefce8' : '#f1f5f9', color: sol.notasAdmin ? '#ca8a04' : '#64748b', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer' }}
                            ><FileText size={16} /></button>
                            <button 
                              onClick={() => handleEliminar(sol.id)}
                              title="Eliminar"
                              style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer' }}
                            ><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </AdminLayout>
  );
}
