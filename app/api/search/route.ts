import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const sort = searchParams.get('sort') || 'relevance'
    const inStock = searchParams.get('inStock') === 'true'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build query
    let dbQuery = supabase
      .from('products')
      .select('*, category:categories(*)', { count: 'exact' })
      .eq('is_active', true)

    // Search by name or description
    if (query) {
      dbQuery = dbQuery.or(`name.ilike.%${query}%,description.ilike.%${query}%,short_description.ilike.%${query}%`)
    }

    // Filter by category
    if (category) {
      dbQuery = dbQuery.eq('category_id', category)
    }

    // Filter by price range
    if (minPrice) {
      dbQuery = dbQuery.gte('price', parseFloat(minPrice))
    }
    if (maxPrice) {
      dbQuery = dbQuery.lte('price', parseFloat(maxPrice))
    }

    // Filter by stock
    if (inStock) {
      dbQuery = dbQuery.gt('stock', 0)
    }

    // Sorting
    switch (sort) {
      case 'price_asc':
        dbQuery = dbQuery.order('price', { ascending: true })
        break
      case 'price_desc':
        dbQuery = dbQuery.order('price', { ascending: false })
        break
      case 'name_asc':
        dbQuery = dbQuery.order('name', { ascending: true })
        break
      case 'name_desc':
        dbQuery = dbQuery.order('name', { ascending: false })
        break
      case 'newest':
        dbQuery = dbQuery.order('created_at', { ascending: false })
        break
      case 'featured':
        dbQuery = dbQuery.eq('is_featured', true).order('created_at', { ascending: false })
        break
      default:
        // Relevance (default)
        dbQuery = dbQuery.order('is_featured', { ascending: false }).order('created_at', { ascending: false })
    }

    // Pagination
    dbQuery = dbQuery.range(offset, offset + limit - 1)

    const { data, error, count } = await dbQuery

    if (error) throw error

    return NextResponse.json({
      products: data,
      total: count,
      limit,
      offset,
      hasMore: count ? offset + limit < count : false,
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}
