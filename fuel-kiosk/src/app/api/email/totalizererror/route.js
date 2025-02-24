import { NextResponse } from 'next/server';

import { sendTotalizerErrorEmail } from '../../../../lib/email';

// Enable revalidation for static output
export const revalidate = 60; // Revalidate every 60 seconds
export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        const emailInfo = await req.json();
        sendTotalizerErrorEmail(emailInfo.to, emailInfo.data);
        return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });
    } catch (error) {
        console.error("Email Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
