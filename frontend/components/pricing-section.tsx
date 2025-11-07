"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    credits: 10,
    price: 4.99,
    features: ["10 Analysis Attempts", "All Core Features", "Email Support", "PDF Reports"],
  },
  {
    name: "Professional",
    credits: 50,
    price: 19.99,
    features: ["50 Analysis Attempts", "Priority Support", "Custom Reports", "AI Humanization"],
    popular: true,
  },
  {
    name: "Power User",
    credits: 100,
    price: 34.99,
    features: ["100 Analysis Attempts", "24/7 Priority Support", "Unlimited Reports", "API Access"],
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h2>
        <p className="text-xl text-foreground-muted">Pay only for what you use. No subscriptions, no hidden fees.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={`relative rounded-2xl border-2 p-8 transition-all ${
              plan.popular
                ? "border-primary bg-gradient-to-br from-primary/5 to-primary/10 scale-105"
                : "border-border bg-surface"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-5xl font-bold text-foreground">${plan.price}</span>
                <span className="text-foreground-muted">({plan.credits} attempts)</span>
              </div>
            </div>

            <Link href="/dashboard">
              <button
                className={`w-full py-3 rounded-lg font-semibold mb-8 transition-colors ${
                  plan.popular
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-surface-alt text-foreground hover:bg-border"
                }`}
              >
                Get Started
              </button>
            </Link>

            <div className="space-y-4">
              {plan.features.map((feature, fidx) => (
                <div key={fidx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground-muted">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
