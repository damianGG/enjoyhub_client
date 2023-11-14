"use client"

import React, { FC, useState } from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/navigation';


export interface PageSignUpProps { }

type Inputs = {
    name: string;
    email: string;
    password: string;
};

const RegistrationForm = (): React.ReactElement | null => {

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const [registrationData, setRegistrationData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [emailExists, setEmailExists] = useState<string | null>(null);;

    const registerUser = async (registrationData: Inputs) => {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(registrationData),

        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        return response.json();
    };

    const checkEmailExists = async (email: any) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return;  // Zwróć nic, jeśli e-mail jest nieprawidłowy
        }
        const response = await fetch(`http://localhost:3000/users/${email}`, {
            method: 'POST',
        });

        if (response.ok) {
            setEmailExists('Taki email już istnieje, możesz się zalogować.');
        }
        else {
            setEmailExists('');
        }
    };


    const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
        if (event) {
            event.preventDefault();
        }
        setIsLoading(true);
        try {
            const response = await registerUser(data);
            setRegistrationData(response);
            console.log('Registration successful:', response);
            setIsRegistered(true);
        } catch (error) {

            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isRegistered ? (
                // Komunikat o potwierdzeniu e-maila
                <div className="text-center">
                    <h2 className="text-2xl font-semibold">Dziękujemy za rejestrację!</h2>
                    <p className="mt-2">Sprawdź swoją skrzynkę e-mail i potwierdź swój adres e-mail, aby kontynuować.</p>
                </div>
            ) : (

                <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
                    <label className="block">
                        <span className="flex justify-between items-center ">
                            Imię
                        </span>
                        <input className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white   dark:focus:ring-opacity-25  rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1" {...register("name", { required: true })} placeholder="Imie" />
                    </label>
                    <label className="block">
                        <span className="flex justify-between items-center ">
                            Adres email
                        </span>
                        <input className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:focus:ring-opacity-25 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1" {...register("email", { required: true })} onBlur={(e) => checkEmailExists(e.target.value)} placeholder="Email" />
                        {errors.email && <span>To pole jest wymagane</span>}
                        {emailExists && <span className="text-red-500">{emailExists}</span>}
                    </label>
                    <label className="block">
                        <span className="flex justify-between items-center  ">
                            Password
                        </span>
                        <input className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white   dark:focus:ring-opacity-25  rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1" {...register("password", { required: true })} type="password" placeholder="Hasło" />
                        {errors.email && <span>To pole jest wymagane</span>}
                    </label>
                    <button type="submit" className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50  ">
                        {isLoading ? 'Rejestrowanie...' : 'Kontynuj'}
                    </button>

                </form>
            )}
        </>
    )
}

export default RegistrationForm;