"use client"

import DashboardLayout from "@/components/dashboard-layout"
import TextAnalyzer from "@/components/text-analyzer"
import AnalysisOptions from "@/components/analysis-options"
import QuickStats from "@/components/quick-stats"
import AnalysisHistory from "@/components/analysis-history"
import { useState } from "react"

export default function DashboardPage() {
  const [text, setText] = useState("")
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Writing Assistant</h1>
          <p className="text-foreground-muted">Analyze and improve your writing with AI</p>
        </div>

        <QuickStats />

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TextAnalyzer text={text} onTextChange={setText} selectedOptions={selectedOptions} />
          </div>
          <div>
            <AnalysisOptions selected={selectedOptions} onSelectionChange={setSelectedOptions} />
          </div>
        </div>

        <AnalysisHistory />
      </div>
    </DashboardLayout>
  )
}
