import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-bold text-lg mb-4">ShopDrop</h3>
            <p className="text-sm text-muted-foreground">
              Your trusted dropshipping store for quality products at the best prices.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-foreground">All Products</Link></li>
              <li><Link href="/products?category=electronics" className="text-muted-foreground hover:text-foreground">Electronics</Link></li>
              <li><Link href="/products?category=fashion" className="text-muted-foreground hover:text-foreground">Fashion</Link></li>
              <li><Link href="/products?category=home" className="text-muted-foreground hover:text-foreground">Home & Living</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/account" className="text-muted-foreground hover:text-foreground">My Account</Link></li>
              <li><Link href="/account/orders" className="text-muted-foreground hover:text-foreground">Track Order</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get special offers and updates.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 ShopDrop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
