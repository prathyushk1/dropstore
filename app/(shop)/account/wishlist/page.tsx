import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"

const wishlistItems = [
  {
    id: '1',
    name: 'Wireless Earbuds Pro',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200',
    inStock: true,
  },
  {
    id: '2',
    name: 'Smart Watch Ultra',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200',
    inStock: true,
  },
  {
    id: '3',
    name: 'Laptop Stand',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200',
    inStock: false,
  },
]

export default function WishlistPage() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-muted-foreground">{wishlistItems.length} items saved</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/90 hover:bg-white"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <CardContent className="p-4">
              <Link href={`/products/${item.id}`}>
                <h3 className="font-semibold mb-2 hover:text-primary">{item.name}</h3>
              </Link>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold">₹{item.price}</span>
                {!item.inStock && (
                  <span className="text-sm text-red-600">Out of Stock</span>
                )}
              </div>
              <Button className="w-full" disabled={!item.inStock}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {wishlistItems.length === 0 && (
        <div className="text-center py-16">
          <Heart className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">Save items you love for later</p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
