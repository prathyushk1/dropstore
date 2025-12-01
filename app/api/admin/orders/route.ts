import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

// GET all orders
export async function GET(request: NextRequest) {
    try {
        const supabase = createRouteHandlerClient({ cookies })

        // Fetch orders with user details
        // Note: We need to be careful with joins if the relationship isn't perfect
        // But assuming user_id references auth.users or public.users

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
        const supabase = createRouteHandlerClient({ cookies })
        const body = await request.json()
        const { id, status, payment_status } = body

        if (!id) {
            return NextResponse.json(
                { error: 'Order ID is required' },
                { status: 400 }
            )
        }

        const updates: any = {
            updated_at: new Date().toISOString(),
        }

        if (status) updates.status = status
        if (payment_status) updates.payment_status = payment_status

        const { data: order, error } = await supabase
            .from('orders')
            .update(updates)
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
