"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

interface Category {
    id: string
    name: string
}

export default function EditProductPage({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        short_description: "",
        price: "",
        compare_price: "",
        sku: "",
        stock: "",
        category_id: "",
        is_featured: false,
        is_active: true,
    })

    useEffect(() => {
        const init = async () => {
            await Promise.all([fetchCategories(), fetchProduct()])
            setLoading(false)
        }
        init()
    }, [])

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/admin/categories')
            const data = await response.json()
            if (response.ok) {
                setCategories(data.categories || [])
            }
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
    }

    const fetchProduct = async () => {
        try {
            // We can reuse the GET endpoint which fetches all products, or we might want to add a specific GET by ID endpoint.
            // For now, let's filter from the list or update the API to support fetching single product.
            // Actually, the GET endpoint I wrote fetches ALL products. I should probably update it to support ?id= param for efficiency,
            // but for now I'll just fetch all and find the one I need, or better yet, update the API to handle single fetch.
            // Let's assume I'll update the API or just use the list for now.
            // Wait, the API I wrote:
            // GET /api/admin/products returns all.
            // I should update the API to handle single product fetch for better performance.
            // But for quick implementation, I'll fetch all and find.

            const response = await fetch('/api/admin/products')
            const data = await response.json()

            if (response.ok) {
                const product = data.products.find((p: any) => p.id === params.id)
                if (product) {
                    setFormData({
                        name: product.name,
                        description: product.description || "",
                        short_description: product.short_description || "",
                        price: product.price.toString(),
                        compare_price: product.compare_price ? product.compare_price.toString() : "",
                        sku: product.sku,
                        stock: product.stock.toString(),
                        category_id: product.category_id || "",
                        is_featured: product.is_featured,
                        is_active: product.is_active,
                    })
                } else {
                    toast.error('Product not found')
                    router.push('/admin/products')
                }
            }
        } catch (error) {
            console.error('Error fetching product:', error)
            toast.error('Failed to load product')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            const response = await fetch('/api/admin/products', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: params.id,
                    ...formData,
                    price: parseFloat(formData.price),
                    compare_price: formData.compare_price ? parseFloat(formData.compare_price) : null,
                    stock: parseInt(formData.stock) || 0,
                }),
            })

            if (response.ok) {
                toast.success('Product updated successfully!')
                router.push('/admin/products')
                router.refresh()
            } else {
                const data = await response.json()
                toast.error(data.error || 'Failed to update product')
            }
        } catch (error) {
            console.error('Error updating product:', error)
            toast.error('Failed to update product')
        } finally {
            setSaving(false)
        }
    }

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/products">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">Edit Product</h1>
                    <p className="text-muted-foreground">Update product information</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Product Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Product Name *</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        placeholder="Enter product name"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="short_description">Short Description</Label>
                                    <Input
                                        id="short_description"
                                        value={formData.short_description}
                                        onChange={(e) => handleChange('short_description', e.target.value)}
                                        placeholder="Brief product description"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="description">Full Description *</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        placeholder="Detailed product description"
                                        rows={6}
                                        required
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Pricing</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="price">Price (₹) *</Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            step="0.01"
                                            value={formData.price}
                                            onChange={(e) => handleChange('price', e.target.value)}
                                            placeholder="0.00"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="compare_price">Compare at Price (₹)</Label>
                                        <Input
                                            id="compare_price"
                                            type="number"
                                            step="0.01"
                                            value={formData.compare_price}
                                            onChange={(e) => handleChange('compare_price', e.target.value)}
                                            placeholder="0.00"
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Original price for showing discounts
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Organization</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        value={formData.category_id}
                                        onValueChange={(value) => handleChange('category_id', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="sku">SKU *</Label>
                                    <Input
                                        id="sku"
                                        value={formData.sku}
                                        onChange={(e) => handleChange('sku', e.target.value)}
                                        placeholder="PROD-001"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="stock">Stock Quantity *</Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        value={formData.stock}
                                        onChange={(e) => handleChange('stock', e.target.value)}
                                        placeholder="0"
                                        required
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Status</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="is_active"
                                        checked={formData.is_active}
                                        onCheckedChange={(checked) => handleChange('is_active', checked)}
                                    />
                                    <Label htmlFor="is_active" className="cursor-pointer">
                                        Active (visible on store)
                                    </Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="is_featured"
                                        checked={formData.is_featured}
                                        onCheckedChange={(checked) => handleChange('is_featured', checked)}
                                    />
                                    <Label htmlFor="is_featured" className="cursor-pointer">
                                        Featured product
                                    </Label>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex gap-2">
                            <Button type="submit" className="flex-1" disabled={saving}>
                                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                            <Button type="button" variant="outline" asChild>
                                <Link href="/admin/products">Cancel</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
