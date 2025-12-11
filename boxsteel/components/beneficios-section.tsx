import Image from "next/image"
import Link from "next/link"

const datosSeccion = {
  titulo: "¿Por qué elegir Steel Frame?",
  descripcion: "Un sistema constructivo que combina innovación, eficiencia y calidad para hacer realidad tu proyecto",
}

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
    <section id="beneficios" className="py-10 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {datosSeccion.titulo}
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground text-pretty">
            {datosSeccion.descripcion}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden order-2 lg:order-1">
            <Image  
              src={datosExtra.imagenSrc}
              alt={datosExtra.imagenAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
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

            <div className="pt-4 mt-18 ml-3">
              <Link
                href="/beneficios"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-accent text-accent-foreground hover:bg-accent/80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 group"
              >
                Conocer más 
                <span className="text-lg transform transition-transform duration-300 group-hover:translate-x-1">
                  ➜
                </span>
              </Link>
            </div>


          </div>
        </div>

      </div>
    </section>
  )
}
