"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Trash2, ArrowUp, ArrowDown, Plus, X } from "lucide-react"
import type { Proyecto } from "./types"

interface TarjetaProyectoProps {
  proyecto: Proyecto
  indice: number
  total: number
  alActualizar: (indice: number, campo: keyof Proyecto, valor: any) => void
  alEliminar: (indice: number) => void
  alMover: (indice: number, direccion: "up" | "down") => void
}

export function TarjetaProyecto({
  proyecto,
  indice,
  total,
  alActualizar,
  alEliminar,
  alMover,
}: TarjetaProyectoProps) {

  const agregarImagen = () => {
    const nuevasImagenes = [...proyecto.imagenes, ""] 
    alActualizar(indice, "imagenes", nuevasImagenes)
  }

  const eliminarImagen = (imgIndex: number) => {
    const nuevasImagenes = proyecto.imagenes.filter((_, i) => i !== imgIndex)
    alActualizar(indice, "imagenes", nuevasImagenes)
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
        alActualizar(indice, "imagenes", nuevasImagenes)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold">
          Proyecto {indice + 1}: {proyecto.titulo}
        </h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => alMover(indice, "up")}
            disabled={indice === 0}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => alMover(indice, "down")}
            disabled={indice === total - 1}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => alEliminar(indice)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>ID (auto-generado: {proyecto.id})</Label>
            <Input
              value={proyecto.id}
              readOnly
              disabled
              className="text-gray-500"
            />
          </div>
          <div className="space-y-2">
            <Label>Título</Label>
            <Input
              value={proyecto.titulo}
              onChange={(e) => alActualizar(indice, "titulo", e.target.value)}
              placeholder="Ampliación de Vivienda"
            />
          </div>
          <div className="space-y-2">
            <Label>Ubicación</Label>
            <Input
              value={proyecto.ubicacion}
              onChange={(e) =>
                alActualizar(indice, "ubicacion", e.target.value)
              }
              placeholder="City Bell"
            />
          </div>
          <div className="space-y-2">
            <Label>Cliente</Label>
            <Input
              value={proyecto.cliente}
              onChange={(e) =>
                alActualizar(indice, "cliente", e.target.value)
              }
              placeholder="Particular"
            />
          </div>
          <div className="space-y-2">
            <Label>Año</Label>
            <Input
              value={proyecto.año}
              onChange={(e) => alActualizar(indice, "año", e.target.value)}
              placeholder="2024"
            />
          </div>
          <div className="space-y-2">
            <Label>Categoría</Label>
            <Input
              value={proyecto.categoria}
              onChange={(e) =>
                alActualizar(indice, "categoria", e.target.value)
              }
              placeholder="Residencial"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Descripción</Label>
            <Textarea
              value={proyecto.descripcion}
              onChange={(e) =>
                alActualizar(indice, "descripcion", e.target.value)
              }
              rows={6}
              placeholder="Descripción detallada del proyecto..."
            />
          </div>

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
    </Card>
  )
}