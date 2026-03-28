import { useState, useEffect } from 'react';
import '../../styles/AdminDashboard.css';
import Swal from 'sweetalert2';
import { toast } from 'sonner';
import { Trash2, MessageSquare, FileText, Activity, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
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
      confirmButtonColor: 'var(--suria-plum)',
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
      confirmButtonColor: 'var(--suria-crimson)',
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
        <div style="text-align: left; font-size: 0.95rem; font-family: 'Outfit', sans-serif;">
          <div style="margin-bottom: 20px; display: grid; gap: 10px;">
            <p><strong style="color: var(--suria-plum)">Email:</strong> <br/> <a href="mailto:${solicitud.email}" style="color: #2563eb; text-decoration: none;">${solicitud.email}</a></p>
            <p><strong style="color: var(--suria-plum)">Teléfono:</strong> <br/> <a href="tel:${solicitud.telefono}" style="color: #2563eb; text-decoration: none;">${solicitud.telefono}</a></p>
            <p><strong style="color: var(--suria-plum)">Ubicación:</strong> <br/> ${solicitud.ubicacion}</p>
          </div>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;"/>
          <p><strong style="color: var(--suria-plum)">Negocio/Idea:</strong></p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 15px;">${solicitud.negocio}</div>
          <p><strong style="color: var(--suria-plum)">Motivo/Mensaje:</strong></p>
          <div style="background: #f8fafc; padding: 15px; border-radius: 12px; border: 1px solid #e2e8f0;">${solicitud.mensaje}</div>
        </div>
      `,
      confirmButtonText: 'Entendido',
      confirmButtonColor: 'var(--suria-plum)',
      width: '600px'
    });
  };

  const filteredSolicitudes = solicitudes.filter(s =>
    s.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.negocio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (estado: string) => {
    switch (estado) {
      case 'Contactado': return 'success';
      case 'Descartado': return 'danger';
      default: return 'pending'; // Pendiente
    }
  };

  return (
    <AdminLayout>
      <AdminHeader 
        placeholder="Buscar solicitudes por nombre, email o negocio..." 
        onSearch={(val) => setSearchTerm(val)}
      />

      <main className="admin-main">
        <div className="admin-page-header">
          <div>
            <h1 className="admin-page-title">Solicitudes de Contacto</h1>
            <p className="admin-page-subtitle">Gestiona propuestas y consultas de potenciales emprendedores.</p>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Bandeja de Entrada UNE</h3>
             <span style={{ fontSize: '0.85rem', color: 'var(--admin-text-secondary)', fontWeight: 600 }}>
                {filteredSolicitudes.length} Total
            </span>
          </div>

          {loading ? (
            <div className="admin-loading">
                <Activity className="animate-spin" size={32} />
                <p>Cargando registros de contacto...</p>
            </div>
          ) : (
            <div className="admin-table-container">
              {/* MOBILE VIEW (CARDS) */}
              <div className="mobile-only">
                {filteredSolicitudes.length === 0 ? (
                  <div className="admin-empty-state">No hay solicitudes para mostrar.</div>
                ) : (
                  <div style={{ display: 'grid', gap: '15px', padding: '10px' }}>
                    {filteredSolicitudes.map((sol) => (
                      <div key={sol.id} className="admin-card" style={{ marginBottom: 0, padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                            <div style={{ fontWeight: 800, color: 'var(--suria-plum)', fontSize: '1.1rem' }}>{sol.nombre}</div>
                            <span className={`status-tag ${getStatusClass(sol.estado)}`}>{sol.estado}</span>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                             <div style={{ display: 'flex', gap: '8px', color: 'var(--admin-text-secondary)' }}>
                                <Briefcase size={16} /> <span style={{ fontWeight: 600 }}>{sol.negocio}</span>
                             </div>
                             <div style={{ display: 'flex', gap: '8px', color: 'var(--admin-text-secondary)' }}>
                                <MapPin size={16} /> <span>{sol.ubicacion}</span>
                             </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button onClick={() => handleVerDetalles(sol)} className="btn-admin btn-admin-outline" style={{ flex: 1, padding: '10px' }}><MessageSquare size={18} /></button>
                          <button onClick={() => handleNotasAdmin(sol)} className="btn-admin btn-admin-outline" style={{ flex: 1, padding: '10px', color: sol.notasAdmin ? 'var(--suria-gold)' : 'inherit' }}><FileText size={18} /></button>
                          <button onClick={() => handleEliminar(sol.id)} className="btn-admin btn-admin-danger" style={{ flex: 1, padding: '10px' }}><Trash2 size={18} /></button>
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <label className="admin-label" style={{ fontSize: '0.7rem' }}>Cambiar Estado:</label>
                            <select 
                                value={sol.estado}
                                onChange={(e) => handleEstadoChange(sol.id, e.target.value as any)}
                                className="admin-select"
                                style={{ padding: '8px', fontSize: '0.85rem' }}
                            >
                                <option value="Pendiente">Pendiente</option>
                                <option value="Contactado">Contactado</option>
                                <option value="Descartado">Descartado</option>
                            </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* DESKTOP VIEW (TABLE) */}
              <div className="desktop-only">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>SOLICITANTE</th>
                      <th>NEGOCIO / UBICACIÓN</th>
                      <th>FECHA</th>
                      <th style={{ textAlign: 'center' }}>ESTADO</th>
                      <th style={{ textAlign: 'center' }}>ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSolicitudes.length === 0 ? (
                      <tr><td colSpan={5} className="admin-empty-state">No se encontraron solicitudes.</td></tr>
                    ) : filteredSolicitudes.map((sol) => (
                      <tr key={sol.id}>
                        <td>
                          <div style={{ fontWeight: 800, color: 'var(--suria-plum)' }}>{sol.nombre}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                             <Mail size={12} /> {sol.email}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                             <Phone size={12} /> {sol.telefono}
                          </div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, color: 'var(--admin-text-primary)' }}>{sol.negocio}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                             <MapPin size={12} /> {sol.ubicacion}
                          </div>
                        </td>
                        <td style={{ color: 'var(--admin-text-secondary)', fontSize: '0.85rem' }}>
                          {new Date(sol.fechaRegistro).toLocaleDateString()}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <select 
                            value={sol.estado}
                            onChange={(e) => handleEstadoChange(sol.id, e.target.value as any)}
                            className={`status-tag ${getStatusClass(sol.estado)}`}
                            style={{ border: 'none', cursor: 'pointer', appearance: 'none', textAlign: 'center', width: 'auto' }}
                          >
                            <option value="Pendiente">Pendiente</option>
                            <option value="Contactado">Contactado</option>
                            <option value="Descartado">Descartado</option>
                          </select>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <button onClick={() => handleVerDetalles(sol)} className="btn-admin btn-admin-outline" style={{ padding: '8px' }} title="Detalles"><MessageSquare size={16} /></button>
                            <button onClick={() => handleNotasAdmin(sol)} className="btn-admin btn-admin-outline" style={{ padding: '8px', color: sol.notasAdmin ? 'var(--suria-gold)' : 'inherit' }} title="Notas"><FileText size={16} /></button>
                            <button onClick={() => handleEliminar(sol.id)} className="btn-admin btn-admin-danger" style={{ padding: '8px' }} title="Remover"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </AdminLayout>
  );
}
