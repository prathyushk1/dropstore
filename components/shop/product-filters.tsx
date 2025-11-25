"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { X, SlidersHorizontal } from "lucide-react"

interface Category {
  id: string
  name: string
}

interface ProductFiltersProps {
  categories: Category[]
}

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [inStock, setInStock] = useState(searchParams.get('inStock') === 'true')
  const [sort, setSort] = useState(searchParams.get('sort') || 'relevance')

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (selectedCategory) {
      params.set('category', selectedCategory)
    } else {
      params.delete('category')
    }

    if (priceRange[0] > 0) {
      params.set('minPrice', priceRange[0].toString())
    } else {
      params.delete('minPrice')
    }

    if (priceRange[1] < 1000) {
      params.set('maxPrice', priceRange[1].toString())
    } else {
      params.delete('maxPrice')
    }

    if (inStock) {
      params.set('inStock', 'true')
    } else {
      params.delete('inStock')
    }

    if (sort !== 'relevance') {
      params.set('sort', sort)
    } else {
      params.delete('sort')
    }

    router.push(`/products?${params.toString()}`)
    setIsOpen(false) // Close sheet after applying filters
  }

  const clearFilters = () => {
    setPriceRange([0, 1000])
    setSelectedCategory('')
    setInStock(false)
    setSort('relevance')
    router.push('/products')
    setIsOpen(false)
  }

  const hasActiveFilters = selectedCategory || priceRange[0] > 0 || priceRange[1] < 1000 || inStock || sort !== 'relevance'

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Sort */}
      <div className="space-y-2">
        <Label>Sort By</Label>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="price_asc">Price: Low to High</SelectItem>
            <SelectItem value="price_desc">Price: High to Low</SelectItem>
            <SelectItem value="name_asc">Name: A to Z</SelectItem>
            <SelectItem value="name_desc">Name: Z to A</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="featured">Featured</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label>Category</Label>
        <Select value={selectedCategory || "all"} onValueChange={(value) => setSelectedCategory(value === "all" ? "" : value)}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <Label>Price Range</Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={1000}
          step={10}
          className="w-full"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      {/* In Stock */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="inStock"
          checked={inStock}
          onCheckedChange={(checked) => setInStock(checked as boolean)}
        />
        <Label htmlFor="inStock" className="cursor-pointer">
          In Stock Only
        </Label>
      </div>

      {/* Apply Button */}
      <div className="flex gap-2">
        <Button onClick={applyFilters} className="flex-1">
          Apply Filters
        </Button>
        {hasActiveFilters && (
          <Button variant="outline" onClick={clearFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )

  // Mobile version with Sheet
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="lg:hidden">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <span className="ml-2 h-2 w-2 rounded-full bg-purple-600" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Refine your product search
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <FilterContent />
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Desktop sidebar version (hidden on mobile)
export function DesktopFilters({ categories }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [inStock, setInStock] = useState(searchParams.get('inStock') === 'true')
  const [sort, setSort] = useState(searchParams.get('sort') || 'relevance')

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (selectedCategory) {
      params.set('category', selectedCategory)
    } else {
      params.delete('category')
    }

    if (priceRange[0] > 0) {
      params.set('minPrice', priceRange[0].toString())
    } else {
      params.delete('minPrice')
    }

    if (priceRange[1] < 1000) {
      params.set('maxPrice', priceRange[1].toString())
    } else {
      params.delete('maxPrice')
    }

    if (inStock) {
      params.set('inStock', 'true')
    } else {
      params.delete('inStock')
    }

    if (sort !== 'relevance') {
      params.set('sort', sort)
    } else {
      params.delete('sort')
    }

    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    setPriceRange([0, 1000])
    setSelectedCategory('')
    setInStock(false)
    setSort('relevance')
    router.push('/products')
  }

  const hasActiveFilters = selectedCategory || priceRange[0] > 0 || priceRange[1] < 1000 || inStock || sort !== 'relevance'

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Filters</CardTitle>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Sort */}
          <div className="space-y-2">
            <Label>Sort By</Label>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                <SelectItem value="name_asc">Name: A to Z</SelectItem>
                <SelectItem value="name_desc">Name: Z to A</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={selectedCategory || "all"} onValueChange={(value) => setSelectedCategory(value === "all" ? "" : value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div className="space-y-4">
            <Label>Price Range</Label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={1000}
              step={10}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>₹{priceRange[0]}</span>
              <span>₹{priceRange[1]}</span>
            </div>
          </div>

          {/* In Stock */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock-desktop"
              checked={inStock}
              onCheckedChange={(checked) => setInStock(checked as boolean)}
            />
            <Label htmlFor="inStock-desktop" className="cursor-pointer">
              In Stock Only
            </Label>
          </div>

          {/* Apply Button */}
          <Button onClick={applyFilters} className="w-full">
            Apply Filters
          </Button>
        </CardContent>
      </Card>
    </aside>
  )
}

// Explicit exports for better compatibility
export { ProductFilters as default }
