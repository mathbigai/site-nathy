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
  const progress = useTransform(scrollYProgress, [0, 0.95], [0, 1], {
    clamp: true
  })

  return (
    <section ref={sectionRef} className="hero-text-scroll">
      <div className="hero-text-scroll__sticky">
        <div className="hero-text-scroll__content">
          <h1>
            <ScrambledText
              text="Você se sente um estranho no mundo?"
              progress={progress}
            />
          </h1>

          <p>
            <ScrambledText
              text="Talvez você não esteja errado, apenas esteja tentando se encaixar da forma como os outros esperam e não como você realmente é."
              progress={progress}
            />
          </p>
          <p>
            <ScrambledText
              text="A terapia pode ser um espaço onde existir tenha menos peso, onde você não precise se explicar o tempo todo e possa, aos poucos, se sentir em casa dentro de si."
              progress={progress}
            />
          </p>
        </div>
      </div>
    </section>
  )
}
