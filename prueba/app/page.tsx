import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { BenefitsSection } from "@/components/benefits-section"
import { ProcessSection } from "@/components/process-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import  Hero from "@/components/slide-image"
import {featuresData} from "@/lib/data/features"
import { FeatureSection } from "@/components/feature-images"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />

  {featuresData.map((feature, index) => (
        <FeatureSection key={index} {...feature} />
      ))}


     <HeroSection />
      <BenefitsSection />
      <ProcessSection />
      <CTASection />
      <Footer />
    </main>
  )
}
