// Database helper functions for Supabase
import { supabase } from './supabase/client'
import type { Product, Category, Order, User } from '@/types'

// Products
export async function getProducts(filters?: {
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  limit?: number
}) {
  let query = supabase.from('products').select('*, category:categories(*)')

  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  if (filters?.category) {
    query = query.eq('category_id', filters.category)
  }
  if (filters?.minPrice) {
    query = query.gte('price', filters.minPrice)
  }
  if (filters?.maxPrice) {
    query = query.lte('price', filters.maxPrice)
  }
  if (filters?.search) {
    query = query.ilike('name', `%${filters.search}%`)
  }

  const { data, error } = await query
  return { data, error }
}

export async function getProductById(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .eq('id', id)
    .single()

  return { data, error }
}

// Categories
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  return { data, error }
}

// Orders
export async function createOrder(orderData: Partial<Order>) {
  const { data, error } = await supabase
    .from('orders')
    .insert(orderData)
    .select()
    .single()

  return { data, error }
}

export async function getOrdersByUserId(userId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*, items:order_items(*, product:products(*))')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return { data, error }
}

// Cart (stored in localStorage on client, but can be synced to DB)
export async function getCartItems(userId: string) {
  // Implementation depends on whether you want server-side cart
  return { data: [], error: null }
}

// Wishlist
export async function getWishlist(userId: string) {
  const { data, error } = await supabase
    .from('wishlist')
    .select('*, product:products(*)')
    .eq('user_id', userId)

  return { data, error }
}

export async function addToWishlist(userId: string, productId: string) {
  const { data, error } = await supabase
    .from('wishlist')
    .insert({ user_id: userId, product_id: productId })
    .select()
    .single()

  return { data, error }
}
