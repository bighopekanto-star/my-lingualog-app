
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // The root path "/" is accessed, redirect to "/en"
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}
