import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EncabezadoMesa } from '../mesa/EncabezadoMesa'

describe('EncabezadoMesa', () => {
  it('muestra el numero de mesa', () => {
    render(<EncabezadoMesa mesa={5} />)
    expect(screen.getByRole('heading', { name: 'Mesa 5' })).toBeInTheDocument()
  })

  it('avisa si no se identifico la mesa', () => {
    render(<EncabezadoMesa mesa={null} />)
    expect(screen.getByRole('heading', { name: 'Mesa no identificada' })).toBeInTheDocument()
  })
})