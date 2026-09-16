import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get('next-auth.session-token');

  // Allow API routes
  if (req.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Redirect root to login
  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Protect dashboard
  if (req.nextUrl.pathname.startsWith('/dashboard') && !sessionToken) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If on login page with session, redirect to dashboard
  if (req.nextUrl.pathname === '/login' && sessionToken) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};