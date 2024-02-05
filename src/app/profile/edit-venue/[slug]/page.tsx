"use client"

import React, { useEffect, useState } from "react";
import { FC } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ImageManager from "./ImageManager";
import PositionManager from "./PositionManager";
import DescriptionManager from "./DescriptionManager";

export interface PageProps {
    children: React.ReactNode;
}

interface Image {
    id: string;
    url: string;
}


type UserData = {
    name: string;
    city: string;
    country: string;
    postalCode: string;
    street: string;
    latitude: number;
    longitude: number;
}

export default function Page({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const [activeTab, setActiveTab] = useState<number>(0);
    const venueID = params.slug;
    const [data, setData] = useState<UserData | null>(null);
    const [PHOTOS, setPhotos] = useState<Image[]>([]);


    const fetchData = async () => {
        try {
            const [res, resPhotos] = await Promise.all([
                fetch(`http://localhost:3001/venue/${venueID}`),
                fetch(`http://localhost:3001/venue/${venueID}/photos`)
            ]);

            if (!res.ok || !resPhotos.ok) {
                throw new Error('Failed to fetch data');
            }

            const dataJson = await res.json();
            const photosJson = await resPhotos.json();

            setData(dataJson);
            setPhotos(photosJson);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [venueID]);

    const onPhotosChange = () => {
        fetchData();
    };

    const updateData = async (updatedUserData: UserData) => {
        try {
            const response = await fetch(`http://localhost:3001/venue/${venueID}`, {
                method: 'POST', // lub 'POST', w zależności od API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUserData),
            });

            if (!response.ok) {
                throw new Error('Failed to update data');
            }
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    const onDataChange = (newData: UserData, resetForm: () => void) => {
        updateData(newData).then(() => {
            resetForm();
        });
    };

    const onLocationChange = async (updatedUserData: UserData) => {
        try {
            const response = await fetch(`http://localhost:3001/venue/${venueID}`, {
                method: 'POST', // lub 'POST', w zależności od API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUserData),
            });

            if (!response.ok) {
                throw new Error('Failed to update data');
            }

            // Opcjonalnie: Ponowne pobieranie danych, aby odświeżyć stan
            fetchData();
        } catch (error) {
            console.error(error);
        }

        // You can also call an API or update state as needed
    };


    // Parse the JSON for both responses
    console.log(data)
    console.log(PHOTOS)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setActiveTab(newValue);
    };


    return (
        <div className="nc-PageAddListing1 px-4 max-w-3xl mx-auto pb-24 pt-14 sm:py-24 lg:pb-32">
            <Tabs value={activeTab} onChange={handleChange} centered>
                <Tab label="Nazwa i opis" />
                <Tab label="Zdjęcia" />
                <Tab label="Lokalizacja" />
            </Tabs>
            <div className="space-y-11 mt-6">
                <div className="listingSection__wrap ">
                    {activeTab === 0 && <DescriptionManager userData={data} onSubmit={onDataChange} />}
                    {activeTab === 1 && <ImageManager photos={PHOTOS} onPhotosChange={onPhotosChange} />}
                    {activeTab === 2 && <PositionManager onLocationChange={onLocationChange} />}

                </div>
            </div>
        </div>
    );
};

