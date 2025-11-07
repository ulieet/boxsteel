"use client"

import { Button } from "@/components/ui/button"
import { Plus, Save } from "lucide-react"
import { TarjetaSeccion } from "@/app/admin/components/card-admin"

/*gestion lista de secciones de contenido de la página (como "features" o características).*/

export interface FeatureData {
  eyebrow: string
  title: string
  subtitle?: string
  description: string[] | string
  image: string
  imageAlt: string
  imagePosition: "left" | "right"
}


interface ListaSeccionesProps {
  secciones: FeatureData[]
  alAgregar: () => void
  alEliminar: (indice: number) => void
  alActualizar: (indice: number, campo: keyof FeatureData, valor: any) => void
  alMover: (indice: number, direccion: "up" | "down") => void
  alGuardar: () => void
  hayCambios: boolean
}

export function ListaSecciones({ secciones, alAgregar, alEliminar, alActualizar, alMover, alGuardar, hayCambios }: ListaSeccionesProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Gestionar Secciones</h2>
        <div className="flex gap-2">
          <Button onClick={alAgregar} className="gap-2 bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4" /> Agregar Sección
          </Button>

          <Button
            onClick={alGuardar}
            disabled={!hayCambios}
            variant="outline"
            className="gap-2"
          >
            <Save className="h-4 w-4" /> Guardar Cambios
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {secciones.map((s, i) => (
          <TarjetaSeccion
            key={i}
            seccion={s}
            indice={i}
            total={secciones.length}
            alActualizar={alActualizar}
            alEliminar={alEliminar}
            alMover={alMover}
          />
        ))}
      </div>
    </div>
  )
}
