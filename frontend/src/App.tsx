// frontend/src/App.tsx (reemplaza el template de Vite)
import { CartProvider } from './carrito/CartContext'
import { EncabezadoMesa } from './mesa/EncabezadoMesa'
import { leerMesa } from './mesa/leerMesa'

function App() {
  const mesa = leerMesa(window.location.href)
  return (
    <CartProvider>
      <EncabezadoMesa mesa={mesa} />
    </CartProvider>
  )
}

export default App