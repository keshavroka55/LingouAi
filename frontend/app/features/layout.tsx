import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Features — AI Writing Assistant",
    template: "%s | DetectorAI",
  },
  description:
    "Explore DetectorAI features: AI grammar correction, tone analysis, readability scoring, plagiarism and AI-content detection, real-time suggestions, team collaboration, and detailed analytics.",
  alternates: { canonical: "/features" },
}

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
