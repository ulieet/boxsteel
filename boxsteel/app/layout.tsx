import type { Metadata } from "next";
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

import config from "@/lib/data/config.json";
import type { ConfiguracionSitioData } from "@/app/admin/components/types";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-roboto" });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-lato" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-poppins" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair-display" });

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
  
  const { 
    fuentePrincipal, 
    fuenteTitulos, 
    colorAcento 
  } = config as ConfiguracionSitioData;

  const principalFont = fontMap[fuentePrincipal] || inter;
  const titulosFont = fontMap[fuenteTitulos] || inter;

  const styleVariables = {
    '--font-sans': principalFont.variable,
    '--font-headings': titulosFont.variable,
    '--accent': colorAcento,
    '--color-accent': colorAcento,
    '--ring': colorAcento,
  } as React.CSSProperties;


  return (

    <html 
      lang="es" 
      className={`${principalFont.className} ${titulosFont.className}`} 
      style={styleVariables}
    >
      <body className="antialiased ">
        <Navbar />
        <FloatingLogo />
        {children}
        <Footer />
      </body>
    </html>
  );
}