"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface VariantOption {
  id: string
  label: string
  available?: boolean
}

interface VariantSelectorProps {
  label: string
  options: VariantOption[]
  selected: string
  onChange: (value: string) => void
  type?: "button" | "color" | "size"
}

export function VariantSelector({
  label,
  options,
  selected,
  onChange,
  type = "button"
}: VariantSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected === option.id
          const isAvailable = option.available !== false

          if (type === "color") {
            return (
              <button
                key={option.id}
                onClick={() => isAvailable && onChange(option.id)}
                disabled={!isAvailable}
                className={cn(
                  "relative h-10 w-10 rounded-full border-2 transition-all",
                  isSelected ? "border-primary scale-110" : "border-muted",
                  !isAvailable && "opacity-50 cursor-not-allowed"
                )}
                style={{ backgroundColor: option.label }}
                title={option.label}
              >
                {isSelected && (
                  <Check className="h-5 w-5 text-white absolute inset-0 m-auto" />
                )}
              </button>
            )
          }

          return (
            <button
              key={option.id}
              onClick={() => isAvailable && onChange(option.id)}
              disabled={!isAvailable}
              className={cn(
                "px-4 py-2 rounded-md border transition-all text-sm font-medium",
                isSelected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input bg-background hover:bg-accent",
                !isAvailable && "opacity-50 cursor-not-allowed line-through"
              )}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
