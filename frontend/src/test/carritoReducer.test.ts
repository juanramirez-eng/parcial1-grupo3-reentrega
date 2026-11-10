import { describe, it, expect } from 'vitest'
import { carritoReducer } from '../carritoReducer'
import type { ItemCarrito, ProductoCarrito } from '../carrito.types'

const cafe: ProductoCarrito = { productoId: '1', nombre: 'Expreso', precio: 1500 }
const medialuna: ProductoCarrito = { productoId: '2', nombre: 'Medialuna', precio: 800 }

describe('carritoReducer', () => {
  it('sumar agrega un producto nuevo con cantidad 1', () => {
    const resultado = carritoReducer([], { tipo: 'sumar', producto: cafe })
    expect(resultado).toEqual([{ ...cafe, cantidad: 1 }])
  })
})