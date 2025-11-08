"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TarjetaSeccion } from "@/app/admin/components/card-admin"
import type { FeatureData } from "./types" 
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ModalSeccion } from "./modal-seccion" 

interface ListaSeccionesProps {
  secciones: FeatureData[]
  onSeccionAgregada: (nuevaSeccion: FeatureData) => void
  alEliminar: (indice: number) => void
  alActualizar: (indice: number, campo: keyof FeatureData, valor: any) => void
  alMover: (indice: number, direccion: "up" | "down") => void
}

export function ListaSecciones({
  secciones,
  onSeccionAgregada,
  alEliminar,
  alActualizar,
  alMover,
}: ListaSeccionesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleGuardarModal = (nuevaSeccion: FeatureData) => {
    onSeccionAgregada(nuevaSeccion)
    setIsModalOpen(false) 
  }

  return (
    <div className="space-y-6">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Gestionar Secciones (Landing Page)</h2>
          <DialogTrigger asChild>
            <Button
              className="bg-accent"
            >
              <Plus className="h-4 w-4" /> Agregar Sección
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent className="max-w-4xl">
          <ModalSeccion onGuardar={handleGuardarModal} />
        </DialogContent>
      </Dialog> 

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