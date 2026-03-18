import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowLeft, Map as MapIcon, Navigation } from 'lucide-react';
import '../../styles/Maps.css';

// Fix for default marker icons in React/Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Interfaz para definir las coordenadas geográficas
export interface LocationCoordinates {
  lat: number;
  lng: number;
}

// Ubicación objetivo: Diagonal la iglesia, San José, Santa Ana, Costa Rica
const DESTINATION: [number, number] = [9.9326, -84.1824];

function Maps() {
  // Función para abrir la ruta en una nueva pestaña
  const openGoogleMapsTab = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${DESTINATION[0]},${DESTINATION[1]}`, '_blank');
  };

  return (
    <div className="admin-container admin-container-no-nav">
      <div className="admin-main-wrap">
        <header className="map-header">
            <div className="header-title">
                <MapIcon size={28} className="text-blue-600" />
                <h1>Ubicación de nuestra Sede</h1>
            </div>
            <button 
                onClick={() => window.location.href = "/AdminDashboard"}
                className="back-btn"
            >
                <ArrowLeft size={18} /> Volver a Dashboard
            </button>
        </header>

        <section className="map-content-section">
            <div className="map-description">
                <p>Encuentra la ruta más rápida hacia nuestras oficinas en Santa Ana. Dale clic a "Cómo llegar".</p>
                <div className="address-badge">
                   Diagonal la iglesia, San José, Santa Ana
                </div>
            </div>

            <div className="map-wrapper-card">
              <div className="leaflet-container-wrapper">
                <MapContainer 
                  center={DESTINATION} 
                  zoom={15} 
                  scrollWheelZoom={true}
                  className="main-leaflet-map"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={DESTINATION}>
                    <Popup>
                      <div className="map-popup-content">
                        <strong>Nuestra Sede</strong><br />
                        Santa Ana Centro
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>

              {/* Botón Flotante "Cómo llegar" */}
              <div className="how-to-get-btn-container">
                <button
                  onClick={openGoogleMapsTab}
                  className="how-to-get-btn"
                >
                  <Navigation size={20} className="mr-2" />
                  Cómo llegar
                </button>
              </div>
            </div>
        </section>
      </div>
    </div>
  );
}

export default Maps;