import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import slide1 from '../../assets/images/header/slide1.png'
import slide2 from '../../assets/images/header/slide2.png'
import slide3 from '../../assets/images/header/slide3.png'

import '../../styles/layout/header.scss'
import WavesBackground from '../ui/WavesBackground'

const slides = [
    {
        id: 1,
        image: slide1,
        align: 'left',
        title: 'Ansiedade não precisa mandar no seu dia.',
        subtitle:
            'Terapia para organizar pensamentos, acolher emoções e retomar o controle no seu ritmo.',
        cta: { label: 'Agendar uma conversa', href: '#contato' }
    },
    {
        id: 2,
        image: slide2,
        align: 'right',
        title: 'ACT: mais flexibilidade emocional, menos luta interna.',
        subtitle:
            'Aprenda a se relacionar melhor com pensamentos e sentimentos — e agir alinhado aos seus valores.',
        cta: { label: 'Como funciona', href: '#sobre' }
    },
    {
        id: 3,
        image: slide3,
        align: 'left',
        title: 'Atendimento online e presencial.',
        subtitle:
            'Sessões com acolhimento e um acompanhamento claro, respeitando sua história e seu tempo.',
        cta: { label: 'Ver horários', href: '#contato' }
    }
] as const

export default function Header() {
    const [activeSlide, setActiveSlide] = useState(0)
    const scrollRef = useRef<HTMLDivElement | null>(null)

    // Controle de autoplay
    const pauseUntilRef = useRef<number>(0)
    const isHoveringRef = useRef(false)

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        function onScroll() {
            if (!el) return
            // sempre que o usuário mexe, pausa o autoplay por um tempo
            pauseUntilRef.current = Date.now() + 6000

            const slideHeight = window.innerHeight
            const rawIndex = el.scrollTop / slideHeight
            const index = Math.round(rawIndex)
            setActiveSlide(Math.min(slides.length - 1, Math.max(0, index)))
        }

        el.addEventListener('scroll', onScroll, { passive: true })
        return () => el.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        function isDesktop() {
            return window.matchMedia('(min-width: 1024px)').matches
        }

        const interval = window.setInterval(() => {
            if (!isDesktop()) return
            if (isHoveringRef.current) return
            if (Date.now() < pauseUntilRef.current) return

            setActiveSlide(prev => (prev + 1) % slides.length)

            // mantém a barra de scroll sincronizada com o slide (se estiver usando scroll container)
            const el = scrollRef.current
            if (el) {
                el.scrollTo({
                    top: (activeSlide + 1) % slides.length * window.innerHeight,
                    behavior: 'smooth'
                })
            }
        }, 6500)

        return () => window.clearInterval(interval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeSlide])

    return (
        <header
            className="hero"
            onMouseEnter={() => {
                isHoveringRef.current = true
            }}
            onMouseLeave={() => {
                isHoveringRef.current = false
                // quando tirar o mouse, dá um respiro antes de voltar a passar
                pauseUntilRef.current = Date.now() + 2000
            }}
            id="hero"
        >
            <div className="hero__scroll" ref={scrollRef}>
                <div className="hero__track" style={{ height: `${slides.length * 100}vh` }}>
                    <div className="hero__sticky">
                        <WavesBackground />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={slides[activeSlide].id}
                                className={`hero__slide hero__slide--${slides[activeSlide].align}`}
                                initial={{ opacity: 0, y: 60 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -60 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            >
                                <div
                                    className="hero__image"
                                    style={{ backgroundImage: `url(${slides[activeSlide].image})` }}
                                />

                                <div className="hero__text">
                                    <h1>{slides[activeSlide].title}</h1>
                                    <p>{slides[activeSlide].subtitle}</p>

                                    <a className="hero__cta" href={slides[activeSlide].cta.href}>
                                        {slides[activeSlide].cta.label}
                                    </a>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </header>
    )
}
