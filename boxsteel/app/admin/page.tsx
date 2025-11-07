"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EncabezadoAdmin } from "@/app/admin/components/header-admin"
import { ListaSecciones } from "@/app/admin/components/lista-secciones"
import { ConfiguracionSitio } from "@/app/admin/components/configuracion"
import featuresData from "@/lib/data/features.json"

// --- Tipos ---

type FeatureData = {
  eyebrow: string
  title: string
  subtitle?: string
  description: string[] | string
  image: string
  imageAlt: string
  imagePosition: "left" | "right" // Tipo estricto
}

// Configuración inicial por defecto
const defaultConfiguracion = {
  fuentePrincipal: "Inter",
  fuenteTitulos: "Inter",
  colorAcento: "#14b8a6",
}

// --- Componente Principal ---

export default function PaginaAdmin() {
  // Estado para evitar error de hidratación
  const [isClient, setIsClient] = useState(false)

  // Estados de la aplicación
  const [secciones, setSecciones] = useState<FeatureData[]>(
    // 👇 CORRECCIÓN: Usamos 'as' para forzar el tipo y evitar el error
    featuresData as FeatureData[]
  )
  const [configuracion, setConfiguracion] = useState(defaultConfiguracion)
  const [hayCambios, setHayCambios] = useState(false)

  // --- Efectos ---

  // Carga inicial desde localStorage (si existe)
  useEffect(() => {
    const guardadas = localStorage.getItem("cms_features")
    const ajustes = localStorage.getItem("cms_settings")

    try {
      if (guardadas) setSecciones(JSON.parse(guardadas))
      if (ajustes) setConfiguracion(JSON.parse(ajustes))
    } catch (e) {
      console.error("Error al parsear localStorage", e)
      // Si hay error, borra los datos corruptos
      localStorage.removeItem("cms_features")
      localStorage.removeItem("cms_settings")
    }
  }, [])

  // Efecto para marcar que el componente está montado en el cliente
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
          // Aquí también podrías guardar la configuración si lo necesitas
          // configuracion: configuracion, 
        }),
      })

      if (!respuesta.ok) {
        throw new Error("Error al guardar en el servidor")
      }

      // Guarda también en localStorage como respaldo
      localStorage.setItem("cms_features", JSON.stringify(secciones))
      localStorage.setItem("cms_settings", JSON.stringify(configuracion))

      setHayCambios(false)
      alert("Cambios guardados exitosamente en el servidor")
    } catch (error) {
      console.error(error)
      alert("Error al guardar los cambios.")
    }
  }

  const alExportar = () => {
    try {
      const dataStr = JSON.stringify({ secciones, configuracion }, null, 2)
      const dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
      const exportFileDefaultName = "configuracion-web.json"
      const linkElement = document.createElement("a")
      linkElement.setAttribute("href", dataUri)
      linkElement.setAttribute("download", exportFileDefaultName)
      document.body.appendChild(linkElement) // Requerido en Firefox
      linkElement.click()
      document.body.removeChild(linkElement) // Limpieza
    } catch (error) {
      console.error("Error al exportar:", error)
      alert("No se pudo exportar la configuración.")
    }
  }

  const alImportar = () => {
    // La lógica de importación requiere un input de archivo
    alert("Función de importar no implementada")
    // (Se necesitaría un <input type="file" /> y un FileReader)
  }

  // --- Funciones de Edición ---

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
    if (confirm("¿Estás seguro de que quieres eliminar esta sección?")) {
      setSecciones(secciones.filter((_, idx) => idx !== i))
      setHayCambios(true)
    }
  }

  const actualizarSeccion = (
    i: number,
    campo: keyof FeatureData,
    valor: any
  ) => {
    const copia = [...secciones]
    copia[i] = { ...copia[i], [campo]: valor }
    setSecciones(copia)
    setHayCambios(true)
  }

  const moverSeccion = (i: number, dir: "up" | "down") => {
    if (
      (dir === "up" && i === 0) ||
      (dir === "down" && i === secciones.length - 1)
    )
      return
    
    const nuevo = [...secciones]
    const j = dir === "up" ? i - 1 : i + 1
    // Intercambio de elementos
    ;[nuevo[i], nuevo[j]] = [nuevo[j], nuevo[i]]
    
    setSecciones(nuevo)
    setHayCambios(true)
  }

  const cambiarConfiguracion = (campo: string, valor: string) => {
    setConfiguracion({ ...configuracion, [campo]: valor })
    setHayCambios(true)
  }

  // --- Renderizado ---

  // No renderiza nada hasta que esté en el cliente para evitar hidratación
  if (!isClient) {
    return null 
    // Opcional: puedes poner un spinner/loader aquí
    // return <div>Cargando editor...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 👇 CORRECCIÓN: Pasando todas las props requeridas */}
      <EncabezadoAdmin
        alGuardar={guardarCambios}
        hayCambios={hayCambios}
        alExportar={alExportar}
        alImportar={alImportar}
      />

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="secciones" className="space-y-6">
          <TabsList>
            <TabsTrigger value="secciones">Secciones</TabsTrigger>
            <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
            <TabsTrigger value="configuracion">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="secciones">
            {/* 👇 CORRECCIÓN: Pasando todas las props requeridas */}
            <ListaSecciones
              secciones={secciones}
              alAgregar={agregarSeccion}
              alEliminar={eliminarSeccion}
              alActualizar={actualizarSeccion}
              alMover={moverSeccion}
              alGuardar={guardarCambios} // Estas props las pedía tu error
              hayCambios={hayCambios}     // (quizás puedas quitarlas de ListaSecciones)
            />
          </TabsContent>

          <TabsContent value="proyectos">
            <div className="grid gap-6">
              {secciones.map((p, i) => (
                <div key={i} className="border p-4 bg-white rounded-xl shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {Array.isArray(p.description)
                      ? p.description.join("\n")
                      : p.description}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => eliminarSeccion(i)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => moverSeccion(i, "up")}
                      className="text-gray-500 text-sm hover:underline"
                    >
                      Subir
                    </button>
                    <button
                      onClick={() => moverSeccion(i, "down")}
                      className="text-gray-500 text-sm hover:underline"
                    >
                      Bajar
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={agregarSeccion}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                + Agregar Proyecto
              </button>
            </div>
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