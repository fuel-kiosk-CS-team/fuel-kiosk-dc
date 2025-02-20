import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server';
import { deleteSession } from '../../../../lib/session';

// Enable revalidation for static output
export const revalidate = 60; // Revalidate every 60 seconds
export const dynamic = 'force-dynamic'

export async function GET(req) {
    try {
        await deleteSession()
        return NextResponse.json({}, { status: 200 });

    } catch (error) {
        return NextResponse.json({}, { status: 500 });
    }
}
