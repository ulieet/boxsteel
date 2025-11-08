import { MapPin } from "lucide-react"
import { ProjectImageSlider } from "./proyect-image-slider"

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

export default function TarjetaProyecto({ id, titulo, ubicacion, descripcion, imagenes, categoria }: Proyecto) {
  return (
    <article
      key={id}
      className="bg-neutral-800 rounded-lg overflow-hidden shadow-lg border border-neutral-700
                 group transition-shadow duration-300 hover:shadow-xl hover:shadow-[#1a9b9b]/10"
    >
      <ProjectImageSlider images={imagenes} title={titulo} />

      <div className="p-6">
        <div className="flex items-center gap-2 text-[#1a9b9b] mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm uppercase tracking-wider font-semibold">{ubicacion}</span>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3 leading-tight
                       transition-colors group-hover:text-[#1a9b9b]">
          {titulo}
        </h2>

        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-5">
          {descripcion}
        </p>

        <div className="pt-5 border-t border-neutral-700">
          <span className="inline-block bg-[#1a9b9b]/20 text-[#1a9b9b] px-3 py-1 rounded-full text-xs font-medium">
            {categoria}
          </span>
        </div>
      </div>
    </article>
  )
}