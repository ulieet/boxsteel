"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ConfiguracionSitioProps {
  configuracion: {
    fuentePrincipal: string
    fuenteTitulos: string
    colorAcento: string
  }
  alCambiar: (campo: string, valor: string) => void
}

export function ConfiguracionSitio({
  configuracion,
  alCambiar,
}: ConfiguracionSitioProps) {
  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-xl font-semibold mb-6">Configuración del Sitio</h2>
      <div className="space-y-2">
        <Label>Fuente Principal</Label>
        <Select
          value={configuracion.fuentePrincipal}
          onValueChange={(valor) => alCambiar("fuentePrincipal", valor)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            className="z-50 bg-white text-black border border-gray-200 shadow-md dark:bg-gray-800 dark:text-white"
            position="popper"
            sideOffset={4}
          >
            <SelectItem value="Inter">Inter</SelectItem>
            <SelectItem value="Roboto">Roboto</SelectItem>
            <SelectItem value="Open Sans">Open Sans</SelectItem>
            <SelectItem value="Lato">Lato</SelectItem>
            <SelectItem value="Montserrat">Montserrat</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Fuente de Títulos</Label>
        <Select
          value={configuracion.fuenteTitulos}
          onValueChange={(valor) => alCambiar("fuenteTitulos", valor)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            className="z-50 bg-white text-black border border-gray-200 shadow-md dark:bg-gray-800 dark:text-white"
            position="popper"
            sideOffset={4}
          >
            <SelectItem value="Inter">Inter</SelectItem>
            <SelectItem value="Roboto">Roboto</SelectItem>
            <SelectItem value="Poppins">Poppins</SelectItem>
            <SelectItem value="Playfair Display">Playfair Display</SelectItem>
            <SelectItem value="Montserrat">Montserrat</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Color de Acento</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={configuracion.colorAcento}
            onChange={(e) => alCambiar("colorAcento", e.target.value)}
            className="w-20 h-10 cursor-pointer"
          />
          <Input
            type="text"
            value={configuracion.colorAcento}
            onChange={(e) => alCambiar("colorAcento", e.target.value)}
          />
        </div>
      </div>

      <p className="text-sm text-gray-600 border-t pt-4 dark:text-gray-400">
        Los cambios de fuente y color se aplicarán tras guardar y recargar la página.
      </p>
    </Card>
  )
}
