import type { Metadata, Viewport } from "next"
import { Inter, Outfit } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' })
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' })

export const metadata: Metadata = {
  title: "Dropshipping Store - Quality Products at Best Prices",
  description: "Shop the latest trending products with fast shipping and great deals",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
