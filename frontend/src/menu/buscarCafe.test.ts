import { describe, it, expect } from 'vitest'
import { buscarCafe } from './buscarCafe'
import { MENU } from '../test/fixtures'

describe('buscarCafe', () => {
    it('encuentra el expreso mediano de Colombia', () => {
        const cafe = buscarCafe(MENU, { bebida: 'expreso', tamano: 'mediano', origen: 'Colombia' })
        expect(cafe?.id).toBe('5')
        expect(cafe?.precio).toBe(7360)
    })

    it('distingue la bebida: filtrado mediano de Colombia', () => {
        const cafe = buscarCafe(MENU, { bebida: 'filtrado', tamano: 'mediano', origen: 'Colombia' })
        expect(cafe?.id).toBe('14')
        expect(cafe?.precio).toBe(5900)
    })

    it('distingue el origen: expreso mediano de Etiopia', () => {
        const cafe = buscarCafe(MENU, { bebida: 'expreso', tamano: 'mediano', origen: 'Etiopia' })
        expect(cafe?.id).toBe('6')
    })

    it('devuelve undefined si no hay un cafe con esa combinacion', () => {
        const cafe = buscarCafe(MENU, { bebida: 'expreso', tamano: 'pocillo', origen: 'Colombia' })
        expect(cafe).toBeUndefined()
    })

    it('devuelve undefined con un menu vacio', () => {
        const cafe = buscarCafe([], { bebida: 'expreso', tamano: 'mediano', origen: 'Colombia' })
        expect(cafe).toBeUndefined()
    })

    it('ignora la pasteleria', () => {
        const soloPasteleria = MENU.filter((p) => p.tipo === 'pasteleria')
        const cafe = buscarCafe(soloPasteleria, { bebida: 'expreso', tamano: 'mediano', origen: 'Colombia' })
        expect(cafe).toBeUndefined()
    })
})