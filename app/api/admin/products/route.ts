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

// GET all products
export async function GET(request: NextRequest) {
    try {
        const supabase = await getSupabaseClient()

        const { data: products, error } = await supabase
            .from('products')
            .select(`
        *,
        category:categories(id, name, slug)
      `)
            .order('created_at', { ascending: false })

        if (error) throw error

        return NextResponse.json({ products })
    } catch (error) {
        console.error('Error fetching products:', error)
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        )
    }
}

// POST - Create new product
export async function POST(request: NextRequest) {
    try {
        const supabase = await getSupabaseClient()
        const body = await request.json()

        const { data: product, error } = await supabase
            .from('products')
            .insert({
                name: body.name,
                slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-'),
                description: body.description,
                short_description: body.short_description,
                price: body.price,
                compare_price: body.compare_price,
                cost_price: body.cost_price,
                sku: body.sku,
                stock: body.stock || 0,
                category_id: body.category_id || null,
                images: body.images || [],
                specifications: body.specifications,
                is_featured: body.is_featured || false,
                is_active: body.is_active !== false,
            })
            .select()
            .single()

        if (error) throw error

        return NextResponse.json({ product }, { status: 201 })
    } catch (error) {
        console.error('Error creating product:', error)
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        )
    }
}

// DELETE - Delete product
export async function DELETE(request: NextRequest) {
    try {
        const supabase = await getSupabaseClient()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json(
                { error: 'Product ID is required' },
                { status: 400 }
            )
        }

        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id)

        if (error) throw error

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting product:', error)
        return NextResponse.json(
            { error: 'Failed to delete product' },
            { status: 500 }
        )
    }
}

// PUT - Update product
export async function PUT(request: NextRequest) {
    try {
        const supabase = await getSupabaseClient()
        const body = await request.json()
        const { id, ...updates } = body

        if (!id) {
            return NextResponse.json(
                { error: 'Product ID is required' },
                { status: 400 }
            )
        }

        const { data: product, error } = await supabase
            .from('products')
            .update({
                ...updates,
                updated_at: new Date().toISOString(),
            })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error

        return NextResponse.json({ product })
    } catch (error) {
        console.error('Error updating product:', error)
        return NextResponse.json(
            { error: 'Failed to update product' },
            { status: 500 }
        )
    }
}
