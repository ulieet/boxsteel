import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import type {
  FeatureData,
  Proyecto,
  ConfiguracionSitioData,
} from "@/app/admin/components/types"

interface RequestBody {
  secciones?: FeatureData[]
  proyectos?: Proyecto[]
  configuracion?: ConfiguracionSitioData
}

// Función para manejar el guardado de imágenes Base64
const saveBase64Image = (base64Data: string, relativePath: string): string => {
  // Las imágenes guardadas en el JSON pueden ser URLs antiguas (http://...) o nuevas (data:image/...)
  // Solo procesamos las nuevas imágenes base64
  if (!base64Data || !base64Data.startsWith("data:image")) {
    return base64Data // Devolvemos la ruta/URL original si no es base64
  }

  try {
    const publicDir = path.join(process.cwd(), "public")
    // Asegurarse de que la ruta relativa empieza con /
    if (!relativePath.startsWith("/")) {
      relativePath = "/" + relativePath
    }
    
    // Generar un nombre de archivo único
    const ext = base64Data.substring(base64Data.indexOf('/') + 1, base64Data.indexOf(';base64'));
    const fileName = `img-${Date.now()}-${Math.round(Math.random() * 1E9)}.${ext}`;
    const fullPath = path.join(publicDir, "uploads", fileName);
    const publicUrl = `/uploads/${fileName}`; // Ruta pública

    // Limpiar el string base64
    const data = base64Data.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(data, "base64");

    // Asegurarse de que el directorio /public/uploads existe
    const uploadDir = path.join(publicDir, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Escribir el archivo
    fs.writeFileSync(fullPath, buffer);
    
    return publicUrl; // Devolvemos la nueva URL pública

  } catch (e) {
    console.error("Error al guardar imagen base64:", e);
    return base64Data; // Devolvemos el base64 si falla (aunque no es ideal)
  }
};

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "La escritura de archivos está deshabilitada en producción." },
      { status: 403 }
    )
  }

  try {
    const body: RequestBody = await request.json()
    const { secciones, proyectos, configuracion } = body

    const dataDir = path.join(process.cwd(), "lib", "data")
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    // --- Procesar y Guardar Secciones ---
    if (secciones) {
      // Reemplazamos imágenes base64 por URLs antes de guardar
      const seccionesProcesadas = secciones.map(seccion => ({
        ...seccion,
        image: saveBase64Image(seccion.image, "uploads"),
      }));
      
      const featuresPath = path.join(dataDir, "features.json")
      fs.writeFileSync(featuresPath, JSON.stringify(seccionesProcesadas, null, 2), "utf8")
    }

    // --- Procesar y Guardar Proyectos ---
    if (proyectos) {
      // Reemplazamos imágenes base64 por URLs antes de guardar
      const proyectosProcesados = proyectos.map(proyecto => ({
        ...proyecto,
        imagenes: proyecto.imagenes.map(img => saveBase64Image(img, "uploads")),
      }));

      const projectsPath = path.join(dataDir, "proyects.json")
      fs.writeFileSync(projectsPath, JSON.stringify(proyectosProcesados, null, 2), "utf8")
    }

    // --- Guardar Configuración ---
    if (configuracion) {
      const configPath = path.join(dataDir, "config.json")
      fs.writeFileSync(configPath, JSON.stringify(configuracion, null, 2), "utf8")
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