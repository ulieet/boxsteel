"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EncabezadoAdmin } from "@/app/admin/components/header-admin"
import { ListaSecciones } from "@/app/admin/components/lista-secciones" 
import { ConfiguracionSitio } from "@/app/admin/components/configuracion"
import { ListaProyectos } from "@/app/admin/components/lista-proyectos" 
import { ListaCarousel } from "@/app/admin/components/lista-carousel" 
import { DatosContactoForm } from "@/app/admin/components/lista-contactos" 

import featuresData from "@/lib/data/features.json"
import projectsData from "@/lib/data/proyects.json"
import carouselData from "@/lib/data/carousel.json" 
import configData from "@/lib/data/config.json" 
import proyectosHeaderData from "@/lib/data/proyectos-header.json"
import datosContactoData from "@/lib/data/datos-contacto.json" 

import type {
  FeatureData,
  Proyecto,
  ConfiguracionSitioData,
  CarouselSlide, 
  ProyectosHeaderData,
  DatosContactoData,
} from "@/app/admin/components/types"

// Configuración de Diseño
const defaultConfiguracion: ConfiguracionSitioData = {
  fuentePrincipal: "Inter",
  fuenteTitulos: "Inter",
  colorAcento: "#14b8a6", 
  logoUrl: "/images/box-logo2.png" // <-- CAMPO AÑADIDO
}

// Configuración de Contacto
const defaultDatosContacto: DatosContactoData = {
  whatsappPrefijo: "https://wa.me/",
  whatsappNumero: "5492213147323",
  whatsappDisplayFooter: "221 314 7323",
  email: "info@boxsteelframe.com.ar",
  telefonoPrefijo: "tel:",
  telefonoNumero: "+541175637396",
  telefonoDisplay: "(011) 7563 7396",
  linkedinUrl: "https://www.linkedin.com/",
  instagramUrl: "https://www.instagram.com/",
  ubicacion1_titulo: "La Plata",
  ubicacion1_direccion: "Calle 54 nro 582",
  ubicacion2_titulo: "CABA",
  ubicacion2_direccion: "Bulnes 1250, OF 0101"
}

