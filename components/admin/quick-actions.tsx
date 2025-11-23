import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, ShoppingCart, Users, FileText } from "lucide-react"

export function QuickActions() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5">
                <Link href="/admin/products/new">
                    <Plus className="h-6 w-6" />
                    <span>Add Product</span>
                </Link>
            </Button>
            <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5">
                <Link href="/admin/orders">
                    <ShoppingCart className="h-6 w-6" />
                    <span>View Orders</span>
                </Link>
            </Button>
            <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5">
                <Link href="/admin/customers">
                    <Users className="h-6 w-6" />
                    <span>Manage Customers</span>
                </Link>
            </Button>
            <Button asChild variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5">
                <Link href="/admin/reports">
                    <FileText className="h-6 w-6" />
                    <span>View Reports</span>
                </Link>
            </Button>
        </div>
    )
}
