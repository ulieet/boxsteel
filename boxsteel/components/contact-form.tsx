"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  // Mantuve las variables de estado en inglés (estándar), pero el contenido es español.
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "", mensaje: "" })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  // CORRECCIÓN 1: Tipar el evento de envío del formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)

    // Simulación de envío
    await new Promise((r) => setTimeout(r, 1000))

    console.log("Formulario enviado:", form)
    setSent(true)
    setSending(false)

    // Resetear formulario después de 3 segundos
    setTimeout(() => {
      setForm({ nombre: "", email: "", telefono: "", mensaje: "" })
      setSent(false)
    }, 3000)
  }

  // CORRECCIÓN 2: Tipar el evento de cambio (input y textarea)
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section className="py-20 px-4 bg-neutral-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 lg:p-12 rounded-xl shadow-xl border border-neutral-200">

          {sent ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-teal-400 text-4xl font-bold">✓</span>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">Mensaje enviado</h3>
              <p className="text-neutral-600">Nos pondremos en contacto a la brevedad</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-semibold text-neutral-900 mb-2">Nombre completo</label>
                <Input 
                  id="nombre" 
                  name="nombre" 
                  type="text" 
                  required 
                  value={form.nombre} 
                  onChange={handleChange} 
                  placeholder="Juan Pérez" 
                  className="w-full h-12 border-neutral-300 focus:border-teal-400 focus:ring-teal-400" 
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-900 mb-2">Email</label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  value={form.email} 
                  onChange={handleChange} 
                  placeholder="juan@ejemplo.com" 
                  className="w-full h-12 border-neutral-300 focus:border-teal-400 focus:ring-teal-400" 
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-semibold text-neutral-900 mb-2">Teléfono</label>
                <Input 
                  id="telefono" 
                  name="telefono" 
                  type="tel" 
                  required 
                  value={form.telefono} 
                  onChange={handleChange} 
                  placeholder="221 123 4567" 
                  className="w-full h-12 border-neutral-300 focus:border-teal-400 focus:ring-teal-400" 
                />
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-semibold text-neutral-900 mb-2">Mensaje</label>
                <Textarea 
                  id="mensaje" 
                  name="mensaje" 
                  required 
                  value={form.mensaje} 
                  onChange={handleChange} 
                  placeholder="Contanos sobre tu proyecto..." 
                  rows={5} 
                  className="w-full resize-none border-neutral-300 focus:border-teal-400 focus:ring-teal-400 h-35" 
                />
              </div>

              <Button type="submit" disabled={sending} className="w-full bg-teal-400 hover:bg-teal-500 text-white font-semibold py-6 rounded-lg transition-all text-base">
                {sending ? "Enviando..." : "Enviar consulta"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}