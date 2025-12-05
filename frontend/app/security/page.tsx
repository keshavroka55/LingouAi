"use client"

import NavBar from "@/components/nav-bar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { Shield, Lock, Eye, Zap } from "lucide-react"

export default function SecurityPage() {
  const features = [
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All your data is encrypted in transit and at rest using industry-standard protocols.",
    },
    {
      icon: Shield,
      title: "Regular Audits",
      description: "We conduct regular security audits and penetration testing to ensure maximum protection.",
    },
    {
      icon: Eye,
      title: "Privacy First",
      description: "Your text submissions are never stored or used for training. Your privacy is our priority.",
    },
    {
      icon: Zap,
      title: "Compliance",
      description: "We comply with GDPR, CCPA, and other international data protection regulations.",
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
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Security & Compliance</h1>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Your data security is our top priority. Learn about our comprehensive security measures.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-border rounded-xl p-6 bg-surface"
              >
                <feature.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground-muted text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-surface rounded-xl border border-border p-8"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Our Commitment</h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              DetectorAI is committed to maintaining the highest standards of security and data protection. We believe
              that trust is fundamental to our relationship with our users, and we take this responsibility seriously.
            </p>
            <p className="text-foreground-muted leading-relaxed">
              For security concerns or to report a vulnerability, please contact our security team at
              security@DetectorAI.com. We appreciate responsible disclosure and will work with you to resolve any issues
              promptly.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
