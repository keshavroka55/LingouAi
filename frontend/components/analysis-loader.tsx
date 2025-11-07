"use client"

import { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"

const analysisSteps = [
  { id: "grammar", label: "Analyzing Grammar & Spelling", icon: "🔍" },
  { id: "tone", label: "Analyzing Style & Tone", icon: "✍️" },
  { id: "readability", label: "Analyzing Readability", icon: "📖" },
  { id: "plagiarism", label: "Checking Plagiarism", icon: "🔐" },
  { id: "ai-detect", label: "Detecting AI Content", icon: "🤖" },
  { id: "paraphrase", label: "Generating Suggestions", icon: "💡" },
]

export default function AnalysisLoader() {
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  useEffect(() => {
    let currentIndex = 0

    const interval = setInterval(() => {
      if (currentIndex < analysisSteps.length) {
        setCompletedSteps((prev) => [...prev, analysisSteps[currentIndex].id])
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, 600)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {analysisSteps.map((step, index) => (
        <div
          key={step.id}
          className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-500 ${
            completedSteps.includes(step.id)
              ? "bg-green-50 border-green-300"
              : index <= completedSteps.length
                ? "bg-blue-50 border-blue-300"
                : "bg-surface border-border"
          }`}
        >
          <div className="text-2xl">{step.icon}</div>
          <div className="flex-1">
            <p className={`font-semibold ${completedSteps.includes(step.id) ? "text-green-700" : "text-foreground"}`}>
              {step.label}
            </p>
          </div>
          <div className="w-6 h-6 rounded-full flex items-center justify-center">
            {completedSteps.includes(step.id) ? (
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            ) : index <= completedSteps.length ? (
              <div className="w-5 h-5 border-3 border-transparent border-t-blue-600 rounded-full animate-spin" />
            ) : (
              <div className="w-5 h-5 border-2 border-border rounded-full" />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
