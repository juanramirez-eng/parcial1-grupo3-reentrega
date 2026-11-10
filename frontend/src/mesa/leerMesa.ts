export function leerMesa(url: string): number | null {
  const valor = new URL(url).searchParams.get('mesa')
  if (valor === null) return null
  const numero = Number(valor)
  return Number.isInteger(numero) && numero > 0 ? numero : null
}