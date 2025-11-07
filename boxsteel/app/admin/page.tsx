"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EncabezadoAdmin } from "@/app/admin/components/header-admin"
import { ListaSecciones } from "@/app/admin/components/lista-secciones"
import { ConfiguracionSitio } from "@/app/admin/components/configuracion"
import { ListaProyectos } from "@/app/admin/components/lista-proyectos"

// Importar datos JSON
import featuresData from "@/lib/data/features.json"
import projectsData from "@/lib/data/proyects.json"
// Usamos una importación 'require' para config.json para evitar problemas de cache
const configData = require("@/lib/data/config.json") 

// Importar tipos
import type {
  FeatureData,
  Proyecto,
  ConfiguracionSitioData,
} from "@/app/admin/components/types"

// --- Configuración inicial por defecto ---
const defaultConfiguracion: ConfiguracionSitioData = {
  fuentePrincipal: configData.fuentePrincipal || "Inter",
  fuenteTitulos: configData.fuenteTitulos || "Inter",
  colorAcento: configData.colorAcento || "#14b8a6",
  theme: configData.theme || "system",
}

export default function PaginaAdmin() {
  const [isClient, setIsClient] = useState(false)
  const [hayCambios, setHayCambios] = useState(false)

  // Estados de datos
  const [secciones, setSecciones] = useState<FeatureData[]>([])
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const [configuracion, setConfiguracion] =
    useState<ConfiguracionSitioData>(defaultConfiguracion)

  // --- Efectos ---
  useEffect(() => {
    // Carga inicial de datos JSON y localStorage
    try {
      // Damos prioridad a localStorage por si hay cambios sin guardar
      const savedFeatures = localStorage.getItem("cms_features")
      const savedProjects = localStorage.getItem("cms_projects")
      const savedSettings = localStorage.getItem("cms_settings")

      setSecciones(
        savedFeatures ? JSON.parse(savedFeatures) : (featuresData as FeatureData[])
      )
      setProyectos(
        savedProjects ? JSON.parse(savedProjects) : (projectsData as Proyecto[])
      )
      setConfiguracion(
        savedSettings ? JSON.parse(savedSettings) : defaultConfiguracion
      )

    } catch (e) {
      console.error("Error al parsear localStorage, usando datos de JSON:", e)
      // Fallback a los datos de los archivos JSON importados
      setSecciones(featuresData as FeatureData[])
      setProyectos(projectsData as Proyecto[])
      setConfiguracion(defaultConfiguracion)
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
        }),
      })

      if (!respuesta.ok) {
        const errorData = await respuesta.json()
        throw new Error(
          errorData.error || "Error al guardar en el servidor"
        )
      }

      // Limpiamos localStorage después de guardar exitosamente
      localStorage.removeItem("cms_features")
      localStorage.removeItem("cms_projects")
      localStorage.removeItem("cms_settings")

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
        { secciones, proyectos, configuracion },
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

  const alImportar = () => {
    alert("Función de importar no implementada aún.")
  }

  const cambiarConfiguracion = (
    campo: keyof ConfiguracionSitioData,
    valor: string | boolean
  ) => {
    setConfiguracion((prev) => ({ ...prev, [campo]: valor }))
    setHayCambios(true)
  }

  // --- Funciones de Edición (SECCIONES) ---

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

  // --- Funciones de Edición (PROYECTOS) ---

  const handleAgregarProyecto = (nuevoProyecto: Proyecto) => {
    // Agregamos el nuevo proyecto al PRINCIPIO de la lista
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

  // --- Renderizado ---

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
        alImportar={alImportar}
      />

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="proyectos" className="space-y-6">
          <TabsList>
            <TabsTrigger value="secciones">Secciones (Landing)</TabsTrigger>
            <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
            <TabsTrigger value="configuracion">Configuración</TabsTrigger>
          </TabsList>

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
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}