export function formatoPrecio(precio: number): string {
    const entero = Math.round(precio).toString();
    return "$" + entero.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}