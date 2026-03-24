import { MapPin, Navigation, Map as MapIcon } from 'lucide-react'
import InteractiveMap from '../UserComponents/InteractiveMap/InteractiveMap';

export default function SedeUbicacion() {
  const DESTINATION_COORDS = [9.9326, -84.1824];

  const handleOpenMaps = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${DESTINATION_COORDS[0]},${DESTINATION_COORDS[1]}`, '_blank');
  };

  return (
    <section id="contacto" className="info-section">
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <MapIcon size={32} style={{ marginRight: '12px', color: 'var(--primary-normal)', verticalAlign: 'middle' }} />
          Nuestra Sede Central
        </h2>
        <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          
          <div className="info-details-side">
            <div className="info-item" style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#fff', borderRadius: '16px', boxShadow: 'var(--shadow-md)', border: '1px solid #e2e8f0' }}>
              <div className="info-item-icon" style={{ backgroundColor: 'var(--primary-normal)', color: '#fff', padding: '15px', borderRadius: '12px', marginRight: '20px' }}>
                <MapPin size={32} />
              </div>
              <div className="info-item-text">
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '5px' }}>Sede UNE Santa Ana</h4>
                <p style={{ color: '#64748b' }}>Diagonal a la iglesia católica, San José, Santa Ana.</p>
                <div style={{ marginTop: '20px' }}>
                   <span style={{ fontSize: '0.85rem', color: 'var(--primary-normal)', fontWeight: 600 }}>Horario: 8:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>

            <button
                onClick={handleOpenMaps}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '1.2rem',
                    backgroundColor: '#8B1A1A',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 10px 15px -3px rgba(139, 26, 26, 0.4)',
                    transition: 'all 0.2s ease'
                }}
            >
                <Navigation size={20} />
                ¿Cómo llegar con Google Maps?
            </button>
          </div>

          <div className="info-map-container" style={{ height: '450px', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-xl)', border: '4px solid #fff' }}>
            <InteractiveMap height="100%" />
          </div>

        </div>
      </div>
    </section>
  )
}
