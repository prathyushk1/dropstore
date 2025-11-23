'use client'

import Link from "next/link"
import { ShoppingCart, User, Search, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 shadow-sm">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white py-2">
        <div className="container flex items-center justify-center gap-2 text-sm font-medium">
          <Sparkles className="h-4 w-4" />
          <span>Free Shipping on Orders Above ₹500 | Use Code: WELCOME20</span>
          <Sparkles className="h-4 w-4" />
        </div>
      </div>

      {/* Main Header */}
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              ShopDrop
            </span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-4 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-purple-600 transition-colors" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-10 md:w-[350px] lg:w-[450px] border-2 focus:border-purple-300 rounded-xl"
              />
            </div>
          </div>
          
          <nav className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="relative hover:bg-purple-50 hover:text-purple-600 rounded-xl" asChild>
              <Link href="/account/wishlist">
                <Heart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-pink-500 to-red-500 border-0">
                  3
                </Badge>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-purple-50 hover:text-purple-600 rounded-xl" asChild>
              <Link href="/account">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="relative hover:bg-purple-50 hover:text-purple-600 rounded-xl" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-purple-600 to-pink-600 border-0">
                  2
                </Badge>
              </Link>
            </Button>
          </nav>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="border-t bg-gradient-to-r from-purple-50/50 to-pink-50/50">
        <div className="container">
          <nav className="flex h-12 items-center space-x-8 text-sm font-medium">
            <Link href="/products" className="transition-colors hover:text-purple-600 relative group">
              All Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/products?category=electronics" className="transition-colors hover:text-purple-600 relative group">
              Electronics
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/products?category=fashion" className="transition-colors hover:text-purple-600 relative group">
              Fashion
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/products?category=home" className="transition-colors hover:text-purple-600 relative group">
              Home & Living
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/products?category=sports" className="transition-colors hover:text-purple-600 relative group">
              Sports
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/products?featured=true" className="text-orange-600 font-semibold hover:text-orange-700 relative group">
              🔥 Hot Deals
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-600 to-red-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
