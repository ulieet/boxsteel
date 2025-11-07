"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Save, Upload, Download } from "lucide-react"

interface EncabezadoAdminProps {
  alGuardar: () => void
  alExportar: () => void
  alImportar: () => void // Preparado para cuando lo implementes
  hayCambios: boolean
}

export function EncabezadoAdmin({
  alGuardar,
  alExportar,
  alImportar,
  hayCambios,
}: EncabezadoAdminProps) {
  
  // Manejador para el input de archivo oculto
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleImportClick = () => {
    // Simulado, ya que no pasaste la función de importación real
    // fileInputRef.current?.click()
    alImportar()
  }

  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mt-50">Panel de Administración</h1>
        </div>

        <div className="flex gap-2">
          {/* Botón de Importar (funcionalidad oculta) */}
          <Button
            variant="outline"
            className="gap-2"
            onClick={handleImportClick}
          >
            <Upload className="h-4 w-4" /> Importar
          </Button>
          {/* <input
            type="file"
            ref={fileInputRef}
            onChange={alImportar} // 'alImportar' debería ser un (e: ChangeEvent) => void
            className="hidden"
            accept="application/json"
          /> */}

          {/* Botón de Exportar */}
          <Button
            variant="outline"
            className="gap-2"
            onClick={alExportar}
          >
            <Download className="h-4 w-4" /> Exportar JSON
          </Button>
          
          {/* Botón de Guardar */}
          <Button
            onClick={alGuardar}
            disabled={!hayCambios}
            className="gap-2 bg-teal-600 hover:bg-teal-700"
          >
            <Save className="h-4 w-4" />
            {hayCambios ? "Guardar Cambios" : "Guardado"}
          </Button>
        </div>
      </div>
    </header>
  )
}