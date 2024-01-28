
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { signIn, signOut, useSession } from "next-auth/react";
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions, RequestInternal } from "next-auth";
import { JWT } from "next-auth/jwt";
import { env } from "process";






export const authOptions:NextAuthOptions= {
  //debug: process.env.NODE_ENV === "development",
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      GoogleProvider({
        clientId: "148645235903-t0u6mdnnv9f02c7o9c1nmkkbnhgd7drn.apps.googleusercontent.com",
        clientSecret: "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",
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: {
            label: "Email",
            type: "text",
            placeholder: "john@test.coom",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req: any) { // Użyj 'any' tutaj
          if(credentials!== undefined){
            const { email, password } = credentials;
            try {
              const res = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                body: JSON.stringify({
                  email,
                  password,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
        
              if (res.status === 401) {

                console.log(res.statusText);
                return null;
              }
        
              const userFromServer = await res.json();
              console.log("start userFromServer");
              console.log(userFromServer);
              console.log(" end userFromServer");
              return userFromServer;
            } catch (error) {
              console.error('An error occurred during authorization:', error);
              return null;
            }
          }
        },
      })
    ],
    callbacks: {
      async signIn({ user, account, profile }) {
        if (account?.provider === 'google') {
            // Wyślij żądanie do swojego API, aby dodać/aktualizować użytkownika
            const res = await fetch("http://localhost:3001/users/register/via-provider", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: user.email,
                    name: user.name,
                    provider: account?.provider
                    // Możesz dodać więcej danych, jeśli są potrzebne
                }),
            });
            if (!res.ok) {
                // Obsłuż błąd, np. rzuć wyjątek
                throw new Error('Błąd podczas dodawania użytkownika do bazy danych');
            }
            // Przetwarzaj odpowiedź, na przykład zapisz ID użytkownika
            const userData = await res.json();
            console.log(" start user");
            console.log(user);
            console.log(" end user");
            console.log(" start userData");
            console.log(userData);
            console.log(" end userData");
            user.userId = userData.id; // Załóżmy, że API zwraca ID użytkownika
            user.userId = userData.userId;
            user.access_token = userData.access_token;

        }
        return true
        // Dla tradycyjnego logowania (email i hasło)
        // Możesz również dodać logikę tutaj, jeśli jest potrzebna

        //return true; // Zwróć true, aby zakończyć proces logowania
      },


    
      async jwt({ token, user, account }) {

        if (user) {
          token.userId = user.userId;
          token.accessToken = user.access_token; // Zakładając, że access_token jest częścią obiektu user
        }
    
        return token;
      },

      async session({ session, token }) {
        session.user = session.user || {};
        session.user.userId = token.userId;
        if (token.accessToken) session.accessToken = token.accessToken as string;
        return session;
      },
    }
  };

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }