import { cookies } from "next/headers"

export function isAdminAuthenticated(): boolean {
  const adminSession = cookies().get("admin_session")
  return adminSession?.value === "authenticated"
}

export function requireAdminAuth() {
  if (!isAdminAuthenticated()) {
    throw new Error("Unauthorized")
  }
}
