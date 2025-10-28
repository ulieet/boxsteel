import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 lg:pt-20">
      <div className="absolute inset-0 from-background via-background to-muted/20 -z-10" />

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8">
            <div className="inline-block">
            </div>

            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight text-balance">
              El sueño de tu casa propia <span className="text-accent">500% más rápido</span>
            </h1>

            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-xl text-pretty">
              Construí con Steel Frame, el sistema de construcción eficiente que revoluciona la forma de hacer tu hogar.
              Calidad, rapidez y sustentabilidad en un solo proyecto.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium text-base group"
                asChild
              >
                <a href="https://wa.me/5492213147323" target="_blank" rel="noopener noreferrer">
                  Consultar por WhatsApp
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>

              <Button size="lg" variant="outline" className="font-medium text-base border-2 bg-transparent" asChild>
                <a href="#proyectos">Ver proyectos</a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative  lg:aspect-square rounded-2xl overflow-hidden">
              <Image
                src="/images/modern-house.png"
                alt="Casa moderna construida con Steel Frame"
                fill
                className="object-cover"
                priority
              />
            </div>
          
          </div>
        </div>
      </div>
    </section>
  )
}
