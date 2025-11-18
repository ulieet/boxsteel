"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Maximize2, ChevronLeft, ChevronRight, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose // Mantenemos la importación
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Props {
  images: string[]
  title: string
}

const MAX_IMAGES_TO_SHOW = 3
const SLIDE_INTERVAL_MS = 3000 

export function ProjectImageSlider({ images, title }: Props) {
  const [cardIndex, setCardIndex] = useState(0)
  const [modalIndex, setModalIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  const validImages = images.filter(Boolean)
  const cardImages = validImages.slice(0, MAX_IMAGES_TO_SHOW)

  useEffect(() => {
    if (cardImages.length <= 1 || isOpen) return 

    const interval = setInterval(() => {
      setCardIndex((prev) => (prev === cardImages.length - 1 ? 0 : prev + 1))
    }, SLIDE_INTERVAL_MS)

    return () => clearInterval(interval) 
  }, [cardImages.length, isOpen])

  const nextImage = useCallback(() => {
    setModalIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1))
  }, [validImages.length])

  const prevImage = useCallback(() => {
    setModalIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1))
  }, [validImages.length])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") prevImage()
  }, [nextImage, prevImage])

  const openModal = useCallback(() => {
    setModalIndex(cardIndex)
    setIsOpen(true)
  }, [cardIndex])

  return (
    <div 
      className="relative aspect-[16/10] overflow-hidden group bg-neutral-900 cursor-pointer"
      onClick={openModal} 
    >
      {/* --- SLIDER DE LA TARJETA (Pequeño) --- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cardIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={cardImages[cardIndex] || "/placeholder.svg"}
            alt={`${title} - Imagen ${cardIndex + 1}`}
            fill
            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
      
      {/* Indicadores de posición */}
      {cardImages.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
          {cardImages.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${
                index === cardIndex ? "bg-white w-4" : "bg-white/50 w-1.5"
              }`}
            />
          ))}
        </div>
      )}

      {/* Botón explícito "Ver imágenes" */}
      <Button 
        variant="secondary" 
        size="sm"
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 gap-2 font-medium shadow-lg bg-white/90 hover:bg-white text-black backdrop-blur-sm translate-y-[-10px] group-hover:translate-y-0"
        onClick={(e) => { 
          e.stopPropagation(); 
          openModal(); 
        }}
      >
        <Maximize2 className="w-3.5 h-3.5" />
        <span className="text-xs">Ver imágenes</span>
      </Button>

      {/* --- MODAL FULLSCREEN (Lightbox) --- */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent 
          className="max-w-[95vw] w-full h-[90vh] p-0 bg-transparent border-none shadow-none flex flex-col justify-center items-center outline-none"
          onKeyDown={handleKeyDown}
          // FORZAMOS EL CIERRE AL HACER CLICK FUERA DEL CONTENIDO
          onPointerDownOutside={() => setIsOpen(false)} 
        >
          {/* Títulos para accesibilidad (sr-only) */}
          <DialogTitle className="sr-only">Galería: {title}</DialogTitle>
          <DialogDescription className="sr-only">Vista ampliada de las imágenes del proyecto</DialogDescription>

          <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            
            {/* Botón Cerrar (X) - Se deja fuera del DialogClose nativo para que sea más visible */}
             <DialogClose className="absolute -top-12 right-0 md:-right-4 text-white/80 hover:text-white transition-colors z-50 p-2 bg-black/20 hover:bg-black/40 rounded-full">
               <X className="w-6 h-6" />
               <span className="sr-only">Cerrar galería</span>
             </DialogClose>

            {/* Área de la Imagen */}
            <div className="relative w-full h-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={modalIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                   <Image
                    src={validImages[modalIndex] || "/placeholder.svg"}
                    alt={`${title} - Vista ampliada ${modalIndex + 1}`}
                    fill
                    className="object-contain"
                    priority
                    sizes="90vw"
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Flechas de Navegación */}
              {validImages.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 text-white hover:bg-black/40 hover:text-white rounded-full h-10 w-10 md:h-14 md:w-14 transition-all"
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 text-white hover:bg-black/40 hover:text-white rounded-full h-10 w-10 md:h-14 md:w-14 transition-all"
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  >
                    <ChevronRight className="w-8 h-8" />
                  </Button>
                </>
              )}
            </div>

            {/* Contador */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/60 backdrop-blur-md rounded-full text-white text-sm font-medium border border-white/10 flex gap-3 items-center shadow-xl">
              <span className="text-white/70 hidden sm:inline">{title}</span>
              <span className="w-1 h-1 bg-white/30 rounded-full hidden sm:block"></span>
              <span>{modalIndex + 1} / {validImages.length}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}