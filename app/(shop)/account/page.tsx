import Link from "next/link"
import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const dynamic = 'force-dynamic'
import { Badge } from "@/components/ui/badge"
import { User, Package, MapPin, Heart, Settings, LogOut, ChevronRight, CreditCard, Bell } from "lucide-react"

const menuItems = [
  { icon: User, label: 'Profile', href: '/account/profile', active: true },
  { icon: Package, label: 'Orders', href: '/account/orders' },
  { icon: MapPin, label: 'Addresses', href: '/account/addresses' },
  { icon: Heart, label: 'Wishlist', href: '/account/wishlist' },
  { icon: CreditCard, label: 'Payment Methods', href: '/account/payments' },
  { icon: Bell, label: 'Notifications', href: '/account/notifications' },
  { icon: Settings, label: 'Settings', href: '/account/settings' },
]

export default async function AccountPage() {
  const supabase = createServerComponentClient({ cookies })

  // Get authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/auth/login?next=/account')
  }

  // Fetch user profile data
  let userData = null
  try {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()
    userData = data
  } catch (error) {
    console.error('Error fetching user data:', error)
  }

  // Fetch user's orders with error handling
  let orders = []
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(2)

    if (!error && data) {
      orders = data
    }
  } catch (error) {
    console.error('Error fetching orders:', error)
  }

  // Calculate total orders
  let totalOrders = 0
  try {
    const { count } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
    totalOrders = count || 0
  } catch (error) {
    console.error('Error counting orders:', error)
  }

  // Get user initials
  const userName = userData?.name || user.email?.split('@')[0] || 'User'
  const userInitials = userName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  // Format join date
  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  })

  // Transform orders for display - simplified without nested data
  const recentOrders = orders?.map(order => ({
    id: order.order_number || `ORD-${order.id?.slice(0, 8)}`,
    date: new Date(order.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }),
    status: order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending',
    total: order.total || 0,
    items: 0, // Will show 0 items for now
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&q=80'
  })) || []

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 sm:py-12">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Account</h1>
            <p className="text-muted-foreground">Manage your profile and orders</p>
          </div>
          <form action="/api/auth/logout" method="POST">
            <Button type="submit" variant="destructive" className="gap-2 shadow-md">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </form>
        </div>

        {/* Mobile Navigation Menu */}
        <div className="md:hidden mb-6 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={item.active ? "default" : "outline"}
                  size="sm"
                  className={`whitespace-nowrap ${item.active ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar - Hidden on mobile */}
          <aside className="hidden md:block space-y-2">
            <Card className="overflow-hidden border-0 depth-shadow-lg ring-1 ring-gray-100">
              <CardContent className="p-2">
                {menuItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start mb-1 ${item.active ? 'bg-purple-50 text-purple-700 font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      <item.icon className={`mr-3 h-4 w-4 ${item.active ? 'text-purple-600' : ''}`} />
                      {item.label}
                      {item.active && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </aside>

          {/* Main Content - Full width on mobile, 3 cols on desktop */}
          <div className="md:col-span-3 col-span-4 space-y-6">
            {/* Profile Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 border-0 depth-shadow-lg ring-1 ring-gray-100 bg-gradient-to-br from-purple-600 to-indigo-600 text-white card-3d">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold border-2 border-white/30">
                        {userInitials}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{userName}</h2>
                        <p className="text-purple-100">{user.email}</p>
                        <Badge className="mt-2 bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">
                          {userData?.role === 'admin' ? 'Admin' : 'Member'}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm" asChild>
                      <Link href="/account/profile">Edit Profile</Link>
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <p className="text-purple-200 text-xs uppercase tracking-wider">Email</p>
                      <p className="font-medium text-sm truncate">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-purple-200 text-xs uppercase tracking-wider">Status</p>
                      <p className="font-medium">Active</p>
                    </div>
                    <div>
                      <p className="text-purple-200 text-xs uppercase tracking-wider">Joined</p>
                      <p className="font-medium">{joinDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 depth-shadow ring-1 ring-gray-100 flex flex-col justify-center items-center p-6 text-center card-3d-subtle">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-3">
                  <Package className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-foreground">{totalOrders || 0}</div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <Button variant="link" className="text-purple-600 mt-2 h-auto p-0" asChild>
                  <Link href="/account/orders">View History</Link>
                </Button>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="border-0 depth-shadow-lg ring-1 ring-gray-100 card-3d-subtle">
              <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 pb-4">
                <CardTitle className="text-lg">Recent Orders</CardTitle>
                <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50" asChild>
                  <Link href="/account/orders">View All Orders</Link>
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                {recentOrders.length > 0 ? (
                  <div className="divide-y divide-gray-50">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-6 hover:bg-gray-50/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-lg bg-gray-100 relative overflow-hidden border">
                            <img src={order.image} alt={order.id} className="object-cover w-full h-full" />
                          </div>
                          <div>
                            <div className="font-bold text-foreground">{order.id}</div>
                            <div className="text-sm text-muted-foreground">
                              {order.items} items • {order.date}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-foreground">₹{order.total}</div>
                          <Badge
                            variant="secondary"
                            className={
                              order.status === 'Delivered'
                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                : order.status === 'Shipped'
                                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                  : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No orders yet</h3>
                    <p className="text-muted-foreground mb-4">Start shopping to see your orders here</p>
                    <Button asChild>
                      <Link href="/products">Browse Products</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Link href="/account/addresses">
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 depth-shadow ring-1 ring-gray-100 card-3d-subtle">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-blue-600 transition-colors">Manage Addresses</h3>
                      <p className="text-sm text-muted-foreground">Add or remove shipping addresses</p>
                    </div>
                    <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </CardContent>
                </Card>
              </Link>
              <Link href="/account/wishlist">
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 depth-shadow ring-1 ring-gray-100 card-3d-subtle">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                      <Heart className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-red-500 transition-colors">My Wishlist</h3>
                      <p className="text-sm text-muted-foreground">View your saved items</p>
                    </div>
                    <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
