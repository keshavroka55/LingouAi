"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Zap, BarChart3, Brain, Shield, Download } from "lucide-react"

const features = [
  {
    icon: CheckCircle2,
    title: "Grammar & Spelling",
    description: "Catch every mistake before it matters. Advanced error detection in real-time.",
  },
  {
    icon: Zap,
    title: "Style & Tone",
    description: "Match your intended tone perfectly. From casual to professional in one click.",
  },
  {
    icon: BarChart3,
    title: "Readability Analysis",
    description: "Get clarity scores and actionable suggestions to improve comprehension.",
  },
  {
    icon: Brain,
    title: "AI Content Detection",
    description: "Identify AI-written content and humanize it to sound naturally written.",
  },
  {
    icon: Shield,
    title: "Plagiarism Check",
    description: "Verify originality across billions of sources instantly.",
  },
  {
    icon: Download,
    title: "Detailed Reports",
    description: "Download comprehensive PDF reports with all suggestions and improvements.",
  },
]

export default function FeaturesGrid() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Everything You Need to Write Better</h2>
        <p className="text-xl text-foreground-muted">
          Professional writing tools powered by cutting-edge AI technology
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="card-premium group"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
            <p className="text-foreground-muted">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
