"use client"; 

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react"; 
import { usePathname, useRouter } from "next/navigation"; 
import Link from "next/link"; 
import configData from "@/lib/data/datos-contacto.json";
import config from "@/lib/data/config.json";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); 

    const url = new URL(href, window.location.origin);
    const targetHash = url.hash;    
    const targetPathname = url.pathname; 

    if (targetPathname !== pathname) {
      router.push(href); 
      setIsMobileMenuOpen(false);
      return;
    }

    
    if (!targetHash || targetHash === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsMobileMenuOpen(false);
      return;
    }

    const id = targetHash.substring(1); 
    const elemento = document.getElementById(id);
    
  
    const navbarHeight = headerRef.current?.offsetHeight || 70;

    if (elemento) {
      const offsetTop = elemento.offsetTop;
      window.scrollTo({
        top: offsetTop - navbarHeight, 
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  const handleExternalLink = () => {
    setIsMobileMenuOpen(false);
  }

  return (
    <header 
      ref={headerRef} 
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a
            href="#top"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleScroll(e, "#top")}
            className="flex items-center gap-2"
          >
            <Image
              src={config.logoUrl} 
              alt="Box Steel Frame"
              width={50}
              height={50}
              className="w-12 h-10 rounded-lg"
              priority
            />
            <div className="flex flex-col">
              <span className="font-bold text-base lg:text-lg text-foreground hover:text-accent transition-colors">
                BOX Steel Frame
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                Construcción eficiente
              </span>
            </div>
          </a>

         
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              onClick={(e) => handleScroll(e, "/")}
              className="text-base font-medium text-foreground hover:text-accent transition-colors"
            >
              Inicio
            </Link>
          
            <Link
              href="/#beneficios"
              onClick={(e) => handleScroll(e, "/#beneficios")}
              className="text-base font-medium text-foreground hover:text-accent transition-colors"
            >
              Beneficios
            </Link>
            <Link
              href="/#contacto"
              onClick={(e) => handleScroll(e, "/#contacto")}
              className="text-base font-medium text-foreground hover:text-accent transition-colors"
            >
              Contacto
            </Link>

              <Link 
              href="/proyectos" 
              onClick={(e) => handleScroll(e, "/proyectos")}
              className="text-base font-medium text-foreground hover:text-accent transition-colors"
            >
              Proyectos
            </Link>
          </nav>

          <Button
            size="sm"
            className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
            asChild
          >
            <a
              href={`${configData.whatsappPrefijo}${configData.whatsappNumero}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar presupuesto
            </a>
          </Button>

          {/* Menú Móvil con Sheet */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="inline-flex md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="data-[state=open]:duration-300"
            >
              <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
              <SheetDescription className="sr-only">
                Enlaces principales del sitio y botón de presupuesto.
              </SheetDescription>
              
              <nav className="flex flex-col gap-6 pt-8">
                <Link 
                  href="/" 
                  onClick={(e) => handleScroll(e, "/")}
                  className="text-xl font-medium text-foreground hover:text-accent transition-colors pl-2"
                >
                  Inicio
                </Link>
              
                <Link
                  href="/#beneficios"
                  onClick={(e) => handleScroll(e, "/#beneficios")}
                  className="text-xl font-medium text-foreground hover:text-accent transition-colors pl-2"
                >
                  Beneficios
                </Link>

                <Link
                  href="/#contacto"
                  onClick={(e) => handleScroll(e, "/#contacto")}
                  className="text-xl font-medium text-foreground hover:text-accent transition-colors pl-2"
                >
                  Contacto
                </Link>

                <Link 
                  href="/proyectos" 
                  onClick={(e) => handleScroll(e, "/proyectos")}
                  className="text-xl font-medium text-foreground hover:text-accent transition-colors pl-2"
                >
                  Proyectos
                </Link>

                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium w-full mt-4"
                  asChild
                >
                  <a
                    href={`${configData.whatsappPrefijo}${configData.whatsappNumero}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleExternalLink}
                  >
                    Consultar presupuesto
                  </a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>

        </div>
      </div>
    </header>
  );
}