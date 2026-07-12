// middleware.ts
import { NextResponse, type NextRequest } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase' // 👈 Note the import change

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Create the Supabase client using the middleware-specific function
  const supabase = createMiddlewareClient(request, response)
  
  // Refresh session FIRST (this is critical for production)
  const { data: { session } } = await supabase.auth.getSession()

  const isAuthPage = request.nextUrl.pathname.startsWith('/login')
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard')

  // If NO session and trying to access /dashboard -> redirect to login
  if (!session && isProtectedRoute) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If HAS session and trying to access /login -> redirect to /dashboard
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

// Optional: Exclude static assets for performance
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}