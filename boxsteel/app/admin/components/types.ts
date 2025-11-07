// Este archivo nos ayuda a compartir las interfaces entre componentes

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
  imagenes: string[] // Array de strings (URLs o rutas)
  categoria: string
}