import { NextRequest, NextResponse } from 'next/server';
// Sources
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    if (path.startsWith('/api/') && !path.startsWith('/api/auth')) {
        return NextResponse.next();
    } else if (path.startsWith('/dashboard')) {
        return await withAuth(req as NextRequestWithAuth)
    }
}

export const config = { 
    matcher: [
        '/dashboard/:path*',
        '/api/:path*'
    ] 
}