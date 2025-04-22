import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { sendDowntimeEmail } from '../../../../lib/email';

const STALE_THRESHOLD_MINUTES = 5;

export async function GET() {
    const thresholdDate = new Date(Date.now() - STALE_THRESHOLD_MINUTES * 60 * 1000);

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

        return NextResponse.json({ message: `Checked ${staleLocations.length} locations.` });
    } catch (error) {
        console.error('Cron heartbeat check failed:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
