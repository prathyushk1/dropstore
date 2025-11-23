import { supabase } from './supabase/client'
import { sendLowStockAlert } from './email'
import type { InventoryLog } from '@/types'

const LOW_STOCK_THRESHOLD = 10

export async function updateStock(
  productId: string,
  quantity: number,
  type: 'purchase' | 'sale' | 'adjustment' | 'return',
  variantId?: string,
  reason?: string,
  userId?: string
) {
  try {
    // Get current stock
    const table = variantId ? 'product_variants' : 'products'
    const { data: item, error: fetchError } = await supabase
      .from(table)
      .select('stock')
      .eq('id', variantId || productId)
      .single()

    if (fetchError) throw fetchError

    const previousStock = item.stock
    const newStock = previousStock + quantity

    // Prevent negative stock
    if (newStock < 0) {
      throw new Error('Insufficient stock')
    }

    // Update stock
    const { error: updateError } = await supabase
      .from(table)
      .update({ stock: newStock })
      .eq('id', variantId || productId)

    if (updateError) throw updateError

    // Log inventory change
    await logInventoryChange({
      product_id: productId,
      variant_id: variantId,
      type,
      quantity,
      previous_stock: previousStock,
      new_stock: newStock,
      reason,
      user_id: userId,
    })

    // Check for low stock
    if (newStock <= LOW_STOCK_THRESHOLD && newStock > 0) {
      await checkLowStock(productId, variantId)
    }

    return { success: true, previousStock, newStock }
  } catch (error) {
    console.error('Stock update error:', error)
    return { success: false, error }
  }
}

async function logInventoryChange(log: Omit<InventoryLog, 'id' | 'created_at'>) {
  try {
    const { error } = await supabase
      .from('inventory_logs')
      .insert(log)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Inventory log error:', error)
    return { success: false, error }
  }
}

async function checkLowStock(productId: string, variantId?: string) {
  try {
    // Get product details
    const { data: product } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()

    if (product && product.stock <= LOW_STOCK_THRESHOLD) {
      // Send low stock alert email
      await sendLowStockAlert(product)
    }
  } catch (error) {
    console.error('Low stock check error:', error)
  }
}

export async function getInventoryLogs(productId: string, variantId?: string) {
  try {
    let query = supabase
      .from('inventory_logs')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false })

    if (variantId) {
      query = query.eq('variant_id', variantId)
    }

    const { data, error } = await query

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Get inventory logs error:', error)
    return { success: false, error }
  }
}

export async function getLowStockProducts(threshold: number = LOW_STOCK_THRESHOLD) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .lte('stock', threshold)
      .gt('stock', 0)
      .eq('is_active', true)

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Get low stock products error:', error)
    return { success: false, error }
  }
}

export async function getOutOfStockProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('stock', 0)
      .eq('is_active', true)

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Get out of stock products error:', error)
    return { success: false, error }
  }
}
