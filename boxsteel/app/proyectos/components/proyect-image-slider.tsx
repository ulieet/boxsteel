"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface Props {
  images: string[]
  title: string
}

const MAX_IMAGES_TO_SHOW = 3
const SLIDE_INTERVAL_MS = 3000 

export function ProjectImageSlider({ images, title }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const displayImages = images.filter(Boolean).slice(0, MAX_IMAGES_TO_SHOW)

  // Efecto para el cambio automático
  useEffect(() => {
    if (displayImages.length <= 1) return 

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === displayImages.length - 1 ? 0 : prevIndex + 1
      )
    }, SLIDE_INTERVAL_MS)

    return () => clearInterval(interval) 
  }, [displayImages.length])

  return (
    <div className="relative aspect-16/10 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={displayImages[currentIndex] || "/placeholder.svg"}
            alt={`${title} - Imagen ${currentIndex + 1}`}
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>
      
      {displayImages.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {displayImages.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white scale-110" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-0 from-black/50 via-black/10 to-transparent" />
    </div>
  )
}