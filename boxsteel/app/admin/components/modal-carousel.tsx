"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import type { CarouselSlide } from "./types"

interface ModalCarouselProps {
  onGuardar: (nuevoSlide: CarouselSlide) => void
}

const initialState: CarouselSlide = {
  src: "", 
  alt: "Slide de carrusel",
}

export function ModalCarousel({ onGuardar }: ModalCarouselProps) {
  const [slide, setSlide] = useState<CarouselSlide>(initialState)

  const handleChange = (campo: keyof CarouselSlide, valor: string) => {
    setSlide((prev) => ({ ...prev, [campo]: valor }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        handleChange("src", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGuardarClick = () => {
    onGuardar(slide)
    setSlide(initialState) 
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Agregar Nuevo Slide</DialogTitle>
        <DialogDescription>
          Sube una imagen y añade un texto descriptivo para el nuevo slide del carrusel.
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4 py-4">
        <div className="space-y-2">
          <Label>Imagen del Slide</Label>
          <Input
            type="file"
            accept="image/*"
            className="file:text-sm"
            onChange={handleImageUpload}
          />
        </div>

        {slide.src && (
          <div className="mt-4">
            <Label>Vista Previa</Label>
            <img
              src={slide.src}
              alt="Vista previa"
              className="mt-2 w-full max-w-sm h-32 object-cover rounded-md border"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>Texto Alternativo (Alt Text)</Label>
          <Input
            value={slide.alt}
            onChange={(e) => handleChange("alt", e.target.value)}
            placeholder="Descripción de la imagen"
          />
        </div>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancelar
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="button" onClick={handleGuardarClick}>
            Guardar Slide
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  )
}