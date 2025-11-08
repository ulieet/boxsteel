"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Save, Upload, Download } from "lucide-react"

interface EncabezadoAdminProps {
  alGuardar: () => void
  alExportar: () => void

  hayCambios: boolean
}

export function EncabezadoAdmin({
  alGuardar,
  alExportar,
  hayCambios,
}: EncabezadoAdminProps) {
  
  const fileInputRef = React.useRef<HTMLInputElement>(null)



  return (
    <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mt-50">Panel de Administración</h1>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={alExportar}
          >
            <Download className="h-4 w-4" /> Exportar JSON
          </Button>
          
          <Button
            onClick={alGuardar}
            disabled={!hayCambios}
            className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Save className="h-4 w-4" />
            {hayCambios ? "Guardar Cambios" : "Guardado"}
          </Button>
        </div>
      </div>
    </header>
  )
}