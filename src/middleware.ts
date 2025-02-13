import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/checkout', '/cart/checkout']
const authRoutes = ['/login']

export const config = {
  matcher: [
    '/checkout',
    '/cart/checkout/:path*',
    '/login',
  ],
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const authStorage = request.cookies.get('auth-storage')?.value
  let token = null

  try {
    token = authStorage ? JSON.parse(decodeURIComponent(authStorage))?.state?.token : null
  } catch (error) {
    console.error('Error parsing auth storage:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect to home if authenticated user tries to access auth routes
  if (authRoutes.some(route => path.startsWith(route)) && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Redirect to login if unauthenticated user tries to access protected routes
  if (protectedRoutes.some(route => path.startsWith(route)) && !token) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('from', path)
    return NextResponse.redirect(redirectUrl)
  }

  // Add security headers for protected routes
  if (protectedRoutes.some(route => path.startsWith(route))) {
    const response = NextResponse.next()
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    return response
  }

  return NextResponse.next()
} 