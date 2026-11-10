import { createContext, useContext, useReducer, type ReactNode } from 'react'
import { carritoReducer, subtotal } from './carritoReducer'
import type { ItemCarrito, ProductoCarrito } from './carrito.types'

interface ValorCarrito {
  items: ItemCarrito[]
  subtotal: number
  sumar: (producto: ProductoCarrito) => void
  restar: (productoId: string) => void
  quitar: (productoId: string) => void
  vaciar: () => void
}

const CartContext = createContext<ValorCarrito | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(carritoReducer, [])
  const valor: ValorCarrito = {
    items,
    subtotal: subtotal(items),
    sumar: (producto) => dispatch({ tipo: 'sumar', producto }),
    restar: (productoId) => dispatch({ tipo: 'restar', productoId }),
    quitar: (productoId) => dispatch({ tipo: 'quitar', productoId }),
    vaciar: () => dispatch({ tipo: 'vaciar' }),
  }
  return <CartContext.Provider value={valor}>{children}</CartContext.Provider>
}

export function useCart(): ValorCarrito {
  const contexto = useContext(CartContext)
  if (!contexto) throw new Error('useCart debe usarse dentro de CartProvider')
  return contexto
}