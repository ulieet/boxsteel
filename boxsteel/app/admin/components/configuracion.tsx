"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ConfiguracionSitioData } from "./types"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react" 

interface ConfiguracionSitioProps {
  configuracion: ConfiguracionSitioData
  alCambiar: (
    campo: keyof ConfiguracionSitioData,
    valor: string | boolean
  ) => void
  alRestablecer: () => void // <-- Nueva prop
}

export function ConfiguracionSitio({
  configuracion,
  alCambiar,
  alRestablecer, // <-- Nueva prop
}: ConfiguracionSitioProps) {
  return (
    <Card className="p-6 space-y-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Configuración General del Sitio</h2>
        {/* --- NUEVO BOTÓN --- */}
        <Button
          variant="outline"
          size="sm"
          onClick={alRestablecer}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Restablecer
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Fuente Principal (Textos)</Label>
        <Select
          value={configuracion.fuentePrincipal}
          onValueChange={(valor) => alCambiar("fuentePrincipal", valor)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una fuente" />
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

      {/* Selector de Fuente de Títulos */}
      <div className="space-y-2">
        <Label>Fuente de Títulos (H1, H2, H3)</Label>
        <Select
          value={configuracion.fuenteTitulos}
          onValueChange={(valor) => alCambiar("fuenteTitulos", valor)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una fuente" />
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

      {/* Selector de Color de Acento */}
      <div className="space-y-2">
        <Label>Color de Acento (Botones, Links)</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={configuracion.colorAcento}
            onChange={(e) => alCambiar("colorAcento", e.target.value)}
            className="w-20 h-10 cursor-pointer p-1"
          />
          <Input
            type="text"
            value={configuracion.colorAcento}
            onChange={(e) => alCambiar("colorAcento", e.target.value)}
            placeholder="#14b8a6"
          />
        </div>
      </div>

      <p className="text-sm text-gray-600 border-t pt-4 dark:text-gray-400">
        Los cambios se aplicarán en todo el sitio después de "Guardar".
      </p>
    </Card>
  )
}