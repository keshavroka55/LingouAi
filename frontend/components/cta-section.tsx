"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function CTASection() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
          className="bg-gradient-to-br from-primary/10 to-primary/10 border border-primary/20 rounded-2xl p-12 text-center space-y-6"
      >
        <h2 className="text-4xl font-bold text-foreground">Ready to Transform Your Writing?</h2>
        <p className="text-xl text-foreground-muted">
          Join thousands of writers who are already using LinguoAI to create better content.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Link href="/dashboard">
              <button className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Start Writing Better
            </button>
          </Link>
          <button className="px-8 py-3 bg-white text-primary rounded-lg font-semibold border border-primary hover:bg-primary/5 transition-colors">
            View Documentation
          </button>
        </div>
      </motion.div>
    </section>
  )
}
