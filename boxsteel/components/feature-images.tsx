import Image from "next/image"
import featuresData from "@/lib/data/features.json"

export interface FeatureData {
  eyebrow: string
  title: string
  subtitle?: string
  description: string | string[]
  image: string
  imageAlt: string
  imagePosition?: "left" | "right"
}

export default function FeatureSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 space-y-24">
{(featuresData as FeatureData[]).map((feature, index) => {
          const {
            eyebrow,
            title,
            subtitle,
            description,
            image,
            imageAlt,
            imagePosition = "right",
          } = feature

          const descriptionArray = Array.isArray(description)
            ? description
            : [description]

          return (
            <div
              key={index}
              className={`flex flex-col ${
                imagePosition === "left"
                  ? "lg:flex-row-reverse"
                  : "lg:flex-row"
              } gap-8 lg:gap-16 items-center`}
            >
              {/* Texto */}
              <div className="flex-1 space-y-6">
                <div className="space-y-4">
                  <p className="uppercase text-sm font-semibold text-gray-500">
                    {eyebrow}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-accent">
                    {title}
                  </h3>
                  {subtitle && (
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
                      {subtitle}
                    </h2>
                  )}
                </div>

                <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
                  {descriptionArray.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Imagen */}
              <div className="flex-1 w-full">
                <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
