"use client"

import React, { FC, useState } from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Image from "next/image";
import Link from "next/link";
import LoginUserForm from "./LoginUserForm";
import GoogleLoginButton from "./GoogleLoginButton";
import SignInGoogleButton from "./SignInGoogleButton";
import { signIn, signOut, useSession } from "next-auth/react";
export interface PageLoginProps { }

type Inputs = {
    email: string;
    password: string;
};

const loginSocials = [
    {
        name: "Zaloguj się za pomocą Google",
        href: "#",
        icon: googleSvg,
    },
    {
        name: "Zaloguj się za pomocą Facebooka",
        href: "#",
        icon: facebookSvg,
    },
];

const PageSignUp: FC<PageLoginProps> = ({ }) => {


    return (

        <div className={`nc-PageSignUp  `}>
            <div className="container mb-24 lg:mb-32">
                <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold   justify-center">
                    zaloguj się
                </h2>
                <div className="max-w-md mx-auto space-y-6">
                    <div className="grid gap-3">
                        <SignInGoogleButton />
                    </div>
                    {/* OR */}
                    <div className="relative text-center">
                        <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 ">
                            lub
                        </span>
                        <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 "></div>
                    </div>
                    <LoginUserForm />
                    <span className="block text-center text-neutral-700 ">
                        Nie masz konta {` `}
                        <Link href="/signup" className="font-semibold underline">
                            Zarejestruj się
                        </Link>
                    </span>
                </div>
            </div>
        </div>

    );
};

export default PageSignUp;
