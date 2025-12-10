export interface FeatureData {
  eyebrow: string
  title: string
  subtitle?: string
  description: string[] | string
  image: string
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
  logoUrl: string 
}

export interface CarouselSlide {
  src: string; 
  alt: string; 
}

export interface ProyectosHeaderData {
  titulo: string
  descripcion: string
}

export interface DatosContactoData {
  whatsappPrefijo: string
  whatsappNumero: string
  // Eliminamos whatsappDisplayFooter y los campos de teléfono
  email: string
  linkedinUrl: string
  instagramUrl: string
  ubicacion1_titulo: string
  ubicacion1_direccion: string
  ubicacion2_titulo: string
  ubicacion2_direccion: string
}