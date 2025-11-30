'use client'

export default function AdminTestPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Admin Test Page</h1>
            <p>If you can see this, the AdminLayout is working correctly.</p>
            <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
                ✅ Layout is rendering children properly
            </div>
        </div>
    )
}
