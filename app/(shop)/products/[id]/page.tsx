import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw, Share2, ChevronRight, Minus, Plus } from "lucide-react"

// Dummy product data
const product = {
  id: '1',
  name: 'Wireless Earbuds Pro Max',
  price: 2999,
  comparePrice: 4999,
  rating: 4.8,
  reviews: 128,
  images: [
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
    'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800&q=80',
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&q=80',
  ],
  description: 'Experience premium sound quality with our Wireless Earbuds Pro Max. Featuring active noise cancellation, 30-hour battery life, and crystal-clear audio for music and calls. Designed for comfort and durability.',
  specifications: {
    'Battery Life': '30 hours',
    'Bluetooth': '5.3',
    'Water Resistance': 'IPX7',
    'Charging': 'USB-C Fast Charging',
    'Weight': '45g',
  },
  inStock: true,
  category: 'Electronics',
}

const relatedProducts = Array.from({ length: 4 }, (_, i) => ({
  id: `${i + 2}`,
  name: `Premium Product ${i + 1}`,
  price: Math.floor(Math.random() * 5000) + 1000,
  image: `https://images.unsplash.com/photo-${1523275335684 + i}?w=400&q=80`,
  rating: (Math.random() * 2 + 3).toFixed(1),
}))

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-0">
      {/* Breadcrumbs */}
      <div className="bg-secondary/30 py-4">
        <div className="container px-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/products" className="hover:text-primary">Products</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="container py-8 sm:py-12 px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image - Desktop */}
            <div className="hidden md:block aspect-square relative rounded-3xl overflow-hidden border-2 border-gray-100 bg-white shadow-sm">
              <Badge className="absolute top-4 left-4 z-10 bg-blue-500 hover:bg-blue-600 text-white border-0 px-3 py-1 text-sm shadow-lg">
                Best Seller
              </Badge>
              <Button size="icon" variant="ghost" className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm hover:bg-white hover:text-red-500 rounded-full shadow-sm">
                <Heart className="h-5 w-5" />
              </Button>
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>

            {/* Mobile Gallery - Horizontal Scroll */}
            <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-4 gap-4 hide-scrollbar">
              {product.images.map((img, i) => (
                <div key={i} className="relative aspect-square min-w-[85vw] rounded-2xl overflow-hidden snap-center border border-gray-200 bg-white">
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" priority={i === 0} />
                </div>
              ))}
            </div>

            {/* Thumbnails - Desktop */}
            <div className="hidden md:grid grid-cols-3 gap-4">
              {product.images.map((img, i) => (
                <div key={i} className={`aspect-square relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${i === 0 ? 'border-purple-500 ring-2 ring-purple-200' : 'border-transparent hover:border-purple-200'}`}>
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-24 h-fit space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-100">
                  {product.category}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Share2 className="h-4 w-4" />
                  Share
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground tracking-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-yellow-700">{product.rating}</span>
                  <span className="text-yellow-600/50 mx-1">|</span>
                  <span className="text-xs text-yellow-600">{product.reviews} Reviews</span>
                </div>
                <span className="text-green-600 font-medium flex items-center gap-1">
                  <Shield className="h-4 w-4" /> In Stock
                </span>
              </div>

              <div className="flex items-end gap-4 mb-8 p-6 bg-secondary/30 rounded-2xl border border-secondary">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground font-medium">Total Price</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl sm:text-5xl font-bold text-primary">₹{product.price}</span>
                    <span className="text-xl text-muted-foreground line-through">₹{product.comparePrice}</span>
                  </div>
                </div>
                <Badge variant="destructive" className="mb-2 text-lg px-3 py-1 animate-pulse">
                  {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
                </Badge>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Quantity & Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center border-2 rounded-xl bg-white w-fit">
                  <Button variant="ghost" size="icon" className="h-12 w-12 rounded-l-xl hover:bg-gray-50">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-bold text-lg">1</span>
                  <Button variant="ghost" size="icon" className="h-12 w-12 rounded-r-xl hover:bg-gray-50">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button size="lg" className="flex-1 h-12 text-lg bg-purple-600 hover:bg-purple-700 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-100 text-green-700">
                  <Truck className="h-5 w-5" />
                  <span className="text-sm font-medium">Free Delivery</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-700">
                  <RotateCcw className="h-5 w-5" />
                  <span className="text-sm font-medium">7 Days Return</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-purple-50 border border-purple-100 text-purple-700">
                  <Shield className="h-5 w-5" />
                  <span className="text-sm font-medium">1 Year Warranty</span>
                </div>
              </div>

              {/* Specifications */}
              <Card className="border-2 shadow-none">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Technical Specifications</h3>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between sm:block border-b sm:border-0 pb-2 sm:pb-0 border-dashed last:border-0">
                        <dt className="text-sm text-muted-foreground mb-1">{key}</dt>
                        <dd className="font-medium text-foreground">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">You May Also Like</h2>
            <Button variant="outline" asChild>
              <Link href="/products">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/products/${item.id}`}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-white/50 backdrop-blur-sm ring-1 ring-gray-100">
                  <div className="aspect-square relative overflow-hidden bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                      <Button size="icon" className="h-8 w-8 rounded-full bg-white text-black hover:bg-purple-50 shadow-lg">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1 line-clamp-1 group-hover:text-purple-600 transition-colors">{item.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">{item.rating}</span>
                    </div>
                    <span className="text-lg font-bold text-primary">₹{item.price}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Mobile Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t z-40 lg:hidden flex gap-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">Total Price</p>
          <p className="text-xl font-bold text-primary">₹{product.price}</p>
        </div>
        <Button className="flex-1 bg-purple-600 hover:bg-purple-700 shadow-lg">
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
