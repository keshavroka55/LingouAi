"use client"

import { useState } from "react"
import { Download, Copy, Badge} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, PieChart, Pie, Cell } from "./chart"


type Severity = "high" | "medium" | "low"

interface AnalysisIssue {
  severity: Severity
  type: string
  message: string
}

interface AnalysisSummary {
  grammarIssues: number
  styleSuggestions: number
  readabilityScore: number
  wordCount: number
  issues: AnalysisIssue[]
}

interface ReportViewerProps {
  analysis: AnalysisSummary | null
  text: string
}

export default function ReportViewer({ analysis, text }: ReportViewerProps) {
  const [copied, setCopied] = useState(false)

  if (!analysis) {
    return null
  }

  const handleDownload = async (format: "txt" | "csv" | "pdf") => {
    try {
      const response = await fetch("/api/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, analysis, format }),
      })

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `analysis-${Date.now()}.${format}`
      a.click()
    } catch (error) {
      console.error("Download error:", error)
    }
  }

  const handleCopy = () => {
    const report = generatePlainTextReport()
    navigator.clipboard.writeText(report)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const generatePlainTextReport = () => {
    return `
DetectorAI Report - ${new Date().toLocaleString()}

Grammar Issues: ${analysis.grammarIssues}
Style Suggestions: ${analysis.styleSuggestions}
Readability Score: ${analysis.readabilityScore}%
Word Count: ${analysis.wordCount}
    `.trim()
  }

  return (
    <div className="card-premium space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Report</h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface hover:bg-surface-alt text-sm font-medium text-foreground transition-colors"
          >
            <Copy className="w-4 h-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
          <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-medium transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <div className="absolute right-0 mt-2 w-32 bg-background border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button
                onClick={() => handleDownload("txt")}
                className="block w-full text-left px-4 py-2 hover:bg-surface text-sm text-foreground"
              >
                Download TXT
              </button>
              <button
                onClick={() => handleDownload("csv")}
                className="block w-full text-left px-4 py-2 hover:bg-surface text-sm text-foreground"
              >
                Download CSV
              </button>
              <button
                onClick={() => handleDownload("pdf")}
                className="block w-full text-left px-4 py-2 hover:bg-surface text-sm text-foreground"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 bg-surface rounded-lg">
          <p className="text-xs text-foreground-muted mb-1">Grammar Issues</p>
          <p className="text-2xl font-bold text-error">{analysis.grammarIssues}</p>
        </div>
        <div className="p-3 bg-surface rounded-lg">
          <p className="text-xs text-foreground-muted mb-1">Style Suggestions</p>
          <p className="text-2xl font-bold text-warning">{analysis.styleSuggestions}</p>
        </div>
        <div className="p-3 bg-surface rounded-lg">
          <p className="text-xs text-foreground-muted mb-1">Readability</p>
          <p className="text-2xl font-bold text-accent">{analysis.readabilityScore}%</p>
        </div>
      </div>

{analysis.issues?.length > 0 && (
  <>
    {analysis.issues[0].type === "AI Detection" ? (
      // === AI Detection View ===
      (() => {
        // Extract numeric score from message text
        const scoreMatch = analysis.issues[0].message.match(/([\d.]+)%/);
        const score = scoreMatch ? parseFloat(scoreMatch[1]) : 0;

        const detectionResult = {
          score: score,
          metrics: [
            { name: "AI Probability", value: score.toFixed(1) },
            { name: "Human Probability", value: (100 - score).toFixed(1) },
          ],
        };

        return (
          <div className="p-4 bg-surface rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">{analysis.issues[0].type}</h4>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/3 flex flex-col items-center">
                <div className="relative w-48 h-48">
                  <ChartContainer className="w-full h-full">
                    <PieChart width={200} height={200}>
                      <Pie
                        data={[
                          { name: "AI", value: detectionResult.score },
                          { name: "Human", value: 100 - detectionResult.score },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        <Cell key={`cell-0`} fill="#8b5cf6" />
                        <Cell key={`cell-1`} fill="#371f1fff" />
                      </Pie>
                      <ChartTooltip payload={[]} label={""} />
                    </PieChart>
                  </ChartContainer>

                </div>
                <div className="mt-12 flex items-center justify-center flex-col">
                  <span className="text-4xl font-bold">{detectionResult.score}%</span>
                  <span className="text-sm text-gray-400">AI Generated</span>
                </div>

                <Badge
                  className={`mt-4 px-3 py-1 text-sm ${
                    score > 70
                      ? "bg-red-500/20 text-red-300 border-red-500/30"
                      : score > 30
                      ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                      : "bg-green-500/20 text-green-300 border-green-500/30"
                  }`}
                >
                  {score > 70
                    ? "Likely AI Generated"
                    : score > 30
                    ? "Possibly AI Generated"
                    : "Likely Human Written"}
                </Badge>
              </div>

              <div className="w-full md:w-2/3 space-y-4">
                <h3 className="text-xl font-medium">Breakdown Analysis</h3>
                {detectionResult.metrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">{metric.name}</span>
                      <span className="font-medium">{metric.value}%</span>
                    </div>
                  <Progress
                    value={Number(metric.value)}
                    className="h-2 bg-gray-700 [&>div]:bg-gradient-to-r [&>div]:from-indigo-500 [&>div]:to-purple-600"
                  />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()
    ) : (
      // === Default Issues View ===
      <div className="p-4 bg-surface rounded-lg">
        <h4 className="font-semibold text-foreground mb-3">{analysis.issues[0].type}</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {analysis.issues.map((issue, idx) => (
            <div key={idx} className="flex gap-3 p-2 bg-background rounded text-sm">
              <span
                className={`inline-block px-2 py-1 rounded text-xs font-semibold flex-shrink-0 ${getSeverityColor(
                  issue.severity
                )}`}
              >
                {issue.type}
              </span>
              <span className="text-foreground-muted">{issue.message}</span>
            </div>
          ))}
        </div>
      </div>
    )}
  </>
)}
    </div>
  )
}

function getSeverityColor(severity: string): string {
  switch (severity) {
    case "high":
      return "bg-red-100 text-red-700"
    case "medium":
      return "bg-yellow-100 text-yellow-700"
      case "low":
        return "bg-green-100 text-green-700"
    default:
      return "bg-gray-100 text-gray-700"
  }
}
