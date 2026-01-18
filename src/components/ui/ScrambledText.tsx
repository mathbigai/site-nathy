import { MotionValue, useMotionValueEvent } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { scrambleChar } from '../../utils/scrambleWord'

interface ScrambledTextProps {
  text: string
  progress: MotionValue<number> // 0..1
}

/**
 * - Scramble NÃO acelera com scroll (chars não são gerados no render)
 * - Tick constante e orgânico (atualiza só parte das letras por vez)
 * - Letras fixam SOMENTE conforme o usuário desce
 * - Ao subir: não reembaralha (progress só cresce)
 */
export default function ScrambledText({ text, progress }: ScrambledTextProps) {
  const letters = useMemo(() => text.split(''), [text])

  // thresholds por letra (ordem aleatória de "fixar")
  const thresholds = useMemo(
    () =>
      letters.map((ch) =>
        ch === ' ' ? 2 : Math.random() * 0.75 + 0.12 // 12%..87%
      ),
    [letters]
  )

  // progresso travado (só cresce)
  const pRef = useRef(0)
  const maxP = useRef(0)

  // quais letras já fixaram
  const fixedRef = useRef<boolean[]>(letters.map((ch) => ch === ' '))

  // char atual exibido para cada posição (só muda no ticker)
  const currentRef = useRef<string[]>(
    letters.map((ch) => (ch === ' ' ? ' ' : scrambleChar(ch)))
  )

  // força re-render quando ticker / fixação muda
  const [, bump] = useState(0)

  // ✅ scroll só decide "fixou ou não", não gera novos chars
  useMotionValueEvent(progress, 'change', (v) => {
    if (v <= maxP.current) return
    maxP.current = v
    pRef.current = v

    let changed = false
    for (let i = 0; i < letters.length; i++) {
      if (!fixedRef.current[i] && v >= thresholds[i]) {
        fixedRef.current[i] = true
        currentRef.current[i] = letters[i] // fixa a letra real
        changed = true
      }
    }

    if (changed) bump((x) => x + 1)
  })

  useEffect(() => {
    let raf = 0
    let last = performance.now()

    // 🐢 velocidade base de troca (ms). Aumente para mais devagar.
    const BASE = 220

    // pra não ficar “travado”, adiciona uma variação pequena por tick
    const jitter = () => BASE + (Math.random() * 60 - 30) // +/- 30ms

    let next = last + jitter()

    const loop = (now: number) => {
      // roda sempre, mas só atualiza quando passa o tempo do tick
      if (now >= next) {
        next = now + jitter()

        // ✅ atualiza só uma parte das letras por tick (orgânico)
        // quanto menor esse ratio, mais suave e menos "flash"
        const ratio = 0.35

        let changed = false
        for (let i = 0; i < letters.length; i++) {
          if (fixedRef.current[i]) continue
          if (letters[i] === ' ') continue

          // só algumas letras mudam por tick
          if (Math.random() < ratio) {
            const prev = currentRef.current[i]
            const nextChar = scrambleChar(letters[i], prev) // evita repetir
            currentRef.current[i] = nextChar
            changed = true
          }
        }

        if (changed) bump((x) => x + 1)
      }

      last = now
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [letters, thresholds])

  return (
    <span aria-label={text}>
      {letters.map((ch, i) => {
        if (ch === ' ') return <span key={i}>&nbsp;</span>

        return (
          <span key={i} style={{ display: 'inline-block' }}>
            {fixedRef.current[i] ? ch : currentRef.current[i]}
          </span>
        )
      })}
    </span>
  )
}
