'use client'

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { LayoutDashboard, Package, FolderTree, ShoppingCart, Tag, Settings, Menu, X, LogOut } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { ErrorBoundary } from "@/components/error-boundary"

export const dynamic = 'force-dynamic'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Package, label: 'Products', href: '/admin/products' },
  { icon: FolderTree, label: 'Categories', href: '/admin/categories' },
  { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
  { icon: Tag, label: 'Coupons', href: '/admin/coupons' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
]

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkAuth = async () => {
    // Don't check auth on login pages
    if (pathname?.includes('/admin/login')) {
      setIsLoading(false)
      setIsAuthenticated(false)
      return
    }

    try {
      const response = await fetch("/api/admin/check-auth", {
        cache: 'no-store'
      })

      if (response.ok) {
        setIsAuthenticated(true)
      } else {
        router.push("/admin/login-simple")
      }
    } catch (error) {
      console.error('Auth check error:', error)
      router.push("/admin/login-simple")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      toast.success("Logged out successfully")
      router.push("/admin/login-simple")
      router.refresh()
    } catch (error) {
      toast.error("Logout failed")
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Login pages - render without layout
  if (!isAuthenticated) {
    if (pathname?.includes('/admin/login')) {
      return <main className="min-h-screen">{children}</main>
    }

    // Redirecting state
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">Redirecting to login...</p>
        <Button variant="link" onClick={() => router.push('/admin/login-simple')}>
          Click here if not redirected
        </Button>
      </div>
    )
  }

  // Authenticated - render full admin layout
  return (
    <div className="flex min-h-screen">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white shadow-lg"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 border-r bg-muted/40
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        <div className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="space-y-1 px-3 flex-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">{children}</main>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </ErrorBoundary>
  )
}
