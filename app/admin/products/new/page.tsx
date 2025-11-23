"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ImageUpload } from "@/components/admin/image-upload"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

export default function NewProductPage() {
    const [images, setImages] = useState<string[]>([])
    const [variants, setVariants] = useState([{ name: '', price: '', stock: '' }])

    const addVariant = () => {
        setVariants([...variants, { name: '', price: '', stock: '' }])
    }

    const removeVariant = (index: number) => {
        const newVariants = [...variants]
        newVariants.splice(index, 1)
        setVariants(newVariants)
    }

    const updateVariant = (index: number, field: string, value: string) => {
        const newVariants = [...variants]
        newVariants[index] = { ...newVariants[index], [field]: value }
        setVariants(newVariants)
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/products">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Add New Product</h1>
                    <p className="text-muted-foreground">Create a new product in your catalog</p>
                </div>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Product Details</CardTitle>
                        <CardDescription>Basic information about your product</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Product Name</Label>
                            <Input placeholder="e.g. Wireless Earbuds Pro" />
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                placeholder="Product description..."
                                className="min-h-[150px]"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Images</CardTitle>
                        <CardDescription>Upload product images (max 5)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ImageUpload
                            value={images}
                            onChange={setImages}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Variants & Inventory</CardTitle>
                        <CardDescription>Manage product variants and stock levels</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {variants.map((variant, index) => (
                            <div key={index} className="flex gap-4 items-end border p-4 rounded-lg relative">
                                <div className="grid gap-4 flex-1 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label>Variant Name</Label>
                                        <Input
                                            placeholder="e.g. Blue / Large"
                                            value={variant.name}
                                            onChange={(e) => updateVariant(index, 'name', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Price</Label>
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            value={variant.price}
                                            onChange={(e) => updateVariant(index, 'price', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Stock</Label>
                                        <Input
                                            type="number"
                                            placeholder="0"
                                            value={variant.stock}
                                            onChange={(e) => updateVariant(index, 'stock', e.target.value)}
                                        />
                                    </div>
                                </div>
                                {variants.length > 1 && (
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => removeVariant(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button variant="outline" onClick={addVariant} className="w-full">
                            <Plus className="mr-2 h-4 w-4" /> Add Variant
                        </Button>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button variant="outline" asChild>
                        <Link href="/admin/products">Cancel</Link>
                    </Button>
                    <Button>Create Product</Button>
                </div>
            </div>
        </div>
    )
}
