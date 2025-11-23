import { NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import { nanoid } from 'nanoid'

// Lazy initialize Razorpay to avoid build-time errors
function getRazorpayInstance() {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (!keyId || !keySecret) {
        throw new Error('Razorpay credentials not configured')
    }

    return new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
    })
}

export async function POST(req: Request) {
    try {
        const { amount, currency = 'INR' } = await req.json()

        // Initialize Razorpay only when needed
        const razorpay = getRazorpayInstance()

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
            { error: error instanceof Error ? error.message : 'Error creating order' },
            { status: 500 }
        )
    }
}
