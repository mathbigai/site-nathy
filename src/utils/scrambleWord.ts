const chars = 'abcdefghijklmnopqrstuvwxyz'

export function scrambleChar(finalChar: string, prev?: string): string {
  if (!/[a-zA-Z]/.test(finalChar)) return finalChar

  const lower = finalChar.toLowerCase()

  let c = chars[Math.floor(Math.random() * chars.length)]

  // nunca vira a letra final e tenta não repetir a anterior
  while (c === lower || (prev && c === prev.toLowerCase())) {
    c = chars[Math.floor(Math.random() * chars.length)]
  }

  return finalChar === finalChar.toUpperCase()
    ? c.toUpperCase()
    : c
}
