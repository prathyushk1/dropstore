"use client"

import Link from "next/link"
import Image from "next/image"

export const dynamic = 'force-dynamic'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Trash2, Star, ArrowRight } from "lucide-react"
import { toast } from "sonner"

// Dummy wishlist data
const wishlistItems = [
  { id: '1', name: 'Wireless Earbuds Pro', price: 2999, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', rating: 4.5, inStock: true },
  { id: '2', name: 'Smart Watch Ultra', price: 8999, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', rating: 4.8, inStock: true },
  { id: '3', name: 'Laptop Stand Aluminum', price: 1499, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', rating: 4.3, inStock: false },
]

export default function WishlistPage() {
  const handleRemove = (id: string) => {
    toast.success("Removed from wishlist")
  }

  const handleAddToCart = (id: string) => {
    toast.success("Added to cart")
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">My Wishlist</h1>
            <p className="text-muted-foreground">
              {wishlistItems.length} items saved for later
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/products">
              Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="group overflow-hidden border-0 bg-white/50 backdrop-blur-sm ring-1 ring-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="aspect-square relative overflow-hidden bg-secondary/50">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 z-10">
                    <Button
                      size="icon"
                      variant="destructive"
                      className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      onClick={() => handleRemove(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Badge variant="secondary" className="bg-white/90 text-black">Out of Stock</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">{item.rating}</span>
                  </div>
                  <h3 className="font-semibold mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                    <Link href={`/products/${item.id}`}>{item.name}</Link>
                  </h3>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-bold text-primary">₹{item.price}</span>
                    <Button
                      size="sm"
                      disabled={!item.inStock}
                      onClick={() => handleAddToCart(item.id)}
                      className="rounded-full"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">
              Explore our products and save your favorites here.
            </p>
            <Button size="lg" asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
