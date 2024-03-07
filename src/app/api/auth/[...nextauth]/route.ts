
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions, RequestInternal } from "next-auth";


export const authOptions:NextAuthOptions= {
  //debug: process.env.NODE_ENV === "development",
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      GoogleProvider({
        clientId: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_SECRET}`,
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
        async authorize(credentials, req: any) {
          if(credentials!== undefined){
            const { email, password } = credentials;
            try {
              const res = await fetch(`${process.env.BACKEND_ADDRESS}/auth/login`, {
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
            const res = await fetch(`${process.env.BACKEND_ADDRESS}/users/register/via-provider`, {
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
                throw new Error('Błąd podczas dodawania użytkownika do bazy danych');
            }
            const userData = await res.json();

            user.userId = userData.userId; // Dodaj ID użytkownika do obiektu user
            user.access_token = userData.access_token;  // Dodaj token dostępu do obiektu user

        }
        return true
      },


    
      async jwt({ token, user, account }) {

        if (user) { // Użytkownik jest zalogowany
          token.userId = user.userId; // Dodaj ID użytkownika do tokenu
          token.accessToken = user.access_token;  // Dodaj token dostępu do tokenu
        }
    
        return token;
      },

      async session({ session, token }) { // Dodaj ID użytkownika do sesji
        session.user = session.user || {};
        session.user.userId = token.userId;
        if (token.accessToken) session.accessToken = token.accessToken as string;
        return session;
      },
    }
  };

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }