// src/auth.js

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {z} from 'zod'

const prisma = new PrismaClient();

const handler = NextAuth({
    session: 
    { strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                siteName: { label: "Fuel Site", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // ensure valid credentials
                const parsedCredentials = z
                    .object({siteName: z.string(), password: z.string()})
                    .safeParse(credentials);
                // if (!credentials.siteName || !credentials.password) {
                //     throw new Error("Site and password are required");
                // }

                
                try {
                    const user = await prisma.uSR_MAIN.findFirst({
                        where: {
                            USR_userid: credentials.siteName,
                            disabled_reason: credentials.password, // Using disabled_reason as password field
                        }
                    })
                    if (!user) {
                        throw new Error("Invalid site selection.");
                    }
    
                    if (user.disabled_reason !== credentials.password) {
                        throw new Error("Password did not match for location selected. Please retry.");
                    }
                    console.log("user found successfully")
                    return { id: user.oper_oper_no, name: user.oper_oper_no };
                } catch (error) {
                    throw new Error(error);
                }

                
            },
        }),
    ],
    // Directs to our login site, instead of base next-auth one.
    pages: {
        signIn: '/',
    },
    callbacks: {
        // authorized({auth, request: {nextUrl}}){
        //     const isLoggedIn = !!auth?.user;
        //     const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
        //     if (isOnDashboard){
        //         if (isLoggedIn) return true;
        //         return false;
        //     } else if (isLoggedIn) {
        //         return Response.redirect(new URL('/dashboard', nextUrl));
        //     }
        //     return true;
        // }
        async session({session, token}){
            console.log(session)
            if (token) {
                session.user = token.user
            }
            return session;
        },
        async jwt({token, user}) {
            if (user){ 
                token.user = user;
            }
            return token;
        },
        async redirect({ url, baseUrl }) {
            console.log("Redirecting from:", url, "to:", baseUrl);
            // return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard`;
            return url
        }
    },
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    
});

export {handler as auth }
export {handler as GET, handler as POST}
export default handler;