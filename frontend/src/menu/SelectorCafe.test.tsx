import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SelectorCafe } from './SelectorCafe'
import { MENU } from '../test/fixtures'

function renderizarSelector() {
    const onAgregar = vi.fn()
    render(<SelectorCafe productos={MENU} onAgregar={onAgregar} />)
    return { onAgregar, user: userEvent.setup() }
}

describe('SelectorCafe', () => {
    it('muestra la descripcion de cada origen', () => {
        renderizarSelector()
        expect(screen.getByText('Acidez media, cuerpo equilibrado y notas cítricas y florales')).toBeInTheDocument()
        expect(screen.getByText('Acidez muy viva, cuerpo ligero y notas frutales')).toBeInTheDocument()
        expect(screen.getByText('Acidez baja, cuerpo denso y notas de avellana')).toBeInTheDocument()
    })

    it('tiene el boton de agregar deshabilitado al empezar', () => {
        renderizarSelector()
        expect(screen.getByRole('button', { name: /agregar al carrito/i })).toBeDisabled()
    })

    it('habilita el boton recien cuando se completan las tres elecciones', async () => {
        const { user } = renderizarSelector()
        const boton = screen.getByRole('button', { name: /agregar al carrito/i })

        await user.click(screen.getByRole('radio', { name: 'Expreso' }))
        expect(boton).toBeDisabled()

        await user.click(screen.getByRole('radio', { name: 'Mediano' }))
        expect(boton).toBeDisabled()

        await user.click(screen.getByRole('radio', { name: /colombia/i }))
        expect(boton).toBeEnabled()
    })
})