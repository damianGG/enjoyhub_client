


import React, { useState, useEffect } from 'react';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import Loader from '@/components/Loader';
import LogoutButton from '@/components/LogoutButton';
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Label from '@/components/Label';
import Input from '@/shared/Input';
import Select from '@/shared/Select';
import Button from '@/shared/Button';
import Textarea from '@/shared/Textarea';
import { Tab } from '@headlessui/react';
import { redirect } from 'next/navigation';
import AddVenueCard from '@/components/addVenue';
import { Photo } from '@/components/GallerySlider';
import PaintballCard from '../paintball/PaintballCard';
import { getServerSession } from "next-auth/next"
import { GET as authOptions } from '@/app/api/auth/[...nextauth]/route'



interface User {
    name: string;
    // Include other properties of the user object if there are any
}

interface Session {
    user: User;
    // Include other properties of the session object if there are any
}


async function fetchUserData() {
    //const res = await fetch(`http://localhost:3001/venue/${session?.user?.userId}/venues`, {
    const res = await fetch(`http://localhost:3001/venue/69174796-7182-42fb-b88f-bc7a012694c5/venues`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            //  "Authorization": `Bearer ${session?.accessToken}`
        }
    });
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json()
}


export default async function ProfilePage() {
    const userData: any = await fetchUserData();
    const session = await getServerSession(authOptions)
    return (
        <div className={`nc-AuthorPage `}>
            <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
                <div className="block flex-grow mb-24 lg:mb-0">
                    <div className="lg:sticky lg:top-24">
                        {/* {renderSidebar()} */}
                    </div>
                </div>
                <pre>{JSON.stringify((session as Session).user.name, null)}</pre>
                <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
                    {userData.map((item: {
                        city: string;
                        name: string;
                        photos: Photo[];
                        id: string;
                        latitude: number;
                        longitude: number;
                    }) => (
                        <PaintballCard key={item.id} data={item} />
                    ))}

                </div>
            </main>
        </div>
    );


};

