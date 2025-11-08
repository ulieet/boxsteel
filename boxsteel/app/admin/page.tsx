"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EncabezadoAdmin } from "@/app/admin/components/header-admin"
import { ListaSecciones } from "@/app/admin/components/lista-secciones"
import { ConfiguracionSitio } from "@/app/admin/components/configuracion"
import { ListaProyectos } from "@/app/admin/components/lista-proyectos"
import { ListaCarousel } from "@/app/admin/components/lista-carousel" 

import featuresData from "@/lib/data/features.json"
import projectsData from "@/lib/data/proyects.json"
import carouselData from "@/lib/data/carousel.json" 
import configData from "@/lib/data/config.json" 

import type {
  FeatureData,
  Proyecto,
  ConfiguracionSitioData,
  CarouselSlide, 
} from "@/app/admin/components/types"

const defaultConfiguracion: ConfiguracionSitioData = {
  fuentePrincipal: "Inter",
  fuenteTitulos: "Inter",
  colorAcento: "#14b8a6", 
}

export default function PaginaAdmin() {
  const [isClient, setIsClient] = useState(false)
  const [hayCambios, setHayCambios] = useState(false)

  const [secciones, setSecciones] = useState<FeatureData[]>([])
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const [configuracion, setConfiguracion] =
    useState<ConfiguracionSitioData>(defaultConfiguracion)
  const [carouselSlides, setCarouselSlides] = useState<CarouselSlide[]>([]) 

  useEffect(() => {
    // Carga inicial de datos JSON y localStorage
    try {
      const savedFeatures = localStorage.getItem("cms_features")
      const savedProjects = localStorage.getItem("cms_projects")
      const savedSettings = localStorage.getItem("cms_settings")
      const savedCarousel = localStorage.getItem("cms_carousel") 

      setSecciones(
        savedFeatures ? JSON.parse(savedFeatures) : (featuresData as FeatureData[])
      )
      setProyectos(
        savedProjects ? JSON.parse(savedProjects) : (projectsData as Proyecto[])
      )
     
      setCarouselSlides(
        savedCarousel ? JSON.parse(savedCarousel) : (carouselData as CarouselSlide[])
      )
      
      const jsonConfig = configData || {};
      const initialState = { ...defaultConfiguracion, ...jsonConfig }; 
      
      setConfiguracion(
        savedSettings ? JSON.parse(savedSettings) : initialState 
      )

    } catch (e) {
      console.error("Error al parsear localStorage, usando datos de JSON:", e)
//Fallback a JSON
      setSecciones(featuresData as FeatureData[])
      setProyectos(projectsData as Proyecto[])
      setCarouselSlides(carouselData as CarouselSlide[]) 
      setConfiguracion({ ...defaultConfiguracion, ...(configData || {}) })
    }
    
    setIsClient(true)
  }, [])

  // --- Funciones de Manejo de Datos ---

  const guardarCambios = async () => {
    try {
      const respuesta = await fetch("/api/guardar-datos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secciones: secciones,
          proyectos: proyectos,
          configuracion: configuracion,
          carousel: carouselSlides, 
        }),
      })

      if (!respuesta.ok) {
        const errorData = await respuesta.json()
        throw new Error(
          errorData.error || "Error al guardar en el servidor"
        )
      }

      localStorage.removeItem("cms_features")
      localStorage.removeItem("cms_projects")
      localStorage.removeItem("cms_settings")
      localStorage.removeItem("cms_carousel") // Limpia localStorage

      setHayCambios(false)
      alert(
        "¡Cambios guardados en el servidor! Recarga la web principal para verlos."
      )
    } catch (error: any) {
      console.error(error)
      alert(`Error al guardar los cambios: ${error.message}`)
    }
  }

  const alExportar = () => {
    try {

      const dataStr = JSON.stringify(
        { secciones, proyectos, configuracion, carouselSlides },
        null,
        2
      )
      const dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
      const exportFileDefaultName = "configuracion-web.json"
      const linkElement = document.createElement("a")
      linkElement.setAttribute("href", dataUri)
      linkElement.setAttribute("download", exportFileDefaultName)
      document.body.appendChild(linkElement)
      linkElement.click()
      document.body.removeChild(linkElement)
    } catch (error) {
      console.error("Error al exportar:", error)
      alert("No se pudo exportar la configuración.")
    }
  }


  const cambiarConfiguracion = (
    campo: keyof ConfiguracionSitioData,
    valor: string | boolean
  ) => {
    setConfiguracion((prev) => ({ ...prev, [campo]: valor }))
    setHayCambios(true)
  }

  const alRestablecer = () => {
    if (confirm("¿Restablecer la configuración a los valores por defecto?")) {
      setConfiguracion(defaultConfiguracion) 
      setHayCambios(true)
    }
  }

  const agregarSeccion = () => {
    const nueva: FeatureData = {
      eyebrow: "NUEVO",
      title: "Título de la sección",
      description: ["Descripción de la sección"],
      image: "", 
      imageAlt: "Imagen",
      imagePosition: "right",
    }
    setSecciones((prev) => [nueva, ...prev])
    setHayCambios(true)
  }

  const eliminarSeccion = (i: number) => {
    if (confirm("¿Eliminar esta sección?")) {
      setSecciones((prev) => prev.filter((_, idx) => idx !== i))
      setHayCambios(true)
    }
  }

  const actualizarSeccion = (
    i: number,
    campo: keyof FeatureData,
    valor: any
  ) => {
    setSecciones((prev) => {
      const copia = [...prev]
      copia[i] = { ...copia[i], [campo]: valor }
      return copia
    })
    setHayCambios(true)
  }

  const moverSeccion = (i: number, dir: "up" | "down") => {
    if ((dir === "up" && i === 0) || (dir === "down" && i === secciones.length - 1))
      return
    setSecciones((prev) => {
      const nuevo = [...prev]
      const j = dir === "up" ? i - 1 : i + 1
      ;[nuevo[i], nuevo[j]] = [nuevo[j], nuevo[i]]
      return nuevo
    })
    setHayCambios(true)
  }

  const handleAgregarProyecto = (nuevoProyecto: Proyecto) => {
    setProyectos((prev) => [nuevoProyecto, ...prev])
    setHayCambios(true)
  }

  const eliminarProyecto = (i: number) => {
    if (confirm("¿Eliminar este proyecto?")) {
      setProyectos((prev) => prev.filter((_, idx) => idx !== i))
      setHayCambios(true)
    }
  }

  const actualizarProyecto = (
    i: number,
    campo: keyof Proyecto,
    valor: any
  ) => {
    setProyectos((prev) => {
      const copia = [...prev]
      copia[i] = { ...copia[i], [campo]: valor }
      return copia
    })
    setHayCambios(true)
  }

  const moverProyecto = (i: number, dir: "up" | "down") => {
    if ((dir === "up" && i === 0) || (dir === "down" && i === proyectos.length - 1))
      return
    setProyectos((prev) => {
      const nuevo = [...prev]
      const j = dir === "up" ? i - 1 : i + 1
      ;[nuevo[i], nuevo[j]] = [nuevo[j], nuevo[i]]
      return nuevo
    })
    setHayCambios(true)
  }


  const agregarSlide = () => {
    const nuevoSlide: CarouselSlide = { src: "", alt: "Nuevo Slide" }
    setCarouselSlides((prev) => [...prev, nuevoSlide])
    setHayCambios(true)
  }

  const eliminarSlide = (i: number) => {
    if (confirm("¿Eliminar este slide?")) {
      setCarouselSlides((prev) => prev.filter((_, idx) => idx !== i))
      setHayCambios(true)
    }
  }

  const actualizarSlide = (
    i: number,
    campo: keyof CarouselSlide,
    valor: string
  ) => {
    setCarouselSlides((prev) => {
      const copia = [...prev]
      copia[i] = { ...copia[i], [campo]: valor }
      return copia
    })
    setHayCambios(true)
  }
  
  // Esta función convierte la imagen a base64 y la pone en el estado
  const subirImagenSlide = (i: number, file: File) => {
     const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setCarouselSlides((prev) => {
          const copia = [...prev]
          copia[i] = { ...copia[i], src: base64String }
          return copia
        })
        setHayCambios(true)
      }
      reader.readAsDataURL(file)
  }

  const moverSlide = (i: number, dir: "up" | "down") => {
    if ((dir === "up" && i === 0) || (dir === "down" && i === carouselSlides.length - 1))
      return
    setCarouselSlides((prev) => {
      const nuevo = [...prev]
      const j = dir === "up" ? i - 1 : i + 1
      ;[nuevo[i], nuevo[j]] = [nuevo[j], nuevo[i]]
      return nuevo
    })
    setHayCambios(true)
  }


  if (!isClient) {
    return (
      <div className="flex h-screen items-center justify-center">
        Cargando editor...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EncabezadoAdmin
        alGuardar={guardarCambios}
        hayCambios={hayCambios}
        alExportar={alExportar}
      />

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="carousel" className="space-y-6">
          <TabsList>
            <TabsTrigger value="carousel">Carrusel Principal</TabsTrigger> 
            <TabsTrigger value="secciones">Secciones Inicio</TabsTrigger>
            <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
            <TabsTrigger value="configuracion">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="carousel">
            <ListaCarousel
              slides={carouselSlides}
              alAgregar={agregarSlide}
              alEliminar={eliminarSlide}
              alActualizar={actualizarSlide}
              alMover={moverSlide}
              alSubirImagen={subirImagenSlide}
            />
          </TabsContent>

          <TabsContent value="secciones">
            <ListaSecciones
              secciones={secciones}
              alAgregar={agregarSeccion}
              alEliminar={eliminarSeccion}
              alActualizar={actualizarSeccion}
              alMover={moverSeccion}
            />
          </TabsContent>

          <TabsContent value="proyectos">
            <ListaProyectos
              proyectos={proyectos}
              onProyectoAgregado={handleAgregarProyecto}
              alEliminar={eliminarProyecto}
              alActualizar={actualizarProyecto}
              alMover={moverProyecto}
            />
          </TabsContent>

          <TabsContent value="configuracion">
            <ConfiguracionSitio
              configuracion={configuracion}
              alCambiar={cambiarConfiguracion}
              alRestablecer={alRestablecer} 
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}