import { z } from 'zod'

export const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const addressSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  address_line1: z.string().min(5, 'Address is required'),
  address_line2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postal_code: z.string().min(6, 'Valid postal code required'),
  country: z.string().default('India'),
  is_default: z.boolean().default(false),
})

export const productSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  slug: z.string().min(2, 'Slug is required'),
  description: z.string().min(10, 'Description is required'),
  short_description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
  compare_price: z.number().optional(),
  cost_price: z.number().optional(),
  sku: z.string().min(1, 'SKU is required'),
  stock: z.number().int().min(0, 'Stock must be non-negative'),
  category_id: z.string().uuid('Valid category required'),
  images: z.array(z.string().url()).min(1, 'At least one image required'),
  specifications: z.record(z.string()).optional(),
  seo_title: z.string().optional(),
  seo_description: z.string().optional(),
  is_featured: z.boolean().default(false),
  is_active: z.boolean().default(true),
})

export const couponSchema = z.object({
  code: z.string().min(3, 'Coupon code is required'),
  type: z.enum(['percentage', 'fixed']),
  value: z.number().min(0, 'Value must be positive'),
  min_order_value: z.number().optional(),
  max_discount: z.number().optional(),
  usage_limit: z.number().int().optional(),
  expires_at: z.string().optional(),
  is_active: z.boolean().default(true),
})
