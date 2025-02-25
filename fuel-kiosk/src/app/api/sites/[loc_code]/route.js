import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    try {
        const { loc_code } = await params;
        const { searchParams } = new URL(req.url);
        const fuel_type = searchParams.get("fuel_type");
        const totalizer = searchParams.get("totalizer");

        const fuelSite = await prisma.lOC_MAIN.findUnique({
            where: { LOC_loc_code: loc_code },
            include: {
                FuelTransactions: {
                    where: fuel_type ? { fuel_type } : {},
                    orderBy: totalizer ? { datetime_Insert: "desc" } : undefined,
                    take: totalizer ? 1 : undefined,
                },
            },
        });

        if (!fuelSite) {
            return NextResponse.json({ error: "Site not found" }, { status: 404 });
        }

        return NextResponse.json(fuelSite);
    } catch (error) {
        console.error("Error fetching fuel site:", error);
        return NextResponse.json({ error: "Failed to fetch fuel site" }, { status: 500 });
    }
}

