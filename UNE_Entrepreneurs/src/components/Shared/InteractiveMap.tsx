import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React/Vite/Leaflet
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

interface MapSedeProps {
  height?: string;
  width?: string;
  center?: [number, number];
  zoom?: number;
  label?: string;
}

const DESTINATION_DEFAULT: [number, number] = [9.9326, -84.1824];

export default function InteractiveMap({ 
  height = "100%", 
  width = "100%", 
  center = DESTINATION_DEFAULT, 
  zoom = 15,
  label = "Sede UNE - Santa Ana Centro"
}: MapSedeProps) {
  return (
    <div style={{ height, width, borderRadius: '12px', overflow: 'hidden' }}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={false} // Mantener false para evitar scroll accidental en la Home, pero es interactivo al activarlo
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>
            <strong>{label}</strong>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
