import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';

import { decrypt } from '../../../lib/session';
import { cookies } from 'next/headers';

// Enable revalidation for static output
export const revalidate = 60; // Revalidate every 60 seconds
export const dynamic = 'force-dynamic';

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session')?.value;

        let userId = undefined;
        if(sessionCookie) {
            const session = await decrypt(sessionCookie);
            userId = session?.userId;
        }

        if(!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const loc_code = searchParams.get('loc_code');
        if(userId !== 'ADMIN' && loc_code && loc_code !== userId) {
            return NextResponse.json({ error: "Forbidden: loc_code mismatch" }, { status: 403 });
        }

        // Extract filters from query parameters
        const filters = {
            loc_code,
            pid_info: searchParams.get("pid_info") || undefined,
            fuel_type: searchParams.get("fuel_type") || undefined,
            business_purpose: searchParams.get("business_purpose") || undefined,
            eq_no: searchParams.get("eq_no") || undefined,
            acct_code: searchParams.get("acct_code") || undefined,
            start: searchParams.get("start") || undefined,
            end: searchParams.get("end") || undefined,
        };

        // Query the database with filters
        const records = await prisma.fTK_bulkfuel.findMany({
            where: {
                ...(filters.loc_code && { loc_code: filters.loc_code }),
                ...(filters.pid_info && { pid_info: filters.pid_info }),
                ...(filters.fuel_type && { fuel_type: filters.fuel_type }),
                ...(filters.business_purpose && { business_purpose: filters.business_purpose }),
                ...(filters.eq_no && { eq_no: filters.eq_no }),
                ...(filters.acct_code && { acct_code: filters.acct_code }),
                ...(filters.start && filters.end && { datetime_Insert: { gte: new Date(filters.start), lte: new Date(filters.end) } }),
            }
        });

        return NextResponse.json(records, { status: 200 });
    } catch (error) {
        console.error("Error getting records:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

