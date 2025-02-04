import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export const dynamic = 'force-dynamic'

export async function GET() {
    const user = await prisma.user.findMany();
    return NextResponse.json(user);
}
