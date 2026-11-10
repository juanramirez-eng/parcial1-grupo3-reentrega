import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MenuPasteleria } from './MenuPasteleria'
import { MENU } from '../test/fixtures'

describe('MenuPasteleria', () => {
    it('muestra cada producto de pasteleria con su precio', () => {
        render(<MenuPasteleria productos={MENU} onAgregar={vi.fn()} />)
        expect(screen.getByText('Muffin de chocolate')).toBeInTheDocument()
        expect(screen.getByText('$2.500')).toBeInTheDocument()
        expect(screen.getByText('Torta selva negra')).toBeInTheDocument()
        expect(screen.getByText('$4.200')).toBeInTheDocument()
    })

    it('no muestra los cafes', () => {
        render(<MenuPasteleria productos={MENU} onAgregar={vi.fn()} />)
        expect(screen.queryByText(/expreso/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/filtrado/i)).not.toBeInTheDocument()
    })

    it('tiene un boton para agregar cada producto', () => {
        render(<MenuPasteleria productos={MENU} onAgregar={vi.fn()} />)
        expect(screen.getByRole('button', { name: 'Agregar Muffin de chocolate' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'Agregar Torta selva negra' })).toBeInTheDocument()
    })

    it('llama a onAgregar con el producto elegido', async () => {
        const onAgregar = vi.fn()
        const user = userEvent.setup()
        render(<MenuPasteleria productos={MENU} onAgregar={onAgregar} />)

        await user.click(screen.getByRole('button', { name: 'Agregar Muffin de chocolate' }))

        expect(onAgregar).toHaveBeenCalledTimes(1)
        expect(onAgregar).toHaveBeenCalledWith(expect.objectContaining({ id: '19', precio: 2500 }))
    })
})