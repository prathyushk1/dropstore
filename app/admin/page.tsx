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
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Overview of your store performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 p-3 sm:p-6 sm:pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-3 sm:p-6 pt-0">
              <div className="text-lg sm:text-2xl font-bold">{stat.value}</div>
              <p className="text-[10px] sm:text-xs text-green-600">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm sm:text-base truncate">{order.id}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground truncate">{order.customer}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-semibold text-sm sm:text-base">₹{order.total}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{order.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Top Products</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4">
              {topProducts.map((product, i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm sm:text-base truncate">{product.name}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{product.sales} sales</div>
                  </div>
                  <div className="font-semibold text-sm sm:text-base flex-shrink-0">₹{product.revenue}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
