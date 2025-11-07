"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Trash2, ArrowUp, ArrowDown, Plus, X } from "lucide-react"
import type { Proyecto } from "./types" // Importamos el tipo

interface TarjetaProyectoProps {
  proyecto: Proyecto
  indice: number
  total: number
  alActualizar: (
    indice: number,
    campo: keyof Proyecto,
    valor: any
  ) => void
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
  
  // --- Funciones para manejar el array de imágenes ---

  const agregarImagen = () => {
    // Agregamos una ruta de imagen vacía o un placeholder
    const nuevasImagenes = [...proyecto.imagenes, "/proyectos/placeholder.png"]
    alActualizar(indice, "imagenes", nuevasImagenes)
  }

  const eliminarImagen = (imgIndex: number) => {
    const nuevasImagenes = proyecto.imagenes.filter((_, i) => i !== imgIndex)
    alActualizar(indice, "imagenes", nuevasImagenes)
  }

  const actualizarImagen = (imgIndex: number, valor: string) => {
    const nuevasImagenes = [...proyecto.imagenes]
    nuevasImagenes[imgIndex] = valor
    alActualizar(indice, "imagenes", nuevasImagenes)
  }

  // --- Renderizado ---

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
        {/* Columna Izquierda */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>ID (único, sin espacios)</Label>
            <Input
              value={proyecto.id}
              onChange={(e) =>
                alActualizar(indice, "id", e.target.value.toLowerCase().replace(/\s+/g, '-'))
              }
              placeholder="ej: mi-nuevo-proyecto"
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

        {/* Columna Derecha */}
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

          {/* Gestión de Imágenes */}
          <div className="space-y-2">
            <Label>Imágenes (rutas del proyecto, ej: /proyectos/img.png)</Label>
            <div className="space-y-2">
              {proyecto.imagenes.map((img, imgIndex) => (
                <div key={imgIndex} className="flex gap-2">
                  <Input
                    value={img}
                    onChange={(e) =>
                      actualizarImagen(imgIndex, e.target.value)
                    }
                    placeholder="/proyectos/imagen.png"
                  />
                  <Button
                    variant="outline"
                    size="sm"
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
              Añadir Imagen
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}