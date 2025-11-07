import Image from "next/image"
import { Clock, Wrench, Home, TrendingUp, type LucideIcon } from "lucide-react"



const datosSeccion = {
  titulo: "¿Por qué elegir Steel Frame?",
  descripcion: "Un sistema constructivo que combina innovación, eficiencia y calidad para hacer realidad tu proyecto",
}

const beneficios: { icono: LucideIcon; titulo: string; descripcion: string }[] = [
  {
    icono: Clock,
    titulo: "Construcción rápida",
    descripcion: "Reducí los tiempos de obra hasta un 500% comparado con métodos tradicionales",
  },
  {
    icono: Wrench,
    titulo: "Sistema tradicional",
    descripcion: "El Steel Frame es considerado un sistema de construcción tradicional y confiable",
  },
  {
    icono: Home,
    titulo: "Eficiencia energética",
    descripcion: "Mejor aislación térmica y acústica para tu confort y ahorro",
  },
  {
    icono: TrendingUp,
    titulo: "Construcción en seco",
    descripcion: "Proceso limpio, ordenado y sin desperdicios innecesarios",
  },
]

const datosExtra = {
  imagenSrc: "/images/steel-frame-facts.png",
  imagenAlt: "Datos sobre Steel Frame",
  titulo: "4 datos importantes del Steel Frame",
  lista: [
    { titulo: "Rapidez de construcción", descripcion: "Los plazos de obra se reducen significativamente" },
    { titulo: "Construcción sustentable", descripcion: "Materiales reciclables y menor impacto ambiental" },
    { titulo: "Versatilidad de diseño", descripcion: "Adaptable a cualquier estilo arquitectónico" },
    { titulo: "Excelente aislación", descripcion: "Mayor confort térmico y acústico" },
  ]
}


export function SeccionBeneficios() {
  return (
    <section id="beneficios" className="py-10 md:py-10 bg-muted/30 ">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {datosSeccion.titulo}
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground text-pretty">
            {datosSeccion.descripcion}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 md:mb-16">
          {beneficios.map((beneficio) => (
            <div key={beneficio.titulo} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <beneficio.icono className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{beneficio.titulo}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{beneficio.descripcion}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
        
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden order-2 lg:order-1">
            <Image
              src={datosExtra.imagenSrc}
              alt={datosExtra.imagenAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw" // Añadido para optimización de imagen
            />
          </div>
          
          <div className="space-y-6 order-1 lg:order-2">
            <h3 className="text-2xl lg:text-4xl font-bold text-foreground text-balance">
              {datosExtra.titulo}
            </h3>
            <div className="space-y-4">
              {datosExtra.lista.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-accent">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.titulo}</h4>
                    <p className="text-sm text-muted-foreground">{item.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}