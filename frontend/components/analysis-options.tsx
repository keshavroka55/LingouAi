"use client"

import { CheckCircle2, Settings2 } from "lucide-react"

const options = [
  { id: "grammar", label: "Grammar & Spelling", description: "Fix errors automatically" },
  { id: "tone", label: "Style & Tone", description: "Adjust writing style" },
  { id: "readability", label: "Readability", description: "Improve clarity" },
  { id: "paraphrase", label: "Paraphrase", description: "Rewrite phrases" },
  { id: "plagiarism", label: "Plagiarism Check", description: "Verify originality" },
  { id: "ai-detect", label: "AI Detection", description: "Humanize AI content" },
]

interface AnalysisOptionsProps {
  selected: string[]
  onSelectionChange: (options: string[]) => void
}

export default function AnalysisOptions({ selected, onSelectionChange }: AnalysisOptionsProps) {
  const toggleOption = (id: string) => {
    const updated = selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id]
    onSelectionChange(updated)
  }

  const toggleSelectAll = () => {
    if (selected.length === options.length) {
      onSelectionChange([])
    } else {
      onSelectionChange(options.map((opt) => opt.id))
    }
  }

  return (
    <div className="space-y-4">
      <div className="card-premium">
        <div className="flex items-center gap-2 mb-4">
          <Settings2 className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Analysis Options</h3>
        </div>

        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => toggleOption(option.id)}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                selected.includes(option.id)
                  ? "border-primary bg-primary/5"
                  : "border-border bg-surface hover:bg-surface-alt"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-5 h-5 rounded mt-0.5 border-2 flex items-center justify-center flex-shrink-0 ${
                    selected.includes(option.id) ? "bg-primary border-primary" : "border-border"
                  }`}
                >
                  {selected.includes(option.id) && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{option.label}</div>
                  <div className="text-xs text-foreground-muted">{option.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={toggleSelectAll}
          className="w-full mt-4 px-4 py-2 bg-surface text-foreground rounded-lg font-semibold border border-border hover:bg-surface-alt transition-colors"
        >
          {selected.length === options.length ? "Deselect All" : "Select All"}
        </button>
      </div>

        <div className="card-premium bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <h4 className="font-semibold text-foreground mb-2">Pro Tip</h4>
        <p className="text-sm text-foreground-muted">
          Select all analysis options for comprehensive writing feedback. Each analysis uses 1 credit.
        </p>
      </div>
    </div>
  )
}
