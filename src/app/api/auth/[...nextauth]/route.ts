import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { signIn, signOut, useSession } from "next-auth/react";
import CredentialsProvider from "next-auth/providers/credentials"
import { RequestInternal } from "next-auth";
const handler = NextAuth({
  debug: process.env.NODE_ENV === "development",

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
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email,
                  password,
                }),
              });
        
              if (res.status === 401) {
                console.log(res.statusText);
                return null;
              }
        
              const user = await req.body.json();
              return user;
            } catch (error) {
              console.error('An error occurred during authorization:', error);
              return null;
            }
          }
        },
      })
    ],
    // callbacks: {
    //   async signIn ({user, account, profile})  {
    //     const response = await fetch("http://localhost:3001/users/register/via-provider", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         email: user.email,
    //         password:"",
    //         name:"test",
    //         provider: "google"
    //        // inne dane użytkownika
    //       }),
    //     });
    
    //     if (!response.ok) {
    //       throw new Error('Błąd podczas dodawania użytkownika do bazy danych');
    //     }

    //        // Pobierz token JWT z twojego backendu
    //     // const tokenResponse = await fetch("http://localhost:3001/auth/login-google", {
    //     //   method: "POST",
    //     //   headers: {
    //     //     "Content-Type": "application/json",
    //     //   },
    //     //   body: JSON.stringify({
    //     //     email: user.email,
    //     //     // Dodaj inne potrzebne dane, jeśli są wymagane do uwierzytelnienia
    //     //   }),
    //     // });
        
    //     // if (!tokenResponse.ok) {
    //     //   throw new Error('Błąd podczas pobierania tokena JWT');
    //     // }
    
    //     // const { token } = await tokenResponse.json();
    //     // console.log(this.session)
    //     return true;
    //   },
    // }
  });

export { handler as GET, handler as POST }