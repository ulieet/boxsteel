import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Definimos las interfaces para asegurarnos de que los datos tienen la forma correcta
interface FeatureData {
  eyebrow: string
  title: string
  subtitle?: string
  description: string[] | string
  image: string
  imageAlt: string
  imagePosition: "left" | "right"
}

interface Proyecto {
  id: string
  titulo: string
  ubicacion: string
  cliente: string
  año: string
  descripcion: string
  imagenes: string[]
  categoria: string
}

// Definimos la estructura del body que esperamos recibir
interface RequestBody {
  secciones?: FeatureData[]
  proyectos?: Proyecto[]
}

export async function POST(request: Request) {
  // --- IMPORTANTE ---
  // Esta función SÓLO funcionará en modo de desarrollo (`npm run dev`).
  // En producción (Vercel, Netlify), el sistema de archivos es de SÓLO LECTURA.
  // Para producción, necesitarás conectar esto a una base de datos (MongoDB, Supabase, Firebase, etc.).

  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        error:
          "La escritura de archivos JSON está deshabilitada en producción. Conecte a una base de datos.",
      },
      { status: 403 }
    )
  }

  try {
    const body: RequestBody = await request.json()
    const { secciones, proyectos } = body

    // Guardar Secciones (features.json)
    if (secciones) {
      const featuresPath = path.join(
        process.cwd(),
        "lib",
        "data",
        "features.json"
      )
      // Escribimos el JSON formateado (con 2 espacios de indentación)
      fs.writeFileSync(featuresPath, JSON.stringify(secciones, null, 2), "utf8")
    }

    // Guardar Proyectos (proyects.json)
    if (proyectos) {
      const projectsPath = path.join(
        process.cwd(),
        "lib",
        "data",
        "proyects.json"
      )
      fs.writeFileSync(projectsPath, JSON.stringify(proyectos, null, 2), "utf8")
    }

    return NextResponse.json({
      message: "Datos guardados localmente con éxito.",
    })
  } catch (error) {
    console.error("Error al guardar los datos:", error)
    return NextResponse.json(
      { error: "Error al escribir en los archivos JSON." },
      { status: 500 }
    )
  }
}