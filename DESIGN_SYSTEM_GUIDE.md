# Design System Enhancement Guide

This guide covers all the new UI components and design improvements added to your e-commerce store.

## 🎨 New Components

### 1. Toast Notifications (Sonner)

Already integrated in your layout. Use anywhere in your app:

```tsx
import { toast } from "sonner"

// Success toast
toast.success("Product added to cart!")

// Error toast
toast.error("Failed to add product")

// Info toast
toast.info("Sale ends in 2 hours")

// Promise toast (for async operations)
toast.promise(
  addToCart(productId),
  {
    loading: 'Adding to cart...',
    success: 'Added to cart!',
    error: 'Failed to add to cart',
  }
)
```

### 2. Loading Skeletons

Use for better perceived performance:

```tsx
import { ProductCardSkeleton, ProductDetailSkeleton } from "@/components/ui/product-skeleton"

// In product grid
{isLoading ? (
  <>
    <ProductCardSkeleton />
    <ProductCardSkeleton />
    <ProductCardSkeleton />
  </>
) : (
  products.map(product => <ProductCard key={product.id} {...product} />)
)}

// In product detail page
{isLoading ? <ProductDetailSkeleton /> : <ProductDetail product={product} />}
```

### 3. Empty States

For wishlist, orders, cart, etc:

```tsx
import { EmptyState } from "@/components/ui/empty-state"
import { ShoppingBag, Heart, Package } from "lucide-react"

// Empty cart
<EmptyState
  icon={ShoppingBag}
  title="Your cart is empty"
  description="Add some products to get started"
  action={{
    label: "Browse Products",
    onClick: () => router.push("/products")
  }}
/>

// Empty wishlist
<EmptyState
  icon={Heart}
  title="No items in wishlist"
  description="Save your favorite products here"
/>

// No orders
<EmptyState
  icon={Package}
  title="No orders yet"
  description="Your order history will appear here"
  action={{
    label: "Start Shopping",
    onClick: () => router.push("/")
  }}
/>
```

### 4. Image Zoom/Lightbox

For product images:

```tsx
import { ImageZoom } from "@/components/ui/image-zoom"

<ImageZoom
  src={product.image}
  alt={product.name}
  width={600}
  height={600}
  className="rounded-lg"
/>
```

### 5. Variant Selector

For product sizes, colors, etc:

```tsx
import { VariantSelector } from "@/components/ui/variant-selector"

const [selectedSize, setSelectedSize] = useState("M")
const [selectedColor, setSelectedColor] = useState("blue")

// Size selector
<VariantSelector
  label="Select Size"
  type="size"
  options={[
    { id: "S", label: "S", available: true },
    { id: "M", label: "M", available: true },
    { id: "L", label: "L", available: false },
    { id: "XL", label: "XL", available: true },
  ]}
  selected={selectedSize}
  onChange={setSelectedSize}
/>

// Color selector
<VariantSelector
  label="Select Color"
  type="color"
  options={[
    { id: "blue", label: "#3B82F6", available: true },
    { id: "red", label: "#EF4444", available: true },
    { id: "green", label: "#10B981", available: false },
  ]}
  selected={selectedColor}
  onChange={setSelectedColor}
/>
```

### 6. Product Comparison

Compare multiple products side by side:

```tsx
import { ProductComparison } from "@/components/ui/product-comparison"

const [compareProducts, setCompareProducts] = useState([
  {
    id: "1",
    name: "Product A",
    price: 99.99,
    image: "/product-a.jpg",
    rating: 4.5,
    features: {
      material: "Cotton",
      waterproof: true,
      warranty: "2 years",
      weight: "500g"
    }
  },
  // ... more products
])

<ProductComparison
  products={compareProducts}
  onRemove={(id) => setCompareProducts(prev => prev.filter(p => p.id !== id))}
  onClear={() => setCompareProducts([])}
/>
```

### 7. Error Boundary & 404 Page

Automatically handles errors and 404s:

- `app/error.tsx` - Catches runtime errors
- `app/not-found.tsx` - Custom 404 page

## 📝 Typography Improvements

### Font Weights

Now available with multiple weights:

```tsx
<h1 className="font-light">Light heading</h1>
<h1 className="font-normal">Normal heading</h1>
<h1 className="font-medium">Medium heading</h1>
<h1 className="font-semibold">Semibold heading</h1>
<h1 className="font-bold">Bold heading</h1>
<h1 className="font-extrabold">Extra bold heading</h1>
<h1 className="font-black">Black heading</h1>
```

### Text Balance

Prevents orphaned words in headings:

```tsx
<h1 className="text-balance">
  This is a long heading that will balance nicely
</h1>
```

### Improved Line Heights

Automatically applied:
- Body text: 1.6-1.7 (better readability)
- Headings: 1.1-1.4 (tighter, more impactful)

## 🎯 Usage Examples

### Product Card with Skeleton

```tsx
"use client"

import { useState, useEffect } from "react"
import { ProductCardSkeleton } from "@/components/ui/product-skeleton"
import { toast } from "sonner"

export function ProductGrid() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => toast.error("Failed to load products"))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}
```

### Product Detail with Variants

```tsx
"use client"

import { useState } from "react"
import { ImageZoom } from "@/components/ui/image-zoom"
import { VariantSelector } from "@/components/ui/variant-selector"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function ProductDetail({ product }) {
  const [selectedSize, setSelectedSize] = useState("M")
  const [selectedColor, setSelectedColor] = useState("blue")

  const handleAddToCart = async () => {
    toast.promise(
      addToCart({ ...product, size: selectedSize, color: selectedColor }),
      {
        loading: 'Adding to cart...',
        success: 'Added to cart!',
        error: 'Failed to add to cart',
      }
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <ImageZoom
        src={product.image}
        alt={product.name}
        width={600}
        height={600}
      />
      
      <div className="space-y-6">
        <h1 className="text-4xl font-bold text-balance">{product.name}</h1>
        <p className="text-2xl font-semibold">${product.price}</p>
        
        <VariantSelector
          label="Size"
          type="size"
          options={product.sizes}
          selected={selectedSize}
          onChange={setSelectedSize}
        />
        
        <VariantSelector
          label="Color"
          type="color"
          options={product.colors}
          selected={selectedColor}
          onChange={setSelectedColor}
        />
        
        <Button onClick={handleAddToCart} size="lg" className="w-full">
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
```

### Wishlist with Empty State

```tsx
import { EmptyState } from "@/components/ui/empty-state"
import { Heart } from "lucide-react"

export function Wishlist({ items }) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="Your wishlist is empty"
        description="Save your favorite products to view them here"
        action={{
          label: "Browse Products",
          onClick: () => router.push("/products")
        }}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map(item => (
        <WishlistCard key={item.id} {...item} />
      ))}
    </div>
  )
}
```

## 🎨 Design Tokens

All components use your existing design system:

- Colors: Primary, secondary, muted, accent, destructive
- Spacing: Consistent padding and margins
- Border radius: Follows `--radius` variable
- Animations: Smooth transitions and hover effects

## 📱 Responsive Design

All components are mobile-responsive by default:

- Touch-friendly tap targets
- Responsive grid layouts
- Mobile-optimized modals and dialogs
- Adaptive typography

## ♿ Accessibility

Components follow accessibility best practices:

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Screen reader friendly

## 🚀 Next Steps

1. Replace existing loading states with skeletons
2. Add toast notifications for user actions
3. Implement empty states for cart, wishlist, orders
4. Add variant selectors to product pages
5. Enable image zoom on product images
6. Consider adding product comparison feature

Enjoy your enhanced design system! 🎉
