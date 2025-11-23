import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
    {
        user: "John Doe",
        action: "placed a new order",
        target: "ORD-001",
        time: "2 minutes ago",
        avatar: "/avatars/01.png",
        initials: "JD"
    },
    {
        user: "Jane Smith",
        action: "registered as a new customer",
        target: "",
        time: "1 hour ago",
        avatar: "/avatars/02.png",
        initials: "JS"
    },
    {
        user: "System",
        action: "Low stock alert for",
        target: "Wireless Earbuds Pro",
        time: "3 hours ago",
        avatar: "",
        initials: "SYS"
    },
    {
        user: "Bob Johnson",
        action: "left a review on",
        target: "Smart Watch Ultra",
        time: "5 hours ago",
        avatar: "/avatars/03.png",
        initials: "BJ"
    },
]

export function RecentActivity() {
    return (
        <div className="space-y-8">
            {activities.map((activity, index) => (
                <div key={index} className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={activity.avatar} alt={activity.user} />
                        <AvatarFallback>{activity.initials}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {activity.user} <span className="text-muted-foreground font-normal">{activity.action}</span> {activity.target && <span className="font-medium">{activity.target}</span>}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {activity.time}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
