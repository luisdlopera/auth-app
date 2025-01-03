import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import db from '@/lib/prisma';
import bcrypt from 'bcrypt';

async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const userExists = await db.user.findUnique({
            where: { email: data.email },
        });

        if (userExists) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 409 }
            ); 
        }

        const hashPassword = await bcrypt.hash(data.password, 10);

        const newUser = await db.user.create({
            data: {
                email: data.email,
                username: data.username,
                password: hashPassword,
            },
        });

        return NextResponse.json(
            { message: 'User registered successfully', user: newUser },
            { status: 201 } 
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 } 
        );
    }
}

export { POST };