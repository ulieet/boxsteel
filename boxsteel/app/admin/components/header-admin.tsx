"use client"

import { Button } from "@/components/ui/button"
import { Download, Upload, Save } from "lucide-react"
import React from "react"

interface EncabezadoAdminProps {
  alExportar: () => void
  alImportar: (e: React.ChangeEvent<HTMLInputElement>) => void
  alGuardar: () => void
  hayCambios: boolean
}

export function EncabezadoAdmin({ alExportar, alImportar, alGuardar, hayCambios }: EncabezadoAdminProps) {
  return (
    <header className="sticky top-0 z-10 mt-20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <p className="text-sm text-gray-600">Box Steel Frame CMS</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={alExportar} className="gap-2 bg-transparent">
            <Download className="h-4 w-4" /> Exportar
          </Button>

          <label>
            <Button variant="outline" className="gap-2 bg-transparent" asChild>
              <span>
                <Upload className="h-4 w-4" /> Importar
              </span>
            </Button>
            <input type="file" accept=".json" onChange={alImportar} className="hidden" />
          </label>

          <Button
          onClick={alGuardar}
          disabled={!hayCambios}
          variant="outline" 
        >
            <Save className="h-4 w-4" /> Guardar Cambios
          </Button>
        </div>
      </div>
    </header>
  )
}
