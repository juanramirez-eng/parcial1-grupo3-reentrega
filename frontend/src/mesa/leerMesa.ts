export function leerMesa(url: string): number | null {
  return Number(new URL(url).searchParams.get('mesa'))
}