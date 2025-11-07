"use client"

import { useEffect, useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import AnalysisLoader from "@/components/analysis-loader"
import ResultsDisplay from "@/components/results-display"

export default function ResultsPage() {
  const [analysisData, setAnalysisData] = useState<{
    data: Record<string, unknown> | null
    text: string
    options: string[]
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = localStorage.getItem("currentAnalysis")
      if (saved) {
        setAnalysisData(JSON.parse(saved))
      }
      setIsLoading(false)
    }, 3600)

    return () => clearTimeout(timer)
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Analysis Results</h1>
          <p className="text-foreground-muted">Your comprehensive writing analysis report</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <AnalysisLoader />
            <p className="mt-8 text-foreground-muted text-sm">Generating your personalized report...</p>
          </div>
        ) : analysisData ? (
          <ResultsDisplay analysis={analysisData.data} text={analysisData.text} options={analysisData.options} />
        ) : (
          <div className="card-premium text-center py-12">
            <p className="text-foreground-muted">No analysis data found. Please analyze text first.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
