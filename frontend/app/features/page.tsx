"use client"

import NavBar from "@/components/nav-bar"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { Brain, Zap, Shield, Layers, BarChart3, Wand2, Users } from "lucide-react"

export default function FeaturesPage() {
  const features = [
    {
      icon: Brain,
      title: "Advanced Grammar Detection",
      description: "AI-powered grammar checking that catches complex grammatical errors with contextual understanding.",
    },
    {
      icon: Wand2,
      title: "Style & Tone Analysis",
      description: "Get suggestions to match your writing style with the intended audience and tone.",
    },
    {
      icon: Zap,
      title: "Readability Scoring",
      description: "Optimize your content for readability with real-time scoring and improvement suggestions.",
    },
    {
      icon: Shield,
      title: "Plagiarism Detection",
      description: "Check for originality with our comprehensive plagiarism detection system.",
    },
    {
      icon: Brain,
      title: "AI Content Detection",
      description: "Identify AI-generated content with advanced detection algorithms.",
    },
    {
      icon: Layers,
      title: "Real-time Suggestions",
      description: "Get instant, actionable suggestions as you type with our intelligent algorithm.",
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Track your writing improvements over time with comprehensive analytics dashboard.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share documents and collaborate with your team in real-time.",
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
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Powerful Features for Better Writing
            </h1>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Discover all the tools and features that make DetectorAI the best writing assistant for professionals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border bg-surface hover:bg-surface/80 transition-all group cursor-pointer"
              >
                <feature.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-foreground-muted text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
