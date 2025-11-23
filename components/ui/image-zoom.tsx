"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "./dialog"
import { cn } from "@/lib/utils"
import { ZoomIn } from "lucide-react"

interface ImageZoomProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

export function ImageZoom({ src, alt, className, width = 600, height = 600 }: ImageZoomProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div 
        className={cn("relative group cursor-zoom-in overflow-hidden", className)}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={1200}
            className="w-full h-auto"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
