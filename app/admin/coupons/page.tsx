import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"

export const dynamic = 'force-dynamic'

const coupons = [
  { id: '1', code: 'WELCOME10', type: 'percentage', value: 10, minOrder: 500, used: 45, limit: 100, status: 'active' },
  { id: '2', code: 'FLAT200', type: 'fixed', value: 200, minOrder: 1000, used: 23, limit: 50, status: 'active' },
  { id: '3', code: 'SUMMER25', type: 'percentage', value: 25, minOrder: 2000, used: 12, limit: 30, status: 'active' },
  { id: '4', code: 'EXPIRED', type: 'percentage', value: 15, minOrder: 500, used: 100, limit: 100, status: 'expired' },
]

export default function AdminCouponsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Coupons</h1>
          <p className="text-muted-foreground">Manage discount coupons</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Coupon
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-4 font-semibold">Code</th>
                  <th className="text-left p-4 font-semibold">Type</th>
                  <th className="text-left p-4 font-semibold">Value</th>
                  <th className="text-left p-4 font-semibold">Min Order</th>
                  <th className="text-left p-4 font-semibold">Usage</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-right p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="border-b last:border-0">
                    <td className="p-4 font-mono font-semibold">{coupon.code}</td>
                    <td className="p-4 capitalize">{coupon.type}</td>
                    <td className="p-4">
                      {coupon.type === 'percentage' ? `${coupon.value}%` : `₹${coupon.value}`}
                    </td>
                    <td className="p-4">₹{coupon.minOrder}</td>
                    <td className="p-4">
                      {coupon.used}/{coupon.limit}
                    </td>
                    <td className="p-4">
                      <Badge variant={coupon.status === 'active' ? 'default' : 'secondary'}>
                        {coupon.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
