"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { HelpCircle, BookOpen, MessageSquare, Mail } from "lucide-react"

export default function HelpPage() {
  const faqs = [
    {
      question: "How do credits work?",
      answer: "Each text analysis uses 1 credit. Your credit balance resets monthly based on your plan.",
    },
    {
      question: "Can I export my analysis results?",
      answer: "Yes! You can download reports in TXT, CSV, or PDF format from the analysis results.",
    },
    {
      question: "What types of analysis are available?",
      answer:
        "We offer grammar checks, style analysis, readability scoring, plagiarism detection, and AI-generated content detection.",
    },
    {
      question: "How is readability score calculated?",
      answer: "We use a modified Flesch-Kincaid formula based on sentence length, word complexity, and syllable count.",
    },
    {
      question: "Is my text data stored?",
      answer:
        "Your text is only stored in your local browser by default. You can enable private mode in settings to disable history storage.",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Help & Support</h1>
          <p className="text-foreground-muted">Find answers to common questions</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="card-premium text-center">
            <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-foreground mb-1">Documentation</h3>
            <p className="text-sm text-foreground-muted">Read our comprehensive guides</p>
          </div>
          <div className="card-premium text-center">
            <MessageSquare className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-foreground mb-1">Live Chat</h3>
            <p className="text-sm text-foreground-muted">Chat with our support team</p>
          </div>
          <div className="card-premium text-center">
            <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold text-foreground mb-1">Email Support</h3>
            <p className="text-sm text-foreground-muted">support@linguoai.com</p>
          </div>
        </div>

        <div className="card-premium">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-primary" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border last:border-b-0 pb-6 last:pb-0">
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-foreground-muted text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
