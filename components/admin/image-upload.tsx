"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ImagePlus, X } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
    onChange: (value: string[]) => void
    value: string[]
    maxFiles?: number
}

export function ImageUpload({
    onChange,
    value,
    maxFiles = 5
}: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [previews, setPreviews] = useState<string[]>(value)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return

        const newPreviews = [...previews]

        // In a real app, you would upload these files to a server/storage
        // and get back URLs. Here we'll just create local object URLs for preview.
        Array.from(files).forEach(file => {
            if (newPreviews.length < maxFiles) {
                const url = URL.createObjectURL(file)
                newPreviews.push(url)
            }
        })

        setPreviews(newPreviews)
        onChange(newPreviews)
    }

    const removeImage = (index: number) => {
        const newPreviews = [...previews]
        newPreviews.splice(index, 1)
        setPreviews(newPreviews)
        onChange(newPreviews)
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
                {previews.map((url, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                        <div className="absolute top-2 right-2 z-10">
                            <Button
                                type="button"
                                onClick={() => removeImage(index)}
                                variant="destructive"
                                size="icon"
                                className="h-6 w-6"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            src={url}
                            alt="Image"
                            className="object-cover"
                        />
                    </div>
                ))}
                {previews.length < maxFiles && (
                    <Button
                        type="button"
                        variant="outline"
                        className="aspect-square h-full w-full flex flex-col items-center justify-center gap-2 border-dashed"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <ImagePlus className="h-8 w-8 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Upload Image</span>
                    </Button>
                )}
            </div>
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleFileChange}
            />
        </div>
    )
}
