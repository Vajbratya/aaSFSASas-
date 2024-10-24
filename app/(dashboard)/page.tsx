'use client'

import { ArrowUpIcon, PlayCircleIcon, SunIcon, MoonIcon } from "lucide-react"
import { useEffect, useState, useRef, useCallback } from "react"
import { motion as m, useMotionValue, useTransform, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"
import gsap from "gsap"
import Link from 'next/link'
import Image from 'next/image'

const tiposUsuarios = {
  pt: [
    { texto: 'acadêmicos', cor: 'border-blue-500' },
    { texto: 'residentes de radiologia', cor: 'border-green-500' },
    { texto: 'todos os radiologistas', cor: 'border-purple-500' },
    { texto: 'subespecialistas', cor: 'border-yellow-500' },
    { texto: 'radiologistas gerais', cor: 'border-red-500' },
    { texto: 'ultrassonografistas', cor: 'border-indigo-500' },
  ],
  es: [
    { texto: 'académicos', cor: 'border-blue-500' },
    { texto: 'residentes de radiología', cor: 'border-green-500' },
    { texto: 'todos los radiólogos', cor: 'border-purple-500' },
    { texto: 'subespecialistas', cor: 'border-yellow-500' },
    { texto: 'radiólogos generales', cor: 'border-red-500' },
    { texto: 'ecografistas', cor: 'border-indigo-500' },
  ]
}

const traducoes = {
  pt: {
    titulo: 'Laudos Médicos Precisos e Eficientes com IA',
    para: 'para',
    descricao: 'Laudos.ai fornece ferramentas avançadas e infraestrutura na nuvem para radiologistas gerarem, editarem e personalizarem laudos de forma mais rápida, precisa e segura, transformando exames e achados em relatórios completos com o suporte de IA de ponta.',
    entrar: 'Entrar',
    verDemo: 'Ver Demonstração',
    alfaFechado: 'ALFA FECHADO'
  },
  es: {
    titulo: 'Informes Médicos Precisos y Eficientes con IA',
    para: 'para',
    descricao: 'Laudos.ai proporciona herramientas avanzadas e infraestructura en la nube para que los radiólogos generen, editen y personalicen informes de manera más rápida, precisa y segura, transformando exámenes y hallazgos en informes completos con soporte de IA de vanguardia.',
    entrar: 'Entrar',
    verDemo: 'Ver Demostración',
    alfaFechado: 'ALFA CERRADO'
  }
}

const CampoParticulas = () => {
  const particulasRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const particulas = particulasRef.current
    if (!particulas) return

    const criarParticula = () => {
      const particula = document.createElement('div')
      particula.className = 'absolute w-1 h-1 bg-white rounded-full opacity-0'
      particula.style.left = `${Math.random() * 100}%`
      particula.style.top = `${Math.random() * 100}%`
      particulas.appendChild(particula)

      gsap.to(particula, {
        opacity: Math.random() * 0.5 + 0.1,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
      })

      gsap.to(particula, {
        x: `${(Math.random() - 0.5) * 100}`,
        y: `${(Math.random() - 0.5) * 100}`,
        duration: Math.random() * 100 + 50,
        repeat: -1,
        yoyo: true,
        ease: 'none',
      })
    }

    for (let i = 0; i < 50; i++) {
      criarParticula()
    }

    return () => {
      while (particulas.firstChild) {
        particulas.removeChild(particulas.firstChild)
      }
    }
  }, [])

  return <div ref={particulasRef} className="absolute inset-0 overflow-hidden pointer-events-none" />
}

export default function Component() {
  const [montado, setMontado] = useState(false)
  const [tema, setTema] = useState<'escuro' | 'claro'>('escuro')
  const [idioma, setIdioma] = useState<'pt' | 'es'>('pt')
  const trianguloRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5])
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5])

  const [indiceAtual, setIndiceAtual] = useState(0)
  const [eBotao, setEBotao] = useState(true)

  const [ref, emView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event
    const { innerWidth, innerHeight } = window
    mouseX.set((clientX - innerWidth / 2) * 0.5)
    mouseY.set((clientY - innerHeight / 2) * 0.5)
  }, [mouseX, mouseY])

  useEffect(() => {
    setMontado(true)

    const intervalo = setInterval(() => {
      setIndiceAtual((indiceAnterior) => (indiceAnterior + 1) % tiposUsuarios[idioma].length)
      setEBotao(true)
      setTimeout(() => setEBotao(false), 2000)
    }, 4000)

    return () => clearInterval(intervalo)
  }, [idioma])

  const reproduzirVideo = () => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')
  }

  const alternarIdioma = () => {
    setIdioma(idiomaAnterior => idiomaAnterior === 'pt' ? 'es' : 'pt')
  }

  return (
    <div 
      className={`${tema === 'escuro' ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen flex items-center justify-center p-4 overflow-hidden transition-colors duration-300 -mt-[10vh]`} // Adicionado -mt-[10vh]
      onMouseMove={handleMouseMove}
    >
      <div className={`absolute inset-0 ${tema === 'escuro' ? 'bg-[url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxMTExMTEiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTU5IDFIMXY1OGg1OFYxeiIgZmlsbD0iIzIyMjIyMiIvPjwvZz48L3N2Zz4=)]' : 'bg-[url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMEgwdjYwaDYwVjB6TTU5IDFIMXY1OGg1OFYxeiIgZmlsbD0iI0VFRUVFRSIvPjwvZz48L3N2Zz4=)]'} opacity-20 transition-opacity duration-300`}></div>
      {tema === 'escuro' && <CampoParticulas />}
      <div className="max-w-5xl mx-auto text-center relative z-10" ref={ref}>
        <div className="absolute -top-4 -right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 transform rotate-12 shadow-lg z-20">
          {traducoes[idioma].alfaFechado}
        </div>
        <AnimatePresence mode="wait">
          <m.div
            key="titulo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: emView ? 1 : 0, y: emView ? 0 : 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className={`relative ${tema === 'escuro' ? 'text-white' : 'text-black'} text-4xl sm:text-5xl md:text-6xl font-bold mb-2`}>
              {traducoes[idioma].titulo}
            </h1>
          </m.div>
        </AnimatePresence>
        <div className="mb-6 flex items-center justify-center">
          <span className={`${tema === 'escuro' ? 'text-white' : 'text-black'} text-xl sm:text-2xl md:text-3xl mr-2`}>
            {traducoes[idioma].para}
          </span>
          <div className="relative h-12 min-w-[300px]"> {/* Mudado para min-width fixo */}
            <AnimatePresence mode="wait">
              {eBotao ? (
                <m.div
                  key={`botao-${indiceAtual}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute left-0" // Fixado à esquerda
                >
                  <div className={`px-4 py-2 rounded-full border-2 ${tiposUsuarios[idioma][indiceAtual].cor} ${tema === 'escuro' ? 'text-white' : 'text-black'} font-semibold text-xl sm:text-2xl md:text-3xl whitespace-nowrap`}>
                    {tiposUsuarios[idioma][indiceAtual].texto}
                  </div>
                </m.div>
              ) : (
                <m.div
                  key={`sublinhado-${indiceAtual}`}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  exit={{ width: 0 }}
                  className="absolute left-0" // Fixado à esquerda
                >
                  <div className={`h-1 ${tiposUsuarios[idioma][indiceAtual].cor} absolute bottom-0 w-full`} />
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <AnimatePresence mode="wait">
          <m.div
            key="descricao"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: emView ? 1 : 0, y: emView ? 0 : 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className={`${tema === 'escuro' ? 'text-gray-400' : 'text-gray-600'} text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto`}>
              {traducoes[idioma].descricao}
            </p>
          </m.div>
        </AnimatePresence>
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: emView ? 1 : 0, y: emView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/sign-in"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90"
            >
              {traducoes[idioma].entrar}
            </Link>
            <button 
              className={`${tema === 'escuro' ? 'bg-[#111] text-white hover:bg-gray-800' : 'bg-gray-200 text-black hover:bg-gray-300'} px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
              aria-label="Ver Demonstração"
              onClick={reproduzirVideo}
            >
              <PlayCircleIcon className="mr-2 h-5 w-5 inline" />
              {traducoes[idioma].verDemo}
            </button>
          </div>
        </m.div>
      </div>
      <m.div 
        style={{ rotateX, rotateY, perspective: 1000 }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <m.div 
            initial={false}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%']
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
          >
            <div className={`absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-br from-blue-500 via-green-500 via-yellow-500 to-red-500 ${tema === 'escuro' ? 'opacity-50' : 'opacity-30'} blur-3xl`} />
          </m.div>
          <m.div 
            ref={trianguloRef}
            style={{ rotateX, rotateY }}
          >
            <div className={`absolute left-1/2 bottom-0 w-0 h-0 border-l-[30vw] border-r-[30vw] border-b-[60vh] border-l-transparent border-r-transparent ${tema === 'escuro' ? 'border-b-white/5' : 'border-b-black/5'}`} />
          </m.div>
        </div>
      </m.div>
      <button
        onClick={alternarIdioma}
        className={`absolute bottom-4 right-4 ${tema === 'escuro' ? 'text-white bg-black/50 hover:bg-black/70' : 'text-black bg-white/50 hover:bg-white/70'} p-2 rounded-full transition-colors`}
        aria-label="Alternar idioma"
      >
        {idioma === 'pt' ? 'ES' : 'PT'}
      </button>
    </div>
  )
}
