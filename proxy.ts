// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('hivespace_token')?.value
  const isAuthRoute = request.nextUrl.pathname.startsWith('/dashboard') ||
                      request.nextUrl.pathname.startsWith('/settings') ||
                      request.nextUrl.pathname.startsWith('/account')

  if (isAuthRoute && !token) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // Redirect logged-in users away from signin/signup
  if (token && (request.nextUrl.pathname === '/signin' || 
                request.nextUrl.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)']
}