import Slideimages from "@/components/slide-images";
import { IntroSection } from "@/components/hero";
import { BenefitsSection } from "@/components/benefits-section";
import { FeatureSection } from "@/components/feature-images"
import { featuresData } from "@/lib/data/features"
import { CTASection } from "@/components/cta-section";
import { SteelFrameFacts } from "@/components/steel-frame-facts";



export default function Home() {
  return (
    
      <main className="min-h-screen">
       <Slideimages/>
       <IntroSection/>
       <SteelFrameFacts/>
       <BenefitsSection/>
       {featuresData.map((feature, index) => (
        <FeatureSection key={index} {...feature} />
      ))}
      <CTASection/>

       
      </main>
   
  );
}
