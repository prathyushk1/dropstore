import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import WishlistClient, { WishlistItem } from "@/components/account/wishlist-client"

export const dynamic = 'force-dynamic'

export default async function WishlistPage() {
  const supabase = createServerComponentClient({ cookies })

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?next=/account/wishlist')
  }

  const { data: wishlistItems } = await supabase
    .from('wishlist')
    .select(`
      id,
      product_id,
      products (
        id,
        name,
        price,
        images,
        stock,
        rating
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">My Wishlist</h1>
            <p className="text-muted-foreground">
              {wishlistItems?.length || 0} items saved for later
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/products">
              Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <WishlistClient initialItems={
          (wishlistItems || []).map((item: any) => ({
            ...item,
            products: Array.isArray(item.products) ? item.products[0] : item.products
          })) as WishlistItem[]
        } />
      </div>
    </div>
  )
}
