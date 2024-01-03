"use client";


import React, { FC, useState } from "react";
import LocationPicker from "@/app/profile/add-venue/[[...stepIndex]]/LocationPicker";


export interface PositionManagerProps { }

type TFormValues = {};
type LatLng = {
    lat: number;
    lng: number;
};

const PositionManager: FC<PositionManagerProps> = () => {
    const [location, setLocation] = useState<LatLng | null>(null);
    const pathSegments = window.location.pathname.split('/');
    const venueId = pathSegments[pathSegments.length - 1];



    const handleLocationSelect = (latlng: LatLng) => {
        setLocation(latlng);
        // Możesz tutaj również wysłać dane do serwera
    };
    const saveLocationToDatabase = async () => {
        if (!location || !venueId) return;

        try {
            const response = await fetch('/api/save-location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ venueId, ...location }),
            });

            if (!response.ok) {
                throw new Error('Problem z zapisem lokalizacji');
            }

            // Obsługa sukcesu
        } catch (error) {
            console.error('Błąd:', error);
        }
    };


    return (

        <form className="space-y-6">
            <LocationPicker onLocationSelect={handleLocationSelect} />
            <button onClick={saveLocationToDatabase}>Zapisz Lokalizację</button>
        </form>
    )
};

export default PositionManager;
