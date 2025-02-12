import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                selectedSite: { label: "Site ID", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials.selectedSite || !credentials.password) {
                    throw new Error("Site and password are required");
                }

                // Query database to find a match
                const user = await prisma.usr_main.findUnique({
                    where: { usr_userid: credentials.selectedSite }
                });

                if (!user) {
                    throw new Error("Invalid site selection.");
                }

                // Check if password (disabled_reason) matches
                if (user.disabled_reason !== credentials.password) {
                    throw new Error("Password did not match for location selected. Please retry.");
                }

                // If authenticated, return the user's oper_oper_no
                return { id: user.oper_oper_no, name: user.oper_oper_no };
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (token.user) {
                session.user = token.user;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/"
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };