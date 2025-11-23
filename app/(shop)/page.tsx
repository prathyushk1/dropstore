"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, ArrowUpRight } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"

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
      {/* Hero Section - Carousel */}
      <section className="relative bg-background pt-4 md:pt-8">
        <div className="container px-4 md:px-6">
          <Carousel className="w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl" opts={{ loop: true }}>
            <CarouselContent>
              {[
                "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80",
                "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
                "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80"
              ].map((src, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-[2/1] md:aspect-[2.5/1] w-full">
                    <Image
                      src={src}
                      alt={`Banner ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center p-6 md:p-12">
                      <div className="max-w-xl space-y-4">
                        <Badge className="bg-primary text-white border-0 px-3 py-1 text-sm">
                          New Arrival
                        </Badge>
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                          Summer Collection 2024
                        </h2>
                        <p className="text-white/90 text-lg md:text-xl max-w-md hidden md:block">
                          Discover the latest trends in fashion and electronics. Up to 50% off on selected items.
                        </p>
                        <Button size="lg" className="rounded-full bg-white text-black hover:bg-white/90 font-bold" asChild>
                          <Link href="/products">Shop Now</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Categories Section - Circular on Mobile */}
      <section className="py-8 md:py-16 container px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-3xl font-bold">Shop by Category</h2>
          <Link href="/categories" className="text-sm text-primary font-medium hover:underline">
            View All
          </Link>
        </div>

        {/* Mobile: Circular Scroll */}
        <div className="flex md:hidden overflow-x-auto pb-4 -mx-4 px-4 gap-6 hide-scrollbar">
          {categories.map((category) => (
            <Link key={category.slug} href={`/products?category=${category.slug}`} className="flex flex-col items-center gap-2 min-w-[72px]">
              <div className="w-18 h-18 rounded-full p-[2px] bg-gradient-to-br from-purple-500 to-pink-500">
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-white relative aspect-square">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="text-xs font-medium text-center line-clamp-1">{category.name}</span>
            </Link>
          ))}
        </div>

        {/* Desktop: Grid Cards */}
        <div className="hidden md:grid grid-cols-4 gap-6">
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

