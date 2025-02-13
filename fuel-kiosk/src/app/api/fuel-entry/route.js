import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(request) {
    try {
        const body = await request.json();
        console.log("Received payload:", body);

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