import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Get all cookies and headers for debugging
  const authStorage = request.cookies.get('auth-storage')?.value
  const token = authStorage ? JSON.parse(decodeURIComponent(authStorage))?.state?.token : null
  
  // If trying to access checkout without token, redirect to login
  if (path.startsWith('/cart/checkout') && !token) {
    // Store the original URL to redirect back after login
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('redirect', path)
    return NextResponse.redirect(redirectUrl)
  }

  // If accessing login with token, redirect to home
  if (path.startsWith('/login') && token) {
    // Check if there's a redirect parameter
    const redirectTo = request.nextUrl.searchParams.get('redirect')
    if (redirectTo) {
      return NextResponse.redirect(new URL(redirectTo, request.url))
    }
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/cart/checkout', '/login'],
} 