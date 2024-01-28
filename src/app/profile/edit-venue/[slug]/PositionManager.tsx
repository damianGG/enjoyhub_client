import React, { FC, useState } from "react";
import LocationPicker from "@/app/profile/add-venue/[[...stepIndex]]/LocationPicker";

export interface PositionManagerProps {
    onLocationChange: (location: UserData) => void;
}

type UserData = {
    name: string;
    city: string;
    country: string;
    postalCode: string;
    street: string;
    latitude: number;
    longitude: number;
};

const PositionManager: FC<PositionManagerProps> = ({ onLocationChange }) => {
    const [location, setLocation] = useState<UserData | null>(null);
    console.log(location);
    const handleLocationSelect = (userData: UserData) => {
        setLocation(userData);
        onLocationChange(userData); // Corrected the function name here
    };

    return (
        <form className="space-y-6">
            <LocationPicker onLocationSelect={handleLocationSelect} />
        </form>
    );
};

export default PositionManager;