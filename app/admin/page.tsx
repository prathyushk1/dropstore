import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingCart, Package, Users } from "lucide-react"

const stats = [
  { label: 'Total Revenue', value: '₹1,24,500', icon: DollarSign, change: '+12.5%' },
  { label: 'Orders', value: '156', icon: ShoppingCart, change: '+8.2%' },
  { label: 'Products', value: '89', icon: Package, change: '+3' },
  { label: 'Customers', value: '1,234', icon: Users, change: '+18.7%' },
]

const recentOrders = [
  { id: 'ORD-001', customer: 'John Doe', total: 2999, status: 'Delivered', date: '2024-01-15' },
  { id: 'ORD-002', customer: 'Jane Smith', total: 8999, status: 'Shipped', date: '2024-01-14' },
  { id: 'ORD-003', customer: 'Bob Johnson', total: 1499, status: 'Processing', date: '2024-01-14' },
  { id: 'ORD-004', customer: 'Alice Brown', total: 5499, status: 'Pending', date: '2024-01-13' },
]

const topProducts = [
  { name: 'Wireless Earbuds Pro', sales: 45, revenue: 134955 },
  { name: 'Smart Watch Ultra', sales: 32, revenue: 287968 },
  { name: 'Laptop Stand', sales: 28, revenue: 41972 },
  { name: 'USB-C Hub', sales: 24, revenue: 47976 },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your store performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{order.id}</div>
                    <div className="text-sm text-muted-foreground">{order.customer}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">₹{order.total}</div>
                    <div className="text-sm text-muted-foreground">{order.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{product.name}</div>
                    <div className="text-sm text-muted-foreground">{product.sales} sales</div>
                  </div>
                  <div className="font-semibold">₹{product.revenue}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
