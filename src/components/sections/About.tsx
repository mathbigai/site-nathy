import { motion } from 'framer-motion'
import '../../styles/sections/about.scss'

import photoFace from '../../assets/images/about/photo-face.png'
import photoFull from '../../assets/images/about/photo-full.jpg'

export default function About() {
  return (
    <section id="sobre" className="about">
      <div className="about__wrap">
        <motion.div
          className="about__notebook"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* capa/mesa */}
          <div className="about__desk" aria-hidden />

          {/* miolo */}
          <div className="about__spread">
            {/* SPINE */}
            <div className="about__spine" aria-hidden />

            {/* PÁGINA 1 */}
            <article className="about__page about__page--left">
              <div className="about__paper">
                {/* margem + linhas */}
                <div className="about__margin" aria-hidden />
                <div className="about__rules" aria-hidden />

                {/* FOTO COM CLIPE (só nela) */}
                <div className="about__photoWrap">
                  <div className="about__photo">
                    <img src={photoFace} alt="Nathalia Bigai" />
                  </div>
                  <i className="about__clip" aria-hidden />
                </div>

                {/* DADOS ABAIXO */}
                <div className="about__identity">
                  <h2 className="about__name">Nathalia Bigai</h2>
                  <p className="about__role">Psicóloga Clínica</p>

                  <dl className="about__meta">
                    <div className="about__metaRow">
                      <dt>CRP</dt>
                      <dd>18/06203</dd>
                    </div>

                    <div className="about__metaRow">
                      <dt>Atendimentos</dt>
                      <dd>Online e presencial</dd>
                    </div>

                    <div className="about__metaRow">
                      <dt>Foco</dt>
                      <dd>Acolhimento, escuta e construção de sentido</dd>
                    </div>
                  </dl>
                </div>

                {/* TEXTO “na linha” */}
                <div className="about__notes">
                  <p>
                    Sou a Nathalia, psicóloga pós-graduada em
                    Neuropsicologia, e atuo com neurodiversidades
                    desde 2021.
                  </p>

                  <p>
                    Meu trabalho é pautado no acolhimento, no
                    respeito à singularidade de cada pessoa e na
                    construção de um espaço seguro, onde você
                    possa se sentir à vontade para ser quem é.
                  </p>

                  <p className="about__soft">
                    Sem receitas prontas. Com presença, cuidado e honestidade.
                  </p>
                </div>
              </div>
            </article>

            {/* PÁGINA 2 */}
            <article className="about__page about__page--right">
              <div className="about__paper">
                <div className="about__margin" aria-hidden />
                <div className="about__rules" aria-hidden />

                <header className="about__header">
                  <h3>Abordagem ACT (Aceitação e Compromisso)</h3>
                  <p>
                    De forma simples, a ACT convida você a olhar para pensamentos e emoções sem a pressão
                    de “consertar” tudo o tempo todo — com mais gentileza e presença.
                  </p>
                </header>

                <ul className="about__bullets">
                  <li>Acolher o que você sente, sem brigar com isso</li>
                  <li>Entender que nem tudo está sob nosso controle (e tudo bem)</li>
                  <li>Criar uma relação mais saudável com pensamentos e emoções</li>
                  <li>Agir com compromisso com o que importa pra você: seus valores e sua vida</li>
                </ul>

                <div className="about__snapshot">
                  <span className="about__tape about__tape--a" aria-hidden />
                  <span className="about__tape about__tape--b" aria-hidden />
                  <img src={photoFull} alt="Nathalia Bigai em um ambiente acolhedor" />
                </div>

                <div className="about__cta">
                  <p className="about__ctaText">
                    Se isso ressoou com você, talvez seja um bom começo.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
