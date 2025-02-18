// /src/lib/actions/index.js

'use server';

// import { signIn, signOut } from "@/src/auth";
import { signIn, signOut } from "next-auth/react";

export async function loginHandle({ siteName, password }){
    console.log({ siteName, password })
    try {
        const response = await signIn(
        "credentials", 
        { 
            // redirectTo: "/dashboard",
            redirect: true,
            callbackUrl: '/dashboard',
            siteName, 
            password 
         });
         console.log("actions/index.js log, response! : " , response)
         return response;
    } catch (err) {
        console.error("Login error: ", err)
        throw err;
    }
    
};

export async function logoutHandle() {
    await signOut(
        {
            redirect: true, 
            callbackUrl: '/'
        }
    );
};

// import { auth, signIn, signOut } from "next-auth";
// import { saveSession, getSession as getStoredSession, clearSession } from "@/src/lib/indexedDB";

// export const getSession = async () => {
//   if (!navigator.onLine) {
//     return await getStoredSession();
//   }
//   const session = await auth();
//   if (session) {
//     await saveSession(session);
//   }
//   return session;
// };

// export const loginHandle = async (loginData) => {
//   const result = await signIn("credentials", {
//     ...loginData,
//     redirectTo: "/dashboard",
//   });

//   if (result?.ok) {
//     const session = await getSession();
//     await saveSession(session);
//   }

//   return result;
// };

// export const logoutHandle = async () => {
//   await signOut({ redirectTo: "/" });
//   await clearSession();
// };