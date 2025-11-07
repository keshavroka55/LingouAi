"use client"

import NavBar from "@/components/nav-bar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"

export default function PrivacyPage() {
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
            <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
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
                title: "1. Information We Collect",
                content:
                  "We collect information you provide directly to us when you create an account, such as your name, email address, and password. When you use our service, we automatically collect information about your usage patterns, device information, and IP address.",
              },
              {
                title: "2. How We Use Your Information",
                content:
                  "We use the information we collect to provide, maintain, and improve our services. We also use it to send you service-related updates and respond to your inquiries. Your text submissions are processed to provide analysis but are not stored after processing unless you choose to save them.",
              },
              {
                title: "3. Data Security",
                content:
                  "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is completely secure.",
              },
              {
                title: "4. Third-Party Services",
                content:
                  "We may use third-party service providers to perform services on our behalf, including payment processing and customer support. These providers are required to maintain the confidentiality of your information.",
              },
              {
                title: "5. Your Rights",
                content:
                  "Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your data. Please contact us to exercise these rights.",
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
