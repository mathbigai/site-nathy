import { MotionValue, useMotionValueEvent } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { scrambleChar } from '../../utils/scrambleWord'

interface ScrambledTextProps {
  text: string
  progress: MotionValue<number> // 0..1
}

export default function ScrambledText({ text, progress }: ScrambledTextProps) {
  const [p, setP] = useState(0)
  const maxP = useRef(0)

  // ticker só pro “tremor” (não acelera com scroll)
  const [, bump] = useState(0)

  // palavras (separador por espaço)
  const words = useMemo(() => text.split(' '), [text])

  // thresholds por letra, por palavra
  const model = useMemo(() => {
    return words.map((word) => {
      const chars = word.split('')
      const thresholds = chars.map(() => Math.random() * 0.7 + 0.12)
      return { chars, thresholds }
    })
  }, [words])

  // progress só cresce (não reembaralha ao subir)
  useMotionValueEvent(progress, 'change', (v) => {
    if (v <= maxP.current) return
    maxP.current = v
    setP(v)
  })

  // tremor lento e orgânico
  useEffect(() => {
    if (p >= 1) return
    const id = window.setInterval(() => bump((x) => x + 1), 240)
    return () => window.clearInterval(id)
  }, [p])

  return (
    <span className="scrambled-text" aria-label={text}>
      {model.map((w, wi) => {
        // se a palavra estiver vazia (vários espaços), respeita com espaço visível
        if (w.chars.length === 0) {
          return <span key={`empty-${wi}`}>&nbsp;</span>
        }

        return (
          <span key={`wrap-${wi}`}>
            <span className="scrambled-text__word">
              {w.chars.map((finalChar, ci) => {
                const fixed = p >= w.thresholds[ci]
                return (
                  <span key={`c-${wi}-${ci}`} className="scrambled-text__char">
                    {fixed ? finalChar : scrambleChar(finalChar)}
                  </span>
                )
              })}
            </span>

            {/* ✅ espaço fora do nowrap (permite quebra de linha entre palavras) */}
            {wi < model.length - 1 ? ' ' : null}
          </span>
        )
      })}
    </span>
  )
}
