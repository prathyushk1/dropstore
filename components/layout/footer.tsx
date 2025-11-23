import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 sm:py-10 md:py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">ShopDrop</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Your trusted dropshipping store for quality products at the best prices.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Shop</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link href="/products?category=electronics" className="text-muted-foreground hover:text-foreground transition-colors">Electronics</Link></li>
              <li><Link href="/products?category=fashion" className="text-muted-foreground hover:text-foreground transition-colors">Fashion</Link></li>
              <li><Link href="/products?category=home" className="text-muted-foreground hover:text-foreground transition-colors">Home & Living</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Customer Service</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><Link href="/account" className="text-muted-foreground hover:text-foreground transition-colors">My Account</Link></li>
              <li><Link href="/account/orders" className="text-muted-foreground hover:text-foreground transition-colors">Track Order</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Newsletter</h4>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
              Subscribe to get special offers and updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex h-9 sm:h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs sm:text-sm"
              />
              <button className="px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-md text-xs sm:text-sm font-medium whitespace-nowrap hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 border-t pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
          <p>&copy; 2024 ShopDrop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
