"use client"

import React, { FC, useState } from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/navigation';
import RegistrationForm from "@/app/signup/RegistrationForm";

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
