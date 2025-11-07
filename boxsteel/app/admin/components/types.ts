export interface FeatureData {
  eyebrow: string
  title: string
  subtitle?: string
  description: string[] | string
  image: string // Esto será un string base64 (data:image/...) o una URL
  imageAlt: string
  imagePosition: "left" | "right"
}

export interface Proyecto {
  id: string
  titulo: string
  ubicacion: string
  cliente: string
  año: string
  descripcion: string
  imagenes: string[] // Array de strings base64 (data:image/...) o URLs
  categoria: string
}

export interface ConfiguracionSitioData {
  fuentePrincipal: string
  fuenteTitulos: string
  colorAcento: string
  theme: "light" | "dark" | "system"
}