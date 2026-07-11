import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  // Allow login page
  if (req.nextUrl.pathname === '/admin/login') {
    console.log('🔓 Login page allowed');
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          const value = req.cookies.get(name)?.value;
          console.log(`🍪 Cookie ${name}:`, value ? 'exists' : 'null');
          return value;
        },
        set(name, value, options) {
          console.log(`🍪 Setting cookie ${name}`);
          res.cookies.set({
            name,
            value,
            ...options,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
          });
        },
        remove(name, options) {
          console.log(`🍪 Removing cookie ${name}`);
          res.cookies.set({
            name,
            value: '',
            ...options,
            maxAge: 0,
          });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  console.log('👤 Session found:', session ? 'Yes' : 'No');

  // If accessing /admin/* without session, redirect to login
  if (!session && req.nextUrl.pathname.startsWith('/admin')) {
    console.log('🔀 Redirecting to /admin/login');
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
};