import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-2">
            <Image
              src="/images/box-logo.png"
              alt="Box Steel Frame"
              width={50}
              height={50}
              className="w-20 h-20 lg:w-15 lg:h-15 rounded-4xl"
            />
            <div className="flex flex-col">
              <span className="font-bold text-base lg:text-lg text-foreground">BOX Steel Frame</span>
              <span className="text-[10px] lg:text-xs text-muted-foreground -mt-1">Construcción eficiente</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#proyectos" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
             |  Proyectos |
            </a>
            <a href="#beneficios" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              |  Beneficios  |
            </a>
            <a href="#proceso" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              |  Proceso  |
            </a>
          </nav>

          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium" asChild>
            <a href="https://wa.me/5492213147323" target="_blank" rel="noopener noreferrer">
              Consultar
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
