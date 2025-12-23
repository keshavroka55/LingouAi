"use client"

import { BarChart3, Zap, Award, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"




export default function QuickStats() {
  const [stats, setStats] = useState({
    totalAnalysis: 0,
    avgScore: 0,
    wordsAnalyzed: 0,
    creditsRemaining: 0,
  })

  const getCredits = async () => {
      try {
    const res = await fetch("http://localhost:9000/api/v1/auth/credits", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch credits");
    
    const data = await res.json();
    return data.attempts ?? 0;
  } catch (err) {
    console.error("Error fetching credit:", err);
    return null;
  }
  }

    useEffect(() => {
      const fetchData = async () => {
        const credits = await getCredits()

        const statsData = localStorage.getItem("analysisStats")

        if (statsData) {
          setStats(prev => ({
            ...JSON.parse(statsData),
            creditsRemaining: credits,
          }))
        } else {
          setStats(prev => ({
            ...prev,
            creditsRemaining: credits,
          }))
        }
      }

      fetchData()
    }, [])


  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="card-premium">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground-muted mb-1">Total Analysis</p>
            <p className="text-2xl font-bold text-foreground">{stats.totalAnalysis}</p>
          </div>
          <BarChart3 className="w-8 h-8 text-primary/30" />
        </div>
      </div>

      <div className="card-premium">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground-muted mb-1">Avg Score</p>
            <p className="text-2xl font-bold text-foreground">{stats.avgScore}%</p>
          </div>
          <TrendingUp className="w-8 h-8 text-accent/30" />
        </div>
      </div>

      <div className="card-premium">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground-muted mb-1">Words Analyzed</p>
            <p className="text-2xl font-bold text-foreground">{stats.wordsAnalyzed}</p>
          </div>
          <Zap className="w-8 h-8 text-warning/30" />
        </div>
      </div>

      <div className="card-premium">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground-muted mb-1">Credits Left</p>
            <p className="text-2xl font-bold text-primary">{stats.creditsRemaining}</p>
          </div>
          <Award className="w-8 h-8 text-error/30" />
        </div>
      </div>
    </div>
  )
}
