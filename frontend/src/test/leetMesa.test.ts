import { describe, it, expect } from 'vitest'
import { leerMesa } from './leerMesa'

describe('leerMesa', () => {
  it('devuelve el numero de mesa del parametro ?mesa=', () => {
    expect(leerMesa('http://localhost:5173/?mesa=5')).toBe(5)
  })
    it('devuelve null si no hay parametro mesa', () => {
    expect(leerMesa('http://localhost:5173/')).toBeNull()
  })

  it.each(['abc', '0', '-1', '2.5', ''])('devuelve null si mesa es "%s"', (valor) => {
    expect(leerMesa(`http://localhost:5173/?mesa=${valor}`)).toBeNull()
  })
})