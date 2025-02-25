import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server';
import { createSession } from '../../../../lib/session';

// Enable revalidation for static output
export const revalidate = 60; // Revalidate every 60 seconds
export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        const data = await req.json();

        if (!data.userId || !data.password) {
            return NextResponse.json({ error: "Missing userId or password" }, { status: 400 });
        }

        const user = await prisma.uSR_MAIN.findUnique({
            where: { USR_userid: data.userId },
        });

        if (!user || user.disabled_reason !== data.password) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        await createSession(data.userId);
        return NextResponse.json({ message: "Login successful" }, { status: 200 });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
