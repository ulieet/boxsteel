import { MessageSquare, FileText, Hammer, Key } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Consulta inicial",
    description: "Contactanos por WhatsApp y contanos tu proyecto. Te asesoramos sin compromiso.",
  },
  {
    icon: FileText,
    number: "02",
    title: "Diseño y presupuesto",
    description: "Desarrollamos el proyecto arquitectónico y te presentamos un presupuesto detallado.",
  },
  {
    icon: Hammer,
    number: "03",
    title: "Construcción",
    description: "Iniciamos la obra con nuestro equipo especializado en Steel Frame.",
  },
  {
    icon: Key,
    number: "04",
    title: "Entrega de llaves",
    description: "Recibís tu casa terminada en tiempo récord, lista para habitar.",
  },
]

export function ProcessSection() {
  return (
    <section id="proceso" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4 text-balance">Cómo trabajamos</h2>
          <p className="text-base lg:text-lg text-muted-foreground text-pretty">
            Un proceso simple y transparente para que tu proyecto se haga realidad
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-[2px] bg-border" />
              )}

              <div className="relative bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-accent text-accent-foreground rounded-lg flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6" />
                </div>

                <div className="text-4xl font-bold text-muted-foreground/20 mb-2">{step.number}</div>

                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>

                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