export default function PaginaAdmin() {
  const [isClient, setIsClient] = useState(false)
  const [hayCambios, setHayCambios] = useState(false)

  const [secciones, setSecciones] = useState<FeatureData[]>([])
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const [carouselSlides, setCarouselSlides] = useState<CarouselSlide[]>([]) 
  const [proyectosHeader, setProyectosHeader] = 
    useState<ProyectosHeaderData>(proyectosHeaderData)
  
  const [configuracion, setConfiguracion] =
    useState<ConfiguracionSitioData>(defaultConfiguracion)
  const [datosContacto, setDatosContacto] =
    useState<DatosContactoData>(defaultDatosContacto)


  useEffect(() => {
    try {
      const savedFeatures = localStorage.getItem("cms_features")
      const savedProjects = localStorage.getItem("cms_projects")
      const savedSettings = localStorage.getItem("cms_settings")
      const savedCarousel = localStorage.getItem("cms_carousel") 
      const savedProyectosHeader = localStorage.getItem("cms_proyectos_header")
      const savedDatosContacto = localStorage.getItem("cms_datos_contacto") 

      setSecciones(
        savedFeatures ? JSON.parse(savedFeatures) : (featuresData as FeatureData[])
      )
      setProyectos(
        savedProjects ? JSON.parse(savedProjects) : (projectsData as Proyecto[])
      )
     
      setCarouselSlides(
        savedCarousel ? JSON.parse(savedCarousel) : (carouselData as CarouselSlide[])
      )
      
      setProyectosHeader(
        savedProyectosHeader ? JSON.parse(savedProyectosHeader) : (proyectosHeaderData as ProyectosHeaderData)
      )

      const jsonConfig = configData || {};
      const initialState = { ...defaultConfiguracion, ...jsonConfig }; 
      setConfiguracion(
        savedSettings ? JSON.parse(savedSettings) : initialState 
      )

      const jsonContacto = datosContactoData || {};
      const initialContactoState = { ...defaultDatosContacto, ...jsonContacto };
      setDatosContacto(
        savedDatosContacto ? JSON.parse(savedDatosContacto) : initialContactoState
      )

    } catch (e: unknown) { 
      console.error("Error al parsear localStorage, usando datos de JSON:", e)
      setSecciones(featuresData as FeatureData[])
      setProyectos(projectsData as Proyecto[])
      setCarouselSlides(carouselData as CarouselSlide[]) 
      setProyectosHeader(proyectosHeaderData as ProyectosHeaderData)
      setConfiguracion({ ...defaultConfiguracion, ...(configData || {}) })
      setDatosContacto({ ...defaultDatosContacto, ...(datosContactoData || {}) })
    }
    
    setIsClient(true)
  }, [])

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
          proyectosHeader: proyectosHeader, 
          datosContacto: datosContacto, 
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
      localStorage.removeItem("cms_carousel") 
      localStorage.removeItem("cms_proyectos_header") 
      localStorage.removeItem("cms_datos_contacto") 

      setHayCambios(false)
      alert(
        "¡Cambios guardados en el servidor! Recarga la web principal para verlos."
      )
    } catch (error: unknown) { 
      console.error(error)
      let errorMessage = "Error al guardar los cambios";
      if (error instanceof Error) {
        errorMessage = error.message; 
      }
      alert(`Error al guardar los cambios: ${errorMessage}`)
    }
  }

  const cambiarConfiguracion = (
    campo: keyof ConfiguracionSitioData,
    valor: string | boolean
  ) => {
    setConfiguracion((prev) => ({ ...prev, [campo]: valor }))
    setHayCambios(true)
  }

  const cambiarDatosContacto = (
    campo: keyof DatosContactoData,
    valor: string
  ) => {
    setDatosContacto((prev) => ({ ...prev, [campo]: valor }))
    setHayCambios(true)
  }

  const alRestablecer = () => {
    if (confirm("¿Restablecer la configuración de diseño a los valores por defecto? (Esto no afectará los datos de contacto)")) {
      setConfiguracion(defaultConfiguracion) 
      setHayCambios(true)
    }
  }

  const agregarSeccion = (nuevaSeccion: FeatureData) => {
    setSecciones((prev) => [nuevaSeccion, ...prev])
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
    valor: string | string[]
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
    valor: string | string[]
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

  const actualizarProyectosHeader = (
    campo: keyof ProyectosHeaderData,
    valor: string
  ) => {
    setProyectosHeader((prev) => ({ ...prev, [campo]: valor }))
    setHayCambios(true)
  }

  const agregarSlide = (nuevoSlide: CarouselSlide) => {
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
      />

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="carousel" className="space-y-6">
          <div className="w-full overflow-x-auto pb-2">
            <TabsList className="whitespace-nowrap">
              <TabsTrigger value="carousel">Carrusel Principal</TabsTrigger> 
              <TabsTrigger value="secciones">Secciones Inicio</TabsTrigger>
              <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
              <TabsTrigger value="contacto">Datos de Contacto</TabsTrigger> 
              <TabsTrigger value="configuracion">Configuracion General</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="carousel">
            <ListaCarousel
              slides={carouselSlides}
              onSlideAgregado={agregarSlide}
              alEliminar={eliminarSlide}
              alActualizar={actualizarSlide}
              alMover={moverSlide}
              alSubirImagen={subirImagenSlide}
            />
          </TabsContent>

          <TabsContent value="secciones">
            <ListaSecciones 
              secciones={secciones}
              onSeccionAgregada={agregarSeccion} 
              alEliminar={eliminarSeccion}
              alActualizar={actualizarSeccion}
              alMover={moverSeccion}
            />
          </TabsContent>

          <TabsContent value="proyectos">
            <ListaProyectos
              headerData={proyectosHeader}
              onHeaderChange={actualizarProyectosHeader}
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
              alCambiarConfig={cambiarConfiguracion}
              alRestablecer={alRestablecer} 
            />
          </TabsContent>

          <TabsContent value="contacto">
            <DatosContactoForm
              datosContacto={datosContacto}
              alCambiarContacto={cambiarDatosContacto}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}