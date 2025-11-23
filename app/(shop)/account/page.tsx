import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Package, MapPin, Heart, Settings } from "lucide-react"

const menuItems = [
  { icon: User, label: 'Profile', href: '/account/profile' },
  { icon: Package, label: 'Orders', href: '/account/orders' },
  { icon: MapPin, label: 'Addresses', href: '/account/addresses' },
  { icon: Heart, label: 'Wishlist', href: '/account/wishlist' },
  { icon: Settings, label: 'Settings', href: '/account/settings' },
]

const recentOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'Delivered',
    total: 2999,
    items: 2,
  },
  {
    id: 'ORD-002',
    date: '2024-01-10',
    status: 'Shipped',
    total: 8999,
    items: 1,
  },
]

export default function AccountPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="space-y-2">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost" className="w-full justify-start">
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </aside>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          {/* Profile Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">John Doe</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">john@example.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium">+91 9876543210</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">Edit Profile</Button>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/account/orders">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-semibold">{order.id}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.items} items • {order.date}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₹{order.total}</div>
                      <div className="text-sm text-green-600">{order.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Package className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold mb-2">Track Orders</h3>
                <p className="text-sm text-muted-foreground">View and track your orders</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 mx-auto mb-4 text-red-500" />
                <h3 className="font-semibold mb-2">Wishlist</h3>
                <p className="text-sm text-muted-foreground">View your saved items</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
