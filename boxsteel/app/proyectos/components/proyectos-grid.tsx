import TarjetaProyecto from "@/app/proyectos/components/proyect-card"
import projectsData from "@/lib/data/proyectos.json"

interface Proyecto {
  id: string
  titulo: string
  ubicacion: string
  cliente: string
  año: string
  descripcion: string
  imagenes: string[]
  categoria: string
}

export default function GrillaProyectos() {
  
  const proyectos: Proyecto[] = projectsData as Proyecto[]

  return (
    <section className="py-12 pb-24 bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyectos.map((proyecto) => (
            <TarjetaProyecto key={proyecto.id} {...proyecto} />
          ))}
        </div>
      </div>
    </section>
  )
}