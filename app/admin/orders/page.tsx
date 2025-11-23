"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, Printer, MoreHorizontal, Mail, Download } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"

const initialOrders = [
  { id: 'ORD-001', customer: 'John Doe', email: 'john@example.com', total: 2999, status: 'delivered', date: '2024-01-15', items: 2 },
  { id: 'ORD-002', customer: 'Jane Smith', email: 'jane@example.com', total: 8999, status: 'shipped', date: '2024-01-14', items: 1 },
  { id: 'ORD-003', customer: 'Bob Johnson', email: 'bob@example.com', total: 1499, status: 'processing', date: '2024-01-14', items: 3 },
  { id: 'ORD-004', customer: 'Alice Brown', email: 'alice@example.com', total: 5499, status: 'pending', date: '2024-01-13', items: 2 },
]

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(initialOrders)
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(orders.map(o => o.id))
    }
  }

  const toggleSelect = (id: string) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter(o => o !== id))
    } else {
      setSelectedOrders([...selectedOrders, id])
    }
  }

  const updateStatus = (id: string, newStatus: string) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    ))
  }

  const handleBulkStatusUpdate = (newStatus: string) => {
    setOrders(orders.map(order =>
      selectedOrders.includes(order.id) ? { ...order, status: newStatus } : order
    ))
    setSelectedOrders([])
  }

  const handlePrintInvoice = (id: string) => {
    console.log(`Printing invoice for ${id}`)
    // In a real app, this would generate a PDF or open a print view
    window.print()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">Manage customer orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {selectedOrders.length > 0 && (
        <div className="bg-muted/50 p-4 rounded-lg flex items-center justify-between">
          <span className="text-sm font-medium">{selectedOrders.length} selected</span>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Update Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleBulkStatusUpdate('processing')}>
                  Mark as Processing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkStatusUpdate('shipped')}>
                  Mark as Shipped
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkStatusUpdate('delivered')}>
                  Mark as Delivered
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print Invoices
            </Button>
          </div>
        </div>
      )}

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="p-4 w-[50px]">
                    <Checkbox
                      checked={selectedOrders.length === orders.length && orders.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </th>
                  <th className="text-left p-4 font-semibold">Order ID</th>
                  <th className="text-left p-4 font-semibold">Customer</th>
                  <th className="text-left p-4 font-semibold">Date</th>
                  <th className="text-left p-4 font-semibold">Items</th>
                  <th className="text-left p-4 font-semibold">Total</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-right p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <Checkbox
                        checked={selectedOrders.includes(order.id)}
                        onCheckedChange={() => toggleSelect(order.id)}
                      />
                    </td>
                    <td className="p-4 font-medium">{order.id}</td>
                    <td className="p-4">
                      <div>{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.email}</div>
                    </td>
                    <td className="p-4 text-muted-foreground">{order.date}</td>
                    <td className="p-4">{order.items}</td>
                    <td className="p-4 font-semibold">₹{order.total}</td>
                    <td className="p-4">
                      <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handlePrintInvoice(order.id)}>
                          <Printer className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" /> Email Customer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                <DropdownMenuRadioGroup
                                  value={order.status}
                                  onValueChange={(value) => updateStatus(order.id, value)}
                                >
                                  <DropdownMenuRadioItem value="pending">Pending</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="processing">Processing</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="shipped">Shipped</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="delivered">Delivered</DropdownMenuRadioItem>
                                  <DropdownMenuRadioItem value="cancelled">Cancelled</DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
