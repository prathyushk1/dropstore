import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    try {
        // Check if Supabase environment variables are configured
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            console.warn('Supabase environment variables not configured. Middleware will allow all requests.')
            return NextResponse.next()
        }

        const res = NextResponse.next()
        const supabase = createMiddlewareClient({ req, res })

        let session = null

        try {
            const { data } = await supabase.auth.getSession()
            session = data.session
        } catch (error) {
            console.error('Error getting session from Supabase:', error)
            // If we can't get session, allow the request to continue
            // The page itself can handle authentication
            return NextResponse.next()
        }

        // Protected routes
        if (req.nextUrl.pathname.startsWith('/account') || req.nextUrl.pathname.startsWith('/checkout')) {
            if (!session) {
                const redirectUrl = req.nextUrl.clone()
                redirectUrl.pathname = '/auth/login'
                redirectUrl.searchParams.set('next', req.nextUrl.pathname)
                return NextResponse.redirect(redirectUrl)
            }
        }

        // Auth routes (redirect to account if already logged in)
        if (req.nextUrl.pathname.startsWith('/auth')) {
            if (session) {
                return NextResponse.redirect(new URL('/account', req.url))
            }
        }

        return res
    } catch (error) {
        // If middleware fails for any reason, log the error and allow the request
        console.error('Middleware error:', error)
        return NextResponse.next()
    }
}

export const config = {
    matcher: ['/account/:path*', '/checkout/:path*', '/auth/:path*'],
}
