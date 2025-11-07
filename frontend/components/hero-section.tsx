"use client"

import { motion } from "framer-motion"
import { ArrowRight, Zap } from "lucide-react"
import Link from "next/link"
import TextAnalyzer from "@/components/text-analyzer"
import { useState } from "react"


export default function HeroSection() {
  const [text, setText] = useState("")
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold text-balance text-foreground leading-tight">
              Write with{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Confidence
              </span>
            </h1>
            <p className="text-xl text-foreground-muted leading-relaxed">
              Professional writing assistant powered by advanced AI. Perfect grammar, tone, and clarity in every word.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/waitlist">
              <button className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group">
                Join Waitlist <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="w-full sm:w-auto px-6 py-3 bg-surface text-foreground rounded-lg font-semibold border border-border hover:bg-surface-alt transition-colors">
              Watch Demo
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm text-foreground-muted pt-4">
            <Zap className="w-4 h-4 text-warning" />
            <span>Instant analysis • No credit card required</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >

          <div className="lg:col-span-2">

            <TextAnalyzer text={text} onTextChange={setText} selectedOptions={selectedOptions} />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
