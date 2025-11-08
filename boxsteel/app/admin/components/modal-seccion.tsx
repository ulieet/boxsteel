"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { FeatureData } from "./types"

interface ModalSeccionProps {
  onGuardar: (nuevaSeccion: FeatureData) => void
}

const initialState: FeatureData = {
  eyebrow: "NUEVO",
  title: "Título de la sección",
  subtitle: "Subtítulo de la sección",
  description: ["Descripción de la sección..."],
  image: "", 
  imageAlt: "Imagen descriptiva",
  imagePosition: "right",
}

export function ModalSeccion({ onGuardar }: ModalSeccionProps) {
  const [seccion, setSeccion] = useState<FeatureData>(initialState)

  const handleChange = (
    campo: keyof FeatureData,
    valor: string | string[]
  ) => {
    setSeccion((prev) => ({ ...prev, [campo]: valor }))
  }

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        handleChange("image", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGuardarClick = () => {
    const descripcionFinal = Array.isArray(seccion.description)
      ? seccion.description
      : (seccion.description as string).split("\n")
    
    const seccionFinal: FeatureData = {
      ...seccion,
      description: descripcionFinal,
    }
    
    onGuardar(seccionFinal)
    setSeccion(initialState) 
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Agregar Nueva Sección</DialogTitle>
        <DialogDescription>
          Completa los datos de la nueva sección de la página de inicio.
        </DialogDescription>
      </DialogHeader>

      <ScrollArea className="max-h-[70vh] pr-6">
        <div className="grid gap-4 py-4 md:grid-cols-2">
          {/* Columna Izquierda */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Etiqueta Superior (Eyebrow)</Label>
              <Input
                value={seccion.eyebrow}
                onChange={(e) => handleChange("eyebrow", e.target.value)}
                placeholder="NUEVO"
              />
            </div>
            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                value={seccion.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Título de la sección"
              />
            </div>
            <div className="space-y-2">
              <Label>Subtítulo (Opcional)</Label>
              <Input
                value={seccion.subtitle || ""}
                onChange={(e) => handleChange("subtitle", e.target.value)}
                placeholder="Subtítulo descriptivo"
              />
            </div>
            <div className="space-y-2">
              <Label>Posición de Imagen</Label>
              <Select
                value={seccion.imagePosition}
                onValueChange={(valor) =>
                  handleChange("imagePosition", valor)
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
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Descripción (una línea por párrafo)</Label>
              <Textarea
                value={
                  Array.isArray(seccion.description)
                    ? seccion.description.join("\n")
                    : seccion.description || ""
                }
                onChange={(e) =>
                  handleChange("description", e.target.value.split("\n"))
                }
                rows={6}
                placeholder="Descripción detallada..."
              />
            </div>

            <div className="space-y-2">
              <Label>Imagen</Label>
              <Input
                type="file"
                accept="image/*"
                className="file:text-sm"
                onChange={handleImageUpload}
              />
            </div>
            <div className="space-y-2">
              <Label>Texto Alternativo (Alt Text)</Label>
              <Input
                value={seccion.imageAlt}
                onChange={(e) => handleChange("imageAlt", e.target.value)}
                placeholder="Descripción de la imagen"
              />
            </div>
             {seccion.image && (
                <div className="mt-4">
                <Label>Vista Previa</Label>
                <img
                    src={seccion.image}
                    alt="Vista previa"
                    className="mt-2 w-full max-w-sm h-32 object-cover rounded-md border"
                />
                </div>
            )}
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
            Guardar Sección
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  )
}