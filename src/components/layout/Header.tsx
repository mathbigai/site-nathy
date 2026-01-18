import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import slide1 from '../../assets/images/header/slide1.png'
import slide2 from '../../assets/images/header/slide2.png'
import slide3 from '../../assets/images/header/slide3.png'

import '../../styles/layout/header.scss'
import WavesBackground from '../ui/WavesBackground'

const slides = [
    { id: 1, image: slide1, title: 'Acolhimento', align: 'left' },
    { id: 2, image: slide2, title: 'Escuta ativa', align: 'right' },
    { id: 3, image: slide3, title: 'Cuidado emocional', align: 'left' }
] as const

export default function Header() {
    const [activeSlide, setActiveSlide] = useState(0)
    const scrollRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        function onScroll() {
            const slideHeight = window.innerHeight
            if (!el) return
            const rawIndex = el.scrollTop / slideHeight
            const index = Math.round(rawIndex)

            setActiveSlide(
                Math.min(slides.length - 1, Math.max(0, index))
            )
        }

        el.addEventListener('scroll', onScroll, { passive: true })
        return () => el.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header className="hero">
            <div className="hero__scroll" ref={scrollRef}>
                <div
                    className="hero__track"
                    style={{ height: `${slides.length * 100}vh` }}
                >
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
                                    style={{
                                        backgroundImage: `url(${slides[activeSlide].image})`
                                    }}
                                />

                                <div className="hero__text">
                                    <h1>{slides[activeSlide].title}</h1>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                    </div>
                </div>
            </div>
        </header>
    )
}
