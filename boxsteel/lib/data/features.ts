export interface FeatureData {
  eyebrow: string
  title: string
  subtitle?: string        
  description: string | string[]
  image: string
  imageAlt: string
  imagePosition?: "left" | "right"  
    
}

export const featuresData: FeatureData[] = [
  {
    eyebrow: "EQUIPOS PROPIOS",
    title: "Disponibilidad en cualquier etapa del proyecto",
    subtitle: "Siempre listos para tu obra", 
    description: [
      "En nuestro centro logístico contamos con un gran parque de equipos de alto rendimiento propios para llevar adelante las obras.",
      "Gran parque de equipos propios",
      "Contamos con expertos maquinistas y mecánicos",
      "60 Equipos de alto rendimiento para pavimentos rígidos y flexibles, movimientos de suelos, limpieza de predio, retiro de árboles, desmontes, perfilados, compactaciones, terraplenes de suelos seleccionados, suelos cal y cemento, caminos rurales, excavaciones, demoliciones, entubamientos y zanjeos.",
    ],
    image: "/images/construction-equipment-trucks-excavators.jpg",
    imageAlt: "Equipos de construcción",
    imagePosition: "right",
  },
  {
    eyebrow: "CONSTRUCCIÓN EFICIENTE",
    title: "500% más rápido que la construcción tradicional",
    subtitle: "Optimización de tiempos",
    description: [
      "El sistema Steel Frame permite reducir significativamente los tiempos de construcción gracias a su proceso industrializado y eficiente.",
      "Construcción en seco sin tiempos de fraguado",
      "Montaje rápido y preciso",
      "Menor cantidad de mano de obra necesaria",
    ],
    image: "/images/construction-site.png",
    imageAlt: "Construcción con Steel Frame",
    imagePosition: "left",
  },
  {
    eyebrow: "CALIDAD GARANTIZADA",
    title: "Materiales de primera calidad y durabilidad",
    subtitle: "Garantía de excelencia",
    description: [
      "Utilizamos únicamente materiales certificados y de primera calidad para garantizar la durabilidad y seguridad de tu construcción.",
      "Acero galvanizado de alta resistencia",
      "Aislación térmica y acústica superior",
      "Garantía extendida en todos nuestros proyectos",
    ],
    image: "/images/modern-house.png",
    imageAlt: "Casa moderna con Steel Frame",
    imagePosition: "right",
  },
]
