import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text, analysis, format } = await request.json()

    if (!text || !analysis) {
      return NextResponse.json({ error: "Missing required data" }, { status: 400 })
    }

    let content = ""
    let filename = `analysis-${Date.now()}`
    let contentType = "text/plain"

    if (format === "pdf") {
      content = generatePDFContent(text, analysis)
      filename += ".pdf"
      contentType = "application/pdf"
    } else if (format === "csv") {
      content = generateCSVContent(text, analysis)
      filename += ".csv"
      contentType = "text/csv"
    } else {
      content = generateTextContent(text, analysis)
      filename += ".txt"
    }

    return new NextResponse(content, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json({ error: "Export failed" }, { status: 500 })
  }
}

function generateTextContent(text: string, analysis: Record<string, unknown>): string {
  return `
LinguoAI Analysis Report
Generated: ${new Date().toLocaleString()}

ORIGINAL TEXT:
${text}

ANALYSIS RESULTS:
- Grammar Issues: ${analysis.grammarIssues}
- Style Suggestions: ${analysis.styleSuggestions}
- Readability Score: ${analysis.readabilityScore}%
- Word Count: ${analysis.wordCount}
- Sentence Count: ${analysis.sentenceCount}

ISSUES FOUND:
${(analysis.issues as unknown[])
  .map(
    (issue: unknown) => `- ${(issue as Record<string, unknown>).type}: ${(issue as Record<string, unknown>).message}`,
  )
  .join("\n")}
  `.trim()
}

function generateCSVContent(text: string, analysis: Record<string, unknown>): string {
  let csv = "Type,Message,Severity\n"
  ;(analysis.issues as unknown[]).forEach((issue: unknown) => {
    const i = issue as Record<string, unknown>
    csv += `"${i.type}","${i.message}","${i.severity}"\n`
  })
  return csv
}

function generatePDFContent(text: string, analysis: Record<string, unknown>): string {
  // Simplified PDF-like content (in production, use a library like pdfkit)
  return generateTextContent(text, analysis)
}
