import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const authStorage = request.cookies.get('auth-storage')?.value
  const token = authStorage ? JSON.parse(decodeURIComponent(authStorage))?.state?.token : null
  
console.log('AuthStorage: ',authStorage)
  if (path.includes('/checkout') && !token) {
    console.log('here', path, token)
    const redirectUrl = new URL('/login', request.url)
    return NextResponse.redirect(redirectUrl)
  }
  if (path.startsWith('/cart/checkout') && !token) {
    console.log('here', path, token)
    const redirectUrl = new URL('/login', request.url)
    return NextResponse.redirect(redirectUrl)
  }

  if (path.startsWith('/login') && token) {
   
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/cart/checkout', '/login'],
} 