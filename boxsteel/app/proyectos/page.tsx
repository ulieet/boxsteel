import ProyectosHeader from "@/app/proyectos/components/header"
import ProyectosGrid from "@/app/proyectos/components/proyectos-grid"

export default function ProyectosPage() {
  return (
    <div className="min-h-screen bg-neutral-700 mt-18">
      <ProyectosHeader />
      <ProyectosGrid />
    </div>
  )
}
