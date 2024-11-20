// app/api/sites/route.js

import { NextResponse } from 'next/server';

// Explicitly mark this route as dynamic
export const dynamic = 'force-dynamic';

export async function GET() {
    const fuelSites = [
        { value: 'site-1', label: 'ADMIN--FUEL SITE ADMINISTRATOR' },
        { value: 'site-2', label: 'CBARC-M--COLUMBIA BASIN AG RESEARCH-MOR' },
        { value: 'site-3', label: 'CBARC-P--COLUMBIA BASIN AG RESEARCH-PEN' },
        { value: 'site-4', label: 'COAREC--CENTRAL OREGON AG RES EXT' },
        { value: 'site-5', label: 'DAIRY--CORVALLIS' },
        { value: 'site-6', label: 'EOARC-B--EASTERN OREGON AG RESEARCH' },
        { value: 'site-7', label: 'EOARC-U--EASTERN OREGON AG RESEARCH' },
        { value: 'site-8', label: 'HAREC--HERMISTON AG RESEARCH STATION' },
        { value: 'site-9', label: 'KBREC--KLAMATH BASIN EXPERIMENT STA' },
        { value: 'site-10', label: 'MES--MALHEUR EXPERIMENT STATION' },
        { value: 'site-11', label: 'NWREC--NORTH WILLAMETTE RES EXTEN CTR' },
        { value: 'site-12', label: 'SOREC--SOUTHERN OREGON RES EXT CTR' },
    ];

    return NextResponse.json(fuelSites);
}