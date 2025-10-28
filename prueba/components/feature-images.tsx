import Image from "next/image"

interface FeatureSectionProps {
  title: string
  subtitle: string
  description: string | string[]
  image: string
  imageAlt: string
  imagePosition?: "left" | "right"
  accentColor?: "teal" | "red"
}

export function FeatureSection({
  title,
  subtitle,
  description,
  image,
  imageAlt,
  imagePosition = "right",
  accentColor = "teal",
}: FeatureSectionProps) {
  const descriptionArray = Array.isArray(description) ? description : [description]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col ${imagePosition === "left" ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-16 items-center`}
        >
          {/* Content Side */}
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <h3
                className={`text-2xl md:text-3xl font-bold uppercase tracking-tight ${
                  accentColor === "teal" ? "text-teal-600" : "text-red-600"
                }`}
              >
                {title}
              </h3>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">{subtitle}</h2>
            </div>

            <div className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
              {descriptionArray.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <div className="flex-1 w-full">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg shadow-lg">
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
      </div>
    </section>
  )
}
