// frontend/src/carrito/carrito.types.ts
export interface ItemCarrito {
  productoId: string
  nombre: string
  precio: number
  cantidad: number
}

export type ProductoCarrito = Omit<ItemCarrito, 'cantidad'>

export type AccionCarrito =
  | { tipo: 'sumar'; producto: ProductoCarrito }
  | { tipo: 'restar'; productoId: string }
  | { tipo: 'quitar'; productoId: string }
  | { tipo: 'vaciar' }