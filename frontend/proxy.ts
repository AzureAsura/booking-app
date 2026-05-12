import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const { pathname } = request.nextUrl
    const isAuthPage = pathname.startsWith('/auth')

    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL('/auth', request.url))
    }
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/auth', '/dashboard/:path*', '/become-owner', '/admin/:path*', '/rooms/:id/book']
}
