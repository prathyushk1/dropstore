'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle2, CreditCard, Truck, ShieldCheck, Lock } from "lucide-react"

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
  { name: 'Wireless Earbuds Pro Max', price: 2999, quantity: 1, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&q=80' },
  { name: 'Smart Watch Ultra', price: 8999, quantity: 2, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80' },
]

export default function CheckoutPage() {
  const [selectedAddress, setSelectedAddress] = useState('1')
  const [paymentMethod, setPaymentMethod] = useState('razorpay')

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 sm:py-12">
      <div className="container px-4">
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-2 text-green-600">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              Cart
            </div>
            <div className="h-px w-12 bg-gray-300" />
            <div className="flex items-center gap-2 text-purple-600">
              <div className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-200">
                2
              </div>
              Checkout
            </div>
            <div className="h-px w-12 bg-gray-300" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                3
              </div>
              Payment
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5 text-purple-600" />
                Shipping Address
              </h2>
              <Card className="border-0 shadow-md ring-1 ring-gray-100 overflow-hidden">
                <CardContent className="p-6">
                  <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress} className="space-y-4">
                    {savedAddresses.map((addr) => (
                      <div key={addr.id} className={`relative flex items-start space-x-4 p-4 border-2 rounded-xl transition-all cursor-pointer ${selectedAddress === addr.id ? 'border-purple-600 bg-purple-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                        <RadioGroupItem value={addr.id} id={addr.id} className="mt-1" />
                        <label htmlFor={addr.id} className="flex-1 cursor-pointer">
                          <div className="flex justify-between mb-1">
                            <span className="font-bold text-foreground">{addr.name}</span>
                            {addr.isDefault && <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-muted-foreground">Default</span>}
                          </div>
                          <div className="text-sm text-muted-foreground leading-relaxed mb-2">
                            {addr.address}, {addr.city}, {addr.state} - {addr.postal_code}
                          </div>
                          <div className="text-sm font-medium text-foreground">Phone: {addr.phone}</div>
                        </label>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="mt-6">
                    <Button variant="outline" className="w-full border-dashed border-2 hover:border-purple-500 hover:text-purple-600 h-12">
                      + Add New Address
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-purple-600" />
                Payment Method
              </h2>
              <Card className="border-0 shadow-md ring-1 ring-gray-100">
                <CardContent className="p-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    <div className={`flex items-center space-x-4 p-4 border-2 rounded-xl transition-all cursor-pointer ${paymentMethod === 'razorpay' ? 'border-purple-600 bg-purple-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                      <RadioGroupItem value="razorpay" id="razorpay" />
                      <label htmlFor="razorpay" className="flex-1 cursor-pointer flex items-center justify-between">
                        <div>
                          <div className="font-bold text-foreground">Pay Online</div>
                          <div className="text-sm text-muted-foreground">UPI, Credit/Debit Cards, NetBanking</div>
                        </div>
                        <div className="flex gap-2">
                          {/* Icons placeholder */}
                          <div className="h-6 w-10 bg-white border rounded" />
                          <div className="h-6 w-10 bg-white border rounded" />
                          <div className="h-6 w-10 bg-white border rounded" />
                        </div>
                      </label>
                    </div>
                    <div className={`flex items-center space-x-4 p-4 border-2 rounded-xl transition-all cursor-pointer ${paymentMethod === 'cod' ? 'border-purple-600 bg-purple-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                      <RadioGroupItem value="cod" id="cod" />
                      <label htmlFor="cod" className="flex-1 cursor-pointer">
                        <div className="font-bold text-foreground">Cash on Delivery</div>
                        <div className="text-sm text-muted-foreground">Pay when you receive the order</div>
                      </label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="border-0 shadow-xl bg-white ring-1 ring-gray-100 overflow-hidden">
              <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4 max-h-60 overflow-auto pr-2 custom-scrollbar">
                  {cartItems.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="h-16 w-16 rounded-lg bg-gray-100 relative overflow-hidden shrink-0 border">
                        {/* Image placeholder if needed, using div for now or img tag */}
                        <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-bold mt-1">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-dashed pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between items-baseline">
                    <span className="text-base font-bold">Total Amount</span>
                    <span className="text-2xl font-bold text-purple-600">₹{total}</span>
                  </div>
                </div>

                <Button className="w-full h-12 text-lg bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all">
                  Place Order
                </Button>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-gray-50 p-2 rounded-lg">
                  <Lock className="h-3 w-3" />
                  Payments are 100% secure and encrypted
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
