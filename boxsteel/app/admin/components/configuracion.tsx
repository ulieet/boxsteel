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
  alCambiarConfig: (
    campo: keyof ConfiguracionSitioData,
    valor: string | boolean
  ) => void
  alRestablecer: () => void 
}

export function ConfiguracionSitio({
  configuracion,
  alCambiarConfig,
  alRestablecer, 
}: ConfiguracionSitioProps) {

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        alCambiarConfig("logoUrl", reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card className="p-6 space-y-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Diseño General del Sitio</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={alRestablecer}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Restablecer Diseño
        </Button>
      </div>

      <div className="space-y-4 border-b pb-4">
        <h3 className="text-lg font-medium text-muted-foreground">Logo del Sitio</h3>
        <div className="space-y-2">
          <Label>Subir nuevo logo</Label>
          <Input
            type="file"
            accept="image/png, image/jpeg, image/svg+xml"
            className="file:text-sm file:font-medium"
            onChange={handleLogoUpload}
          />
        </div>
        {configuracion.logoUrl && (
          <div className="space-y-2">
            <Label>Vista Previa (Logo Actual)</Label>
            <div className="p-4 border rounded-lg bg-gray-100 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={configuracion.logoUrl}
                alt="Vista previa del logo"
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4 border-b pb-4">
        <h3 className="text-lg font-medium text-muted-foreground">Fuentes</h3>
        <div className="space-y-2">
          <Label>Fuente Principal (Textos)</Label>
          <Select
            value={configuracion.fuentePrincipal}
            onValueChange={(valor) => alCambiarConfig("fuentePrincipal", valor)}
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

        <div className="space-y-2">
          <Label>Fuente de Títulos (H1, H2, H3)</Label>
          <Select
            value={configuracion.fuenteTitulos}
            onValueChange={(valor) => alCambiarConfig("fuenteTitulos", valor)}
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
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium text-muted-foreground">Color</h3>
        <Label>Color de Acento (Botones, Links)</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={configuracion.colorAcento}
            onChange={(e) => alCambiarConfig("colorAcento", e.target.value)}
            className="w-20 h-10 cursor-pointer p-1"
          />
          <Input
            type="text"
            value={configuracion.colorAcento}
            onChange={(e) => alCambiarConfig("colorAcento", e.target.value)}
            placeholder="#14b8a6"
          />
        </div>
      </div>
    </Card>
  )
}