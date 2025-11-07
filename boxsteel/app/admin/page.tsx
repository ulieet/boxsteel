"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EncabezadoAdmin } from "@/app/admin/components/header-admin"
import { ListaSecciones } from "@/app/admin/components/lista-secciones"
import { ConfiguracionSitio } from "@/app/admin/components/configuracion"

// Importamos los nuevos componentes y datos
import { ListaProyectos } from "@/app/admin/components/lista-proyectos"
import featuresData from "@/lib/data/features.json"
import projectsData from "@/lib/data/proyects.json"
import type { FeatureData, Proyecto } from "@/app/admin/components/types"

// --- Configuración inicial por defecto ---
const defaultConfiguracion = {
  fuentePrincipal: "Inter",
  fuenteTitulos: "Inter",
  colorAcento: "#14b8a6",
}

// --- Componente Principal ---

export default function PaginaAdmin() {
  const [isClient, setIsClient] = useState(false)
  const [hayCambios, setHayCambios] = useState(false)

  // Estados de datos
  const [secciones, setSecciones] = useState<FeatureData[]>(
    featuresData as FeatureData[]
  )
  const [proyectos, setProyectos] = useState<Proyecto[]>(
    projectsData as Proyecto[]
  )
  const [configuracion, setConfiguracion] = useState(defaultConfiguracion)

  // --- Efectos ---

  // Carga inicial desde localStorage (si existe)
  useEffect(() => {
    try {
      const savedFeatures = localStorage.getItem("cms_features")
      const savedProjects = localStorage.getItem("cms_projects")
      const savedSettings = localStorage.getItem("cms_settings")

      if (savedFeatures) setSecciones(JSON.parse(savedFeatures))
      if (savedProjects) setProyectos(JSON.parse(savedProjects))
      if (savedSettings) setConfiguracion(JSON.parse(savedSettings))
    } catch (e) {
      console.error("Error al parsear localStorage", e)
      localStorage.clear() // Limpia datos corruptos
    }
  }, [])

  useEffect(() => {
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
          // configuracion: configuracion, // Puedes añadir esto si quieres guardarlo también
        }),
      })

      if (!respuesta.ok) {
        const errorData = await respuesta.json()
        throw new Error(
          errorData.error || "Error al guardar en el servidor"
        )
      }

      // Guarda también en localStorage como respaldo
      localStorage.setItem("cms_features", JSON.stringify(secciones))
      localStorage.setItem("cms_projects", JSON.stringify(proyectos))
      localStorage.setItem("cms_settings", JSON.stringify(configuracion))

      setHayCambios(false)
      alert("¡Cambios guardados localmente!")
    } catch (error: any) {
      console.error(error)
      alert(`Error al guardar los cambios: ${error.message}`)
    }
  }

  const alExportar = () => {
    try {
      const dataStr = JSON.stringify({ secciones, proyectos, configuracion }, null, 2)
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
    // Esta función requeriría un <input type="file"> y un FileReader
    // Por ahora, es un placeholder.
    alert("Función de importar no implementada aún.")
  }

  const cambiarConfiguracion = (campo: string, valor: string) => {
    setConfiguracion((prev) => ({ ...prev, [campo]: valor }))
    setHayCambios(true)
  }

  // --- Funciones de Edición (SECCIONES) ---

  const agregarSeccion = () => {
    const nueva: FeatureData = {
      eyebrow: "NUEVO",
      title: "Título de la sección",
      description: ["Descripción de la sección"],
      image: "/placeholder.svg",
      imageAlt: "Imagen",
      imagePosition: "right",
    }
    setSecciones((prev) => [...prev, nueva])
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
    if (
      (dir === "up" && i === 0) ||
      (dir === "down" && i === secciones.length - 1)
    )
      return

    setSecciones((prev) => {
      const nuevo = [...prev]
      const j = dir === "up" ? i - 1 : i + 1
      ;[nuevo[i], nuevo[j]] = [nuevo[j], nuevo[i]] // Intercambio
      return nuevo
    })
    setHayCambios(true)
  }

  // --- Funciones de Edición (PROYECTOS) ---

  const agregarProyecto = () => {
    const nuevo: Proyecto = {
      id: `proyecto-${Date.now()}`, // ID único simple
      titulo: "Nuevo Proyecto",
      ubicacion: "Ubicación",
      cliente: "Cliente",
      año: new Date().getFullYear().toString(),
      descripcion: "Descripción del nuevo proyecto.",
      imagenes: ["/proyectos/placeholder.png"],
      categoria: "Categoría",
    }
    setProyectos((prev) => [...prev, nuevo])
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
    if (
      (dir === "up" && i === 0) ||
      (dir === "down" && i === proyectos.length - 1)
    )
      return

    setProyectos((prev) => {
      const nuevo = [...prev]
      const j = dir === "up" ? i - 1 : i + 1
      ;[nuevo[i], nuevo[j]] = [nuevo[j], nuevo[i]] // Intercambio
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

          {/* Tab de Secciones */}
          <TabsContent value="secciones">
            <ListaSecciones
              secciones={secciones}
              alAgregar={agregarSeccion}
              alEliminar={eliminarSeccion}
              alActualizar={actualizarSeccion}
              alMover={moverSeccion}
            />
          </TabsContent>

          {/* Tab de Proyectos (AHORA FUNCIONAL) */}
          <TabsContent value="proyectos">
            <ListaProyectos
              proyectos={proyectos}
              alAgregar={agregarProyecto}
              alEliminar={eliminarProyecto}
              alActualizar={actualizarProyecto}
              alMover={moverProyecto}
            />
          </TabsContent>

          {/* Tab de Configuración */}
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