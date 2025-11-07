"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function NavBar() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem("user")
    setIsAuthenticated(!!user)
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground">LinguoAI</span>
          </Link>

          <div className="flex items-center gap-8">
            <Link href="#features" className="text-foreground-muted hover:text-foreground">
              Features
            </Link>
            <Link href="#pricing" className="text-foreground-muted hover:text-foreground">
              Pricing
            </Link>
            <Link href="/waitlist" className="text-foreground-muted hover:text-foreground">
              Join Waitlist
            </Link>
            {isAuthenticated ? (
              <button
                onClick={() => router.push("/dashboard")}
                className="px-4 py-2 rounded-lg font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                Dashboard
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => router.push("/auth/login")}
                  className="px-4 py-2 rounded-lg font-medium text-foreground hover:bg-surface transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push("/auth/signup")}
                  className="px-4 py-2 rounded-lg font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
