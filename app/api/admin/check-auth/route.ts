import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const adminSession = cookies().get("admin_session")
  
  if (adminSession?.value === "authenticated") {
    return NextResponse.json({ authenticated: true })
  }

  return NextResponse.json(
    { authenticated: false },
    { status: 401 }
  )
}
