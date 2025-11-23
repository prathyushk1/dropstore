import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Star, SlidersHorizontal, Search, X, Check, ChevronDown } from "lucide-react"

// Dummy products with more details
const products = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Premium Product ${i + 1}`,
  description: "High-quality item with premium finish and durable materials.",
  price: Math.floor(Math.random() * 10000) + 500,
  image: `https://images.unsplash.com/photo-${1523275335684 + i}?w=600&q=80`,
  rating: (Math.random() * 2 + 3).toFixed(1),
  reviews: Math.floor(Math.random() * 500) + 10,
  discount: i % 3 === 0 ? Math.floor(Math.random() * 30) + 10 : 0,
  category: ['electronics', 'fashion', 'home', 'sports'][i % 4],
  new: i < 4,
}))

const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Sports']
const sortOptions = ['Most Popular', 'Newest Arrivals', 'Price: Low to High', 'Price: High to Low', 'Top Rated']

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string; min?: string; max?: string }
}) {
  const { category, sort } = searchParams

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 py-12 sm:py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>

        <div className="container relative z-10 px-4">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All Products'}
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Explore our curated collection of premium items designed to elevate your lifestyle.
          </p>
        </div>
      </div>

      <div className="container py-8 sm:py-12 px-4">
        {/* Mobile Filter & Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8 sticky top-16 z-30 bg-background/80 backdrop-blur-md p-4 rounded-2xl border shadow-sm lg:static lg:bg-transparent lg:p-0 lg:border-0 lg:shadow-none lg:z-auto">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden w-full sm:w-auto border-2 hover:border-purple-500 hover:text-purple-600">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                <div className="py-6">
                  <h3 className="font-bold text-xl mb-6">Filters</h3>
                  {/* Mobile Sidebar Content */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Categories</h4>
                      <div className="space-y-2">
                        {categories.map((cat) => (
                          <Link
                            key={cat}
                            href={cat === 'All' ? '/products' : `/products?category=${cat.toLowerCase()}`}
                            className={`flex items-center justify-between p-2 rounded-lg transition-colors ${(category === cat.toLowerCase() || (!category && cat === 'All'))
                                ? 'bg-purple-100 text-purple-700 font-medium'
                                : 'hover:bg-gray-100'
                              }`}
                          >
                            {cat}
                            {(category === cat.toLowerCase() || (!category && cat === 'All')) && <Check className="h-4 w-4" />}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Price Range</h4>
                      <div className="flex gap-4">
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground">Min</span>
                          <Input type="number" placeholder="0" className="h-9" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground">Max</span>
                          <Input type="number" placeholder="10000" className="h-9" />
                        </div>
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">Apply Price</Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <p className="text-muted-foreground text-sm hidden sm:block">
              Showing <span className="font-medium text-foreground">{products.length}</span> results
            </p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-9 rounded-full border-2 focus:border-purple-500 transition-colors"
              />
            </div>
            <div className="relative hidden sm:block">
              <select className="h-10 rounded-full border-2 bg-transparent px-4 pr-8 text-sm focus:border-purple-500 focus:outline-none appearance-none cursor-pointer hover:bg-gray-50 transition-colors">
                {sortOptions.map(opt => <option key={opt}>{opt}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-8">
            <div className="glass-panel p-6 rounded-2xl border border-white/20 sticky top-24">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-purple-600" />
                Filters
              </h3>

              <div className="space-y-8">
                <div>
                  <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat}
                        href={cat === 'All' ? '/products' : `/products?category=${cat.toLowerCase()}`}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-200 ${(category === cat.toLowerCase() || (!category && cat === 'All'))
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                            : 'hover:bg-purple-50 hover:text-purple-700 text-gray-600'
                          }`}
                      >
                        {cat}
                        {(category === cat.toLowerCase() || (!category && cat === 'All')) && <Check className="h-3.5 w-3.5" />}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Price Range</h4>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="20000"
                      className="w-full accent-purple-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex gap-3">
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">₹</span>
                        <Input type="number" placeholder="0" className="h-9 pl-6 text-xs" />
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">₹</span>
                        <Input type="number" placeholder="Max" className="h-9 pl-6 text-xs" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Rating</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <button key={rating} className="flex items-center gap-2 text-sm text-gray-600 hover:text-purple-700 w-full px-2 py-1 rounded-lg hover:bg-purple-50 transition-colors">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs">& Up</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <Card className="group h-full border-0 bg-white/50 backdrop-blur-sm hover:bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden rounded-2xl ring-1 ring-gray-100 hover:ring-purple-100">
                    <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
                      {product.new && (
                        <Badge className="absolute top-3 left-3 bg-blue-500 hover:bg-blue-600 text-white border-0 z-10 shadow-lg">
                          NEW
                        </Badge>
                      )}
                      {product.discount > 0 && (
                        <Badge className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white border-0 z-10 shadow-lg">
                          -{product.discount}%
                        </Badge>
                      )}
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Quick Actions */}
                      <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2">
                        <Button className="flex-1 bg-white text-purple-900 hover:bg-purple-50 shadow-lg font-medium">
                          Add to Cart
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">{product.category}</p>
                          <h3 className="font-bold text-base sm:text-lg leading-tight group-hover:text-purple-600 transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-bold text-yellow-700">{product.rating}</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground line-through opacity-70">
                            {product.discount > 0 ? `₹${Math.round(product.price / (1 - product.discount / 100))}` : ''}
                          </span>
                          <span className="text-xl font-bold text-purple-900">
                            ₹{product.price}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {product.reviews} reviews
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center gap-2">
              <Button variant="outline" disabled>Previous</Button>
              <Button variant="outline" className="bg-purple-600 text-white border-purple-600 hover:bg-purple-700 hover:text-white">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
