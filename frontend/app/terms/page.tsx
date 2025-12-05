"use client"

import NavBar from "@/components/nav-bar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-surface to-background">
      <NavBar />

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
            <p className="text-foreground-muted">Last updated: January 2025</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {[
              {
                title: "1. Acceptance of Terms",
                content:
                  "By accessing and using DetectorAI, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
              },
              {
                title: "2. User Accounts",
                content:
                  "You are responsible for maintaining the confidentiality of your account information and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account.",
              },
              {
                title: "3. Acceptable Use",
                content:
                  "You agree not to use the service for any unlawful purposes or in any way that could damage, disable, or impair the service. This includes using the service to harass, abuse, or harm others.",
              },
              {
                title: "4. Intellectual Property",
                content:
                  "Content on the service is the property of DetectorAI or its content suppliers and is protected by international copyright laws. The compilation of all content on this service is the exclusive property of DetectorAI.",
              },
              {
                title: "5. Disclaimer of Warranties",
                content:
                  "The service is provided on an 'as is' basis. DetectorAI makes no representations or warranties of any kind, express or implied, as to the operation of the service or the information, content, or materials included on the service.",
              },
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <h2 className="text-xl font-bold text-foreground mb-3">{section.title}</h2>
                <p className="text-foreground-muted leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
