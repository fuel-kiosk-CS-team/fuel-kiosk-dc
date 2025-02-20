import { NextResponse } from 'next/server';
import { deleteSession } from '../../../../lib/session';

// Enable revalidation for static output
export const revalidate = 60; // Revalidate every 60 seconds
export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        await deleteSession();
        return NextResponse.json({ message: "Logout successful" }, { status: 200 });
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
    }
}
