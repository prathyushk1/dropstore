import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Star, Truck, Shield, RotateCcw, Heart, Share2, ShoppingCart } from "lucide-react"
import { getProductById, getProducts } from "@/lib/db"

export const revalidate = 60

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { data: product } = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  // Fetch related products (same category, excluding current)
  const { data: relatedProductsData } = await getProducts({
    category: product.category_id,
    limit: 4
  })

  const relatedProducts = relatedProductsData?.filter(p => p.id !== product.id).slice(0, 4) || []

  // Calculate discount
  const discount = product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Breadcrumb */}
      <div className="bg-secondary/30 border-b">
        <div className="container py-4 px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12 px-4">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-secondary/20 border depth-shadow-lg card-3d">
              {discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white border-0 z-10 text-lg px-3 py-1">
                  -{discount}%
                </Badge>
              )}
              <Image
                src={product.images?.[0] || 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80'}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer ${i === 0 ? 'border-primary' : 'border-transparent hover:border-gray-200'}`}>
                  <Image
                    src={product.images?.[i] || product.images?.[0] || 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&q=80'}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-3 text-primary bg-primary/10 hover:bg-primary/20">
                {product.category?.name || 'Premium'}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-yellow-700">4.5</span>
                  <span className="text-yellow-600/80 text-sm">(120 reviews)</span>
                </div>
                <span className="text-green-600 font-medium flex items-center gap-1">
                  <Shield className="h-4 w-4" /> In Stock
                </span>
              </div>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-primary">₹{product.price}</span>
                {discount > 0 && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">₹{product.compare_price}</span>
                    <span className="text-sm font-medium text-red-500 bg-red-50 px-2 py-1 rounded-full">
                      Save ₹{(product.compare_price || 0) - product.price}
                    </span>
                  </>
                )}
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator className="my-6" />

            {/* Actions */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 h-14 text-lg rounded-full btn-3d">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="h-14 w-14 rounded-full p-0 border-2 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors">
                  <Heart className="h-6 w-6" />
                </Button>
                <Button size="lg" variant="ghost" className="h-14 w-14 rounded-full p-0 hover:bg-secondary transition-colors">
                  <Share2 className="h-6 w-6" />
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl bg-secondary/30 depth-shadow card-3d-subtle">
                  <Truck className="h-6 w-6 text-primary" />
                  <span className="text-xs font-medium">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl bg-secondary/30 depth-shadow card-3d-subtle">
                  <Shield className="h-6 w-6 text-primary" />
                  <span className="text-xs font-medium">2 Year Warranty</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl bg-secondary/30 depth-shadow card-3d-subtle">
                  <RotateCcw className="h-6 w-6 text-primary" />
                  <span className="text-xs font-medium">30 Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-container">
            {relatedProducts.map((related) => (
              <Link key={related.id} href={`/products/${related.id}`}>
                <Card className="group h-full border-0 bg-card hover:bg-card/80 transition-colors overflow-hidden rounded-2xl depth-shadow card-3d-subtle shine-effect">
                  <div className="aspect-square relative overflow-hidden bg-secondary/20">
                    <Image
                      src={related.images?.[0] || 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400'}
                      alt={related.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors">{related.name}</h3>
                    <p className="text-primary font-bold">₹{related.price}</p>
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
