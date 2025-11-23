"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Grid, ShoppingBag, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
    {
        label: "Home",
        href: "/",
        icon: Home,
    },
    {
        label: "Categories",
        href: "/products",
        icon: Grid,
    },
    {
        label: "Cart",
        href: "/cart",
        icon: ShoppingBag,
    },
    {
        label: "Account",
        href: "/account",
        icon: User,
    },
]

export function MobileNav() {
    const pathname = usePathname()

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-t border-gray-200 md:hidden pb-safe">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full space-y-1",
                                isActive
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-primary transition-colors"
                            )}
                        >
                            <item.icon
                                className={cn("h-5 w-5", isActive && "fill-current")}
                            />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
