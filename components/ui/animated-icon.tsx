"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnimatedIconProps {
    icon: LucideIcon
    className?: string
}

export const AnimatedIcon = ({ icon: Icon, className }: AnimatedIconProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            className={cn("inline-flex items-center justify-center", className)}
        >
            <Icon className="w-full h-full" />
        </motion.div>
    )
}
