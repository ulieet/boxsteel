"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Trash2, ArrowUp, ArrowDown } from "lucide-react"
import type { FeatureData } from "./types"

interface TarjetaSeccionProps {
  seccion: FeatureData
  indice: number
  total: number
  alActualizar: (indice: number, campo: keyof FeatureData, valor: any) => void
  alEliminar: (indice: number) => void
  alMover: (indice: number, direccion: "up" | "down") => void
}

export function TarjetaSeccion({
  seccion,
  indice,
  total,
  alActualizar,
  alEliminar,
  alMover,
}: TarjetaSeccionProps) {
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        // Guardamos la imagen como un string base64
        alActualizar(indice, "image", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold">
          Sección {indice + 1}: {seccion.title}
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
        <div className="space-y-2">
          <Label>Etiqueta Superior</Label>
          <Input
            value={seccion.eyebrow}
            onChange={(e) => alActualizar(indice, "eyebrow", e.target.value)}
            placeholder="EQUIPOS PROPIOS"
          />
        </div>

        <div className="space-y-2">
          <Label>Posición de Imagen</Label>
          <Select
            value={seccion.imagePosition}
            onValueChange={(valor) =>
              alActualizar(indice, "imagePosition", valor)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Izquierda</SelectItem>
              <SelectItem value="right">Derecha</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Título</Label>
          <Input
            value={seccion.title}
            onChange={(e) => alActualizar(indice, "title", e.target.value)}
            placeholder="Disponibilidad en cualquier etapa del proyecto"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Subtítulo</Label>
          <Input
            value={seccion.subtitle || ""}
            onChange={(e) => alActualizar(indice, "subtitle", e.target.value)}
            placeholder="Siempre listos para tu obra"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Descripción (una línea por párrafo)</Label>
          <Textarea
            value={
              Array.isArray(seccion.description)
                ? seccion.description.join("\n")
                : seccion.description || ""
            }
            onChange={(e) =>
              alActualizar(indice, "description", e.target.value.split("\n"))
            }
            rows={6}
          />
        </div>

        {/* --- Selector de Archivo --- */}
        <div className="space-y-2">
          <Label>Imagen de la Sección</Label>
          <Input
            type="file"
            accept="image/*"
            className="file:text-sm file:font-medium"
            onChange={handleImageUpload}
          />
        </div>

        <div className="space-y-2">
          <Label>Texto Alternativo (Alt Text)</Label>
          <Input
            value={seccion.imageAlt}
            onChange={(e) => alActualizar(indice, "imageAlt", e.target.value)}
            placeholder="Equipos de construcción"
          />
        </div>
      </div>

      {/* --- Vista Previa de Imagen --- */}
      {seccion.image && (
        <div className="mt-4">
          <Label>Vista Previa</Label>
          <img
            src={seccion.image} // La fuente es el string base64
            alt={seccion.imageAlt}
            className="mt-2 w-full max-w-md h-48 object-cover rounded-lg border"
          />
        </div>
      )}
    </Card>
  )
}