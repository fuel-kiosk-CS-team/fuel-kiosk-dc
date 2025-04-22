import { NextResponse } from "next/server";
import { prisma } from '../../../lib/prisma';

import { decrypt } from '../../../lib/session';
import { cookies } from 'next/headers';

export async function GET() {
    try {
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

        await prisma.lOC_MAIN.update({
            where: {
                LOC_loc_code: userId,
            },
            data: {
                last_heartbeat: new Date(),
            },
        });

        return NextResponse.json({}, { status: 200 });
    } catch(error) {
        console.log(error);
        return NextResponse.json({}, { status: 500 });
    }
}
