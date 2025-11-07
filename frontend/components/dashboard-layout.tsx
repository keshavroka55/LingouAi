"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, LogOut, Settings, BarChart3 } from "lucide-react"
import Link from "next/link"
import MobileMenu from "@/components/mobile-menu"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string; name: string } | null>(null)
  const [credits, setCredits] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    const creditsData = localStorage.getItem("credits")

    if (!userData) {
      router.push("/auth/login")
      return
    }

    setUser(JSON.parse(userData))
    setCredits(Number.parseInt(creditsData || "0", 10))
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("credits")
    router.push("/")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-foreground-muted">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-background border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-foreground">LinguoAI</span>
            </Link>

            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-surface rounded-lg flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  Credits: <span className="text-primary">{credits}</span>
                </span>
              </div>
              <button className="p-2 hover:bg-surface rounded-lg transition-colors" title="Settings">
                <Settings className="w-5 h-5 text-foreground-muted" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-surface rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-foreground-muted" />
              </button>
              <MobileMenu />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  )
}
