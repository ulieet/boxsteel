import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/box-logo2.png"
                alt="Box Steel Frame"
                width={40}
                height={40}
                className="w-10 h-10 "
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg">BOX</span>
                <span className="text-xs text-background/70 -mt-1">Construcción eficiente</span>
              </div>
            </div>
            <p className="text-sm text-background/70 leading-relaxed">
              Construimos tu casa con Steel Frame, el sistema más rápido y eficiente del mercado.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4">Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/proyectos" className="text-background/70 hover:text-background transition-colors">
                  Proyectos
                </a>
              </li>
              <li>
                <a href="/#beneficios" className="text-background/70 hover:text-background transition-colors">
                  Beneficios
                </a>
              </li>
              
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://wa.me/5492213147323"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Enviar mensaje
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 lg:mt-12 pt-8 text-center">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Box Steel Frame. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
