
"use client"
import React, { useState, useEffect } from 'react';

import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { Photo } from '@/components/GallerySlider/GallerySlider';
import UserProfileForm from './UserProfileForm';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import VenueCard from './VenueCard';

type VenueData = {
    city: string;
    name: string;
    photos: Photo[];
    id: string;
    latitude: number;
    longitude: number;
};

type UserData = {
    name: string;
    email: string;
};


function ProfilePage() {

    const [venueData, setVenueData] = useState<VenueData[] | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [error, setError] = useState(null);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleFormSubmit = (data: UserData) => {


        getSession().then(session => {
            if (!session) {
                signIn();
            }
            else {
                fetch(`http://localhost:3001/users/${session?.user?.userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${session.accessToken}`
                    },
                    body: JSON.stringify(data),
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Nie udało się zaktualizować danych użytkownika');
                        }
                        return response.json();
                    })
                    .then(updatedUserData => {
                        setSnackbarMessage('Dane użytkownika zostały zaktualizowane!');
                        setSnackbarOpen(true);
                        // Możesz tutaj zaktualizować stan lub wykonać inne działania po pomyślnym zaktualizowaniu
                    })
                    .catch(error => {
                        setSnackbarMessage('Wystąpił błąd podczas aktualizacji danych użytkownika.');
                        setSnackbarOpen(true);
                        console.error('Błąd:', error);
                        // Obsługa błędów
                    });
            }
        })
    };

    useEffect(() => {
        // Pobieranie danych sesji
        getSession().then(session => {
            if (!session) {
                signIn();
            }
            else {
                fetch(`http://localhost:3001/venue/${session?.user?.userId}/venues`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${session.accessToken}` // Użyj tokena z sesji
                    }
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Failed to fetch data');
                        }
                        return res.json();
                    })
                    .then(data => {
                        setVenueData(data);
                    })
                    .catch(err => {
                        setError(err.message);
                        console.error('Błąd przy pobieraniu danych:', err);
                    });

                // Zapytanie do endpointa users
                fetch(`http://localhost:3001/users/${session?.user?.userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${session.accessToken}`
                    }
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Failed to fetch user data');
                        }
                        return res.json();
                    })
                    .then(userData => {
                        setUserData(userData);
                    })
                    .catch(err => {
                        // Możesz ustawić błąd lub zaktualizować stan błędu
                        console.error('Błąd przy pobieraniu danych użytkownika:', err);
                    });
            }
        });
    }, []);

    return (
        <div className={`nc-AuthorPage `}>
            <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
                <div className="block flex-grow mb-24 lg:mb-0">
                    <div className="lg:sticky lg:top-24">
                        {userData && <UserProfileForm userData={userData} onSubmit={handleFormSubmit} />}
                    </div>
                </div>
                <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-x-5 2xl:gap-x-6 gap-y-8 min-h-screen w-full xl:w-[50%] 2xl:w-[50%] max-w-[1184px] flex-shrink-0 xl:pr-8'>
                        {venueData && venueData.map((item: {
                            city: string;
                            name: string;
                            photos: Photo[];
                            id: string;
                            latitude: number;
                            longitude: number;
                        }) => (
                            <VenueCard key={item.id} data={item} />
                        ))}
                    </div>
                </div>
            </main>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert onClose={() => setSnackbarOpen(false)} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );


};


export default ProfilePage;