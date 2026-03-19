import { useState, useEffect } from 'react'
import '../../styles/AdminDashboard.css'
import Swal from 'sweetalert2'
import { toast } from 'sonner'
import { Banknote, Filter, CheckCircle, XCircle, Loader, UserCircle } from 'lucide-react'
import { getApplications, updateApplication } from '../../services/FinancingService'
import type { Application } from '../../types/financing'
import AdminLayout from './AdminLayout'

type TabEstado = 'new' | 'approved' | 'rejected';

function ManejoFinanciaciones() {
  const [pestanaActiva, setPestanaActiva] = useState<TabEstado>('new');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [solicitudes, setSolicitudes] = useState<Application[]>([]);

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const cargarSolicitudes = async () => {
    setIsLoading(true);
    try {
      const data = await getApplications();
      setSolicitudes(data || []);
    } catch (error) {
      console.error('Error al cargar solicitudes:', error);
      toast.error('No se pudo sincronizar con el servidor de créditos');
    } finally {
      setIsLoading(false);
    }
  };

  const cambiarEstado = (id: string, nuevoEstado: 'approved' | 'rejected') => {
      const label = nuevoEstado === 'approved' ? 'Aprobar' : 'Rechazar';
      
      Swal.fire({
          title: `¿Confirmar ${label}?`,
          text: `¿Estás seguro de marcar esta solicitud como ${nuevoEstado === 'approved' ? 'Aprobada' : 'Rechazada'}?`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: nuevoEstado === 'approved' ? '#10b981' : '#ef4444',
          cancelButtonColor: '#64748b',
          confirmButtonText: `Sí, ${label}`,
          cancelButtonText: 'Cancelar',
          background: '#fff',
          color: '#1e293b'
      }).then(async (result) => {
          if(result.isConfirmed) {
              setIsLoading(true);
              try {
                  await updateApplication(id, { status: nuevoEstado });
                  toast.success(`Solicitud ${nuevoEstado === 'approved' ? 'aprobada' : 'rechazada'} con éxito`);
                  await cargarSolicitudes(); // Recargar datos
              } catch (error) {
                  console.error('Error al actualizar:', error);
                  toast.error('Error al procesar la solicitud');
              } finally {
                  setIsLoading(false);
              }
          }
      });
  }

  const solicitudesFiltradas = solicitudes.filter((s) => {
    if (pestanaActiva === 'new') return s.status === 'new' || s.status === 'pending';
    return s.status === pestanaActiva;
  });

  return (
    <AdminLayout>
        <header className="admin-top-header">
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}><Banknote size={28} /> Centro de Financiaciones</h1>
        </header>

        <main style={{ padding: 0 }}>
            <div className="grid-card" style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#64748b', fontWeight: 700 }}>
                        <Filter size={18} /> Filtrar:
                    </div>
                    <div style={{ display: 'flex', gap: '10px', background: '#f1f5f9', padding: '6px', borderRadius: '12px' }}>
                        {[
                            { id: 'new', label: 'Pendientes' },
                            { id: 'approved', label: 'Aprobadas' },
                            { id: 'rejected', label: 'Rechazadas' }
                        ].map((tab) => (
                            <button 
                                key={tab.id}
                                onClick={() => setPestanaActiva(tab.id as TabEstado)}
                                style={{ 
                                    padding: '8px 20px', 
                                    border: 'none', 
                                    borderRadius: '8px', 
                                    fontWeight: 700, 
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    background: pestanaActiva === tab.id ? '#fff' : 'transparent',
                                    color: pestanaActiva === tab.id ? '#1e293b' : '#64748b',
                                    boxShadow: pestanaActiva === tab.id ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div style={{ padding: '60px', textAlign: 'center', color: '#64748b' }}>
                    <Loader className="animate-spin" size={32} style={{ margin: '0 auto 15px' }} />
                    <p style={{ fontWeight: 600 }}>Sincronizando expedientes...</p>
                </div>
            ) : solicitudesFiltradas.length === 0 ? (
                <div className="grid-card" style={{ textAlign: 'center', padding: '60px' }}>
                    <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>No se encontraron solicitudes con el estado seleccionado.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
                    {solicitudesFiltradas.map((sol) => (
                        <div key={sol.id} className="grid-card" style={{ position: 'relative', overflow: 'hidden' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8' }}>#SOL-{sol.id}</span>
                                <span className={`status-tag ${sol.status === 'approved' ? 'success' : sol.status === 'rejected' ? 'pending' : 'pending'}`} style={{ textTransform: 'uppercase' }}>
                                    {sol.status === 'new' ? 'PENDIENTE' : sol.status.toUpperCase()}
                                </span>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                                <div style={{ width: '48px', height: '48px', background: '#f1f5f9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                                    <UserCircle size={28} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{sol.name}</h3>
                                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>{sol.email}</p>
                                </div>
                            </div>

                            <div style={{ padding: '15px', background: '#f8fafc', borderRadius: '12px', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                                    <span style={{ color: '#64748b' }}>Programa:</span>
                                    <span style={{ fontWeight: 700 }}>{sol.programId}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                    <span style={{ color: '#64748b' }}>Fecha:</span>
                                    <span style={{ fontWeight: 700 }}>{new Date(sol.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            
                            {(sol.status === 'new' || sol.status === 'pending') && (
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                    <button 
                                        onClick={() => cambiarEstado(sol.id!, 'approved')} 
                                        style={{ padding: '10px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bcf0da', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                    >
                                        <CheckCircle size={16} /> Aprobar
                                    </button>
                                    <button 
                                        onClick={() => cambiarEstado(sol.id!, 'rejected')} 
                                        style={{ padding: '10px', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '10px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                    >
                                        <XCircle size={16} /> Rechazar
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </main>
    </AdminLayout>
  )
}

export default ManejoFinanciaciones