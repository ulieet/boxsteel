"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Trash2, ArrowUp, ArrowDown, Plus } from "lucide-react"
import type { CarouselSlide } from "./types"

// Definimos las props que recibirá este componente desde la página de admin
interface ListaCarouselProps {
  slides: CarouselSlide[]
  alAgregar: () => void
  alEliminar: (indice: number) => void
  alActualizar: (indice: number, campo: keyof CarouselSlide, valor: string) => void
  alMover: (indice: number, direccion: "up" | "down") => void
  alSubirImagen: (indice: number, file: File) => void
}

export function ListaCarousel({
  slides,
  alAgregar,
  alEliminar,
  alActualizar,
  alMover,
  alSubirImagen,
}: ListaCarouselProps) {

  // Handler local para el input de tipo "file"
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    imgIndex: number
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      alSubirImagen(imgIndex, file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Gestionar Carrusel Principal</h2>
        <Button
          onClick={alAgregar}
          className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Plus className="h-4 w-4" /> Agregar Slide
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Administra las imágenes que aparecen en el carrusel principal de la página de inicio.
      </p>

      <div className="space-y-4">
        {slides.map((slide, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Slide {i + 1}
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alMover(i, "up")}
                  disabled={i === 0}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => alMover(i, "down")}
                  disabled={i === slides.length - 1}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => alEliminar(i)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Texto Alternativo (Alt Text)</Label>
                <Input
                  value={slide.alt}
                  onChange={(e) => alActualizar(i, "alt", e.target.value)}
                  placeholder="Descripción de la imagen"
                />
              </div>

              <div className="space-y-2">
                <Label>Imagen del Slide</Label>
                <Input
                  type="file"
                  accept="image/*"
                  className="file:text-sm file:font-medium"
                  onChange={(e) => handleImageUpload(e, i)}
                />
              </div>
            </div>
            
            {slide.src && (
              <div className="mt-4">
                <Label>Vista Previa</Label>
                <img
                  src={slide.src.startsWith('data:') ? slide.src : (slide.src || "/placeholder.svg")}
                  alt={slide.alt || "Vista previa"}
                  className="mt-2 w-full max-w-md h-48 object-cover rounded-lg border"
                />
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}