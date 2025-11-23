import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp, Star, Zap, Shield, Truck, HeadphonesIcon, Sparkles, ArrowUpRight } from "lucide-react"

// Dummy data
const trendingProducts = [
  { id: '1', name: 'Wireless Earbuds Pro', price: 2999, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', rating: 4.5, discount: 20 },
  { id: '2', name: 'Smart Watch Ultra', price: 8999, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', rating: 4.8, discount: 15 },
  { id: '3', name: 'Laptop Stand Aluminum', price: 1499, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', rating: 4.3, discount: 0 },
  { id: '4', name: 'USB-C Hub 7-in-1', price: 1999, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400', rating: 4.6, discount: 10 },
]

const categories = [
  { name: 'Electronics', slug: 'electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400', color: 'from-blue-500 to-cyan-500' },
  { name: 'Fashion', slug: 'fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400', color: 'from-pink-500 to-rose-500' },
  { name: 'Home & Living', slug: 'home', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400', color: 'from-amber-500 to-orange-500' },
  { name: 'Sports', slug: 'sports', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400', color: 'from-emerald-500 to-green-500' },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section - Immersive & Dynamic */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-background pt-16">
        {/* Background Gradients */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm animate-fade-in">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">New Collection 2024</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] animate-fade-in-up">
                Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Extraordinary</span> Products
              </h1>

              <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-200">
                Elevate your lifestyle with our curated selection of premium items. Quality meets affordability in every purchase.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-400">
                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105" asChild>
                  <Link href="/products">
                    Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2 hover:bg-secondary/50 backdrop-blur-sm transition-all hover:scale-105" asChild>
                  <Link href="/products?featured=true">
                    View Deals
                  </Link>
                </Button>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-8 pt-4 text-muted-foreground animate-fade-in-up animation-delay-600">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                    <Truck className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <Shield className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">Secure Payment</span>
                </div>
              </div>
            </div>

            {/* Hero Image/Visual */}
            <div className="relative lg:h-[600px] w-full hidden lg:block animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-[3rem] rotate-3 backdrop-blur-sm border border-white/10" />
              <div className="absolute inset-0 bg-card rounded-[3rem] -rotate-3 shadow-2xl overflow-hidden border border-border/50">
                <Image
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80"
                  alt="Hero Showcase"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />

                {/* Floating Cards */}
                <div className="absolute top-8 right-8 p-4 glass-panel rounded-2xl animate-float">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                      <Star className="h-5 w-5 fill-current" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Top Rated</p>
                      <p className="text-xs text-muted-foreground">4.9/5 Stars</p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 p-4 glass-panel rounded-2xl animate-float animation-delay-1000">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-full text-red-600">
                      <Zap className="h-5 w-5 fill-current" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Fast Delivery</p>
                      <p className="text-xs text-muted-foreground">2-3 Days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Shop by Category</h2>
            <p className="text-muted-foreground">Explore our wide range of collections</p>
          </div>
          <Button variant="ghost" className="group" asChild>
            <Link href="/categories">
              View All Categories <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.slug} href={`/products?category=${category.slug}`} className="group relative overflow-hidden rounded-3xl aspect-[4/5]">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                <div className="flex items-center gap-2 text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Shop Now</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-20 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="secondary" className="mb-4 px-4 py-1 text-primary bg-primary/10 border-primary/20">Trending Now</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Products</h2>
            <p className="text-muted-foreground">Don't miss out on our best-selling items of the week.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <Card className="group border-0 bg-card/50 backdrop-blur-sm hover:bg-card transition-colors duration-300 overflow-hidden rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2">
                  <div className="relative aspect-square overflow-hidden bg-secondary/50">
                    {product.discount > 0 && (
                      <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white border-0 z-10">
                        -{product.discount}%
                      </Badge>
                    )}
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Quick Actions Overlay */}
                    <div className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                      <Button size="sm" className="bg-white text-black hover:bg-gray-100 w-full">
                        Quick View
                      </Button>
                      <Button size="sm" className="w-full">
                        Add to Cart
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">({Math.floor(Math.random() * 100) + 50})</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-primary">₹{product.price}</span>
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

          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" className="rounded-full px-8 border-2" asChild>
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 container px-4 md:px-6">
        <div className="relative rounded-[3rem] overflow-hidden bg-primary px-6 py-16 md:px-16 md:py-24 text-center">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Join Our Community
            </h2>
            <p className="text-lg text-primary-foreground/80">
              Subscribe to our newsletter and get <span className="font-bold text-white">20% off</span> your first order, plus exclusive access to new drops.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 h-12 px-6 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
              />
              <Button size="lg" className="h-12 px-8 rounded-full bg-white text-primary hover:bg-white/90 font-bold shadow-lg">
                Subscribe
              </Button>
            </form>

            <p className="text-sm text-primary-foreground/60">
              By subscribing, you agree to our Terms & Conditions and Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
