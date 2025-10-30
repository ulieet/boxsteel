import { Calendar, Wrench, Leaf, Calculator } from "lucide-react"

const facts = [
  {
    icon: Calendar,
    title: "Duración por años garantizada",
  },
  {
    icon: Wrench,
    title: "Facilidad en reparaciones",
  },
  {
    icon: Leaf,
    title: "Eco amigable",
  },
  {
    icon: Calculator,
    title: "Cálculo de material anticipado",
  },
]

export function SteelFrameFacts() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold text-center mb-12 lg:mb-16">
            <span className="text-foreground">¿Sabías esto del </span>
            <span className="relative inline-block">
              <span className="relative z-10 text-foreground px-3">steel frame</span>
              <span className="absolute inset-0 bg-[#1a9b9b] -skew-x-2 rounded"></span>
            </span>
            <span className="text-foreground">?</span>
          </h2>

          <div className="grid sm:grid-cols-2 gap-8 lg:gap-12">
            {facts.map((fact, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-[3px] border-[#1a9b9b] flex items-center justify-center mb-6">
                  <fact.icon className="w-10 h-10 lg:w-12 lg:h-12 text-[#1a9b9b]" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-[#1a9b9b] max-w-[200px] leading-relaxed">
                  {fact.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
