'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const savedAddresses = [
  {
    id: '1',
    name: 'John Doe',
    phone: '9876543210',
    address: '123 Main St, Apartment 4B',
    city: 'Mumbai',
    state: 'Maharashtra',
    postal_code: '400001',
    isDefault: true,
  },
]

const cartItems = [
  { name: 'Wireless Earbuds Pro', price: 2999, quantity: 1 },
  { name: 'Smart Watch Ultra', price: 8999, quantity: 2 },
]

export default function CheckoutPage() {
  const [selectedAddress, setSelectedAddress] = useState('1')
  const [paymentMethod, setPaymentMethod] = useState('razorpay')

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0
  const total = subtotal + shipping

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                {savedAddresses.map((addr) => (
                  <div key={addr.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                    <RadioGroupItem value={addr.id} id={addr.id} />
                    <label htmlFor={addr.id} className="flex-1 cursor-pointer">
                      <div className="font-semibold">{addr.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {addr.address}, {addr.city}, {addr.state} - {addr.postal_code}
                      </div>
                      <div className="text-sm text-muted-foreground">Phone: {addr.phone}</div>
                    </label>
                  </div>
                ))}
              </RadioGroup>

              <Button variant="outline" className="w-full">+ Add New Address</Button>

              <div className="grid gap-4 pt-4 border-t">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="9876543210" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="House no, Street name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Mumbai" />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="Maharashtra" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="postal">Postal Code</Label>
                    <Input id="postal" placeholder="400001" />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" value="India" readOnly />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value="razorpay" id="razorpay" />
                  <label htmlFor="razorpay" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Razorpay (UPI, Cards, Wallets)</div>
                    <div className="text-sm text-muted-foreground">
                      Pay securely using UPI, Credit/Debit cards, or Wallets
                    </div>
                  </label>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value="cod" id="cod" />
                  <label htmlFor="cod" className="flex-1 cursor-pointer">
                    <div className="font-semibold">Cash on Delivery</div>
                    <div className="text-sm text-muted-foreground">
                      Pay when you receive the product
                    </div>
                  </label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {cartItems.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <Button className="w-full" size="lg">
                Place Order
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By placing your order, you agree to our Terms & Conditions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
