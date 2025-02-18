// import { NextResponse } from "next/server";
// // for TS:
// // import type { NextRequest } from "next/server";
// import {auth} from '@/src/auth'

// const protectedRoutes = ["/dashboard", "/admin", "/sites"]

// export default async function middleware(request) {
//     const session = await auth()
//     console.log("middleware.js says session: ", session)

//     const {pathname} = request.nextUrl

//     const isProtected = protectedRoutes.some((route => pathname.startsWith(route)))

//     // Protected route and user not signed in
//     if (isProtected && !session) {
//         return NextResponse.redirect(new URL('/', request.url))
//     }

//     // User is signed in or not protected route
//     return NextResponse.next();
// }

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/dashboard", "/admin", "/sites"];

export default async function middleware(request) {
    const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    console.log("middleware.js says session: ", session);

    const { pathname } = request.nextUrl;
    const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

    if (isProtected && !session) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/admin/:path*", "/sites/:path*"], // Apply middleware to specific routes
};