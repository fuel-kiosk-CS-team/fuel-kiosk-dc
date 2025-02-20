import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server';
import { createSession } from '../../../../lib/session';

// Enable revalidation for static output
export const revalidate = 60; // Revalidate every 60 seconds
export const dynamic = 'force-dynamic'

export async function POST(req) {
    const data = await req.json()

    const results = await prisma.uSR_MAIN.findFirst({
        where: {
            USR_userid: data.userId,
            disabled_reason: data.password,
        },
    });

    if (results) {
        await createSession(data.userId)
        return NextResponse.json({}, { status: 200 })
    }

    return NextResponse.json({}, { status: 401 });
}

