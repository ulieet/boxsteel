export default function ProyectosHeader() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-neutral-600">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(26, 155, 155, 0.05) 50px, rgba(26, 155, 155, 0.05) 51px),
                              repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(26, 155, 155, 0.05) 50px, rgba(26, 155, 155, 0.05) 51px)`,
          }}
        ></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-block mb-6">
            <div className="bg-[#1a9b9b] px-8 py-3 transform -skew-x-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white transform skew-x-6">
                NUESTROS PROYECTOS
              </h1>
            </div>
          </div>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl leading-relaxed">
            Hemos ejecutado obras de todo tipo: cárceles, hospitales, laboratorios, escuelas, universidades, oficinas,
            judiciales, naves industriales, estadios, polideportivos, estaciones de servicio y más.
          </p>
        </div>
      </div>
    </section>
  )
}
