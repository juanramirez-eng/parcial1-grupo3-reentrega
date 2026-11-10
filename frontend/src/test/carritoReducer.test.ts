import { describe, it, expect } from 'vitest'
import { carritoReducer } from '../carrito/carritoReducer'
import type { ItemCarrito, ProductoCarrito } from '../carrito/carrito.types'

const cafe: ProductoCarrito = { productoId: '1', nombre: 'Expreso', precio: 1500 }
const medialuna: ProductoCarrito = { productoId: '2', nombre: 'Medialuna', precio: 800 }

describe('carritoReducer', () => {
  it('sumar agrega un producto nuevo con cantidad 1', () => {
    const resultado = carritoReducer([], { tipo: 'sumar', producto: cafe })
    expect(resultado).toEqual([{ ...cafe, cantidad: 1 }])
  })

  it('sumar un producto existente incrementa la cantidad sin mutar el estado', () => {
    const estado: ItemCarrito[] = [{ ...cafe, cantidad: 1 }]
    const resultado = carritoReducer(estado, { tipo: 'sumar', producto: cafe })
    expect(resultado).toEqual([{ ...cafe, cantidad: 2 }])
    expect(estado).toEqual([{ ...cafe, cantidad: 1 }]) // reducer puro
  })
    it('restar decrementa la cantidad', () => {
    const resultado = carritoReducer([{ ...cafe, cantidad: 2 }], { tipo: 'restar', productoId: '1' })
    expect(resultado).toEqual([{ ...cafe, cantidad: 1 }])
  })

  it('restar elimina el item cuando la cantidad llega a 0', () => {
    const resultado = carritoReducer([{ ...cafe, cantidad: 1 }], { tipo: 'restar', productoId: '1' })
    expect(resultado).toEqual([])
  })
})
