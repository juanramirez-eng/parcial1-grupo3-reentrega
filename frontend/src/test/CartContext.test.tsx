import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartProvider, useCart } from './CartContext'

const cafe = { productoId: '1', nombre: 'Expreso', precio: 1500 }

function Prueba() {
  const { items, subtotal, sumar, restar, quitar, vaciar } = useCart()
  return (
    <div>
      <p>Subtotal: {subtotal}</p>
      <p>Items: {items.length}</p>
      <button onClick={() => sumar(cafe)}>sumar</button>
      <button onClick={() => restar('1')}>restar</button>
      <button onClick={() => quitar('1')}>quitar</button>
      <button onClick={() => vaciar()}>vaciar</button>
    </div>
  )
}

function renderConCarrito() {
  render(<CartProvider><Prueba /></CartProvider>)
  return userEvent.setup()
}

describe('CartContext', () => {
  it('empieza vacio', () => {
    renderConCarrito()
    expect(screen.getByText('Subtotal: 0')).toBeInTheDocument()
  })

  it('sumar y restar actualizan el subtotal', async () => {
    const user = renderConCarrito()
    await user.click(screen.getByText('sumar'))
    await user.click(screen.getByText('sumar'))
    expect(screen.getByText('Subtotal: 3000')).toBeInTheDocument()
    await user.click(screen.getByText('restar'))
    expect(screen.getByText('Subtotal: 1500')).toBeInTheDocument()
  })

  it('quitar y vaciar dejan el carrito vacio', async () => {
    const user = renderConCarrito()
    await user.click(screen.getByText('sumar'))
    await user.click(screen.getByText('quitar'))
    expect(screen.getByText('Items: 0')).toBeInTheDocument()
    await user.click(screen.getByText('sumar'))
    await user.click(screen.getByText('vaciar'))
    expect(screen.getByText('Items: 0')).toBeInTheDocument()
  })
})