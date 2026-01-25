export default function ScrollHint() {
  return (
    <div className="scroll-hint" aria-hidden="true">
      <svg
        className="scroll-hint__icon"
        viewBox="0 0 24 24"
        width="22"
        height="22"
      >
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
