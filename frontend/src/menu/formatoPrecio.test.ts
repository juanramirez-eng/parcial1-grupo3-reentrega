import { describe, it, expect } from 'vitest'
import { formatoPrecio } from './formatoPrecio'

describe('formatoPrecio', () => {
    it.each<[number, string]>([
        [0, '$0'],
        [950, '$950'],
        [2500, '$2.500'],
        [7360, '$7.360'],
        [11140, '$11.140'],
        [1234567, '$1.234.567'],
    ])('%i se muestra como %s', (precio, esperado) => {
        expect(formatoPrecio(precio)).toBe(esperado)
    })
})