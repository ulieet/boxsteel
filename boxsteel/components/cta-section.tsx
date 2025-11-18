import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import configData from "@/lib/data/datos-contacto.json" 

export function CTASection() {
  return (
    <section className="py-16 lg:py-10 bg-muted/30" id="contacto">
      <div className="container mx-auto px-4 lg:px-8 mb-15">
        <div className="relative bg-accent rounded-2xl lg:rounded-3xl overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <Image src="/images/house-keys.png" alt="Background" fill className="object-cover" />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-8 items-center p-8 lg:p-16">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-5xl font-bold text-accent-foreground text-balance">
                Hacé tu consulta a través de nuestro WhatsApp
              </h2>
              <p className="text-base lg:text-lg text-accent-foreground/90 leading-relaxed text-pretty">
                Nuestro equipo está listo para asesorarte y responder todas tus dudas sobre tu proyecto elaborando un presupuesto de construcción.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-background text-foreground hover:bg-background/90 font-medium text-base group"
                  asChild
                >
                  <a href={`${configData.whatsappPrefijo}${configData.whatsappNumero}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Consultar
                  </a>
                </Button>
              </div>

            </div>

            <div className="relative aspect-[4/3] rounded-xl overflow-hidden hidden lg:block">
              <Image src="/images/house-keys.png" alt="Entrega de llaves" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}