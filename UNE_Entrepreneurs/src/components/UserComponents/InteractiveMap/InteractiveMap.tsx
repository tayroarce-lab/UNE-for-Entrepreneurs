import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './InteractiveMap.module.css';

// Fix for default marker icons in React/Vite/Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapSedeProps {
  center?: [number, number];
  zoom?: number;
  label?: string;
  height?: string;
}

const DESTINATION_DEFAULT: [number, number] = [9.9326, -84.1824];

const InteractiveMap: React.FC<MapSedeProps> = ({ 
  center = DESTINATION_DEFAULT, 
  zoom = 15,
  label = "Sede UNE - Santa Ana Centro",
  height
}) => {
  return (
    <div className={styles.mapContainer} style={height ? { height } : undefined}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={false}
        className={styles.mapWrapper}
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
};

export default InteractiveMap;
