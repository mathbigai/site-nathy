import { useEffect, useState } from 'react'

type ScrollHintProps = {
    footerSelector?: string
}

export default function ScrollHint({ footerSelector = 'footer' }: ScrollHintProps) {
    const [isAtBottom, setIsAtBottom] = useState(false)
    const [bottomPx, setBottomPx] = useState(16) // base (vai somar safe-area no CSS)

    useEffect(() => {
        const BASE = 16 // precisa bater com seu SCSS (bottom base)
        const GAP = -60  // “respiro” acima do footer
        const HINT_H = 44 // altura do botão

        function update() {
            // 1) direção no fim da página
            const scrollY = window.scrollY
            const windowH = window.innerHeight
            const docH = document.documentElement.scrollHeight
            setIsAtBottom(scrollY + windowH >= docH - 40)

            // 2) não sobrepor o footer
            const footer = document.querySelector(footerSelector) as HTMLElement | null
            if (!footer) {
                setBottomPx(BASE)
                return
            }

            const footerRect = footer.getBoundingClientRect()
            // quando o topo do footer entra na “zona” perto do bottom,
            // a setinha precisa subir a diferença.
            const limit = windowH - (BASE + HINT_H + GAP)

            if (footerRect.top < limit) {
                const overlap = limit - footerRect.top
                setBottomPx(BASE + overlap)
            } else {
                setBottomPx(BASE)
            }
        }

        window.addEventListener('scroll', update, { passive: true })
        window.addEventListener('resize', update)
        update()

        return () => {
            window.removeEventListener('scroll', update)
            window.removeEventListener('resize', update)
        }
    }, [footerSelector])

    return (
        <div
            className={`scroll-hint ${isAtBottom ? 'scroll-hint--up' : ''}`}
            aria-hidden="true"
            style={{ ['--scroll-hint-bottom' as any]: `${bottomPx}px` }}
        >
            <svg className="scroll-hint__icon" viewBox="0 0 24 24" width="22" height="22">
                <path
                    d="M6 9l6 6 6-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    )
}
