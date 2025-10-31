import CarruselPrincipal from "@/components/carrousel-slide";
import { SeccionIntro } from "@/components/hero";
import { BenefitsSection } from "@/components/benefits-section";
import  FeatureSection  from "@/components/feature-images"
import { CTASection } from "@/components/cta-section";
import { DatosSteelFrame} from "@/components/steel-frame-facts";



export default function Home() {
  return (
      <main className="min-h-screen">
      <CarruselPrincipal/>
      <SeccionIntro/>
      <DatosSteelFrame/>
      <BenefitsSection/>
      <FeatureSection />
      <CTASection/>
      </main>
   
  );
}
