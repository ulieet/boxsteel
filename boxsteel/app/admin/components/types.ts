export interface FeatureData {
  eyebrow: string
  title: string
  subtitle?: string
  description: string[] | string
  image: string //string base64 (data:image/...) o una URL
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
  imagenes: string[] 
  categoria: string
}

export interface ConfiguracionSitioData {
  fuentePrincipal: string
  fuenteTitulos: string
  colorAcento: string
}

export interface CarouselSlide {
  src: string; 
  alt: string; 
}