import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { sendDowntimeEmail } from '../../../../lib/email';

// default to 6 hours to start sending donwtime alerts or whatever is configured
const ALLOWED_DOWNTIME_HOURS = 12;

export async function GET() {
    const thresholdDate = new Date(Date.now() - (ALLOWED_DOWNTIME_HOURS * (60 * 60 * 1000)));
    try {
        const staleLocations = await prisma.lOC_MAIN.findMany({
            where: {
                LOC_loc_code: {
                    not: "ADMIN",
                },
                last_heartbeat: {
                    lt: thresholdDate,
                },
            },
        });

        for (const loc of staleLocations) {
            if (loc.alert) {
                await sendDowntimeEmail(loc.email_addr, {
                    loc_code: loc.LOC_loc_code,
                    last_timestamp: new Date(loc.last_heartbeat).toLocaleString(),
                });
            }
        }

        let message = "No locations are down!";
        let downList = staleLocations.map(loc => loc.LOC_loc_code).join(', ');
        if (downList.length > 0) {
            message = `The following locations are down: ${staleLocations.map(loc => loc.LOC_loc_code).join(', ')}.`;
        }
        return NextResponse.json({ message, time: new Date() });
    } catch (error) {
        console.error('Cron heartbeat check failed:', error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
