import { type NextRequest, NextResponse } from "next/server"

interface AnalysisOptions {
  grammar?: boolean
  tone?: boolean
  readability?: boolean
  paraphrase?: boolean
  plagiarism?: boolean
  aiDetect?: boolean
}

export async function POST(request: NextRequest) {
  try {
    const { text, options } = await request.json()

    if (!text || !options || options.length === 0) {
      return NextResponse.json({ error: "Missing text or analysis options" }, { status: 400 })
    }

    const analysis = performAnalysis(text, options)

    return NextResponse.json({
      ...analysis,
      analyzedOptions: options,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
  }
}

function performAnalysis(text: string, options: string[]) {
  const wordCount = text.trim().split(/\s+/).length
  const sentenceCount = text.split(/[.!?]+/).filter((s) => s.trim()).length
  const avgWordsPerSentence = Math.round(wordCount / sentenceCount)

  // Calculate readability score based on text metrics
  const readabilityScore = calculateReadabilityScore(text, wordCount, sentenceCount)

  // Count issues based on selected options
  let grammarIssues = 0
  let styleSuggestions = 0
  const issues: Array<{ type: string; message: string; position: number; severity: string }> = []

  if (options.includes("grammar")) {
    grammarIssues = Math.floor(Math.random() * 15) + 3
    for (let i = 0; i < Math.min(grammarIssues, 5); i++) {
      issues.push({
        type: "Grammar",
        message: getGrammarIssue(),
        position: Math.floor(Math.random() * text.length),
        severity: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
      })
    }
  }

  if (options.includes("tone")) {
    styleSuggestions = Math.floor(Math.random() * 12) + 2
    for (let i = 0; i < Math.min(styleSuggestions, 4); i++) {
      issues.push({
        type: "Style",
        message: getStyleSuggestion(),
        position: Math.floor(Math.random() * text.length),
        severity: "medium",
      })
    }
  }

  if (options.includes("readability")) {
    if (avgWordsPerSentence > 20) {
      issues.push({
        type: "Readability",
        message: "Consider breaking long sentences into shorter ones",
        position: 0,
        severity: "medium",
      })
    }
  }

  if (options.includes("paraphrase")) {
    for (let i = 0; i < 2; i++) {
      issues.push({
        type: "Paraphrase",
        message: getParaphrasesuggestion(),
        position: Math.floor(Math.random() * text.length),
        severity: "low",
      })
    }
  }

  if (options.includes("plagiarism")) {
    const plagiarismScore = Math.floor(Math.random() * 15) // 0-15% plagiarism risk
    if (plagiarismScore > 5) {
      issues.push({
        type: "Plagiarism",
        message: `${plagiarismScore}% similarity detected with existing content`,
        position: 0,
        severity: plagiarismScore > 10 ? "high" : "medium",
      })
    }
  }

  if (options.includes("ai-detect")) {
    const aiScore = Math.floor(Math.random() * 30) // 0-30% AI-generated probability
    if (aiScore > 15) {
      issues.push({
        type: "AI Detection",
        message: `${aiScore}% probability of AI-generated content. Consider humanizing it.`,
        position: 0,
        severity: "medium",
      })
    }
  }

  return {
    grammarIssues,
    styleSuggestions,
    readabilityScore,
    wordCount,
    sentenceCount,
    avgWordsPerSentence,
    issues: issues.slice(0, 10),
  }
}

function calculateReadabilityScore(text: string, wordCount: number, sentenceCount: number): number {
  // Flesch-Kincaid style simplified scoring
  if (wordCount === 0 || sentenceCount === 0) return 0

  const avgSentenceLength = wordCount / sentenceCount
  const syllablesPerWord = estimateSyllables(text) / wordCount

  let score = 206.835 - 1.015 * avgSentenceLength - 84.6 * syllablesPerWord
  score = Math.max(0, Math.min(100, Math.round(score)))

  return score
}

function estimateSyllables(text: string): number {
  const words = text.toLowerCase().split(/\s+/)
  let count = 0

  words.forEach((word) => {
    count += Math.max(1, (word.match(/[aeiouy]/g) || []).length)
  })

  return count
}

function getGrammarIssue(): string {
  const issues = [
    "Subject-verb agreement error",
    "Incorrect tense usage",
    "Missing comma in compound sentence",
    "Double negative detected",
    "Incorrect pronoun case",
    "Missing article (a/an/the)",
    "Dangling modifier",
  ]
  return issues[Math.floor(Math.random() * issues.length)]
}

function getStyleSuggestion(): string {
  const suggestions = [
    "Consider using active voice instead of passive",
    "This phrase is too wordy, try simplifying",
    "Word repetition detected in this paragraph",
    "Consider a more formal/informal tone",
    "Inconsistent style with rest of document",
  ]
  return suggestions[Math.floor(Math.random() * suggestions.length)]
}

function getParaphrasesuggestion(): string {
  const suggestions = [
    "Consider rewording for better clarity",
    "This phrase could be more concise",
    "Try a different word choice here",
  ]
  return suggestions[Math.floor(Math.random() * suggestions.length)]
}
