import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // ✅ ALLOW ALL ADMIN ACCESS – we'll handle auth on the client side
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};