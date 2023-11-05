"use client"

import React from 'react';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import Loader from '@/components/Loader';
import LogoutButton from '@/components/LogoutButton';

const ProfilePage = () => {
    const { data, error } = useAuth();

    if (error) {
        return (
            <div>
                Nie jesteś zalogowany, musisz się zalogować.
                <Link href="/login">Zaloguj się</Link>
            </div>
        );
    }

    if (data) {
        return (
            <div>
                {/* Treść profilu */}
                Witaj {data.email}
                <LogoutButton />
            </div>
        );
    }


    return <Loader />;
};

export default ProfilePage;