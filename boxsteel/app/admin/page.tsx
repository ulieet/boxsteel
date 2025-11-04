"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EncabezadoAdmin } from "@/app/admin/components/header-admin"
import { ListaSecciones } from "@/app/admin/components/lista-secciones"
import { ConfiguracionSitio } from "@/app/admin/components/configuracion"
import featuresData from "@/lib/data/features.json"


type FeatureData = {
  eyebrow: string
  title: string
  subtitle?: string
  description: string[] 
  image: string
  imageAlt: string
  imagePosition: "left" | "right"
}


export default function PaginaAdmin() {
  const [secciones, setSecciones] = useState<FeatureData[]>([])
  const [configuracion, setConfiguracion] = useState({
    fuentePrincipal: "Inter",
    fuenteTitulos: "Inter",
    colorAcento: "#14b8a6",
  })
  const [hayCambios, setHayCambios] = useState(false)

  useEffect(() => {
    const guardadas = localStorage.getItem("cms_features")
    const ajustes = localStorage.getItem("cms_settings")
    setSecciones(guardadas ? JSON.parse(guardadas) : featuresData)
    setConfiguracion(ajustes ? JSON.parse(ajustes) : configuracion)
  }, [])

  const guardarCambios = () => {
    localStorage.setItem("cms_features", JSON.stringify(secciones))
    localStorage.setItem("cms_settings", JSON.stringify(configuracion))
    setHayCambios(false)
    alert("Cambios guardados exitosamente")
  }

  const exportar = () => {
    const data = { features: secciones, settings: configuracion }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "cms-data.json"
    a.click()
  }

  const importar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0]
    if (!archivo) return
    const lector = new FileReader()
    lector.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string)
        if (data.features) setSecciones(data.features)
        if (data.settings) setConfiguracion(data.settings)
        setHayCambios(true)
      } catch {
        alert("Error al importar el archivo")
      }
    }
    lector.readAsText(archivo)
  }

  const agregarSeccion = () => {
    const nueva: FeatureData = {
      eyebrow: "NUEVO",
      title: "Título de la sección",
      description: ["Descripción de la sección"],
      image: "/placeholder.svg?height=400&width=600",
      imageAlt: "Imagen",
      imagePosition: "right",
    }
    setSecciones([...secciones, nueva])
    setHayCambios(true)
  }

  const eliminarSeccion = (i: number) => {
    if (confirm("¿Estás seguro de eliminar esta sección?")) {
      setSecciones(secciones.filter((_, idx) => idx !== i))
      setHayCambios(true)
    }
  }

  const actualizarSeccion = (i: number, campo: keyof FeatureData, valor: any) => {
    const copia = [...secciones]
    copia[i] = { ...copia[i], [campo]: valor }
    setSecciones(copia)
    setHayCambios(true)
  }

  const moverSeccion = (i: number, dir: "up" | "down") => {
    if ((dir === "up" && i === 0) || (dir === "down" && i === secciones.length - 1)) return
    const nuevo = [...secciones]
    const j = dir === "up" ? i - 1 : i + 1
    ;[nuevo[i], nuevo[j]] = [nuevo[j], nuevo[i]]
    setSecciones(nuevo)
    setHayCambios(true)
  }

  const cambiarConfiguracion = (campo: string, valor: string) => {
    setConfiguracion({ ...configuracion, [campo]: valor })
    setHayCambios(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EncabezadoAdmin
        alExportar={exportar}
        alImportar={importar}
        alGuardar={guardarCambios}
        hayCambios={hayCambios}
      />

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="secciones" className="space-y-6">
          <TabsList>
            <TabsTrigger value="secciones">Proyectos / Secciones</TabsTrigger>
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
