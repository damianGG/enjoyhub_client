"use client"

import React from 'react';
import { useRouter } from 'next/navigation';

const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = () => {
        // Usuń token z localStorage lub innego miejsca, w którym jest przechowywany
        localStorage.removeItem('token');
        // Przekieruj użytkownika do strony logowania
        router.push('/login');
    };

    return (
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Wyloguj się
        </button>
    );
};

export default LogoutButton;