import React, { useState } from 'react'
import '../../Styles/ManejoFinanciaciones.css'
import Swal from 'sweetalert2'
import { toast } from 'sonner'
import { Banknote, ArrowLeft, Filter, CheckCircle, XCircle, Loader } from 'lucide-react'


type EstadoFinanciacion = 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';

interface Financiacion {
    id: number;
    solicitante: string;
    monto: number;
    estado: EstadoFinanciacion;
}

function ManejoFinanciaciones() {
  const [pestanaActiva, setPestanaActiva] = useState<EstadoFinanciacion>('PENDIENTE');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const [financiaciones, setFinanciaciones] = useState<Financiacion[]>([
      { id: 101, solicitante: 'Proyecto Alpha', monto: 50000, estado: 'PENDIENTE' },
      { id: 102, solicitante: 'Food Truck Beta', monto: 25000, estado: 'APROBADA' }
  ]);

  const cambiarEstado = (id: number, nuevoEstado: EstadoFinanciacion) => {
      Swal.fire({
          title: '¿Confirmar cambio?',
          text: `¿Estás seguro de mover esta financiación a ${nuevoEstado}?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, cambiar',
          cancelButtonText: 'Cancelar'
      }).then((result) => {
          if(result.isConfirmed) {
              setIsLoading(true);
              toast.info('Procesando solicitud...');
              setTimeout(() => {
                  setFinanciaciones((prev: Financiacion[]) => prev.map((f: Financiacion) => f.id === id ? {...f, estado: nuevoEstado} : f));
                  setIsLoading(false);
                  toast.success(`Financiación movida a ${nuevoEstado}`);
              }, 800);
          }
      });
  }

  const financiacionesMostrar = financiaciones.filter((f: Financiacion) => f.estado === pestanaActiva);

  return (
    <div className="admin-container admin-container-no-nav">
      <div className="admin-main-wrap">
        <header>
            <h1><Banknote size={24} /> Manejo de Financiaciones</h1>
            <button onClick={() => window.location.href = "/AdminDashboard"}><ArrowLeft size={16} /> Volver a Dashboard</button>
        </header>
        
        <div>
            <h3><Filter size={18} /> Filtros de Estado (Kanban)</h3>
            {['PENDIENTE', 'APROBADA', 'RECHAZADA'].map((estado) => (
                <button 
                    key={estado} 
                    onClick={() => setPestanaActiva(estado as EstadoFinanciacion)}
                >
                    {estado} {pestanaActiva === estado ? '(Seleccionado)' : ''}
                </button>
            ))}
        </div>

        <section>
            {isLoading && <p><Loader size={16} className="spin-icon" /> Procesando solicitud... por favor espera.</p>}
            {!isLoading && financiacionesMostrar.length === 0 ? <p>No hay financiaciones en categoría {pestanaActiva}.</p> : (
                <div>
                    {!isLoading && financiacionesMostrar.map((fin: Financiacion) => (
                        <article key={fin.id}>
                            <hr/>
                            <h3>{fin.solicitante}</h3>
                            <p>Monto: ${fin.monto.toLocaleString()}</p>
                            <p>Estado actual: {fin.estado}</p>
                            
                            {fin.estado === 'PENDIENTE' && (
                                <div>
                                    <button onClick={() => cambiarEstado(fin.id, 'APROBADA')}><CheckCircle size={16} /> Aprobar Financiación</button>
                                    <button onClick={() => cambiarEstado(fin.id, 'RECHAZADA')}><XCircle size={16} /> Rechazar Financiación</button>
                                </div>
                            )}
                            <hr/>
                        </article>
                    ))}
                </div>
            )}
        </section>
      </div>
    </div>
  )
}

export default ManejoFinanciaciones