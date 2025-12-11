import Image from "next/image";

const datos = {
  tituloPrincipal: "Rapidez | Eficiencia | Sustentabilidad | Confiabilidad",
  icono: "/images/box-logo.png", 
  descripcion:
    'En Box somos especialistas en construcción con <span class="font-bold text-accent">Steel Frame</span>, un sistema constructivo moderno, eficiente y sustentable. Desarrollamos proyectos residenciales y comerciales con los más altos estándares de calidad, ofreciendo soluciones personalizadas que se adaptan a las necesidades de cada cliente.',
  lema: "Transformamos ideas en construcciones sólidas, rápidas y económicas con tecnología de vanguardia.",
};

export function SeccionIntro() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          
          <h1 className="text-3xl md:text-4xl font-bold text-balance text-accent">
            {datos.tituloPrincipal}
          </h1>
      
          <div className="flex justify-center">
             <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-center w-20 h-20 md:w-24 md:h-24">
              <Image
                src={datos.icono}
                alt="Logo Box Steel Frame"
                width={80} 
                height={80} 
                className="object-contain" 
                priority
              />
            </div>

          </div>

          <div className="space-y-6">
            <p
              className="text-lg lg:text-xl text-foreground leading-relaxed"
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