"use client"

import Lottie from "lottie-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
    animationData: any
    title: string
    description: string
    className?: string
}

export const EmptyState = ({ animationData, title, description, className }: EmptyStateProps) => {
    return (
        <div className={cn("flex flex-col items-center justify-center text-center p-8", className)}>
            <div className="w-64 h-64 mb-6">
                <Lottie animationData={animationData} loop={true} />
            </div>
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground max-w-md">{description}</p>
        </div>
    )
}
