'use client'


import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

interface MapProps {
    latitude: number;
    longitude: number;
}

const customIcon = new L.Icon({
    iconUrl: '/paintball-gun.png', // Ścieżka do Twojego pliku SVG
    iconSize: [38, 38], // Rozmiar ikony (szerokość, wysokość)
    iconAnchor: [38, 38], // Punkt, w którym ikona jest zakotwiczona względem współrzędnych markera
    popupAnchor: [-3, -76] // Punkt, w którym dymek jest zakotwiczony względem ikony
});

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={6}
            style={{ width: '100%', height: '400px' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitude, longitude]} icon={customIcon}>
                <Popup>
                    Lokalizacja obiektu
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default Map;