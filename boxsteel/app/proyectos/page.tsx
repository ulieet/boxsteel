import { MapPin } from "lucide-react"
import {ProjectImageSlider} from "@/app/proyectos/components/proyect-image-slider" 
import projectsData from "@/lib/data/projects.json"

interface Project {
  id: string
  title: string
  location: string
  client: string
  year: string
  description: string
  images: string[]
  category: string
}

export default function ProyectosPage() {
  const projects: Project[] = projectsData as Project[]

  return (
    <div className="min-h-screen bg-neutral-700 mt-18">

      <section className="py-16 md:py-24 relative overflow-hidden bg-neutral-600">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(26, 155, 155, 0.05) 50px, rgba(26, 155, 155, 0.05) 51px),
                                repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(26, 155, 155, 0.05) 50px, rgba(26, 155, 155, 0.05) 51px)`,
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-block mb-6">
              <div className="bg-[#1a9b9b] px-8 py-3 transform -skew-x-6">
                <h1 className="text-4xl md:text-6xl font-bold text-white transform skew-x-6">
                  NUESTROS PROYECTOS
                </h1>
              </div>
            </div>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl leading-relaxed">
              Hemos ejecutado obras de todo tipo. Cárceles, Hospitales, Laboratorios, Escuelas, Universidades, Oficinas,
              Judiciales, Naves Industriales, Estadios, Polideportivos, Estaciones de Servicio, y más.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 pb-24 bg-neutral-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {projects.map((project) => (
              <article
                key={project.id}
                className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg border border-neutral-700
                           group transition-shadow duration-300 hover:shadow-xl hover:shadow-[#1a9b9b]/10"
              >
                <ProjectImageSlider images={project.images} title={project.title} />

                <div className="p-6">
                  <div className="flex items-center gap-2 text-[#1a9b9b] mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm uppercase tracking-wider font-semibold">{project.location}</span>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-3 leading-tight
                                 transition-colors group-hover:text-[#1a9b9b]">
                    {project.title}
                  </h2>

                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-5">
                    {project.description}
                  </p>

                  <div className="pt-5 border-t border-neutral-700">
                    <span className="inline-block bg-[#1a9b9b]/20 text-[#1a9b9b] px-3 py-1 rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>
              </article>
            ))}

          </div>
        </div>
      </section>
    </div>
  )
}
