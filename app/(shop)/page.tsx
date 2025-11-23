import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp, Star, Zap, Shield, Truck, HeadphonesIcon, Sparkles } from "lucide-react"

// Dummy data
const trendingProducts = [
  { id: '1', name: 'Wireless Earbuds Pro', price: 2999, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', rating: 4.5, discount: 20 },
  { id: '2', name: 'Smart Watch Ultra', price: 8999, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', rating: 4.8, discount: 15 },
  { id: '3', name: 'Laptop Stand Aluminum', price: 1499, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', rating: 4.3, discount: 0 },
  { id: '4', name: 'USB-C Hub 7-in-1', price: 1999, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400', rating: 4.6, discount: 10 },
]

const categories = [
  { name: 'Electronics', slug: 'electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400' },
  { name: 'Fashion', slug: 'fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400' },
  { name: 'Home & Living', slug: 'home', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400' },
  { name: 'Sports', slug: 'sports', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400' },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="container relative py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium text-white">New Arrivals Every Week</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Discover Amazing
              </span>
              <br />
              <span className="text-white">Products at Unbeatable Prices</span>
            </h1>
            
            <p className="text-xl mb-10 text-blue-50 max-w-2xl animate-fade-in-up animation-delay-200">
              Shop the latest trending products with fast shipping and hassle-free returns. Quality guaranteed with 100% satisfaction.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-400">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105" asChild>
                <Link href="/products">
                  <Zap className="mr-2 h-5 w-5" />
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 shadow-lg" asChild>
                <Link href="/products?featured=true">
                  View Hot Deals 🔥
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-6 mt-12 animate-fade-in-up animation-delay-600">
              <div className="flex items-center gap-2 text-white/90">
                <Shield className="h-5 w-5" />
                <span className="text-sm">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Truck className="h-5 w-5" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <HeadphonesIcon className="h-5 w-5" />
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Categories - Enhanced */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg">Explore our curated collections</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={category.slug} href={`/products?category=${category.slug}`}>
              <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-purple-200">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-4 text-center bg-gradient-to-br from-white to-purple-50 group-hover:from-purple-50 group-hover:to-pink-50 transition-colors duration-300">
                  <h3 className="font-bold text-lg group-hover:text-purple-600 transition-colors">{category.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore now →
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products - Enhanced */}
      <section className="container py-20 bg-gradient-to-b from-transparent to-purple-50/30">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
                Trending Now
              </h2>
              <p className="text-muted-foreground">Hot picks this week</p>
            </div>
          </div>
          <Button variant="outline" className="hidden md:flex border-2 hover:border-purple-300 hover:bg-purple-50" asChild>
            <Link href="/products">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product, index) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full border-2 hover:border-purple-200">
                <div className="aspect-square relative overflow-hidden bg-gray-100">
                  {product.discount > 0 && (
                    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg z-10 animate-pulse">
                      🔥 -{product.discount}%
                    </Badge>
                  )}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Quick View Button */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" className="w-full bg-white text-purple-600 hover:bg-purple-50">
                      Quick View
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                        ₹{product.price}
                      </span>
                      {product.discount > 0 && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{Math.round(product.price / (1 - product.discount / 100))}
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-8 border-2 hover:border-purple-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
            <p className="text-muted-foreground">100% secure transactions with encrypted payment gateway</p>
          </Card>
          
          <Card className="text-center p-8 border-2 hover:border-purple-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Truck className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
            <p className="text-muted-foreground">Free shipping on orders above ₹500 with express delivery</p>
          </Card>
          
          <Card className="text-center p-8 border-2 hover:border-purple-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <HeadphonesIcon className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
            <p className="text-muted-foreground">Dedicated customer support team always ready to help</p>
          </Card>
        </div>
      </section>

      {/* Newsletter - Enhanced */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container max-w-3xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            <span className="text-sm font-medium text-white">Exclusive Offers</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Get 20% Off Your First Order!
          </h2>
          <p className="text-xl text-white/90 mb-10">
            Subscribe to our newsletter and get exclusive deals, new arrivals, and special offers delivered to your inbox.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex h-12 w-full rounded-xl border-0 bg-white/95 backdrop-blur-sm px-4 py-2 text-sm shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button 
              type="submit" 
              size="lg"
              className="bg-white text-purple-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              <Zap className="mr-2 h-4 w-4" />
              Subscribe Now
            </Button>
          </form>
          
          <p className="text-white/70 text-sm mt-6">
            🎁 Join 10,000+ happy subscribers • Unsubscribe anytime
          </p>
        </div>
      </section>
    </div>
  )
}
