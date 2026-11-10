import { useState } from "react";
import { CartProvider, useCart } from "./carrito/CartContext";
import { ResumenCarrito } from "./carrito/ResumenCarrito";
import { EncabezadoMesa } from "./mesa/EncabezadoMesa";
import { leerMesa } from "./mesa/leerMesa";
import { Menu } from "./components/Menu";
import type { Producto } from "./schemas/producto.schema";
import type { Pedido } from "./schemas/pedido.schema";
import {
  crearPedido,
  fetchPedido,
} from "./services/apiClient";

function ContenidoApp() {
  const mesa = leerMesa(window.location.href);
  const { items, sumar, vaciar } = useCart();

  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [error, setError] = useState<string | null>(null);

  function agregarProducto(producto: Producto) {
    sumar({
      productoId: String(producto.id),
      nombre: producto.nombre,
      precio: producto.precio,
    });
  }

  async function confirmarPedido() {
    setError(null);

    try {
      const creado = await crearPedido({
        mesaId: mesa,
        items: items.map((item) => ({
          productoId: item.productoId,
          cantidad: item.cantidad,
        })),
      });

      const actualizado = await fetchPedido(creado.id);

      setPedido(actualizado);
      vaciar();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo crear el pedido",
      );
    }
  }

  return (
    <>
      <EncabezadoMesa mesa={mesa} />

      <Menu onSeleccionarProducto={agregarProducto} />

      <ResumenCarrito onConfirmar={confirmarPedido} />

      {error && (
        <div role="alert">
          {error}
        </div>
      )}

      {pedido && (
        <section aria-label="Pedido confirmado">
          <h2>Pedido #{pedido.id}</h2>
          <p>Estado: {pedido.estado}</p>
          <p>Total: ${pedido.total}</p>
        </section>
      )}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <ContenidoApp />
    </CartProvider>
  );
}

export default App;