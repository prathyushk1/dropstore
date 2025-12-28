import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

async function getSupabaseClient() {
    const cookieStore = cookies()
    const adminSession = cookieStore.get('admin_session')?.value

    if (adminSession) {
        const adminClient = createAdminClient()
        if (adminClient) return adminClient
    }

    return createRouteHandlerClient({ cookies: () => cookieStore })
}

// GET all coupons
export async function GET(request: NextRequest) {
    try {
        const supabase = await getSupabaseClient()

        const { data: coupons, error } = await supabase
            .from('coupons')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) throw error

        return NextResponse.json({ coupons })
    } catch (error) {
        console.error('Error fetching coupons:', error)
        return NextResponse.json(
            { error: 'Failed to fetch coupons' },
            { status: 500 }
        )
    }
}

// POST - Create new coupon
export async function POST(request: NextRequest) {
    try {
        const supabase = await getSupabaseClient()
        const body = await request.json()

        const { data: coupon, error } = await supabase
            .from('coupons')
            .insert({
                code: body.code.toUpperCase(),
                type: body.type,
                value: body.value,
                min_order_value: body.min_order_value || 0,
                usage_limit: body.usage_limit,
                expires_at: body.expires_at,
                is_active: true,
            })
            .select()
            .single()

        if (error) throw error

        return NextResponse.json({ coupon }, { status: 201 })
    } catch (error) {
        console.error('Error creating coupon:', error)
        return NextResponse.json(
            { error: 'Failed to create coupon' },
            { status: 500 }
        )
    }
}

// DELETE - Delete coupon
export async function DELETE(request: NextRequest) {
    try {
        const supabase = await getSupabaseClient()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json(
                { error: 'Coupon ID is required' },
                { status: 400 }
            )
        }

        const { error } = await supabase
            .from('coupons')
            .delete()
            .eq('id', id)

        if (error) throw error

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting coupon:', error)
        return NextResponse.json(
            { error: 'Failed to delete coupon' },
            { status: 500 }
        )
    }
}
