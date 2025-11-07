export function formatAnalysisDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export function calculateReadingTime(wordCount: number): number {
  const wordsPerMinute = 200
  return Math.ceil(wordCount / wordsPerMinute)
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-500"
  if (score >= 60) return "text-yellow-500"
  return "text-red-500"
}

export function getSeverityBadgeClass(severity: string): string {
  switch (severity) {
    case "high":
      return "bg-red-100 text-red-800"
    case "medium":
      return "bg-yellow-100 text-yellow-800"
    case "low":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function generateReportSummary(analysis: Record<string, unknown>): string {
  const issues = (analysis.issues as unknown[]).length
  const readabilityScore = analysis.readabilityScore as number
  const wordCount = analysis.wordCount as number

  return `Your ${wordCount}-word document has ${issues} suggestions for improvement and a readability score of ${readabilityScore}%.`
}
