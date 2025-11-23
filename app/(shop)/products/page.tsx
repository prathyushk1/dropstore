import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, SlidersHorizontal } from "lucide-react"

// Dummy products
const products = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 10000) + 500,
  image: `https://images.unsplash.com/photo-${1523275335684 + i}?w=400`,
  rating: (Math.random() * 2 + 3).toFixed(1),
  discount: i % 3 === 0 ? Math.floor(Math.random() * 30) + 10 : 0,
  category: ['electronics', 'fashion', 'home', 'sports'][i % 4],
}))

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string; min?: string; max?: string }
}) {
  const { category, sort } = searchParams

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}
          </h1>
          <p className="text-muted-foreground">{products.length} products found</p>
        </div>
        <Button variant="outline">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-64 shrink-0">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {['All', 'Electronics', 'Fashion', 'Home', 'Sports'].map((cat) => (
                <Link
                  key={cat}
                  href={cat === 'All' ? '/products' : `/products?category=${cat.toLowerCase()}`}
                  className="block text-sm hover:text-primary"
                >
                  {cat}
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-4">Price Range</h3>
              <div className="space-y-2">
                <input type="range" min="0" max="20000" className="w-full" />
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full h-9 rounded-md border px-3 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full h-9 rounded-md border px-3 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-4">Sort By</h3>
              <select className="w-full h-9 rounded-md border px-3 text-sm">
                <option>Best Selling</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
                <option>Rating</option>
              </select>
            </div>
          </Card>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="aspect-square relative">
                    {product.discount > 0 && (
                      <Badge className="absolute top-2 right-2 bg-red-500 z-10">
                        -{product.discount}%
                      </Badge>
                    )}
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">{product.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">₹{product.price}</span>
                      {product.discount > 0 && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{Math.round(product.price / (1 - product.discount / 100))}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
