import type { AccionCarrito, ItemCarrito } from './carrito.types'

export function carritoReducer(items: ItemCarrito[], accion: AccionCarrito): ItemCarrito[] {
  switch (accion.tipo) {
    case 'sumar':
      return [...items, { ...accion.producto, cantidad: 1 }]
    default:
      return items
  }
}