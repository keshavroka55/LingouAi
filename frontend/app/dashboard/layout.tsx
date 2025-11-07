import type React from "react"
import DashboardSidebar from "@/components/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen p-4">
      <main className="w-full">
        {children}
      </main>
    </div>
  )
}
