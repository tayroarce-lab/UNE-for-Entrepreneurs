import { useState, useEffect } from 'react';
import '../../styles/AdminDashboard.css';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
import { Trash2, MessageSquare, FileText } from 'lucide-react';
import AdminLayout from './AdminLayout';
import AdminHeader from './AdminHeader';
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
      <AdminHeader 
        placeholder="Buscar solicitudes por nombre, email o negocio..." 
        onSearch={(val) => setSearchTerm(val)}
      />

      <main style={{ padding: 0 }}>
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--suria-plum)', marginBottom: '10px' }}>Solicitudes de Contacto</h1>
          <p style={{ color: '#64748b' }}>Gestiona las propuestas y consultas de potenciales emprendedores de UNE Costa Rica.</p>
        </div>

        <div className="grid-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="grid-card-label" style={{ margin: 0 }}>
              <h3 style={{ margin: 0, color: 'var(--suria-plum)', fontWeight: 800 }}>Bandeja de Entrada</h3>
            </div>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Cargando solicitudes...</div>
          ) : (
            <>
              {/* MOBILE VIEW (CARDS) */}
              <div className="mobile-only mobile-card-list">
                {filteredSolicitudes.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>No hay solicitudes de contacto.</div>
                ) : filteredSolicitudes.map((sol) => {
                  const statusColors = getStatusColor(sol.estado);
                  return (
                    <div key={sol.id} className="mobile-record-card">
                      <div className="card-row">
                        <span className="card-label">Contacto</span>
                        <span className="card-value">{sol.nombre}</span>
                      </div>
                      <div className="card-row">
                        <span className="card-label">Negocio</span>
                        <span className="card-value">{sol.negocio}</span>
                      </div>
                      <div className="card-row">
                        <span className="card-label">Fecha</span>
                        <span className="card-value">{new Date(sol.fechaRegistro).toLocaleDateString()}</span>
                      </div>
                      <div className="card-row">
                        <span className="card-label">Estado</span>
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
                            outline: 'none'
                          }}
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="Contactado">Contactado</option>
                          <option value="Descartado">Descartado</option>
                        </select>
                      </div>
                      <div className="card-actions">
                        <button 
                          onClick={() => handleVerDetalles(sol)}
                          style={{ flex: 1, padding: '10px', background: '#eff6ff', color: '#2563eb', border: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        ><MessageSquare size={16} /></button>
                        <button 
                          onClick={() => handleNotasAdmin(sol)}
                          style={{ flex: 1, padding: '10px', background: sol.notasAdmin ? '#fefce8' : '#f1f5f9', color: sol.notasAdmin ? '#ca8a04' : '#64748b', border: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        ><FileText size={16} /></button>
                        <button 
                          onClick={() => handleEliminar(sol.id)}
                          style={{ flex: 1, padding: '10px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        ><Trash2 size={16} /></button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* DESKTOP VIEW (TABLE) */}
              <div className="desktop-only table-responsive">
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
            </>
          )}
        </div>
      </main>
    </AdminLayout>
  );
}
