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

    it('no muestra precios hasta elegir bebida y tamano', async () => {
        const { user } = renderizarSelector()
        expect(screen.queryByText(/\$\d/)).not.toBeInTheDocument()

        await user.click(screen.getByRole('radio', { name: 'Expreso' }))
        expect(screen.queryByText(/\$\d/)).not.toBeInTheDocument()
    })

    it('muestra el precio de cada origen al elegir bebida y tamano', async () => {
        const { user } = renderizarSelector()
        await user.click(screen.getByRole('radio', { name: 'Expreso' }))
        await user.click(screen.getByRole('radio', { name: 'Mediano' }))

        expect(screen.getByText('$6.280')).toBeInTheDocument()
        expect(screen.getByText('$7.360')).toBeInTheDocument()
        expect(screen.getByText('$8.980')).toBeInTheDocument()
    })

    it('actualiza los precios al cambiar la bebida', async () => {
        const { user } = renderizarSelector()
        await user.click(screen.getByRole('radio', { name: 'Expreso' }))
        await user.click(screen.getByRole('radio', { name: 'Mediano' }))
        await user.click(screen.getByRole('radio', { name: 'Filtrado' }))

        expect(screen.getByText('$5.300')).toBeInTheDocument()
        expect(screen.getByText('$5.900')).toBeInTheDocument()
        expect(screen.getByText('$6.800')).toBeInTheDocument()
        expect(screen.queryByText('$7.360')).not.toBeInTheDocument()
    })

    it('llama a onAgregar con el cafe elegido', async () => {
        const { user, onAgregar } = renderizarSelector()
        await user.click(screen.getByRole('radio', { name: 'Expreso' }))
        await user.click(screen.getByRole('radio', { name: 'Mediano' }))
        await user.click(screen.getByRole('radio', { name: /colombia/i }))
        await user.click(screen.getByRole('button', { name: /agregar al carrito/i }))

        expect(onAgregar).toHaveBeenCalledTimes(1)
        expect(onAgregar).toHaveBeenCalledWith(expect.objectContaining({ id: '5', precio: 7360 }))
    })
})