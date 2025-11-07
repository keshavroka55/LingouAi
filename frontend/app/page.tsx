import NavBar from "@/components/nav-bar"
import HeroSection from "@/components/hero-section"
import FeaturesGrid from "@/components/features-grid"
import PricingSection from "@/components/pricing-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-background via-surface to-background">
      <NavBar />
      <HeroSection />
      <FeaturesGrid />
      <PricingSection />
      <CTASection />
      <Footer />
    </main>

  )
}
