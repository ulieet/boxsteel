"use client"

import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"

interface EncabezadoAdminProps {
  alGuardar: () => void
  hayCambios: boolean
}

export function EncabezadoAdmin({
  alGuardar,
  hayCambios,
}: EncabezadoAdminProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-30">
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <div className="flex gap-2">
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