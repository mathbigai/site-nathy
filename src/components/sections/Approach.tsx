import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaComments, FaPuzzlePiece, FaHandsHelping, FaWhatsapp } from 'react-icons/fa'
import '../../styles/sections/approach.scss'
import WavesBackground from '../ui/WavesBackground'

type Step = {
  id: number
  title: [string, string]
  icon: React.ComponentType<{ className?: string }>
  summary: string
  details: string[]
}

const steps: Step[] = [
  {
    id: 1,
    title: ['Como conduzo', 'os atendimentos'],
    icon: FaComments,
    summary:
      'Sessões dinâmicas, com diálogo e construção conjunta, para você sair mais leve, com clareza e esperança.',
    details: [
      'Eu participo ativamente da sessão: não é um monólogo, a gente constrói junto.',
      'Uso recursos (jogos, dinâmicas, livros, filmes e outros materiais) para acessar suas questões de um jeito mais leve e possível.',
      'Quando surgem reflexões mais duras, eu te ajudo a atravessar com cuidado e sem pressa, mas isso não é a regra do processo.',
      'Você tem liberdade para se expressar do seu jeito: falar, digitar, ficar em silêncio ou até manter pouca luz, tudo é válido.'
    ]
  },
  {
    id: 2,
    title: ['Dinâmica das', 'sessões'],
    icon: FaPuzzlePiece,
    summary:
      'A primeira sessão é anamnese. Depois, construímos um plano terapêutico flexível e ajustável ao longo do processo.',
    details: [
      'Na primeira sessão, eu conheço sua história, seu contexto e principalmente suas queixas.',
      'A partir disso, eu proponho um plano terapêutico que vai sendo ajustado conforme suas necessidades e seu momento de vida.',
      'Se houver neurodivergência, antes do plano a gente entende quais sinais pesam mais no dia a dia e como você se autorregula.',
      'Depois, fazemos um inventário: identificamos sinais, gatilhos, o que mais incomoda e o que você já faz hoje para lidar, e aí sim definimos o caminho.'
    ]
  },
  {
    id: 3,
    title: ['Trabalho', 'multidisciplinar'],
    icon: FaHandsHelping,
    summary:
      'Quando necessário, sugiro encaminhamentos, cuidado em conjunto costuma fazer muita diferença.',
    details: [
      'Se eu perceber que outro profissional pode contribuir, eu vou sugerir encaminhamento (combinado com você).',
      'Em muitos casos, a soma de cuidados traz mais estabilidade e acelera ganhos importantes do processo.'
    ]
  },
  {
    id: 4,
    title: ['Disponibilidade e', 'comunicação'],
    icon: FaWhatsapp,
    summary:
      'Também existe suporte fora da sessão, com alinhamentos claros e uma comunicação acessível.',
    details: [
      'Além das sessões, você pode me chamar pelo WhatsApp, seja num momento de crise, seja para compartilhar algo do dia a dia que a gente leve para a terapia.',
      'Eu busco ser previsível e alinhar com antecedência tudo que der. Tenho um filho pequeno e, eventualmente, pode surgir um imprevisto ou algum atraso por uma demanda urgente dele.'
    ]
  }
] as const

function StepTitle({ title }: { title: [string, string] }) {
  return (
    <span>
      {title[0]}
      <br />
      {title[1]}
    </span>
  )
}

export default function Approach() {
  const [open, setOpen] = useState<Record<number, boolean>>({})

  function toggle(id: number) {
    setOpen(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section id="approach" className="approach">
      <div className="approach__container">
        <header className="approach__header">
          <h2 className="approach__title">Um processo claro, humano e no seu ritmo</h2>
          <p className="approach__subtitle">
            Um resumo por etapa e, se quiser, abra os detalhes.
          </p>
        </header>

        <div className="approach__timeline">
          <div className="approach__center" aria-hidden="true">
            <div className="approach__waves-vertical">
              <div className="approach__waves-stretch">
                <div className="approach__waves-rotate">
                  <WavesBackground />
                </div>
              </div>

              <div className="approach__splashes">
                {Array.from({ length: 18 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="approach__splash"
                    initial={{ opacity: 0.12, y: 0, scale: 0.9 }}
                    animate={{
                      opacity: [0.12, 0.28, 0.12],
                      y: [0, -8, 0],
                      scale: [0.9, 1.06, 0.9]
                    }}
                    transition={{
                      duration: 4 + (i % 4),
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.12
                    }}
                    style={{
                      top: `${4 + i * 5.2}%`,
                      left: `${35 + (i % 4) * 10}%`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <ol className="approach__list">
            {steps.map((step, index) => {
              const side = index % 2 === 0 ? 'right' : 'left'
              const Icon = step.icon
              const isOpen = !!open[step.id]

              return (
                <li key={step.id} className={`approach__item approach__item--${side}`}>
                  <div className="approach__pin" aria-hidden="true">
                    <span className="approach__icon">
                      <Icon className="approach__icon-svg" />
                    </span>
                  </div>

                  <motion.article
                    className={`approach__card ${isOpen ? 'is-open' : ''}`}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  >
                    <h3 className="approach__card-title">
                      <StepTitle title={step.title} />
                    </h3>

                    <p className="approach__summary">{step.summary}</p>

                    <button
                      type="button"
                      className="approach__toggle"
                      onClick={() => toggle(step.id)}
                      aria-expanded={isOpen}
                      aria-controls={`approach-details-${step.id}`}
                    >
                      {isOpen ? 'Mostrar menos' : 'Ler mais'}
                    </button>

                    <motion.div
                      id={`approach-details-${step.id}`}
                      className="approach__details"
                      initial={false}
                      animate={isOpen ? 'open' : 'closed'}
                      variants={{
                        open: { height: 'auto', opacity: 1 },
                        closed: { height: 0, opacity: 0 }
                      }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                      <div className="approach__details-inner">
                        {step.details.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>
                    </motion.div>
                  </motion.article>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
