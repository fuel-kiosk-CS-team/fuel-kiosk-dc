import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.redirect("/");
    response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
    response.cookies.set("__Secure-next-auth.session-token", "", { maxAge: 0 });

    return response;
}