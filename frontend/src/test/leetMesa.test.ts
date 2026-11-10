import { describe, it, expect } from 'vitest'
import { leerMesa } from './leerMesa'

describe('leerMesa', () => {
  it('devuelve el numero de mesa del parametro ?mesa=', () => {
    expect(leerMesa('http://localhost:5173/?mesa=5')).toBe(5)
  })
})