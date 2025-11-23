export type UserRole = 'guest' | 'customer' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parent_id?: string
  created_at: string
  updated_at: string
}

export interface ProductVariant {
  id: string
  product_id: string
  name: string // e.g., "Small - Red", "Large - Blue"
  sku: string
  price: number
  compare_price?: number
  stock: number
  attributes: Record<string, string> // e.g., { size: "M", color: "Red" }
  image?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  short_description?: string
  price: number
  compare_price?: number
  cost_price?: number
  sku: string
  stock: number
  category_id: string
  category?: Category
  images: string[]
  specifications?: Record<string, string>
  seo_title?: string
  seo_description?: string
  is_featured: boolean
  is_active: boolean
  has_variants: boolean
  variants?: ProductVariant[]
  created_at: string
  updated_at: string
}

export interface InventoryLog {
  id: string
  product_id: string
  variant_id?: string
  type: 'purchase' | 'sale' | 'adjustment' | 'return'
  quantity: number
  previous_stock: number
  new_stock: number
  reason?: string
  user_id?: string
  created_at: string
}

export interface Address {
  id: string
  user_id: string
  name: string
  phone: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  postal_code: string
  country: string
  is_default: boolean
  created_at: string
  updated_at: string
}

export interface Coupon {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  min_order_value?: number
  max_discount?: number
  usage_limit?: number
  used_count: number
  expires_at?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  variant_id?: string
  product?: Product
  variant?: ProductVariant
  quantity: number
  price: number
  total: number
}

export interface Order {
  id: string
  user_id: string
  user?: User
  order_number: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  coupon_code?: string
  payment_method: string
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  shipping_address: Address
  billing_address?: Address
  notes?: string
  created_at: string
  updated_at: string
}

export interface CartItem {
  product: Product
  variant?: ProductVariant
  quantity: number
}

export interface WishlistItem {
  id: string
  user_id: string
  product_id: string
  product?: Product
  created_at: string
}

export interface Review {
  id: string
  product_id: string
  user_id: string
  user?: User
  rating: number
  title: string
  comment: string
  created_at: string
  updated_at: string
}

export interface SupplierProduct {
  id: string
  product_id: string
  supplier_name: string
  supplier_sku: string
  supplier_price: number
  supplier_url?: string
  shipping_time?: string
  created_at: string
  updated_at: string
}
