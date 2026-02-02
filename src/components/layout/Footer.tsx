import "../../styles/layout/footer.scss"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* BLOCO 1 — IDENTIDADE */}
        <div className="footer__brand">
          <p className="footer__name">Nathalia Bigai</p>
          <p className="footer__role">Psicóloga Clínica</p>
          <p className="footer__crp">CRP 18/06203</p>
        </div>

        {/* BLOCO 2 — CONTATO */}
        <div className="footer__contact">
          <p className="footer__title">Contato</p>

          <a
            href="mailto:nathaliabfnunes.psi@gmail.com"
            className="footer__link"
          >
            nathaliabfnunes.psi@gmail.com
          </a>

          <a
            href="https://wa.me/5565996196457"
            target="_blank"
            rel="noreferrer"
            className="footer__link"
          >
            WhatsApp: (65) 9 9619-6457
          </a>
        </div>

        {/* BLOCO 3 — INFORMAÇÕES */}
        <div className="footer__info">
          <p className="footer__title">Atendimento</p>
          <p>Online e presencial</p>
          <p>Sessões com horário agendado</p>
        </div>
      </div>

      {/* BARRA FINAL */}
      <div className="footer__bottom">
        <p>
          © {new Date().getFullYear()} Nathalia Bigai · Todos os direitos reservados
        </p>

        <p className="footer__dev">
          Site desenvolvido por{' '}
          <a
            href="https://issidiostecnologia.com.br"
            target="_blank"
            rel="noreferrer"
          >
            Issidios Tecnologia
          </a>
        </p>
      </div>
    </footer>
  )
}
