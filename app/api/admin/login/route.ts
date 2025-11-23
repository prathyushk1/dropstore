import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    // Get admin password from environment variable
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123"

    if (password === ADMIN_PASSWORD) {
      // Set a secure cookie for admin session
      cookies().set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    )
  }
}
