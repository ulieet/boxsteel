"use client"


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
          <h1 className="text-2xl font-bold content-center">Panel de Administración</h1>
        </div>

        <div className="flex gap-2">
          
        </div>
      </div>
    </header>
  )
}
