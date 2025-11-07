import type { Metadata } from "next";
// 1. Importamos las fuentes que usaremos desde Google Fonts
import { 
  Inter, 
  Roboto, 
  Open_Sans, 
  Lato, 
  Montserrat, 
  Poppins, 
  Playfair_Display 
} from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import FloatingLogo from "@/components/Floatwsp";

// 2. Importamos la configuración y el tipo
import config from "@/lib/data/config.json";
import type { ConfiguracionSitioData } from "@/app/admin/components/types";

// 3. Instanciamos todas las fuentes posibles
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-roboto" });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-lato" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-poppins" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair-display" });

// 4. Creamos un mapa para acceder fácilmente a la fuente seleccionada
const fontMap: Record<string, { variable: string; className: string }> = {
  "Inter": inter,
  "Roboto": roboto,
  "Open Sans": openSans,
  "Lato": lato,
  "Montserrat": montserrat,
  "Poppins": poppins,
  "Playfair Display": playfair,
};

export const metadata: Metadata = {
  title: "Box-Steel-Frame",
  description: "Hecho por ulises",
  icons: "/images/box-logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // 5. Leemos la configuración del JSON (sin 'theme')
  const { 
    fuentePrincipal, 
    fuenteTitulos, 
    colorAcento 
  } = config as ConfiguracionSitioData;

  // 6. Asignamos la fuente; si no se encuentra, usamos Inter por defecto
  const principalFont = fontMap[fuentePrincipal] || inter;
  const titulosFont = fontMap[fuenteTitulos] || inter;

  // 7. Creamos las variables CSS que se inyectarán en el HTML
  const styleVariables = {
    '--font-sans': principalFont.variable,
    '--font-headings': titulosFont.variable,
    // Sobrescribimos las variables de acento y anillo de Foco
    '--accent': colorAcento,
    '--color-accent': colorAcento,
    '--ring': colorAcento,
  } as React.CSSProperties;

  // 8. 'themeClass' REMOVIDO

  return (
    // 9. Aplicamos las clases de fuente y los estilos CSS al tag <html>
    //    La clase de 'theme' fue removida.
    <html 
      lang="es" 
      className={`${principalFont.className} ${titulosFont.className}`} 
      style={styleVariables}
    >
      <body className="antialiased">
        <Navbar />
        <FloatingLogo />
        {children}
        <Footer />
      </body>
    </html>
  );
}