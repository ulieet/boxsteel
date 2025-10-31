import Image from "next/image"
import { Clock, Wrench, Home, TrendingUp } from "lucide-react"

const benefits = [
  {
    icon: Clock,
    title: "Construcción rápida",
    description: "Reducí los tiempos de obra hasta un 500% comparado con métodos tradicionales",
  },
  {
    icon: Wrench,
    title: "Sistema tradicional",
    description: "El Steel Frame es considerado un sistema de construcción tradicional y confiable",
  },
  {
    icon: Home,
    title: "Eficiencia energética",
    description: "Mejor aislación térmica y acústica para tu confort y ahorro",
  },
  {
    icon: TrendingUp,
    title: "Construcción en seco",
    description: "Proceso limpio, ordenado y sin desperdicios innecesarios",
  },
]

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            ¿Por qué elegir Steel Frame?
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground text-pretty">
            Un sistema constructivo que combina innovación, eficiencia y calidad para hacer realidad tu proyecto
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden order-2 lg:order-1">
            <Image
              src="/images/steel-frame-facts.png"
              alt="Construcción con Steel Frame"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6 order-1 lg:order-2">
           ``
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-accent">1</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Rapidez de construcción</h4>
                  <p className="text-sm text-muted-foreground">Los plazos de obra se reducen significativamente</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-accent">2</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Construcción sustentable</h4>
                  <p className="text-sm text-muted-foreground">Materiales reciclables y menor impacto ambiental</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-accent">3</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Versatilidad de diseño</h4>
                  <p className="text-sm text-muted-foreground">Adaptable a cualquier estilo arquitectónico</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-accent">4</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Excelente aislación</h4>
                  <p className="text-sm text-muted-foreground">Mayor confort térmico y acústico</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
