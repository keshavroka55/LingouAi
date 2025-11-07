"use client"

import { Check } from "lucide-react"
import { useRouter } from "next/navigation"

interface PricingCardProps {
  name: string
  price: number
  credits: number
  features: string[]
  highlighted?: boolean
}

export default function PricingCard({ name, price, credits, features, highlighted }: PricingCardProps) {
  const router = useRouter()

  const handleUpgrade = () => {
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/auth/signup")
    } else {
      router.push("/dashboard/upgrade")
    }
  }

  return (
    <div
      className={`card-premium transition-transform hover:scale-105 ${
        highlighted ? "ring-2 ring-primary scale-105" : ""
      }`}
    >
      {highlighted && (
        <div className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
          Most Popular
        </div>
      )}

      <h3 className="text-xl font-bold text-foreground mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold text-foreground">${price}</span>
        <span className="text-foreground-muted text-sm">/month</span>
      </div>

      <div className="mb-6 p-3 bg-primary/10 rounded-lg">
        <p className="text-primary font-semibold text-lg">{credits} Credits</p>
        <p className="text-sm text-foreground-muted">Unlimited analyses</p>
      </div>

      <button
        onClick={handleUpgrade}
        className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors mb-6 ${
          highlighted
            ? "bg-primary text-white hover:bg-primary/90"
            : "bg-surface text-foreground border border-border hover:bg-surface-alt"
        }`}
      >
        Get Started
      </button>

      <div className="space-y-3">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-2">
            <Check className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="text-sm text-foreground-muted">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
