import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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

const recentOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'Delivered',
    total: 2999,
    items: 2,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&q=80'
  },
  {
    id: 'ORD-002',
    date: '2024-01-10',
    status: 'Shipped',
    total: 8999,
    items: 1,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80'
  },
]

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-8 sm:py-12">
      <div className="container px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Account</h1>
            <p className="text-muted-foreground">Manage your profile and orders</p>
          </div>
          <Button variant="destructive" className="gap-2 shadow-md">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="space-y-2">
            <Card className="overflow-hidden border-0 shadow-md ring-1 ring-gray-100">
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

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Profile Overview */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 border-0 shadow-md ring-1 ring-gray-100 bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold border-2 border-white/30">
                        JD
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">John Doe</h2>
                        <p className="text-purple-100">john@example.com</p>
                        <Badge className="mt-2 bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">
                          Premium Member
                        </Badge>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-sm">
                      Edit Profile
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <p className="text-purple-200 text-xs uppercase tracking-wider">Phone</p>
                      <p className="font-medium">+91 98765 43210</p>
                    </div>
                    <div>
                      <p className="text-purple-200 text-xs uppercase tracking-wider">Location</p>
                      <p className="font-medium">Mumbai, India</p>
                    </div>
                    <div>
                      <p className="text-purple-200 text-xs uppercase tracking-wider">Joined</p>
                      <p className="font-medium">Jan 2024</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md ring-1 ring-gray-100 flex flex-col justify-center items-center p-6 text-center">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-3">
                  <Package className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-foreground">12</div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <Button variant="link" className="text-purple-600 mt-2 h-auto p-0">
                  View History
                </Button>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="border-0 shadow-md ring-1 ring-gray-100">
              <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50 pb-4">
                <CardTitle className="text-lg">Recent Orders</CardTitle>
                <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50" asChild>
                  <Link href="/account/orders">View All Orders</Link>
                </Button>
              </CardHeader>
              <CardContent className="p-0">
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
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 gap-6">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-sm ring-1 ring-gray-100">
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
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-sm ring-1 ring-gray-100">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
