"use client"

import NavBar from "@/components/nav-bar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$9",
      period: "/month",
      description: "Perfect for individuals",
      credits: 50,
      features: [
        "50 analyses per month",
        "Grammar checking",
        "Basic style suggestions",
        "Email support",
        "Export to TXT",
      ],
    },
    {
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "For content creators",
      credits: 300,
      popular: true,
      features: [
        "300 analyses per month",
        "All Starter features",
        "Advanced plagiarism detection",
        "AI content detection",
        "Priority support",
        "Export to PDF & CSV",
        "History & analytics",
      ],
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For teams & organizations",
      credits: 1000,
      features: [
        "1000+ analyses per month",
        "All Professional features",
        "Team collaboration",
        "Custom integrations",
        "Dedicated account manager",
        "API access",
        "Advanced analytics",
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-surface to-background">
      <NavBar />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Transparent Pricing</h1>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Choose the perfect plan for your writing needs. Always transparent, no hidden fees.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative rounded-2xl p-8 border transition-all ${
                  plan.popular
                    ? "border-primary bg-gradient-to-br from-surface to-surface/50 ring-2 ring-primary/30"
                    : "border-border bg-surface hover:border-primary/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-foreground-muted text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-foreground-muted">{plan.period}</span>
                  </div>
                  <p className="text-foreground-muted text-sm mt-2">{plan.credits} analyses</p>
                </div>

                <Button
                  className={`w-full mb-8 font-semibold ${
                    plan.popular
                      ? "bg-primary hover:bg-blue-700 text-white"
                      : "bg-surface border border-border hover:bg-surface/80"
                  }`}
                >
                  Get Started
                </Button>

                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
