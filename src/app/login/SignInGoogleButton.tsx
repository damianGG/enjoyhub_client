"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image"
import googleSvg from "@/images/Google.svg";

const SigninButton = () => {
    const { data: session } = useSession();

    if (session && session.user) {
        return (
            <div className="flex gap-4 ml-auto">
                <h4 className="display-block">Jesteś zalogowany jako:</h4>
                <p>{session.user.name}</p>
                <button onClick={() => signOut()} className="text-red-600">
                    Wyloguj mnie
                </button>
            </div >
        );
    }
    return (
        <button onClick={() => signIn()}
            className="flex w-full rounded-lg bg-primary-50  px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
        >
            <Image className="flex-shrink-0" alt="google_icon" width={20} height={20} src={googleSvg} />
            <h3 className="flex-grow text-center text-sm font-medium text-neutral-700  sm:text-sm self-center">
                Zaloguj się za pomocą Google
            </h3>
        </button>

    );
};

export default SigninButton;