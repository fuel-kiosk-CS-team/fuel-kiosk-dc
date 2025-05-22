/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Retrieve fuel transactions
 *     description: Returns a filtered list of fuel transactions based on various parameters
 *     tags:
 *       - Transactions
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: loc_code
 *         schema:
 *           type: string
 *         description: Location code to filter transactions
 *         example: "SITE001"
 *       - in: query
 *         name: pid_info
 *         schema:
 *           type: string
 *         description: PID information to filter transactions
 *         example: "PID123"
 *       - in: query
 *         name: fuel_type
 *         schema:
 *           type: string
 *         description: Type of fuel to filter transactions
 *         example: "DIESEL"
 *       - in: query
 *         name: business_purpose
 *         schema:
 *           type: string
 *         description: Business purpose to filter transactions
 *         example: "MAINTENANCE"
 *       - in: query
 *         name: eq_no
 *         schema:
 *           type: string
 *         description: Equipment number to filter transactions
 *         example: "EQ001"
 *       - in: query
 *         name: acct_code
 *         schema:
 *           type: string
 *         description: Account code to filter transactions
 *         example: "ACC123"
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start date for filtering transactions
 *         example: "2024-03-01T00:00:00Z"
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End date for filtering transactions
 *         example: "2024-03-22T23:59:59Z"
 *     responses:
 *       200:
 *         description: A list of filtered fuel transactions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   datetime_Insert:
 *                     type: string
 *                     format: date-time
 *                     description: Transaction timestamp
 *                   loc_code:
 *                     type: string
 *                     description: Location code
 *                   fuel_type:
 *                     type: string
 *                     description: Type of fuel
 *                   qty_fuel:
 *                     type: number
 *                     description: Quantity of fuel dispensed
 *                   pid_info:
 *                     type: string
 *                     description: PID information
 *                   eq_no:
 *                     type: string
 *                     description: Equipment number
 *                   business_purpose:
 *                     type: string
 *                     description: Business purpose
 *                   acct_code:
 *                     type: string
 *                     description: Account code
 *       401:
 *         description: Unauthorized - User not logged in
 *       403:
 *         description: Forbidden - User not authorized for requested location
 *       500:
 *         description: Internal server error
 */

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

