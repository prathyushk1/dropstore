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

// GET all orders
export async function GET(request: NextRequest) {
    try {
        const supabase = await getSupabaseClient()

        const { data: orders, error } = await supabase
            .from('orders')
            .select(`
        *,
        user:users(id, name, email)
      `)
            .order('created_at', { ascending: false })

        if (error) throw error

        return NextResponse.json({ orders })
    } catch (error) {
        console.error('Error fetching orders:', error)
        return NextResponse.json(
            { error: 'Failed to fetch orders' },
            { status: 500 }
        )
    }
}

// PUT - Update order status
export async function PUT(request: NextRequest) {
    try {
        const supabase = await getSupabaseClient()
        const body = await request.json()
        const { id, status } = body

        if (!id || !status) {
            return NextResponse.json(
                { error: 'Order ID and status are required' },
                { status: 400 }
            )
        }

        const { data: order, error } = await supabase
            .from('orders')
            .update({
                status,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error

        return NextResponse.json({ order })
    } catch (error) {
        console.error('Error updating order:', error)
        return NextResponse.json(
            { error: 'Failed to update order' },
            { status: 500 }
        )
    }
}
