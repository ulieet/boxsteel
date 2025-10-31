
const datos = {
  tituloPrincipal: "Rapidez | Eficiencia | Sustentabilidad | Confiabilidad",
  icono: "BSF",
  descripcion:
    'Somos especialistas en construcción con <span class="font-bold text-accent">steel frame</span>, un sistema constructivo moderno, eficiente y sustentable. Desarrollamos proyectos residenciales y comerciales con los más altos estándares de calidad, ofreciendo soluciones personalizadas que se adaptan a las necesidades de cada cliente.',
  lema: "Transformamos ideas en construcciones sólidas, rápidas y económicas con tecnología de vanguardia.",
};

export function SeccionIntro() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-8">

          <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-balance text-accent">
            {datos.tituloPrincipal}
          </h1>

          <div className="flex justify-center">
            <div className="w-20 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-4xl font-bold text-accent">{datos.icono}</span>
            </div>
          </div>

          <div className="space-y-6">
            <p
              className="text-lg lg:text-xl text-foreground leading-relaxed"
              // Técnica "humana" para renderizar el <span> sin ensuciar el JSX
              dangerouslySetInnerHTML={{ __html: datos.descripcion }}
            />
            <p className="text-base lg:text-lg font-semibold text-foreground">
              {datos.lema}
            </p>
          </div>

          <div className="flex justify-center pt-4">
            <div className="w-24 h-1 bg-accent rounded-full" />
          </div>

        </div>
      </div>
    </section>
  );
}