"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TarjetaProyecto } from "./card-proyecto"
import { ModalProyecto } from "./modal-proyecto" // Importamos el modal
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog" // Importamos el dialog
import type { Proyecto } from "./types"

interface ListaProyectosProps {
  proyectos: Proyecto[]
  onProyectoAgregado: (nuevoProyecto: Proyecto) => void // Cambiamos el nombre de la prop
  alEliminar: (indice: number) => void
  alActualizar: (indice: number, campo: keyof Proyecto, valor: any) => void
  alMover: (indice: number, direccion: "up" | "down") => void
}

export function ListaProyectos({
  proyectos,
  onProyectoAgregado,
  alEliminar,
  alActualizar,
  alMover,
}: ListaProyectosProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleGuardarModal = (nuevoProyecto: Proyecto) => {
    onProyectoAgregado(nuevoProyecto)
    setIsModalOpen(false) // Cierra el modal al guardar
  }

  return (
    <div className="space-y-6">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Gestionar Proyectos</h2>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4" /> Agregar Proyecto
            </Button>
          </DialogTrigger>
        </div>

        {/* El contenido del Modal se renderiza aquí (en un portal) */}
        <DialogContent className="max-w-4xl">
          <ModalProyecto onGuardar={handleGuardarModal} />
        </DialogContent>
      </Dialog>

      {/* La lista de proyectos existentes */}
      <div className="space-y-4">
        {proyectos.map((p, i) => (
          <TarjetaProyecto
            key={p.id || i}
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