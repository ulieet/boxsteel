"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, X } from "lucide-react"
import type { Proyecto } from "./types"

interface ModalProyectoProps {
  onGuardar: (nuevoProyecto: Proyecto) => void
}

const initialState: Proyecto = {
  id: "", 
  titulo: "",
  ubicacion: "",
  cliente: "",
  año: new Date().getFullYear().toString(),
  descripcion: "",
  imagenes: [""],
  categoria: "",
}

export function ModalProyecto({ onGuardar }: ModalProyectoProps) {
  const [proyecto, setProyecto] = useState<Proyecto>(initialState)

  const handleChange = (
    campo: keyof Proyecto,
    valor: string | string[]
  ) => {
    setProyecto((prev) => ({ ...prev, [campo]: valor }))
  }

  const agregarImagen = () => {
    handleChange("imagenes", [...proyecto.imagenes, ""])
  }

  const eliminarImagen = (imgIndex: number) => {
    const nuevasImagenes = proyecto.imagenes.filter((_, i) => i !== imgIndex)
    handleChange("imagenes", nuevasImagenes)
  }

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    imgIndex: number
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const nuevasImagenes = [...proyecto.imagenes]
        nuevasImagenes[imgIndex] = reader.result as string
        handleChange("imagenes", nuevasImagenes)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGuardarClick = () => {
    const idGenerado =
      proyecto.titulo.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, '') ||
      `proyecto-${Date.now()}`
    
    const proyectoFinal: Proyecto = {
      ...proyecto,
      id: idGenerado,
      // Filtramos las imágenes vacías antes de guardar
      imagenes: proyecto.imagenes.filter(img => img && img.startsWith("data:image")),
    }
    
    onGuardar(proyectoFinal)
    setProyecto(initialState) 
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Agregar Nuevo Proyecto</DialogTitle>
        <DialogDescription>
          Completa los datos del proyecto. Haz clic en "Guardar" al terminar.
        </DialogDescription>
      </DialogHeader>

      <ScrollArea className="max-h-[70vh] pr-6">
        <div className="grid gap-4 py-4 md:grid-cols-2">
          {/* Columna Izquierda */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                value={proyecto.titulo}
                onChange={(e) => handleChange("titulo", e.target.value)}
                placeholder="Ampliación de Vivienda"
              />
            </div>
            <div className="space-y-2">
              <Label>Ubicación</Label>
              <Input
                value={proyecto.ubicacion}
                onChange={(e) => handleChange("ubicacion", e.target.value)}
                placeholder="City Bell"
              />
            </div>
            <div className="space-y-2">
              <Label>Cliente</Label>
              <Input
                value={proyecto.cliente}
                onChange={(e) => handleChange("cliente", e.target.value)}
                placeholder="Particular"
              />
            </div>
            <div className="space-y-2">
              <Label>Año</Label>
              <Input
                value={proyecto.año}
                onChange={(e) => handleChange("año", e.target.value)}
                placeholder="2024"
              />
            </div>
            <div className="space-y-2">
              <Label>Categoría</Label>
              <Input
                value={proyecto.categoria}
                onChange={(e) => handleChange("categoria", e.target.value)}
                placeholder="Residencial"
              />
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Descripción</Label>
              <Textarea
                value={proyecto.descripcion}
                onChange={(e) => handleChange("descripcion", e.target.value)}
                rows={6}
                placeholder="Descripción detallada del proyecto..."
              />
            </div>

            {/* Gestión de Imágenes */}
            <div className="space-y-2">
              <Label>Imágenes</Label>
              <div className="space-y-4">
                {proyecto.imagenes.map((imgSrc, imgIndex) => (
                  <div key={imgIndex} className="flex items-end gap-2">
                    <img
                      src={imgSrc || "/placeholder.svg"}
                      alt={`Preview ${imgIndex + 1}`}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                    <div className="flex-1 space-y-2">
                      <Label className="text-xs">Imagen {imgIndex + 1}</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        className="file:text-xs"
                        onChange={(e) => handleImageUpload(e, imgIndex)}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => eliminarImagen(imgIndex)}
                      aria-label="Eliminar imagen"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={agregarImagen}
                className="mt-2 gap-2"
              >
                <Plus className="h-4 w-4" />
                Añadir Slot de Imagen
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancelar
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="button" onClick={handleGuardarClick}>
            Guardar Proyecto
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  )
}