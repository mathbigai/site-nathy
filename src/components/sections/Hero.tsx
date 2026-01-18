import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import ScrambledText from '../ui/ScrambledText'
import '../../styles/sections/hero.scss'

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end']
  })

  // progresso só vai de 0 → 1 (nunca volta)
  const progress = useTransform(scrollYProgress, [0, 0.7], [0, 1], {
    clamp: true
  })

  return (
    <section ref={sectionRef} className="hero-text-scroll">
      <div className="hero-text-scroll__sticky">
        <div className="hero-text-scroll__content">
          <h1>
            <ScrambledText
              text="Psicoterapia com acolhimento"
              progress={progress}
            />
          </h1>

          <p>
            <ScrambledText
              text="Um espaço seguro para escuta, cuidado e transformação emocional."
              progress={progress}
            />
          </p>
        </div>
      </div>
    </section>
  )
}
