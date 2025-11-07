"use client"

import { useState, useEffect } from "react"
import { Clock, Download, Trash2 } from "lucide-react"

interface HistoryItem {
  id: string
  date: string
  wordCount: number
  score: number
  status: "completed" | "pending"
}

export default function AnalysisHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem("analysisHistory")
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }, [])

  const deleteItem = (id: string) => {
    const updated = history.filter((item) => item.id !== id)
    setHistory(updated)
    localStorage.setItem("analysisHistory", JSON.stringify(updated))
  }

  return (
    <div className="card-premium">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Recent Analysis</h3>
      </div>

      {history.length === 0 ? (
        <p className="text-foreground-muted text-center py-8">No analysis history yet. Start by analyzing some text.</p>
      ) : (
        <div className="space-y-3">
          {history.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{item.date}</p>
                <p className="text-xs text-foreground-muted">
                  {item.wordCount} words • Score: {item.score}%
                </p>
              </div>
              <div className="flex gap-2">
                <button className="p-1 hover:bg-background rounded transition-colors" title="Download">
                  <Download className="w-4 h-4 text-foreground-muted" />
                </button>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="p-1 hover:bg-background rounded transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4 text-foreground-muted" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
