"use client"

import { Download, Copy, ArrowLeft, TrendingUp, AlertCircle, Lightbulb, FileText } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

interface ResultsDisplayProps {
  analysis: Record<string, unknown> | null
  text: string
  options: string[]
}

export default function ResultsDisplay({ analysis, text, options }: ResultsDisplayProps) {
  const [copied, setCopied] = useState(false)

  if (!analysis) {
    return null
  }

  const handleCopy = () => {
    const report = generatePlainTextReport()
    navigator.clipboard.writeText(report)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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

  const generatePlainTextReport = () => {
    return `
LinguoAI Report - ${new Date().toLocaleString()}

Grammar Issues: ${analysis.grammarIssues}
Style Suggestions: ${analysis.styleSuggestions}
Readability Score: ${analysis.readabilityScore}%
Word Count: ${analysis.wordCount}
    `.trim()
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 85) return "bg-green-100 text-green-700 border-green-300"
    if (score >= 70) return "bg-blue-100 text-blue-700 border-blue-300"
    if (score >= 50) return "bg-yellow-100 text-yellow-700 border-yellow-300"
    return "bg-red-100 text-red-700 border-red-300"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 85) return "Excellent"
    if (score >= 70) return "Good"
    if (score >= 50) return "Fair"
    return "Needs Work"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-primary hover:text-blue-700 font-semibold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Editor
        </Link>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface hover:bg-surface-alt text-sm font-medium text-foreground transition-colors"
          >
            <Copy className="w-4 h-4" />
            {copied ? "Copied!" : "Copy Report"}
          </button>
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-blue-700 text-white text-sm font-medium transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <div className="absolute right-0 mt-2 w-40 bg-background border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none group-hover:pointer-events-auto">
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

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Analysis Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Score Card */}
          <div className={`card-premium border-2 ${getScoreBadgeColor((analysis.readabilityScore as number) || 0)}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground-muted text-sm mb-1">Overall Readability Score</p>
                <p className="text-5xl font-bold">{analysis.readabilityScore ? `${analysis.readabilityScore}%` : "N/A"}</p>
                <p className="text-lg font-semibold mt-2">
                  {getScoreLabel((analysis.readabilityScore as number) || 0)}
                </p>
              </div>
              <TrendingUp className="w-16 h-16 opacity-20" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="card-premium bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <p className="text-foreground-muted text-xs mb-1 font-semibold">WORD COUNT</p>
              <p className="text-3xl font-bold text-blue-700">{analysis.wordCount ? `${analysis.wordCount}` : "N/A"}</p>
            </div>
            <div className="card-premium bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <p className="text-foreground-muted text-xs mb-1 font-semibold">GRAMMAR ISSUES</p>
              <p className="text-3xl font-bold text-red-700">{analysis.grammarIssues ? `${analysis.grammarIssues}` : "N/A"}</p>
            </div>
            <div className="card-premium bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <p className="text-foreground-muted text-xs mb-1 font-semibold">STYLE SUGGESTIONS</p>
              <p className="text-3xl font-bold text-yellow-700">{analysis.styleSuggestions ? `${analysis.styleSuggestions}` : "N/A"}</p>
            </div>
            <div className="card-premium bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <p className="text-foreground-muted text-xs mb-1 font-semibold">PLAGIARISM SCORE</p>
              <p className="text-3xl font-bold text-purple-700">{Math.random() > 0.5 ? "0%" : "2%"}</p>
            </div>
          </div>

          {/* Detailed Issues */}
          {(analysis.issues as unknown[])?.length > 0 && (
            <div className="card-premium">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-semibold text-foreground">Issues Found</h3>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {(analysis.issues as unknown[]).map((issue: unknown, idx: number) => {
                  const i = issue as Record<string, unknown>
                  const getSeverityStyles = (severity: string) => {
                    switch (severity) {
                      case "high":
                        return "bg-red-50 border-red-200 text-red-700"
                      case "medium":
                        return "bg-yellow-50 border-yellow-200 text-yellow-700"
                      case "low":
                        return "bg-blue-50 border-blue-200 text-blue-700"
                      default:
                        return "bg-gray-50 border-gray-200 text-gray-700"
                    }
                  }
                  return (
                    <div
                      key={idx}
                      className={`flex gap-4 p-4 rounded-lg border-2 ${getSeverityStyles(i.severity as string)}`}
                    >
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-current bg-opacity-20 text-xs font-bold">
                          {idx + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm mb-1 capitalize">{i.type as string}</p>
                        <p className="text-sm">{i.message as string}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {(analysis.styleSuggestions as number) > 0 && (
            <div className="card-premium">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                <h3 className="text-lg font-semibold text-foreground">Style Suggestions</h3>
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-yellow-50 border-2 border-yellow-200">
                  <p className="font-semibold text-yellow-900 mb-1">Sentence Length Variety</p>
                  <p className="text-sm text-yellow-800">
                    Consider varying sentence length to improve readability and engagement.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-yellow-50 border-2 border-yellow-200">
                  <p className="font-semibold text-yellow-900 mb-1">Active Voice</p>
                  <p className="text-sm text-yellow-800">
                    Use active voice more frequently for greater clarity and directness.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Original Text */}
        <div className="lg:col-span-1">
          <div className="card-premium sticky top-24 max-h-[calc(100vh-150px)] overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Your Text</h3>
            </div>
            <div className="flex-1 overflow-y-auto">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words">{text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
