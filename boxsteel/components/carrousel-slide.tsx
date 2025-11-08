"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import carouselData from "@/lib/data/carousel.json"; //aca importo los datos del json


export default function CarruselPrincipal() {
  const [imagenes] = useState(carouselData); //Usa los datos importados
  const [indiceActual, setIndiceActual] = useState(0);
  const [direccion, setDireccion] = useState(0);
  const [estaPausado, setEstaPausado] = useState(false);

  const siguienteImagen = useCallback(() => {
    if (imagenes.length === 0) return;
    setDireccion(1);
    setIndiceActual((prev) => (prev + 1) % imagenes.length);
  }, [imagenes.length]);

  const imagenAnterior = useCallback(() => {
    if (imagenes.length === 0) return;
    setDireccion(-1);
    setIndiceActual((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  }, [imagenes.length]);

  const irAImagen = useCallback((index: number) => {
    setDireccion(index > indiceActual ? 1 : -1);
    setIndiceActual(index);
  }, [indiceActual]);

  useEffect(() => {
    if (estaPausado || imagenes.length <= 1) return;
    const interval = setInterval(siguienteImagen, 3000);
    return () => clearInterval(interval);
  }, [estaPausado, siguienteImagen, imagenes.length]);

  const variantes = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section
 
      className="relative w-full h-[600px] overflow-hidden pt-16 lg:pt-20"
      onMouseEnter={() => setEstaPausado(true)}
      onMouseLeave={() => setEstaPausado(false)}
    >
      <AnimatePresence initial={false} custom={direccion} mode="wait">
        <motion.div
          key={indiceActual}
          custom={direccion}
          variants={variantes}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 },
          }}
          className="absolute w-full h-full"
        >
          <Image
            src={imagenes[indiceActual].src}
            alt={imagenes[indiceActual].alt} // alt del JSON
            fill
            className="object-cover"
            priority={indiceActual === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {imagenes.length > 1 && (
        <>
          <button
            onClick={imagenAnterior}
            className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/50 lg:h-12 lg:w-12"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
          </button>
          <button
            onClick={siguienteImagen}
            className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/50 lg:h-12 lg:w-12"
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
          </button>
        </>
      )}

      {imagenes.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {imagenes.map((_, index) => (
            <button
              key={index}
              onClick={() => irAImagen(index)}
              className={`transition-all rounded-full ${
                index === indiceActual
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/60 hover:bg-white/80"
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}