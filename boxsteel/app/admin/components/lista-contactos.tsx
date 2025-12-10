"use client"

import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { DatosContactoData } from "./types" 

interface DatosContactoFormProps {
  datosContacto: DatosContactoData
  alCambiarContacto: (
    campo: keyof DatosContactoData,
    valor: string
  ) => void
}

export function DatosContactoForm({
  datosContacto,
  alCambiarContacto, 
}: DatosContactoFormProps) {
  return (
    <Card className="p-6 space-y-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold">Datos de Contacto</h2>
      <p className="text-sm text-muted-foreground">
        Gestiona aquí el número de WhatsApp, emails y redes sociales.
      </p>
      
      <div className="space-y-4 border-b pb-4">
        <h3 className="text-lg font-medium text-muted-foreground">WhatsApp Principal</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label>Número de WhatsApp</Label>
                    <Input
          value={datosContacto.whatsappNumero}
          onChange={(e) => {
            alCambiarContacto("whatsappNumero", e.target.value)
          }}
          placeholder="5492213147323"
        />
            <p className="text-xs text-muted-foreground">
              Ingresá el número completo sin espacios ni símbolos (ej: 549221...). 
              Este número se usará para el botón flotante y el footer.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 border-b pb-4">
        <h3 className="text-lg font-medium text-muted-foreground">Email y Redes</h3>
        <div className="space-y-2">
          <Label>Email de Contacto</Label>
          <Input
            type="email"
            value={datosContacto.email}
            onChange={(e) => alCambiarContacto("email", e.target.value)}
            placeholder="info@boxsteelframe.com.ar"
          />
        </div>
        <div className="space-y-2">
          <Label>URL LinkedIn</Label>
          <Input
            value={datosContacto.linkedinUrl}
            onChange={(e) => alCambiarContacto("linkedinUrl", e.target.value)}
            placeholder="https://www.linkedin.com/..."
          />
        </div>
        <div className="space-y-2">
          <Label>URL Instagram</Label>
          <Input
            value={datosContacto.instagramUrl}
            onChange={(e) => alCambiarContacto("instagramUrl", e.target.value)}
            placeholder="https://www.instagram.com/..."
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-muted-foreground">Ubicaciones (Footer)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Ubicación 1 - Título</Label>
            <Input
              value={datosContacto.ubicacion1_titulo}
              onChange={(e) => alCambiarContacto("ubicacion1_titulo", e.target.value)}
              placeholder="La Plata"
            />
          </div>
          <div className="space-y-2">
            <Label>Ubicación 1 - Dirección</Label>
            <Input
              value={datosContacto.ubicacion1_direccion}
              onChange={(e) => alCambiarContacto("ubicacion1_direccion", e.target.value)}
              placeholder="Calle 54 nro 582"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Ubicación 2 - Título</Label>
            <Input
              value={datosContacto.ubicacion2_titulo}
              onChange={(e) => alCambiarContacto("ubicacion2_titulo", e.target.value)}
              placeholder="CABA"
            />
          </div>
          <div className="space-y-2">
            <Label>Ubicación 2 - Dirección</Label>
            <Input
              value={datosContacto.ubicacion2_direccion}
              onChange={(e) => alCambiarContacto("ubicacion2_direccion", e.target.value)}
              placeholder="Bulnes 1250, OF 0101"
            />
          </div>
        </div>
      </div>
    </Card>
  )
}