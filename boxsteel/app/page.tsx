import { SeccionIntro } from "@/components/hero";
import { SeccionBeneficios } from "@/components/beneficios-section";
import { CTASection } from "@/components/cta-section";
import { DatosSteelFrame} from "@/components/steel-frame-facts";
import CarruselPrincipal from "@/components/carrousel-slide";
import  FeatureSection  from "@/components/feature-images"



export default function Home() {
  return (
      <main className="min-h-screen">
      <CarruselPrincipal/>
      <SeccionIntro/>
      <DatosSteelFrame/>
      <SeccionBeneficios/>
      <FeatureSection />
      <CTASection/>
      </main>
   
  );
}
