export function formatearPrecio(valor: number): string {
    return `$${valor.toLocaleString("es-AR")}`;
}