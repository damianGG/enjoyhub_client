"use client"

import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, signOut, useSession } from "next-auth/react";

export interface PageSignUpProps { }

type LoginUserInputs = {
    email: string;
    password: string;
};

const LoginUserForm = (): React.ReactElement | null => {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginUserInputs>();
    const [loginData, setLoginData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const router = useRouter();
    const [loginError, setLoginError] = useState<string | null>(null);

    // const LoginUserFunction = async (loginData: LoginUserInputs) => {
    //     const response = await fetch('http://localhost:3000/auth/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },

    //         body: JSON.stringify(loginData),

    //     });
    //     if (!response.ok) {
    //         throw new Error('Registration failed');
    //     }

    //     return response.json();
    // };

    // const onSubmit: SubmitHandler<LoginUserInputs> = async (data, event) => {
    //     if (event) {
    //         event.preventDefault();
    //     }

    //     try {
    //         const response = await LoginUserFunction(data);
    //         setLoginData(response);
    //         console.log('Registration successful:', response.access_token);
    //         document.cookie = `Bearer ${response.access_token}`;
    //         localStorage.setItem('token', `Bearer ${response.access_token}`)
    //         setIsLogged(true);
    //         router.push('/profile');
    //     } catch (error) {
    //         console.error(error);
    //         setLoginError('Nieprawidłowy login lub hasło, spróbuj raz jeszcze');
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    return (
        <>
            {loginError && (
                <div className="text-center text-red-500">
                    {loginError}
                </div>
            )}
            <form className="grid grid-cols-1 gap-6" >
                <label className="block">
                    <span className="flex justify-between items-center ">
                        Adres email
                    </span>
                    <input className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white   dark:focus:ring-opacity-25  rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1" {...register("email", { required: true })} placeholder="Email" />
                    {errors.email && <span>To pole jest wymagane</span>}
                </label>
                <label className="block">
                    <span className="flex justify-between items-center  ">
                        Password
                    </span>
                    <input className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white   dark:focus:ring-opacity-25  rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1" {...register("password", { required: true })} type="password" placeholder="Hasło" />
                    {errors.email && <span>To pole jest wymagane</span>}
                </label>
                <button onClick={() => signIn()} type="submit" className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50  ">
                    {isLoading ? 'Rejestrowanie...' : 'Kontynuj'}
                </button>

            </form>

        </>
    )
}

export default LoginUserForm;