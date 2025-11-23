"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, ArrowUpRight, Zap, Shield, Truck, Smartphone, Watch, Laptop, Shirt, Home, Trophy, Eye } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useState } from "react"
import { QuickViewModal } from "@/components/ui/quick-view-modal"

// Dummy data
const trendingProducts = [
  { id: '1', name: 'Wireless Earbuds Pro', price: 2999, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400', rating: 4.5, discount: 20 },
  { id: '2', name: 'Smart Watch Ultra', price: 8999, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', rating: 4.8, discount: 15 },
  { id: '3', name: 'Laptop Stand Aluminum', price: 1499, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', rating: 4.3, discount: 0 },
  { id: '4', name: 'USB-C Hub 7-in-1', price: 1999, image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400', rating: 4.6, discount: 10 },
]

const categories = [
  { name: 'Electronics', slug: 'electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600', icon: Smartphone, color: 'from-blue-600 to-indigo-600' },
  { name: 'Fashion', slug: 'fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600', icon: Shirt, color: 'from-pink-600 to-rose-600' },
  { name: 'Home & Living', slug: 'home', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600', icon: Home, color: 'from-amber-500 to-orange-600' },
  { name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600', icon: Watch, color: 'from-emerald-500 to-teal-600' },
]

const brands = [
  { name: "TechGiant", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&auto=format" },
  { name: "StyleCo", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&auto=format" }, // Placeholder logos
  { name: "HomeLux", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&auto=format" },
  { name: "SportX", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&auto=format" },
  { name: "UrbanWear", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&auto=format" },
]

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<typeof trendingProducts[0] | null>(null)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section - Premium Auto-playing Carousel */}
      <section className="relative bg-background pt-4 md:pt-6 pb-8">
        <div className="container px-4 md:px-6">
          <Carousel
            className="w-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/5"
            opts={{ loop: true, align: "start" }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: false,
              }),
            ]}
          >
            <CarouselContent>
              {[
                {
                  image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=90",
                  title: "Summer Luxe 2024",
                  subtitle: "Elevate your style with our premium collection.",
                  badge: "New Arrival"
                },
                {
                  image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1600&q=90",
                  title: "Next-Gen Tech",
                  subtitle: "Experience the future of innovation today.",
                  badge: "Trending"
                },
                {
                  image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?w=1600&q=90",
                  title: "Modern Living",
                  subtitle: "Curated essentials for your sanctuary.",
                  badge: "Best Seller"
                }
              ].map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-[16/9] md:aspect-[2.5/1] w-full overflow-hidden">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover transition-transform duration-[10s] hover:scale-105"
                      priority={index === 0}
                    />
                    {/* Premium Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center p-6 md:p-16">
                      <div className="max-w-xl space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <Badge className="bg-white/20 text-white border-white/20 backdrop-blur-md px-4 py-1.5 text-sm uppercase tracking-wider font-medium">
                          {slide.badge}
                        </Badge>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight">
                          {slide.title}
                        </h2>
                        <p className="text-white/90 text-lg md:text-2xl font-light max-w-md">
                          {slide.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Featured Brands - Marquee */}
      <section className="py-8 border-y bg-secondary/20 overflow-hidden">
        <div className="container px-4 md:px-6">
          <p className="text-center text-sm font-medium text-muted-foreground mb-6 uppercase tracking-widest">Trusted by Premium Brands</p>
          <div className="flex justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 overflow-x-auto hide-scrollbar">
            {brands.map((brand, i) => (
              <div key={i} className="flex items-center gap-2 min-w-[120px]">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Trophy className="h-4 w-4 text-primary" />
                </div>
                <span className="font-bold text-lg">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section - Enhanced Visuals */}
      <section className="py-12 md:py-20 container px-4 md:px-6">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Shop by Category</h2>
            <p className="text-muted-foreground mt-2">Explore our curated collections</p>
          </div>
          <Button variant="ghost" className="hidden md:flex" asChild>
            <Link href="/categories">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>

        {/* Mobile: Enhanced Circular Scroll */}
        <div className="flex md:hidden overflow-x-auto pb-6 -mx-4 px-4 gap-6 hide-scrollbar">
          {categories.map((category) => (
            <Link key={category.slug} href={`/products?category=${category.slug}`} className="flex flex-col items-center gap-3 min-w-[80px] group">
              <div className={`w-20 h-20 rounded-full p-[3px] bg-gradient-to-br ${category.color} shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                <div className="w-full h-full rounded-full overflow-hidden border-[3px] border-white relative aspect-square bg-white">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="text-sm font-semibold text-center line-clamp-1 group-hover:text-primary transition-colors">{category.name}</span>
            </Link>
          ))}
        </div>

        {/* Desktop: Premium Grid Cards */}
        <div className="hidden md:grid grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.slug} href={`/products?category=${category.slug}`} className="group relative overflow-hidden rounded-[2rem] aspect-[3/4] shadow-md hover:shadow-2xl transition-all duration-500">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className={`w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 text-white border border-white/20`}>
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                <div className="flex items-center gap-2 text-white/90 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <span>Explore Collection</span>
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products - With Quick View */}
      <section className="py-20 bg-secondary/30">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30 text-primary bg-primary/5">Trending Now</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Popular Products</h2>
            <p className="text-muted-foreground text-lg">Don't miss out on our best-selling items of the week.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <Card key={product.id} className="group border-0 bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-300 overflow-hidden rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2">
                <div className="relative aspect-square overflow-hidden bg-secondary/50">
                  {product.discount > 0 && (
                    <Badge className="absolute top-4 left-4 bg-red-500 text-white border-0 z-10 font-bold px-3">
                      -{product.discount}%
                    </Badge>
                  )}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <Button
                      size="sm"
                      className="bg-white/90 text-black hover:bg-white w-full backdrop-blur-sm shadow-lg"
                      onClick={(e) => {
                        e.preventDefault()
                        setQuickViewProduct(product)
                      }}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Quick View
                    </Button>
                    <Button size="sm" className="w-full shadow-lg" asChild>
                      <Link href={`/products/${product.id}`}>Buy Now</Link>
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({Math.floor(Math.random() * 100) + 50})</span>
                  </div>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                  </Link>
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
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" className="rounded-full px-10 h-14 text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105" asChild>
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Premium Design */}
      <section className="py-20 container px-4 md:px-6">
        <div className="relative rounded-[3rem] overflow-hidden bg-primary px-6 py-16 md:px-16 md:py-24 text-center shadow-2xl shadow-primary/20">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-white to-transparent rounded-full blur-[100px]" />
            <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-400 to-transparent rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
              Join Our Exclusive Community
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 font-light">
              Subscribe to our newsletter and get <span className="font-bold text-white">20% off</span> your first order, plus early access to new drops.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 h-14 px-8 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-md transition-all"
              />
              <Button size="lg" className="h-14 px-10 rounded-full bg-white text-primary hover:bg-white/90 font-bold shadow-xl hover:scale-105 transition-all">
                Subscribe
              </Button>
            </form>

            <p className="text-sm text-primary-foreground/60">
              By subscribing, you agree to our Terms & Conditions and Privacy Policy.
            </p>
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  )
}

