import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma"; // Ensure this points to your Prisma instance
import { compare } from "bcryptjs"; // If hashing passwords

/*
Basic Setup for Authentication, unsure as to whether we will do this for sure, but it's a good baseline.


/fuel-kiosk
│── /src
│   ├── /app
│   │   ├── /api
│   │   │   ├── /auth
│   │   │   │   ├── [...nextauth]
│   │   │   │   │   ├── route.js  # NextAuth configuration
│   │   ├── /auth
│   │   │   ├── login.js  # Custom login page
│   ├── /components
│   │   ├── AuthButton.js  # Sign in/out button component
│   │   ├── OfflineAwareAuth.js  # Component to check session storage
│   ├── /lib
│   │   ├── prisma.js  # Prisma client instance
│   │   ├── storage.js  # IndexedDB session storage helper
│   │   ├── auth.js  # Auth utilities (session checking)
│   ├── /context
│   │   ├── AuthProvider.js  # SessionProvider wrapper
│   ├── /styles
│   │   ├── globals.css  # Global styles
│── /public
│   ├── sw.js  # Service Worker for caching auth sessions
│── /prisma
│   ├── schema.prisma  # Prisma database schema
│── .env.local  # Environment variables (NextAuth secret, DB connection, etc.)
│── next.config.js  # Next.js configuration
│── package.json  # Dependencies
│── README.md  # Project documentation

Authentication Setup
	1.	src/app/api/auth/[...nextauth]/route.js
	•	Configures NextAuth.js, credentials provider, JWT handling, and Prisma.
	2.	src/app/auth/login.js
	•	Custom login page.

Client-Side Authentication
	3.	src/components/AuthButton.js
	•	Handles login/logout UI.
	4.	src/components/OfflineAwareAuth.js
	•	Checks IndexedDB for session data when offline.

Session Management & Offline Support
	5.	src/lib/prisma.js
	•	Prisma client setup.
	6.	src/lib/storage.js
	•	Saves session data in IndexedDB.
	7.	src/lib/auth.js
	•	Handles fetching session data.

Context Provider
	8.	src/context/AuthProvider.js
	•	Wraps the app in SessionProvider.

Service Worker
	9.	public/sw.js
	•	Caches auth requests for offline use.

Database Setup
	10.	prisma/schema.prisma

	•	Defines user model for authentication.

Environment Variables
	11.	.env.local

	•	Stores secrets for NextAuth.js, database connection, etc.
 * 
 */


export const authOptions = {
  adapter: PrismaAdapter(prisma), 
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !(await compare(credentials.password, user.password))) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };