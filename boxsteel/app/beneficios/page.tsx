"use client"

import { Check } from "lucide-react"

export default function BeneficiosPage() {
  const benefits = [
    {
      title: "Resistencia a fenómenos climáticos",
      description: "Es resistente a fenómenos climáticos como sismos, nieve, vientos fuertes.",
    },
    {
      title: "Materiales incombustibles",
      description:
        "Los materiales utilizados en una vivienda de Steel Framing impiden que el fuego se propague a través de la estructura.",
    },
    {
      title: "Clasificación de seguridad",
      description: "Los perfiles de acero y la lana de vidrio son clasificados como incombustibles.",
    },
    {
      title: "Placas de yeso ignífugas",
      description:
        "Las placas de yeso utilizadas en los tabiques, son materiales clasificados como RE2A (baja propagación de llama) es decir, el papel superficial se quema, pero su combustión cesa al apagar la llama.",
    },
    {
      title: "Paredes más angostas",
      description: "Las paredes construidas en Steel Framing son más angostas que en obra húmeda.",
    },
    {
      title: "Protección contra el fuego",
      description:
        "En la construcción con Steel Frame, para dar protección contra el fuego, se utilizan materiales incombustibles y capaces de resistir a altas temperaturas sin deteriorarse. A su vez, estos materiales cuentan con baja conductividad térmica para aislar del calor a los materiales de la estructura que se debe proteger.",
    },
  ]

  const services = ["PROYECTO, DIRECCIÓN Y EJECUCIÓN DE OBRAS.", "CONSTRUCCIÓN EN SECO."]

  return (
    <div className="min-h-screen bg-neutral-900 text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96">
        <div className="absolute top-0 right-0 w-full h-32 from-teal-500 to-transparent opacity-20 transform -skew-y-12"></div>
        <svg className="absolute top-0 right-0" width="400" height="250" viewBox="0 0 400 250">
          <polyline
            points="300,0 450,150 300,150"
            fill="none"
            stroke="#14b8a6"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 mt-30">
        <div className="mb-24">
            
          <div className="inline-block bg-teal-500 px-8 py-3 mb-8">
            
            <h1 className="text-4xl font-bold text-white">STEEL FRAMING</h1>
            
          </div>
          <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
            Es un sistema constructivo altamente versátil que posibilita construir en todo tipo de terrenos,
            independientemente de las condiciones climáticas o geográficas.
          </p>
        </div>
        

        <div className="space-y-16 mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">En Box nos encargamos de todo el proyecto de manera integral:</h2>
            <div className="space-y-4 text-gray-200 text-lg leading-relaxed">
              <p>Arquitectura, construcción, y todos los trámites y gestiones necesarias.</p>
              <p>
                Te asesoramos y acompañamos durante todo el proceso, vos solo tenés que disfrutar del proceso de
                alcanzar el sueño de tu casa propia.
              </p>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-teal-500 to-transparent"></div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold">HOY TE CONTAMOS QUE:</h2>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="mt-1">
                    <Check className="w-6 h-6 text-teal-500 font-bold" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-lg text-white">
                      <span className="font-bold">{benefit.title}</span>
                      <br />
                      <span className="text-gray-300">{benefit.description}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>


          <div className="space-y-8">
            <div>
              <h2 className="text-lg text-gray-400 mb-2">EN</h2>
              <h3 className="text-4xl font-bold mb-4">
                BOX STEEL FRAME
                <br />
                TE OFRECEMOS:
              </h3>
            </div>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-teal-500 px-6 py-4 flex items-center gap-4 text-white font-semibold text-lg"
                >
                  <span className="w-3 h-3 bg-white rounded-full "></span>
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>

                <div className="h-px bg-gradient-to-r from-teal-500 to-transparent"></div>

        </div>

   

    
    </div>
  )
}
