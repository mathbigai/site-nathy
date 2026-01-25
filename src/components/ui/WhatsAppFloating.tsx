import { FaWhatsapp } from "react-icons/fa"

type WhatsAppFloatingProps = {
  phone: string
  message?: string
}

export default function WhatsAppFloating({
  phone,
  message = 'Oi, vim pelo site da Nathalia e gostaria de saber como funciona o atendimento.'
}: WhatsAppFloatingProps) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Conversar pelo WhatsApp"
    >
      <FaWhatsapp />
    </a>
  )
}
