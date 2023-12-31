import NextAuth from "next-auth";

declare module 'next-auth' {
    interface User {
      access_token?: string;
      userId?: string;
    }
    interface Session {
        accessToken?: string;
        email:string;
        user: User;
      }
  }

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  
    interface JWT {
        email: string;
        name: string;
        access_token: string;
        userId?: string;
    }
}