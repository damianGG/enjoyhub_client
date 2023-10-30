"use client"

import React, { FC, useState } from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { registerUser, RegistrationData } from "./useRegisterMutation";
import RegistrationForm from "@/components/RegistrationForm";

export interface PageSignUpProps { }

type Inputs = {
    name: string;
    email: string;
    password: string;
};

const loginSocials = [
    {
        name: "Zaloguj za pomocą Facebook",
        href: "#",
        icon: facebookSvg,
    },
    {
        name: "Zaloguj za pomocą Twitter",
        href: "#",
        icon: twitterSvg,
    },
    {
        name: "Zaloguj za pomocą Google",
        href: "#",
        icon: googleSvg,
    },
];

const PageSignUp: FC<PageSignUpProps> = ({ }) => {

    // const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    // const router = useRouter();
    // const [error, setError] = useState(null);
    // const [registrationData, setRegistrationData] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);
    // const registerUser = async (registrationData: Inputs) => {
    //     const response = await fetch('http://localhost:3000/users', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },

    //         body: JSON.stringify(registrationData),

    //     });

    //     if (!response.ok) {
    //         throw new Error('Registration failed');
    //     }

    //     return response.json();
    // };

    // const onSubmit: SubmitHandler<Inputs> = async (data, event) => {
    //     if (event) {
    //         event.preventDefault();
    //     }
    //     setIsLoading(true);
    //     try {
    //         const response = await registerUser(data);
    //         setRegistrationData(response);
    //         console.log('Registration successful:', response);
    //         router.push('/confirmation-page');
    //     } catch (error) {

    //         console.error(error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };



    return (

        <div className={`nc-PageSignUp  `}>
            <div className="container mb-24 lg:mb-32">
                <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold   justify-center">
                    Dołącz do nas!
                </h2>
                <div className="max-w-md mx-auto space-y-6 ">
                    <div className="grid gap-3">
                        {loginSocials.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 placeholder:px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
                            >
                                <Image
                                    className="flex-shrink-0"
                                    src={item.icon}
                                    alt={item.name}
                                />
                                <h3 className="flex-grow text-center text-sm font-medium   sm:text-sm">
                                    {item.name}
                                </h3>
                            </a>
                        ))}
                    </div>
                    {/* OR */}
                    <div className="relative text-center">
                        <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 ">
                            lub
                        </span>
                        <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 "></div>
                    </div>

                    {/* FORM */}
                    {/* <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
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
                        <button type="submit" className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50  ">
                            {isLoading ? 'Rejestrowanie...' : 'Kontynuj'} 
                        </button>

                    </form> */}
                    <RegistrationForm />

                    <span className="block text-center text-neutral-700 ">
                        Masz już konto? {` `}
                        <Link href="/login" className="font-semibold underline">
                            Zaloguj się
                        </Link>
                    </span>
                </div>
            </div>
        </div>

    );
};

export default PageSignUp;
