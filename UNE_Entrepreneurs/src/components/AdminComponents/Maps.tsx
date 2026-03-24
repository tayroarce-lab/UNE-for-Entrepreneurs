import { Map as MapIcon, Navigation, Home } from 'lucide-react';
import InteractiveMap from '../UserComponents/InteractiveMap/InteractiveMap';
import '../../styles/AdminDashboard.css';
import AdminLayout from './AdminLayout';

// Ubicación objetivo: Diagonal la iglesia, San José, Santa Ana, Costa Rica
const DESTINATION: [number, number] = [9.9326, -84.1824];

function Maps() {
  // Función para abrir la ruta en una nueva pestaña
  const openGoogleMapsTab = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${DESTINATION[0]},${DESTINATION[1]}`, '_blank');
  };

  return (
    <AdminLayout>
        <header className="admin-top-header">
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}><MapIcon size={28} /> Ubicación de Sede</h1>
        </header>

        <main style={{ padding: 0 }}>
            <div className="grid-card" style={{ marginBottom: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '10px' }}>Central UNE Costa Rica</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#8B1A1A', background: '#fff5f5', padding: '10px 20px', borderRadius: '12px', fontWeight: 700, fontSize: '0.9rem' }}>
                            <Home size={18} /> Diagonal la iglesia, San José, Santa Ana
                        </div>
                    </div>
                    <button 
                        onClick={openGoogleMapsTab}
                        className="btn-publish-v2"
                        style={{ padding: '15px 30px' }}
                    >
                        <Navigation size={20} /> Cómo llegar
                    </button>
                </div>
            </div>

            <div className="grid-card" style={{ padding: 0, overflow: 'hidden', height: '600px', position: 'relative' }}>
                <InteractiveMap />
                
                {/* Overlay for premium feel */}
                <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1000, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', padding: '15px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', maxWidth: '250px' }}>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', fontWeight: 800 }}>Mapa Interactivo</h4>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', lineHeight: '1.4' }}>Utilice los controles para navegar por la ubicación exacta de nuestras oficinas centrales.</p>
                </div>
            </div>
        </main>
    </AdminLayout>
  );
}

export default Maps;