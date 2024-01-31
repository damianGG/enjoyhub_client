import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const containerStyle = {
    width: '100%',
    height: '400px'
};



type LatLng = {
    lat: number;
    lng: number;
} | null;

type LocationPickerProps = {
    onLocationSelect: (location: any) => void;
    latitude: number,
    longitude: number
};

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect, latitude, longitude }) => {
    const initialMarker = (latitude && longitude) ? { lat: latitude, lng: longitude } : null;
    const [marker, setMarker] = useState<LatLng>(initialMarker);

    const center = marker || {
        lat: 52.23,
        lng: 21.01
    };

    useEffect(() => {
        if (latitude && longitude) {
            setMarker({ lat: latitude, lng: longitude });
        }
    }, [latitude, longitude]);

    const onMapClick = (e: any) => {
        const latLng = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        };

        setMarker(latLng);
        onLocationSelect(latLng);
    };


    return (
        <>
            {window.google === undefined ?
                <LoadScript
                    googleMapsApiKey="AIzaSyDwherVX1feEHOKQWL5naw63sji9gLU7sY"
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={5}
                        onClick={onMapClick}
                    >
                        {marker && <Marker position={marker} />}
                    </GoogleMap>
                </LoadScript>
                :
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                    onClick={onMapClick}
                >
                    {marker && <Marker position={marker} />}
                </GoogleMap>


            }

        </>
    );
};

export default LocationPicker;