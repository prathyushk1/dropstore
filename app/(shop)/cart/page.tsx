'use client'

import { useState } from "react"

export const dynamic = 'force-dynamic'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react"

// Dummy cart data
const initialCart = [
  {
    id: '1',
    name: 'Wireless Earbuds Pro Max',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&q=80',
    quantity: 1,
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Smart Watch Ultra',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80',
    quantity: 2,
    category: 'Wearables'
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCart)
  const [couponCode, setCouponCode] = useState('')

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 500 ? 0 : 50
  const discount = 0
  const total = subtotal + shipping - discount

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center container py-16">
        <div className="w-32 h-32 bg-purple-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <ShoppingBag className="h-16 w-16 text-purple-300" />
        </div>
        <h1 className="text-3xl font-bold mb-2 text-foreground">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md text-center">
          Looks like you haven't added anything to your cart yet. Explore our premium collection and find something you love.
        </p>
        <Button size="lg" className="bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all" asChild>
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <div className="container px-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 flex items-center gap-3">
          Shopping Cart
          <span className="text-lg font-normal text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            {cartItems.length} items
          </span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gray-50 shrink-0 border">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">{item.category}</p>
                      <Link href={`/products/${item.id}`} className="font-bold text-lg hover:text-purple-600 transition-colors line-clamp-1">
                        {item.name}
                      </Link>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-red-500 hover:bg-red-50 -mr-2 -mt-2"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                    <div className="flex items-center border rounded-lg bg-gray-50 w-fit">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 hover:bg-white rounded-l-lg"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-10 text-center font-medium text-sm">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 hover:bg-white rounded-r-lg"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xl font-bold text-primary">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center gap-4 p-4 bg-blue-50/50 text-blue-700 rounded-xl border border-blue-100">
              <Truck className="h-5 w-5 shrink-0" />
              <p className="text-sm">
                <span className="font-semibold">Free Shipping</span> available on orders above ₹500
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-md ring-1 ring-gray-100 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-green-600">
                      {shipping === 0 ? 'Free' : `₹${shipping}`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="border-t border-dashed pt-4 flex justify-between items-baseline">
                    <span className="text-base font-bold">Total</span>
                    <span className="text-2xl font-bold text-primary">₹{total}</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-right">Including GST</p>
                </div>

                <div className="mb-6">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                    />
                    <Button variant="outline" className="border-dashed border-2">Apply</Button>
                  </div>
                </div>

                <Button className="w-full h-12 text-lg bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all group" asChild>
                  <Link href="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  Secure Checkout
                </div>
              </CardContent>
            </Card>

            <Button variant="link" className="w-full mt-4 text-muted-foreground hover:text-primary" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
