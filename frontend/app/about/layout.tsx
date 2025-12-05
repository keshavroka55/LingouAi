import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "About DetectorAI",
    template: "%s | DetectorAI",
  },
  description:
    "Discover the mission behind DetectorAI — helping people write clearly and confidently with AI.",
  alternates: { canonical: "/about" },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
