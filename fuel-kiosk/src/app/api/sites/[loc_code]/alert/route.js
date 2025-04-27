import { prisma } from '../../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(req, { params }) {
    try {
        const { loc_code } = await params;
        const body = await req.json();

        if (typeof body.alert !== 'boolean') {
            return NextResponse.json({ error: "Missing or invalid 'alerts' field" }, { status: 400 });
        }

        const updated = await prisma.lOC_MAIN.update({
            where: { LOC_loc_code: loc_code },
            data: { alert: body.alert },
        });

        return NextResponse.json(updated);
    } catch (error) {
        console.error('Error updating alert toggle:', error);
        return NextResponse.json({ error: "Failed to update alert toggle" }, { status: 500 });
    }
}
