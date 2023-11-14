import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { signIn, signOut, useSession } from "next-auth/react";
import CredentialsProvider from "next-auth/providers/credentials"
const handler = NextAuth({
  debug: process.env.NODE_ENV === "development",

    providers: [
      GoogleProvider({
        clientId: "148645235903-t0u6mdnnv9f02c7o9c1nmkkbnhgd7drn.apps.googleusercontent.com",
        clientSecret: "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",
      }),
     
    ],
    callbacks: {
      async signIn ({user, account, profile})  {
        const response = await fetch("http://localhost:3001/users/register/via-provider", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            password:"",
            name:"test",
            provider: "google"
           // inne dane użytkownika
          }),
        });
    
        if (!response.ok) {
          throw new Error('Błąd podczas dodawania użytkownika do bazy danych');
        }
    
        return true;
      },
    }
  });

export { handler as GET, handler as POST }