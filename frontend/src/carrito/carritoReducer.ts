import type { AccionCarrito, ItemCarrito } from './carrito.types'

export function carritoReducer(items: ItemCarrito[], accion: AccionCarrito): ItemCarrito[] {
  switch (accion.tipo) {
    case 'sumar': {
      const existe = items.some((i) => i.productoId === accion.producto.productoId)
      if (!existe) return [...items, { ...accion.producto, cantidad: 1 }]
      return items.map((i) =>
        i.productoId === accion.producto.productoId ? { ...i, cantidad: i.cantidad + 1 } : i,
      )
    }
    case 'restar':
      return items
        .map((i) => (i.productoId === accion.productoId ? { ...i, cantidad: i.cantidad - 1 } : i))
        .filter((i) => i.cantidad > 0)
    case 'quitar':
      return items.filter((i) => i.productoId !== accion.productoId)
    case 'vaciar':
      return []
  }
}