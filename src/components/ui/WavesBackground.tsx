import { useEffect, useRef } from 'react'

type Splash = {
  x: number
  y: number
  radius: number
  life: number
}

export default function WavesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')!
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const getThemeColors = () => {
      const isDark =
        document.documentElement.getAttribute('data-theme') === 'dark'

      return {
        wave: isDark
          ? 'rgba(180, 60, 60, 0.35)' // vermelho escuro (logo)
          : 'rgba(70, 160, 120, 0.35)', // verde calmo
        splash: isDark
          ? 'rgba(200, 80, 80, 0.4)'
          : 'rgba(120, 200, 170, 0.4)'
      }
    }

    const waves = Array.from({ length: 6 }, (_, i) => ({
      y: height * (0.3 + i * 0.1),
      amplitude: 14 + i * 6,
      speed: 0.00015 + i * 0.00005,
      phase: Math.random() * Math.PI * 2,
      lineWidth: i % 2 === 0 ? 2.2 : 1.1,
      opacity: 0.15 + i * 0.03
    }))

    let splashes: Splash[] = []

    function resize() {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resize)

    function maybeCreateSplash() {
      if (Math.random() < 0.015) {
        splashes.push({
          x: Math.random() * width,
          y: height * (0.35 + Math.random() * 0.35),
          radius: 1 + Math.random() * 2.5,
          life: 1
        })
      }
    }

    function draw(time: number) {
      ctx.clearRect(0, 0, width, height)

      const { wave, splash } = getThemeColors()

      /* ===== ONDAS ===== */
      waves.forEach(w => {
        ctx.beginPath()
        ctx.lineWidth = w.lineWidth
        ctx.strokeStyle = wave.replace(
          /[\d.]+\)$/g,
          `${w.opacity})`
        )

        for (let x = 0; x <= width; x += 10) {
          const y =
            w.y +
            Math.sin(x * 0.008 + time * w.speed + w.phase) *
              w.amplitude
          ctx.lineTo(x, y)
        }

        ctx.stroke()
      })

      /* ===== RESPINGOS ===== */
      maybeCreateSplash()

      splashes = splashes.filter(s => s.life > 0)

      splashes.forEach(s => {
        ctx.beginPath()
        ctx.fillStyle = splash.replace(
          /[\d.]+\)$/g,
          `${s.life * 0.5})`
        )
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
        ctx.fill()

        s.y -= 0.25
        s.life -= 0.012
      })

      requestAnimationFrame(draw)
    }

    requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero__waves" />
}
