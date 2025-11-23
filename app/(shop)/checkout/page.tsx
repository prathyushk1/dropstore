"use client"

import { useState } from "react"

export const dynamic = 'force-dynamic'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Truck, ShieldCheck, Lock, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { Progress } from "@/components/ui/progress"
import { Confetti } from "@/components/ui/confetti"

// Declare Razorpay on window
declare global {
  interface Window {
    Razorpay: any
  }
}

export default function CheckoutPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("razorpay")
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])

  // Load cart from localStorage
  useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    }
  })

  // Calculate totals from cart
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = Math.round(cartTotal * 0.18)
  const shipping = cartTotal > 500 ? 0 : 50
  const total = cartTotal + tax + shipping

  const handlePayment = async () => {
    setLoading(true)

    try {
      // 1. Create Order
      const response = await fetch('/api/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: total }),
      })

      const order = await response.json()

      if (!response.ok) {
        throw new Error(order.error || 'Something went wrong')
      }

      // 2. Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "MyShop Premium",
        description: "Transaction for Order #" + order.id,
        order_id: order.id,
        handler: async function (response: any) {
          // Handle Success
          setPaymentSuccess(true)
          toast.success("Payment Successful!", {
            description: `Payment ID: ${response.razorpay_payment_id}`
          })

          // Here you would typically save the order to Supabase
          // await saveOrder(response)

          setTimeout(() => {
            router.push('/account/orders')
          }, 3000)
        },
        prefill: {
          name: "John Doe", // Replace with user data
          email: "john@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#7c3aed", // Primary color
        },
      }

      const rzp1 = new window.Razorpay(options)
      rzp1.open()

    } catch (error) {
      console.error(error)
      toast.error("Payment Failed", {
        description: "Please try again."
      })
    } finally {
      setLoading(false)
    }
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Confetti />
        <div className="text-center space-y-4 animate-in fade-in zoom-in duration-500">
          <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold">Order Confirmed!</h1>
          <p className="text-muted-foreground">Thank you for your purchase. Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-10 px-4 md:px-6">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="container max-w-6xl mx-auto">
        <div className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-muted-foreground">
              <span>Cart</span>
              <span className="text-primary">Payment</span>
              <span>Confirmation</span>
            </div>
            <Progress value={66} className="h-2" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Method
                </CardTitle>
                <CardDescription>Select your preferred payment method.</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid gap-4">
                  <Label
                    htmlFor="razorpay"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                  >
                    <RadioGroupItem value="razorpay" id="razorpay" className="sr-only" />
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        <span className="font-semibold">Razorpay Secure</span>
                      </div>
                      <ShieldCheck className="h-4 w-4 text-green-500" />
                    </div>
                  </Label>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (18%)</span>
                  <span>₹{tax}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full h-12 text-lg shadow-lg"
                  onClick={handlePayment}
                  disabled={loading}
                >
                  {loading ? "Processing..." : `Pay ₹${total}`}
                </Button>
              </CardFooter>
            </Card>

            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-3 w-3" />
              Secure Checkout powered by Razorpay
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
