"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { TarjetaProyecto } from "./card-proyecto"
import { ModalProyecto } from "./modal-proyecto" 
import { Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog" 
import type { Proyecto, ProyectosHeaderData } from "./types" 
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ListaProyectosProps {
  headerData: ProyectosHeaderData
  onHeaderChange: (campo: keyof ProyectosHeaderData, valor: string) => void

  proyectos: Proyecto[]
  onProyectoAgregado: (nuevoProyecto: Proyecto) => void 
  alEliminar: (indice: number) => void
  alActualizar: (indice: number, campo: keyof Proyecto, valor: string | string[]) => void
  alMover: (indice: number, direccion: "up" | "down") => void
}

export function ListaProyectos({
  headerData,
  onHeaderChange,
  proyectos,
  onProyectoAgregado,
  alEliminar,
  alActualizar,
  alMover,
}: ListaProyectosProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleGuardarModal = (nuevoProyecto: Proyecto) => {
    onProyectoAgregado(nuevoProyecto)
    setIsModalOpen(false) 
  }

  return (
    <div className="space-y-6">
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Encabezado de la Página de Proyectos</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Título del Encabezado</Label>
            <Input
              value={headerData.titulo}
              onChange={(e) => onHeaderChange("titulo", e.target.value)}
              placeholder="Nuestros Proyectos"
            />
          </div>
          <div className="space-y-2">
            <Label>Descripción del Encabezado</Label>
            <Textarea
              value={headerData.descripcion}
              onChange={(e) => onHeaderChange("descripcion", e.target.value)}
              rows={4}
              placeholder="Descripción de la sección de proyectos..."
            />
          </div>
        </div>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Gestionar Proyectos Individuales</h2>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="h-4 w-4" /> Agregar Proyecto
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent className="max-w-4xl">
          <ModalProyecto onGuardar={handleGuardarModal} />
        </DialogContent>
      </Dialog>

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