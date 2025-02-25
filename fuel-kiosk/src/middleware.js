import { NextResponse } from 'next/server'
import { decrypt } from './lib/session'
import { cookies } from 'next/headers'

export default async function middleware(req) {
    const path = req.nextUrl.pathname
    const searchParams = req.nextUrl.searchParams;
    let userId = undefined

    const cookie = (await cookies()).get('session')?.value
    if(cookie) {
        const session = await decrypt(cookie)
        userId = session.userId
    }

    if (!userId && path !== '/') {
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }

    if (userId && path.includes('/transactions')) {
        const loc_code = searchParams.get('loc_code');

        if(!loc_code) {
            return NextResponse.redirect(new URL(`/transactions?loc_code=${userId}`, req.nextUrl))
        }

        if(loc_code && loc_code === userId) {
            return NextResponse.next();
        }
    }

    if (userId && userId !== 'ADMIN' && !path.includes(userId)) {
        return NextResponse.redirect(new URL(`/sites/${userId}`, req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
