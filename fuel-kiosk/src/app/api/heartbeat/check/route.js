import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { sendDowntimeEmail } from '../../../../lib/email';

// default to 6 hours to start sending donwtime alerts or whatever is configured
const ALLOWED_DOWNTIME_HOURS = process.env.ALLOWED_DOWNTIME_HOURS ? process.env.ALLOWED_DOWNTIME_HOURS : 6;

export async function GET() {
    const thresholdDate = new Date(Date.now() - ALLOWED_DOWNTIME_HOURS * 60 * 60 * 1000);
    try {
        const staleLocations = await prisma.lOC_MAIN.findMany({
            where: {
                last_heartbeat: {
                    lt: thresholdDate,
                },
            },
        });

        for (const loc of staleLocations) {
            await sendDowntimeEmail(loc.email_addr, {
                loc_code: loc.LOC_loc_code,
                last_timestamp: new Date(loc.last_heartbeat).toLocaleString(),
            });
        }

        return NextResponse.json({ message: `The following locations are down: ${staleLocations.length} locations.` });
    } catch (error) {
        console.error('Cron heartbeat check failed:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
