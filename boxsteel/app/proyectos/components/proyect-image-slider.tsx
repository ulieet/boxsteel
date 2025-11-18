"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
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
    const interval = setInterval(
      () => setCardIndex((prev) => (prev + 1) % cardImages.length),
      SLIDE_INTERVAL_MS
    )
    return () => clearInterval(interval)
  }, [cardImages.length, isOpen])

  const nextImage = useCallback(() => {
    setModalIndex((prev) => (prev + 1) % validImages.length)
  }, [validImages.length])

  const prevImage = useCallback(() => {
    setModalIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1))
  }, [validImages.length])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "Escape") setIsOpen(false)
    },
    [nextImage, prevImage]
  )

  const openModal = () => {
    setModalIndex(cardIndex)
    setIsOpen(true)
  }

  return (
    <div
      className="relative aspect-[16/10] overflow-hidden group bg-neutral-900 cursor-pointer"
      onClick={openModal}
    >
      {/* Slider chico */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cardIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={cardImages[cardIndex]}
            alt={`${title} - Imagen ${cardIndex + 1}`}
            fill
            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 from-black/60 via-transparent to-transparent opacity-60" />
      {cardImages.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
          {cardImages.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === cardIndex ? "bg-white w-4" : "bg-white/50 w-1.5"
              }`}
            />
          ))}
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="max-w-[50vw] w-full h-[20vh] p-0 bg-transparent border-none shadow-none flex justify-center items-center outline-none [&>button]:hidden"
          onKeyDown={handleKeyDown as any}
        >
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">Galería de {title}</DialogDescription>
        <div className="relative w-[80vw] h-[80vh] flex items-center justify-center">

            <AnimatePresence mode="wait">
              <motion.div
                key={modalIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src={validImages[modalIndex]}
                  alt={`${title} ampliada`}
                  fill
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 text-white hover:bg-black/40 rounded-full h-12 w-12 "
              onClick={(e) => {
                e.stopPropagation()
                prevImage()
              }}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:bg-black/40 rounded-full h-12 w-12"
              onClick={(e) => {
                e.stopPropagation()
                nextImage()
              }}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/60 rounded-full text-white text-sm flex gap-2 items-center z-20">
              <span className="hidden sm:inline opacity-70">{title}</span>
              <span>{modalIndex + 1} / {validImages.length}</span>
            </div>
          </div>
        </DialogContent>
     
      </Dialog>
    </div>
  )
}
