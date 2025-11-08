"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TarjetaSeccion } from "@/app/admin/components/card-admin"
import type { FeatureData } from "./types" 

interface ListaSeccionesProps {
  secciones: FeatureData[]
  alAgregar: () => void
  alEliminar: (indice: number) => void
  alActualizar: (indice: number, campo: keyof FeatureData, valor: any) => void
  alMover: (indice: number, direccion: "up" | "down") => void
}

export function ListaSecciones({
  secciones,
  alAgregar,
  alEliminar,
  alActualizar,
  alMover,
}: ListaSeccionesProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Gestionar Secciones (Landing Page)</h2>
        <div className="flex gap-2">
          <Button
            onClick={alAgregar}
            className="bg-accent"
          >
            <Plus className="h-4 w-4" /> Agregar Sección
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {secciones.map((s, i) => (
          <TarjetaSeccion
            key={i} // En un caso real, la 'seccion' debería tener un ID único
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