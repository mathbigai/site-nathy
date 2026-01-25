import { useEffect, useRef, useState } from 'react'
import { InstagramEmbed } from 'react-social-media-embed'
import '../../styles/sections/instagram_timeline.scss'

const posts = [
    { url: 'https://www.instagram.com/reel/DTNWzzDD1wB/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', label: 'Post 1' },
    { url: 'https://www.instagram.com/p/DTSgaPCD3w-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', label: 'Post 2' },
    { url: 'https://www.instagram.com/reel/DTAt72IDjgo/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==', label: 'Post 3' }
]

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
            <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.8-.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
        </svg>
    )
}

function useInView<T extends HTMLElement>(rootMargin = '200px') {
    const ref = useRef<T | null>(null)
    const [inView, setInView] = useState(false)



    useEffect(() => {
        const el = ref.current
        if (!el) return

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                    io.disconnect()
                }
            },
            { rootMargin }
        )

        io.observe(el)
        return () => io.disconnect()
    }, [rootMargin])

    return { ref, inView }
}

export default function InstagramTimeline() {
    const { ref, inView } = useInView<HTMLDivElement>('250px')

    return (
        <section className="igTL" aria-label="Últimas novidades do Instagram" id="timeline">
            <div className="igTL__container" ref={ref}>
                <header className="igTL__header">
                    <h2 className="igTL__title">Últimos conteúdos no Instagram</h2>
                    <p className="igTL__subtitle">
                        Um resumo rápido — se algum post te ajudar, você pode abrir no Instagram e salvar.
                    </p>
                </header>

                <ol className="igTL__list">
                    {posts.map((p) => (
                        <li className="igTL__item" key={p.url}>
                            <div className="igTL__card">
                                {!inView ? (
                                    <div className="igTL__placeholder">
                                        Carregando post…
                                    </div>
                                ) : (
                                    <div className="igTL__embedWrap">
                                        <InstagramEmbed
                                            url={p.url}
                                            width={328}
                                        />
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ol>
                <a
                    className="igTL__icon-link igTL__icon-link--desktop"
                    href="https://www.instagram.com/psi.nathaliabigai?igsh=bDM3Z2kxMDlrc2Zl"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Abrir Instagram"
                    title="Instagram"
                >
                    Ver mais no Instagram
                    <InstagramIcon className="igTL__icon" />
                </a>
            </div>
        </section>
    )
}
