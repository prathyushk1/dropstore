import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function isSupabaseAdmin(): Promise<boolean> {
  try {
    const supabase = createServerComponentClient({ cookies })
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return false

    // Check if user is in admin_users table
    const { data: adminData, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("user_id", user.id)
      .single()

    return !error && !!adminData
  } catch (error) {
    return false
  }
}

export async function requireSupabaseAdmin() {
  const isAdmin = await isSupabaseAdmin()
  
  if (!isAdmin) {
    throw new Error("Unauthorized: Admin access required")
  }
}

export async function getAdminUser() {
  try {
    const supabase = createServerComponentClient({ cookies })
    
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return null

    const { data: adminData } = await supabase
      .from("admin_users")
      .select("*")
      .eq("user_id", user.id)
      .single()

    return adminData
  } catch (error) {
    return null
  }
}
