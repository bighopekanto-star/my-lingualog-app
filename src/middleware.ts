
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // ルートパス "/" へのアクセスの場合、"/en" にリダイレクト
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url))
  }
}

export const config = {
  // ルートパスでのみこのミドルウェアを実行
  matcher: '/',
}
