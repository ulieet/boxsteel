import { Calendar, Wrench, Leaf, Calculator, type LucideIcon } from "lucide-react"


const datos: { icono: LucideIcon; texto: string }[] = [
  {
    icono: Calendar,
    texto: "Duración por años garantizada",
  },
  {
    icono: Wrench,
    texto: "Facilidad en reparaciones",
  },
  {
    icono: Leaf,
    texto: "Eco amigable",
  },
  {
    icono: Calculator,
    texto: "Cálculo de material anticipado",
  },
]

export function DatosSteelFrame() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Agregue el overflow-x-hidden para asegurar que no haya desborde en el page  */}
        <div className="max-w-4xl mx-auto overflow-x-hidden">
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16">
            <span className="text-foreground">¿Sabías esto del </span>
            
            <span className="relative inline-block overflow-hidden">
              <span className="relative z-10 text-foreground px-3">steel frame</span>
              <span className="absolute inset-0 bg-accent -skew-x-2 rounded"></span>
            </span>
            
            <span className="text-foreground">?</span>
          </h2>

          <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
            {datos.map((dato, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                
                <div className="flex items-center justify-center w-32 h-32 md:w-36 md:h-36 rounded-full border-[3px] border-accent mb-6">
                  <dato.icono 
                    className="w-10 h-10 md:w-12 md:h-12 text-accent" 
                    strokeWidth={1.5} 
                  />
                </div>
                
                <h3 className="text-lg md:text-xl font-semibold text-accent max-w-[200px] leading-relaxed">
                  {dato.texto}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}