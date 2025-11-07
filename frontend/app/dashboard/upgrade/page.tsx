"use client"

import DashboardLayout from "@/components/dashboard-layout"
import PricingCard from "@/components/pricing-card"
import { useState } from "react"
import { Sparkles, Zap, Crown } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: 9,
    credits: 100,
    icon: Sparkles,
    features: [
      "100 analysis credits/month",
      "Grammar & spelling checks",
      "Basic readability analysis",
      "Download text reports",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: 29,
    credits: 500,
    icon: Zap,
    highlighted: true,
    features: [
      "500 analysis credits/month",
      "All Starter features",
      "Plagiarism detection",
      "AI content detection",
      "Advanced style analysis",
      "Priority email support",
      "Bulk analysis",
    ],
  },
  {
    name: "Enterprise",
    price: 99,
    credits: 2000,
    icon: Crown,
    features: [
      "2000+ analysis credits/month",
      "All Professional features",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
      "24/7 priority support",
      "Custom reports",
    ],
  },
]

export default function UpgradePage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Upgrade Your Plan</h1>
          <p className="text-foreground-muted">Choose the perfect plan for your needs</p>
        </div>

        <div className="flex items-center gap-4 justify-center">
          <span className={billingCycle === "monthly" ? "text-foreground font-semibold" : "text-foreground-muted"}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
            className="relative inline-flex h-8 w-14 items-center rounded-full bg-surface border border-border"
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-primary transition-transform ${
                billingCycle === "yearly" ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
          <span className={billingCycle === "yearly" ? "text-foreground font-semibold" : "text-foreground-muted"}>
            Yearly
            <span className="ml-2 text-xs bg-accent/20 text-accent px-2 py-1 rounded">Save 20%</span>
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon
            const yearlyPrice = billingCycle === "yearly" ? Math.floor(plan.price * 12 * 0.8) : plan.price
            const displayPrice = billingCycle === "yearly" ? Math.floor(yearlyPrice / 12) : plan.price

            return (
              <div key={plan.name} className="relative">
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <Icon className="w-6 h-6 text-primary bg-background px-2 py-1" />
                </div>
                <PricingCard
                  name={plan.name}
                  price={displayPrice}
                  credits={plan.credits}
                  features={plan.features}
                  highlighted={plan.highlighted}
                />
              </div>
            )
          })}
        </div>

        <div className="card-premium bg-gradient-to-r from-primary/10 to-blue-600/10 border-primary/30">
          <h3 className="text-lg font-semibold text-foreground mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-foreground mb-2">Can I change plans anytime?</p>
              <p className="text-foreground-muted text-sm">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">Do credits roll over?</p>
              <p className="text-foreground-muted text-sm">
                Credits expire at the end of each billing cycle. We recommend using them throughout your subscription.
              </p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">Is there a free trial?</p>
              <p className="text-foreground-muted text-sm">
                Yes! New users get 10 free analysis credits to try LinguoAI risk-free.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
