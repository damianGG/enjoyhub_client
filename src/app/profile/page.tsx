"use client"

import React from 'react';
import useAuth from '@/hooks/useAuth';
import Link from 'next/link';
import Loader from '@/components/Loader';
import LogoutButton from '@/components/LogoutButton';
import { signIn, signOut, useSession } from "next-auth/react";
import Label from '@/components/Label';
import Input from '@/shared/Input';
import Select from '@/shared/Select';
import Button from '@/shared/Button';
import Textarea from '@/shared/Textarea';
import { Tab } from '@headlessui/react';
import { redirect } from 'next/navigation';
import AddVenueCard from '@/components/addVenue';





const ProfilePage = () => {
    const renderSidebar = () => {

        return (

            <div className="space-y-6 sm:space-y-8">
                {/* HEADING */}
                <h2 className="text-3xl font-semibold">Infomracje o Tobie</h2>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                <div className="flex flex-col md:flex-row">
                    <div className="flex-grow mt-10 md:mt-0 max-w-3xl space-y-6">
                        <div>
                            {/* <input type="text" /> */}
                            <Label>Name</Label>
                            <Input className="mt-1.5" defaultValue="" />
                        </div>
                        {/* ---- */}
                        <div>
                            <Label>Gender</Label>
                            <Select className="mt-1.5">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Select>
                        </div>
                        {/* ---- */}
                        <div>
                            <Label>Username</Label>
                            <Input className="mt-1.5" defaultValue="@eden_tuan" />
                        </div>
                        {/* ---- */}
                        <div>
                            <Label>Email</Label>
                            <Input className="mt-1.5" defaultValue="example@email.com" />
                        </div>
                        {/* ---- */}
                        <div className="max-w-lg">
                            <Label>Date of birth</Label>
                            <Input className="mt-1.5" type="date" defaultValue="1990-07-22" />
                        </div>
                        {/* ---- */}
                        <div>
                            <Label>Addess</Label>
                            <Input className="mt-1.5" defaultValue="New york, USA" />
                        </div>
                        {/* ---- */}
                        <div>
                            <Label>Phone number</Label>
                            <Input className="mt-1.5" defaultValue="003 888 232" />
                        </div>
                        {/* ---- */}
                        <div>
                            <Label>About you</Label>
                            <Textarea className="mt-1.5" defaultValue="..." />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    const renderSection1 = () => {

        // const user = await getData();
        // const res = await fetch(`http://localhost:3001/users/${session?.user?.email}`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${session?.accessToken}`
        //     },
        // });

        // if (res.status === 401) {
        //     console.log(res.statusText);
        //     return null;
        // }

        // const userFromServer = await res.json();
        // console.log(userFromServer)

        return (
            <div className="listingSection__wrap">
                <div>
                    <h2 className="text-2xl font-semibold">{`Obiekty`}</h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                        {`Poniżej znajduje się lista Twoich obiektów`}
                    </span>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                {/* {userFromServer.name} */}
                <div>
                    <Tab.Group>
                        <Tab.List className="flex space-x-1 overflow-x-auto">
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel className="">
                                <AddVenueCard />

                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
        );


    };


    return (
        <div className={`nc-AuthorPage `}>
            <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
                <div className="block flex-grow mb-24 lg:mb-0">
                    <div className="lg:sticky lg:top-24">
                        {renderSidebar()}
                    </div>
                </div>
                <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
                    {renderSection1()}

                </div>
            </main>
        </div>
    );

};

export default ProfilePage;