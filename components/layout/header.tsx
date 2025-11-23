"use client"

import Link from "next/link"
import { ShoppingCart, User, Search, Heart, Sparkles, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 shadow-sm">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white py-2">
        <div className="container flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium px-4">
          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          <span className="text-center">Free Shipping ₹500+ | Code: WELCOME20</span>
          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
        </div>
      </div>

      {/* Main Header */}
      <div className="container flex h-16 items-center gap-2 sm:gap-4 px-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/" className="flex items-center space-x-1 sm:space-x-2 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-white font-bold text-lg sm:text-xl">S</span>
            </div>
            <span className="font-bold text-lg sm:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 hidden xs:inline">
              ShopDrop
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
          <div className="hidden sm:block flex-1 max-w-md">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-purple-600 transition-colors" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 w-full border-2 focus:border-purple-300 rounded-xl"
              />
            </div>
          </div>

          <nav className="flex items-center space-x-0.5 sm:space-x-1">
            <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10 relative hover:bg-purple-50 hover:text-purple-600 rounded-xl" asChild>
              <Link href="/account/wishlist">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 text-[10px] bg-gradient-to-r from-pink-500 to-red-500 border-0">
                  3
                </Badge>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10 hover:bg-purple-50 hover:text-purple-600 rounded-xl hidden sm:flex" asChild>
              <Link href="/account">
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10 relative hover:bg-purple-50 hover:text-purple-600 rounded-xl" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center p-0 text-[10px] bg-gradient-to-r from-purple-600 to-pink-600 border-0">
                  2
                </Badge>
              </Link>
            </Button>
          </nav>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="sm:hidden border-t px-4 py-2">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-purple-600 transition-colors" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-10 w-full border-2 focus:border-purple-300 rounded-xl"
          />
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block border-t bg-gradient-to-r from-purple-50/50 to-pink-50/50">
        <div className="container">
          <nav className="flex h-12 items-center space-x-6 lg:space-x-8 text-sm font-medium overflow-x-auto">
            <Link href="/products" className="transition-colors hover:text-purple-600 relative group whitespace-nowrap">
              All Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/products?category=electronics" className="transition-colors hover:text-purple-600 relative group whitespace-nowrap">
              Electronics
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/products?category=fashion" className="transition-colors hover:text-purple-600 relative group whitespace-nowrap">
              Fashion
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/products?category=home" className="transition-colors hover:text-purple-600 relative group whitespace-nowrap">
              Home & Living
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/products?category=sports" className="transition-colors hover:text-purple-600 relative group whitespace-nowrap">
              Sports
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/products?featured=true" className="text-orange-600 font-semibold hover:text-orange-700 relative group whitespace-nowrap">
              🔥 Hot Deals
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-600 to-red-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="container py-4 flex flex-col space-y-3 text-sm font-medium">
            <Link href="/products" className="py-2 px-4 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
              All Products
            </Link>
            <Link href="/products?category=electronics" className="py-2 px-4 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Electronics
            </Link>
            <Link href="/products?category=fashion" className="py-2 px-4 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Fashion
            </Link>
            <Link href="/products?category=home" className="py-2 px-4 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Home & Living
            </Link>
            <Link href="/products?category=sports" className="py-2 px-4 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Sports
            </Link>
            <Link href="/products?featured=true" className="py-2 px-4 bg-orange-50 text-orange-600 font-semibold rounded-lg" onClick={() => setMobileMenuOpen(false)}>
              🔥 Hot Deals
            </Link>
            <Link href="/account" className="py-2 px-4 border-t hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors" onClick={() => setMobileMenuOpen(false)}>
              👤 My Account
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
