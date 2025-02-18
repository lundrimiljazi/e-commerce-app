import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/checkout', '/cart/checkout', '/cart/checkout/success', '/cart/checkout/error']
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
  const checkoutStorage = request.cookies.get('checkout-storage')?.value
  let token = null
  let checkoutState = null

  try {
    token = authStorage ? JSON.parse(decodeURIComponent(authStorage))?.state?.token : null
    checkoutState = checkoutStorage ? JSON.parse(decodeURIComponent(checkoutStorage))?.state : null
  } catch (error) {
    console.error('Error parsing storage:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (authRoutes.some(route => path.startsWith(route)) && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (protectedRoutes.some(route => path.startsWith(route)) && !token) {
    const redirectUrl = new URL('/login', request.url)
    redirectUrl.searchParams.set('from', path)
    return NextResponse.redirect(redirectUrl)
  }

  // Handle checkout success/error routes
  // if (path === '/cart/checkout/success' && (!checkoutState?.isCheckoutComplete)) {
  //   return NextResponse.redirect(new URL('/cart', request.url))
  // }

  // if (path === '/cart/checkout/error' && (!checkoutState?.isPaymentFailed)) {
  //   return NextResponse.redirect(new URL('/cart', request.url))
  // }

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