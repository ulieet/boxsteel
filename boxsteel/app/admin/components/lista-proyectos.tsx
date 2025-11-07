"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TarjetaProyecto } from "./card-proyecto" // Importamos la nueva tarjeta
import type { Proyecto } from "./types" // Importamos el tipo

interface ListaProyectosProps {
  proyectos: Proyecto[]
  alAgregar: () => void
  alEliminar: (indice: number) => void
  alActualizar: (
    indice: number,
    campo: keyof Proyecto,
    valor: any
  ) => void
  alMover: (indice: number, direccion: "up" | "down") => void
}

export function ListaProyectos({
  proyectos,
  alAgregar,
  alEliminar,
  alActualizar,
  alMover,
}: ListaProyectosProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Gestionar Proyectos</h2>
        <div className="flex gap-2">
          <Button
            onClick={alAgregar}
            className="gap-2 bg-teal-600 hover:bg-teal-700"
          >
            <Plus className="h-4 w-4" /> Agregar Proyecto
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {proyectos.map((p, i) => (
          <TarjetaProyecto
            key={p.id || i} // Usamos el id si existe, o el índice como fallback
            proyecto={p}
            indice={i}
            total={proyectos.length}
            alActualizar={alActualizar}
            alEliminar={alEliminar}
            alMover={alMover}
          />
        ))}
      </div>
    </div>
  )
}