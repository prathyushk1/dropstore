import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Star, Search } from "lucide-react"
import { getProducts, getCategories } from "@/lib/db"
import { ProductFilters, DesktopFilters } from "@/components/shop/product-filters"

export const revalidate = 0 // Dynamic page

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string; min?: string; max?: string; search?: string }
}) {
  const { category, sort, min, max, search } = searchParams

  // Fetch data
  const { data: productsData } = await getProducts({
    category: category ? (await getCategories()).data?.find(c => c.slug === category)?.id : undefined,
    minPrice: min ? Number(min) : undefined,
    maxPrice: max ? Number(max) : undefined,
    search: search,
  })

  const { data: categoriesData } = await getCategories()

  // Transform products for UI
  const products = productsData?.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    image: p.images?.[0] || 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600',
    rating: 4.5, // Mock
    reviews: 120, // Mock
    discount: p.compare_price ? Math.round(((p.compare_price - p.price) / p.compare_price) * 100) : 0,
    category: p.category?.name || 'Uncategorized',
    new: new Date(p.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // New if < 7 days
  })) || []

  // Sort products (client-side sort for now as DB helper might not support all sorts yet)
  if (sort === 'price_asc') products.sort((a, b) => a.price - b.price)
  if (sort === 'price_desc') products.sort((a, b) => b.price - a.price)
  if (sort === 'newest') products.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0))

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 py-12 sm:py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>

        <div className="container relative z-10 px-4">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            {category ? categoriesData?.find(c => c.slug === category)?.name || 'Products' : 'All Products'}
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
            <ProductFilters categories={categoriesData || []} />
            <p className="text-muted-foreground text-sm hidden sm:block">
              Showing <span className="font-medium text-foreground">{products.length}</span> results
            </p>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <form action="/products">
                <Input
                  name="search"
                  defaultValue={search}
                  placeholder="Search products..."
                  className="pl-9 rounded-full border-2 focus:border-purple-500 transition-colors"
                />
              </form>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <DesktopFilters categories={categoriesData || []} />

          {/* Products Grid */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-2xl font-bold text-muted-foreground">No products found</h3>
                <p className="text-muted-foreground mt-2">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
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
            )}

            {/* Pagination (Static for now) */}
            {products.length > 0 && (
              <div className="mt-12 flex justify-center gap-2">
                <Button variant="outline" disabled>Previous</Button>
                <Button variant="outline" className="bg-purple-600 text-white border-purple-600 hover:bg-purple-700 hover:text-white">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">Next</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
