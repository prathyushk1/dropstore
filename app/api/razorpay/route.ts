import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { nanoid } from 'nanoid'

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: Request) {
    try {
        const { amount, currency = 'INR' } = await req.json()

        const options = {
            amount: Math.round(amount * 100), // amount in smallest currency unit
            currency,
            receipt: nanoid(),
        }

        const order = await razorpay.orders.create(options)

        return NextResponse.json(order)
    } catch (error) {
        console.error('Razorpay Error:', error)
        return NextResponse.json(
            { error: 'Error creating order' },
            { status: 500 }
        )
    }
}
