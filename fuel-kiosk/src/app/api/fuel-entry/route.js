/**
 * @swagger
 * /api/fuel-entry:
 *   post:
 *     summary: Create a new fuel entry
 *     description: Creates a new fuel transaction entry with computed PID info and totalizer values
 *     tags:
 *       - Fuel Entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - loc_code
 *               - fuel_type
 *               - totalizerStart
 *               - gallonsPumped
 *             properties:
 *               loc_code:
 *                 type: string
 *                 description: Location code (may include PID info in format 'PID--LOC')
 *                 example: "PID123--SITE001"
 *               fuel_type:
 *                 type: string
 *                 description: Type of fuel dispensed
 *                 example: "DIESEL"
 *               totalizerStart:
 *                 type: number
 *                 description: Starting totalizer reading
 *                 example: 1000.5
 *               gallonsPumped:
 *                 type: number
 *                 description: Amount of fuel dispensed
 *                 example: 50.2
 *               eqLicense:
 *                 type: string
 *                 description: Equipment license/number
 *                 example: "EQ001"
 *               odometer:
 *                 type: number
 *                 description: Odometer reading
 *                 example: 12500
 *               expCategory:
 *                 type: string
 *                 description: Expense category (account code)
 *                 example: "MAINT"
 *               projectUnit:
 *                 type: string
 *                 description: Project unit (business purpose)
 *                 example: "PROJ123"
 *     responses:
 *       200:
 *         description: Fuel entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     datetime_Insert:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-22T15:30:00Z"
 *                     ftk_date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-03-22T15:30:00Z"
 *                     loc_code:
 *                       type: string
 *                       example: "SITE001"
 *                     fuel_type:
 *                       type: string
 *                       example: "DIESEL"
 *                     totalizer_start:
 *                       type: number
 *                       example: 1000.5
 *                     totalizer_end:
 *                       type: number
 *                       example: 1050.7
 *                     qty_fuel:
 *                       type: number
 *                       example: 50.2
 *                     pid_info:
 *                       type: string
 *                       example: "PID123"
 *                     eq_no:
 *                       type: string
 *                       example: "EQ001"
 *                     odometer:
 *                       type: number
 *                       example: 12500
 *                     acct_code:
 *                       type: string
 *                       example: "MAINT"
 *                     business_purpose:
 *                       type: string
 *                       example: "PROJ123"
 *       400:
 *         description: Invalid fuel site code or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Invalid fuel site code"
 *       500:
 *         description: Internal server error
 */

import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request) {
    try {
        const body = await request.json();

        // Validate that the provided loc_code exists in LOC_MAIN.
        const location = await prisma.lOC_MAIN.findUnique({
            where: { LOC_loc_code: body.loc_code },
        });

        if (!location) {
            console.error(`No location found for loc_code: ${body.loc_code}`);
            return NextResponse.json(
                { success: false, error: 'Invalid fuel site code' },
                { status: 400 }
            );
        }

        // Get pid_info from the loc_code
        let computedPidInfo = null;
        if (body.loc_code && body.loc_code.includes('--')) {
            computedPidInfo = body.loc_code.split('--')[0];
        }

        // Check if a user with the computed pid_info exists in USR_MAIN.
        let pidInfo = null;
        if (computedPidInfo) {
            const user = await prisma.uSR_MAIN.findUnique({
                where: { oper_oper_no: computedPidInfo },
            });
            if (user) {
                pidInfo = computedPidInfo;
            } else {
                console.warn(`No user found for oper_oper_no: ${computedPidInfo}. Setting pid_info to null.`);
            }
        }

        // Build the data object
        const data = {
            datetime_Insert: new Date(),
            ftk_date: new Date(),
            loc_code: body.loc_code,
            fuel_type: body.fuel_type,
            totalizer_start: Number(body.totalizerStart),
            eq_no: body.eqLicense || null,
            pid_info: pidInfo, // now computed from loc_code
            odometer: body.odometer ? Number(body.odometer) : null,
            qty_fuel: Number(body.gallonsPumped),
            totalizer_end: Number(body.totalizerStart) + Number(body.gallonsPumped),
            acct_code: body.expCategory || null,
            business_purpose: body.projectUnit || null,
            totalizer_update: Number(body.totalizerStart) + Number(body.gallonsPumped),
        };

        const fuelEntry = await prisma.fTK_bulkfuel.create({ data });
        return NextResponse.json({ success: true, data: fuelEntry });
    } catch (error) {
        console.error(
            'Error in fuel entry API: ' +
                (error?.message || JSON.stringify(error) || 'Unknown error')
        );
        return NextResponse.json(
            { success: false, error: error?.message || 'Unknown error' },
            { status: 500 }
        );
    }
}
