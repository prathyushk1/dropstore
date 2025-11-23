"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Star, ShoppingCart, Check, Heart } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

interface Product {
    id: string
    name: string
    price: number
    image: string
    rating: number
    discount?: number
    description?: string
}

interface QuickViewModalProps {
    product: Product | null
    isOpen: boolean
    onClose: () => void
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
    const [isWishlisted, setIsWishlisted] = useState(false)

    if (!product) return null

    const handleAddToCart = () => {
        toast.success(`Added ${product.name} to cart`)
        onClose()
    }

    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted)
        toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist")
    }

    const discountedPrice = product.discount
        ? Math.round(product.price / (1 - product.discount / 100))
        : null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white/95 backdrop-blur-xl border-white/20">
                <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative aspect-square md:aspect-auto bg-secondary/30">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                        {product.discount && (
                            <Badge className="absolute top-4 left-4 bg-red-500 text-white border-0">
                                -{product.discount}%
                            </Badge>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-8 flex flex-col h-full">
                        <DialogHeader className="mb-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <DialogTitle className="text-2xl font-bold mb-2">{product.name}</DialogTitle>
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center text-yellow-400">
                                            <Star className="h-4 w-4 fill-current" />
                                            <span className="ml-1 text-sm font-medium text-foreground">{product.rating}</span>
                                        </div>
                                        <span className="text-muted-foreground text-sm">• 120+ Reviews</span>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full hover:bg-secondary"
                                    onClick={toggleWishlist}
                                >
                                    <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                                </Button>
                            </div>
                        </DialogHeader>

                        <div className="flex-1">
                            <div className="flex items-baseline gap-3 mb-6">
                                <span className="text-3xl font-bold text-primary">₹{product.price}</span>
                                {discountedPrice && (
                                    <span className="text-lg text-muted-foreground line-through">₹{discountedPrice}</span>
                                )}
                            </div>

                            <DialogDescription className="text-base mb-6">
                                Experience premium quality with our {product.name}. Designed for modern lifestyles, featuring durable materials and exceptional craftsmanship.
                            </DialogDescription>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-sm text-green-600">
                                    <Check className="h-4 w-4" />
                                    <span>In Stock & Ready to Ship</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Check className="h-4 w-4" />
                                    <span>Free Shipping & Returns</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t">
                            <Button size="lg" className="w-full rounded-full text-lg h-12" onClick={handleAddToCart}>
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
