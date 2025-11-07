"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { useState, useEffect } from "react"
import { Calendar, Download, Trash2, Eye } from "lucide-react"

interface HistoryEntry {
  id: string
  date: string
  time: string
  text: string
  wordCount: number
  score: number
  grammarIssues: number
}

export default function HistoryPage() {
  const [entries, setEntries] = useState<HistoryEntry[]>([])

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem("fullAnalysisHistory")
    if (saved) {
      setEntries(JSON.parse(saved))
    } else {
      // Generate demo data
      const demoEntries: HistoryEntry[] = [
        {
          id: "1",
          date: "Nov 15, 2024",
          time: "2:30 PM",
          text: "The quick brown fox jumps over the lazy dog...",
          wordCount: 142,
          score: 85,
          grammarIssues: 2,
        },
        {
          id: "2",
          date: "Nov 14, 2024",
          time: "10:15 AM",
          text: "This is a sample text for demonstration...",
          wordCount: 89,
          score: 78,
          grammarIssues: 4,
        },
      ]
      setEntries(demoEntries)
      localStorage.setItem("fullAnalysisHistory", JSON.stringify(demoEntries))
    }
  }, [])

  const deleteEntry = (id: string) => {
    const updated = entries.filter((e) => e.id !== id)
    setEntries(updated)
    localStorage.setItem("fullAnalysisHistory", JSON.stringify(updated))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Analysis History</h1>
          <p className="text-foreground-muted">View all your past writing analyses</p>
        </div>

        <div className="card-premium">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Date & Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Preview</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Words</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Score</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Issues</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id} className="border-b border-border hover:bg-surface transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <div>
                          <p className="font-medium text-foreground">{entry.date}</p>
                          <p className="text-xs text-foreground-muted">{entry.time}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-foreground-muted truncate">{entry.text.substring(0, 40)}...</td>
                    <td className="py-3 px-4 text-foreground">{entry.wordCount}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-1 bg-accent/10 text-accent rounded text-xs font-semibold">
                        {entry.score}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-foreground">{entry.grammarIssues}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="p-1 hover:bg-background rounded transition-colors" title="View">
                          <Eye className="w-4 h-4 text-primary" />
                        </button>
                        <button className="p-1 hover:bg-background rounded transition-colors" title="Download">
                          <Download className="w-4 h-4 text-foreground-muted" />
                        </button>
                        <button
                          onClick={() => deleteEntry(entry.id)}
                          className="p-1 hover:bg-background rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-error" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
