import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: -34.397,
    lng: 150.644
};

type LatLng = {
    lat: number;
    lng: number;
} | null;

type LocationPickerProps = {
    onLocationSelect: (location: any) => void;
};

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect }) => {
    const [marker, setMarker] = useState<LatLng>(null);

    const onMapClick = (e: any) => {
        const latLng = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        };

        setMarker(latLng);
        onLocationSelect(latLng);
    };

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyDwherVX1feEHOKQWL5naw63sji9gLU7sY"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onClick={onMapClick}
            >
                {marker && <Marker position={marker} />}
            </GoogleMap>
        </LoadScript>
    );
};

export default LocationPicker;