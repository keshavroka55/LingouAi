"use client"

import Link from "next/link"
import { FileText, History, Settings, HelpCircle } from "lucide-react"
import { usePathname } from "next/navigation"

export default function DashboardSidebar() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", label: "Analyzer", icon: FileText },
    { href: "/dashboard/history", label: "History", icon: History },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
    { href: "/dashboard/help", label: "Help", icon: HelpCircle },
  ]

  return (
    <div className="card-premium sticky top-20 h-fit">
      <h3 className="font-semibold text-foreground mb-4">Menu</h3>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive ? "bg-primary/10 text-primary" : "text-foreground-muted hover:bg-surface"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
