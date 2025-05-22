/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user
 *     description: Authenticates a user and creates a session
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - password
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User's ID
 *                 example: "USER123"
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               description: Session cookie for authentication
 *       400:
 *         description: Missing userId or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing userId or password"
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid credentials"
 *       500:
 *         description: Internal server error
 */

import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server';
import { createSession } from '../../../../lib/session';

// Enable revalidation for static output
export const revalidate = 60; // Revalidate every 60 seconds
export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        const data = await req.json();

        if (!data.userId || !data.password) {
            return NextResponse.json({ error: "Missing userId or password" }, { status: 400 });
        }

        const user = await prisma.uSR_MAIN.findUnique({
            where: { USR_userid: data.userId },
        });

        if (!user || user.disabled_reason !== data.password) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        await createSession(data.userId);
        return NextResponse.json({ message: "Login successful" }, { status: 200 });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
