export function IntroSection() {
  return (
    <section className="py-16 lg:py-24 from-background to-muted/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Logo/Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-4xl font-bold text-accent">BSF</span>
            </div>
          </div>

          {/* Main Description */}
          <div className="space-y-6">
            <p className="text-lg lg:text-xl text-foreground leading-relaxed">
              Somos especialistas en construcción con <span className="font-bold text-accent">steel frame</span>, un
              sistema constructivo moderno, eficiente y sustentable. Desarrollamos proyectos residenciales y comerciales
              con los más altos estándares de calidad, ofreciendo soluciones personalizadas que se adaptan a las
              necesidades de cada cliente.
            </p>

            <p className="text-base lg:text-lg font-semibold text-foreground">
              Transformamos ideas en construcciones sólidas, rápidas y económicas con tecnología de vanguardia.
            </p>
          </div>

          {/* Decorative Line */}
          <div className="flex justify-center pt-4">
            <div className="w-24 h-1 bg-accent rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
