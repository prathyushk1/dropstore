import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    try {
        const supabase = createRouteHandlerClient({ cookies })

        // 1. Get Total Revenue (Sum of paid orders)
        const { data: revenueData, error: revenueError } = await supabase
            .from('orders')
            .select('total')
            .eq('payment_status', 'paid')

        if (revenueError) throw revenueError

        const totalRevenue = revenueData?.reduce((sum, order) => sum + (Number(order.total) || 0), 0) || 0

        // 2. Get Total Orders Count
        const { count: ordersCount, error: ordersError } = await supabase
            .from('orders')
            .select('*', { count: 'exact', head: true })

        if (ordersError) throw ordersError

        // 3. Get Total Products Count
        const { count: productsCount, error: productsError } = await supabase
            .from('products')
            .select('*', { count: 'exact', head: true })
            .eq('is_active', true)

        if (productsError) throw productsError

        // 4. Get Total Customers Count
        // Note: This depends on how users are stored. If using public.users table:
        const { count: customersCount, error: customersError } = await supabase
            .from('users')
            .select('*', { count: 'exact', head: true })
            .eq('role', 'customer')

        if (customersError) throw customersError

        return NextResponse.json({
            revenue: totalRevenue,
            orders: ordersCount || 0,
            products: productsCount || 0,
            customers: customersCount || 0
        })

    } catch (error) {
        console.error('Error fetching stats:', error)
        return NextResponse.json(
            { error: 'Failed to fetch statistics' },
            { status: 500 }
        )
    }
}
