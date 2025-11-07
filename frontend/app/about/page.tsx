"use client"

import NavBar from "@/components/nav-bar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { Users, Target, Lightbulb } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To empower writers with intelligent tools that enhance clarity, correctness, and impact.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We leverage cutting-edge AI to provide the most accurate writing assistance available.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a supportive community of writers who help each other improve their craft.",
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
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">About LinguoAI</h1>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Revolutionizing writing with AI-powered intelligence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-surface rounded-xl border border-border p-8 mb-16"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Story</h2>
            <p className="text-foreground-muted leading-relaxed mb-4">
              LinguoAI was founded in 2024 with a simple vision: to make professional writing assistance accessible to
              everyone. We believe that great writing isn't just about grammar—it's about clarity, impact, and
              connecting with your audience.
            </p>
            <p className="text-foreground-muted leading-relaxed">
              Our team of AI researchers, linguists, and product designers came together to build the most intelligent
              writing assistant on the market. Today, LinguoAI helps thousands of writers, students, and professionals
              craft better content every day.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="border border-border rounded-xl p-6 bg-surface"
              >
                <value.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold text-lg text-foreground mb-2">{value.title}</h3>
                <p className="text-foreground-muted">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
