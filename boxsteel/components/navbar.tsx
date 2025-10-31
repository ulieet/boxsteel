"use client"; // 1. Convertimos a Cliente para manejar Clics y Refs

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRef } from "react"; // 2. Importamos useRef para medir la navbar
import { usePathname, useRouter } from "next/navigation"; // 3. Para saber en qué página estamos

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null); // 4. Ref para el header

  // --- Función para el Scroll Suave ---
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); // Prevenimos la navegación brusca

    // Parseamos el link que nos pasaron
    const url = new URL(href, window.location.origin);
    const targetHash = url.hash;     // Ej: "#beneficios"
    const targetPathname = url.pathname; // Ej: "/"

    // CASO 1: El link es a OTRA página (ej: /proyectos)
    if (targetPathname !== pathname) {
      router.push(href); // Navegamos con el router de Next
      return;
    }

    // CASO 2: Es un link en la MISMA página (ej: /#beneficios y ya estoy en /)
    
    // Si es un link sin hash (como "Inicio"), vamos al tope
    if (!targetHash || targetHash === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const id = targetHash.substring(1); // "beneficios"
    const elemento = document.getElementById(id);
    
    // 5. AQUÍ ESTÁ EL ARREGLO
    // Obtenemos la altura REAL de la navbar (fallback a 70px)
    const navbarHeight = headerRef.current?.offsetHeight || 70;

    if (elemento) {
      const offsetTop = elemento.offsetTop;
      window.scrollTo({
        top: offsetTop - navbarHeight, // Le restamos la altura de la navbar
        behavior: "smooth",
      });
    }
  };

  return (
    <header 
      ref={headerRef} 
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a
            href="#top"
            onClick={(e) => handleScroll(e, "#top")}
            className="flex items-center gap-2"
          >
            <Image
              src="/images/box-logo.png"
              alt="Box Steel Frame"
              width={50}
              height={50}
              className="w-12 h-12 rounded-lg"
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
            <a 
              href="/" 
              onClick={(e) => handleScroll(e, "/")}
              className="text-base font-medium text-foreground hover:text-accent transition-colors"
            >
              Inicio
            </a>
          
            <a
              href="/#beneficios"
              onClick={(e) => handleScroll(e, "/#beneficios")}
              className="text-base font-medium text-foreground hover:text-accent transition-colors"
            >
              Beneficios
            </a>
            <a
              href="/#contacto"
              onClick={(e) => handleScroll(e, "/#contacto")}
              className="text-base font-medium text-foreground hover:text-accent transition-colors"
            >
              Contacto
            </a>

              <a 
              href="/proyectos" 
              onClick={(e) => handleScroll(e, "/proyectos")}
              className="text-base font-medium text-foreground hover:text-accent transition-colors"
            >
              Proyectos
            </a>
          </nav>

          <Button
            size="sm"
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium"
            asChild
          >
            <a
              href="https://wa.me/5492213147323"
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar presupuesto
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}