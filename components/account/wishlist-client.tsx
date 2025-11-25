"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Trash2, Star, ArrowRight, Heart } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface WishlistItem {
    id: string
    product_id: string
    products: {
        id: string
        name: string
        price: number
        images: string[]
        stock: number
        rating?: number
    }
}

export default function WishlistClient({ initialItems }: { initialItems: WishlistItem[] }) {
    const [items, setItems] = useState<WishlistItem[]>(initialItems)
    const supabase = createClientComponentClient()
    const router = useRouter()

    const handleRemove = async (id: string) => {
        try {
            const { error } = await supabase
                .from('wishlist')
                .delete()
                .eq('id', id)

            if (error) throw error

            setItems(items.filter(item => item.id !== id))
            toast.success("Removed from wishlist")
            router.refresh()
        } catch (error) {
            toast.error("Failed to remove item")
        }
    }

    const handleAddToCart = (product: any) => {
        // TODO: Implement real cart logic
        // For now, just show toast as we haven't implemented cart persistence yet
        toast.success("Added to cart")
    }

    if (items.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
                <p className="text-muted-foreground mb-8">
                    Explore our products and save your favorites here.
                </p>
                <Button size="lg" asChild>
                    <Link href="/products">Start Shopping</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => {
                const product = item.products
                return (
                    <Card key={item.id} className="group overflow-hidden border-0 bg-white/50 backdrop-blur-sm ring-1 ring-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="aspect-square relative overflow-hidden bg-secondary/50">
                            <Image
                                src={product.images?.[0] || 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&q=80'}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute top-2 right-2 z-10">
                                <Button
                                    size="icon"
                                    variant="destructive"
                                    className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                    onClick={() => handleRemove(item.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            {product.stock <= 0 && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                    <Badge variant="secondary" className="bg-white/90 text-black">Out of Stock</Badge>
                                </div>
                            )}
                        </div>
                        <CardContent className="p-4">
                            <div className="flex items-center gap-1 mb-2">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-muted-foreground">{product.rating || 4.5}</span>
                            </div>
                            <h3 className="font-semibold mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                                <Link href={`/products/${product.id}`}>{product.name}</Link>
                            </h3>
                            <div className="flex items-center justify-between mt-3">
                                <span className="text-lg font-bold text-primary">₹{product.price}</span>
                                <Button
                                    size="sm"
                                    disabled={product.stock <= 0}
                                    onClick={() => handleAddToCart(product)}
                                    className="rounded-full"
                                >
                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                    Add
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
