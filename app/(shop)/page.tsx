import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, ArrowUpRight, Zap, Shield, Truck, Smartphone, Watch, Laptop, Shirt, Home, Trophy, Eye } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { QuickViewModal } from "@/components/ui/quick-view-modal"
import { getProducts, getCategories } from "@/lib/db"
import { Product } from "@/types"
import ClientHomePage from "./client-home-page"

// Icon mapping for categories
const categoryIcons: Record<string, any> = {
  electronics: Smartphone,
  fashion: Shirt,
  home: Home,
  accessories: Watch,
  sports: Trophy,
}

const categoryColors: Record<string, string> = {
  electronics: 'from-blue-600 to-indigo-600',
  fashion: 'from-pink-600 to-rose-600',
  home: 'from-amber-500 to-orange-600',
  accessories: 'from-emerald-500 to-teal-600',
  sports: 'from-green-500 to-emerald-600',
}

export const revalidate = 60 // Revalidate every minute

export default async function HomePage() {
  let products = []
  let categoriesData = []

  try {
    const { data } = await getProducts({ limit: 8 })
    products = data || []
  } catch (error) {
    console.error("Failed to fetch products:", error)
  }

  try {
    const { data } = await getCategories()
    categoriesData = data || []
  } catch (error) {
    console.error("Failed to fetch categories:", error)
  }

  // Transform categories to match UI needs
  const categories = categoriesData?.map(cat => ({
    ...cat,
    icon: categoryIcons[cat.slug] || Home,
    color: categoryColors[cat.slug] || 'from-purple-500 to-indigo-500',
    // Use a placeholder if no image
    image: cat.image || 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600'
  })) || []

  // Transform products to match UI needs (calculate discount, etc)
  const trendingProducts = products?.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.images?.[0] || 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400',
    rating: 4.5, // Mock rating for now as it's not in DB yet
    discount: p.compare_price ? Math.round(((p.compare_price - p.price) / p.compare_price) * 100) : 0,
    description: p.description
  })) || []

  return (
    <ClientHomePage
      trendingProducts={trendingProducts}
      categories={categories}
    />
  )
}

