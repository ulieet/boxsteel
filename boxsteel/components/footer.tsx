import Link from "next/link"
import { Linkedin, Instagram, Mail, MapPin, MessageCircle } from "lucide-react"
import configData from "@/lib/data/datos-contacto.json" 

// Función para dar formato visual específico (+54 9 221 ...)
const formatearNumero = (numero: string) => {
  if (!numero) return "";
  const limpio = numero.replace(/[^0-9]/g, '');

  if (limpio.startsWith("549") && limpio.length >= 10) {
    return `+${limpio.slice(0, 2)} ${limpio.slice(2, 3)} ${limpio.slice(3, 6)} ${limpio.slice(6, 9)} ${limpio.slice(9)}`;
  }

  return limpio;
}

export function Footer() {
  const { 
    whatsappPrefijo,
    whatsappNumero, 
    whatsappNumero2, 
    email, 
    linkedinUrl, 
    instagramUrl,
    ubicacion1_titulo,
    ubicacion1_direccion,
    ubicacion2_titulo,
    ubicacion2_direccion
  } = configData;

  const showLinkedin = linkedinUrl && linkedinUrl.trim() !== "";
  const showInstagram = instagramUrl && instagramUrl.trim() !== "";
  const showSocials = showLinkedin || showInstagram;

  return (
    <footer className="bg-foreground text-white py-16 px-6 border-t border-slate-600">
      <div className="max-w-6xl mx-auto">
    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Columna 1: Logo y Descripción */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-teal-400">Box Steel Frame</h3>
            <p className="text-sm text-slate-200">Especialistas en estructuras de acero y construcción.</p>
          </div>

          {/* Columna 2: Ubicación */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-400" />
              Ubicación
            </h4>
            <div className="space-y-2 text-sm text-slate-200">
              {/* Ubicación 1 */}
              {(ubicacion1_titulo || ubicacion1_direccion) && (
                <div className="mb-3">
                  {ubicacion1_titulo && <p className="font-medium text-teal-300">{ubicacion1_titulo}</p>}
                  {ubicacion1_direccion && <p>{ubicacion1_direccion}</p>}
                </div>
              )}
              
              {/* Ubicación 2 */}
              {(ubicacion2_titulo || ubicacion2_direccion) && (
                <div>
                  {ubicacion2_titulo && <p className="font-medium text-teal-300">{ubicacion2_titulo}</p>}
                  {ubicacion2_direccion && <p>{ubicacion2_direccion}</p>}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-white">Contacto</h4>
            <div className="space-y-3 text-sm">
              
              {/* WhatsApp Principal */}
              <a
                href={`${whatsappPrefijo}${whatsappNumero}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-teal-300 transition p-2 bg-teal-600 hover:bg-teal-500 rounded"
              >
                <MessageCircle className="w-4 h-4" />
                {formatearNumero(whatsappNumero)} 
              </a>

              {/* WhatsApp Secundario (Opcional) */}
              {whatsappNumero2 && whatsappNumero2.trim() !== "" && (
                <a
                  href={`${whatsappPrefijo}${whatsappNumero2}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-teal-300 transition p-2 bg-teal-600 hover:bg-teal-500 rounded"
                >
                  <MessageCircle className="w-4 h-4" />
                  {formatearNumero(whatsappNumero2)} 
                </a>
              )}

              <a
                href={`mailto:${email}`} 
                className="flex items-center gap-3 text-white hover:text-teal-300 transition p-2 bg-teal-600 hover:bg-teal-500 rounded"
              >
                <Mail className="w-4 h-4" />
                {email} 
              </a>
            </div>
          </div>

          {showSocials && (
            <div className="space-y-3">
              <h4 className="font-semibold text-white">Síguenos</h4>
              <div className="flex gap-3">
                
                {showLinkedin && (
                  <a
                    href={linkedinUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center hover:bg-teal-500 transition"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}

                {showInstagram && (
                  <a
                    href={instagramUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center hover:bg-teal-500 transition"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-slate-600 my-8"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-300">
            © {new Date().getFullYear()} Box Steel Frame. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 text-xs text-slate-300">
            <Link href="#privacy" className="hover:text-teal-400 transition">
              Privacidad
            </Link>
            <Link href="#terms" className="hover:text-teal-400 transition">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}