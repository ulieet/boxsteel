import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import type {
  FeatureData,
  Proyecto,
  ConfiguracionSitioData,
  CarouselSlide, 
  ProyectosHeaderData,
  DatosContactoData,
} from "@/app/admin/components/types"

interface RequestBody {
  secciones?: FeatureData[]
  proyectos?: Proyecto[]
  configuracion?: ConfiguracionSitioData
  carousel?: CarouselSlide[] 
  proyectosHeader?: ProyectosHeaderData
  datosContacto?: DatosContactoData
}

const saveBase64Image = (base64Data: string, relativePath: string): string => {
  if (!base64Data || !base64Data.startsWith("data:image")) {
    return base64Data 
  }
  try {
    const publicDir = path.join(process.cwd(), "public")
    if (!relativePath.startsWith("/")) {
      relativePath = "/" + relativePath
    }
    const ext = base64Data.substring(base64Data.indexOf('/') + 1, base64Data.indexOf(';base64'));
    const fileName = `img-${Date.now()}-${Math.round(Math.random() * 1E9)}.${ext}`;
    const fullPath = path.join(publicDir, "uploads", fileName);
    const publicUrl = `/uploads/${fileName}`; 
    const data = base64Data.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(data, "base64");
    const uploadDir = path.join(publicDir, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    fs.writeFileSync(fullPath, buffer);
    return publicUrl; 
  } catch (e) {
    console.error("Error al guardar imagen base64:", e);
    return base64Data; 
  }
};


export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
  }

  try {
    const body: RequestBody = await request.json()
    const { secciones, proyectos, configuracion, carousel, proyectosHeader, datosContacto } = body

    const dataDir = path.join(process.cwd(), "lib", "data")
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    if (secciones) {
      const seccionesProcesadas = secciones.map(seccion => ({
        ...seccion,
        image: saveBase64Image(seccion.image, "uploads"),
      }));
      
      const featuresPath = path.join(dataDir, "features.json")
      fs.writeFileSync(featuresPath, JSON.stringify(seccionesProcesadas, null, 2), "utf8")
    }

    if (proyectos) {
  
      const proyectosProcesados = proyectos.map(proyecto => ({
        ...proyecto,
        imagenes: proyecto.imagenes.map(img => saveBase64Image(img, "uploads")),
      }));

      const projectsPath = path.join(dataDir, "proyects.json")
      fs.writeFileSync(projectsPath, JSON.stringify(proyectosProcesados, null, 2), "utf8")
    }

    // --- LÓGICA DE CONFIGURACIÓN ---
    if (configuracion) {
      // Procesa el logoUrl (Base64 a URL) antes de guardar
      const configProcesada = {
        ...configuracion,
        logoUrl: saveBase64Image(configuracion.logoUrl, "uploads"),
      };
      
      const configPath = path.join(dataDir, "config.json")
      fs.writeFileSync(configPath, JSON.stringify(configProcesada, null, 2), "utf8")
    }
   


    if (carousel) {
      const carouselProcesado = carousel.map(slide => ({
        ...slide,
        src: saveBase64Image(slide.src, "uploads"),
      }));
      
      const carouselPath = path.join(dataDir, "carousel.json")
      fs.writeFileSync(carouselPath, JSON.stringify(carouselProcesado, null, 2), "utf8")
    }

    if (proyectosHeader) {
      const proyectosHeaderPath = path.join(dataDir, "proyectos-header.json")
      fs.writeFileSync(proyectosHeaderPath, JSON.stringify(proyectosHeader, null, 2), "utf8")
    }

    if (datosContacto) {
      const datosContactoPath = path.join(dataDir, "datos-contacto.json")
      fs.writeFileSync(datosContactoPath, JSON.stringify(datosContacto, null, 2), "utf8")
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