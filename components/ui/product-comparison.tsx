"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "./button"
import { Card } from "./card"
import { Badge } from "./badge"
import { X, Check, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  price: number
  image: string
  rating?: number
  features: Record<string, string | boolean>
}

interface ProductComparisonProps {
  products: Product[]
  onRemove: (id: string) => void
  onClear: () => void
}

export function ProductComparison({ products, onRemove, onClear }: ProductComparisonProps) {
  if (products.length === 0) return null

  // Get all unique features
  const allFeatures = Array.from(
    new Set(products.flatMap(p => Object.keys(p.features)))
  )

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Compare Products</h2>
        <Button variant="outline" size="sm" onClick={onClear}>
          Clear All
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-4 border-b">Feature</th>
              {products.map((product) => (
                <th key={product.id} className="p-4 border-b min-w-[200px]">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2"
                      onClick={() => onRemove(product.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={150}
                      height={150}
                      className="mx-auto mb-2 rounded-lg"
                    />
                    <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
                    <p className="text-lg font-bold">${product.price}</p>
                    {product.rating && (
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm">{product.rating}</span>
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allFeatures.map((feature) => (
              <tr key={feature} className="border-b">
                <td className="p-4 font-medium capitalize">{feature}</td>
                {products.map((product) => {
                  const value = product.features[feature]
                  return (
                    <td key={product.id} className="p-4 text-center">
                      {typeof value === "boolean" ? (
                        value ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <Minus className="h-5 w-5 text-muted-foreground mx-auto" />
                        )
                      ) : (
                        <span>{value || "-"}</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
