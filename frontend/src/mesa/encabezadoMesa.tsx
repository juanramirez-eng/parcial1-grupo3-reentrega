export function EncabezadoMesa({ mesa }: { mesa: number | null }) {
  return (
    <header>
      <h1>{mesa === null ? 'Mesa no identificada' : `Mesa ${mesa}`}</h1>
    </header>
  )
}