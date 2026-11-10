
import { useState } from "react";
import { useCart } from "../carrito/CartContext";
import { crearPedido, type Pedido } from "../services/apiClient";
import { leerMesa } from "../mesa/leerMesa";

export default function ConfirmarPedido() {
  const { items, subtotal, vaciar } = useCart();

  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function handleConfirmar() {
    setCargando(true);
    setError("");

    try {
      const mesaId = leerMesa(window.location.href);

      const respuesta = await crearPedido({
        mesaId,
        items: items.map((item) => ({
          productoId: item.productoId,
          cantidad: item.cantidad,
        })),
      });

      setPedido(respuesta);
      vaciar();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo confirmar el pedido"
      );
    } finally {
      setCargando(false);
    }
  }

  if (pedido) {
    return (
      <section>
        <h2>¡Pedido confirmado!</h2>

        <p>Número de pedido: {pedido.id}</p>
        <p>Estado: {pedido.estado}</p>
        <p>
          Total: ${pedido.total.toLocaleString("es-AR")}
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2>Resumen del pedido</h2>

      {items.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.productoId}>
              <p>{item.nombre}</p>
              <p>{item.cantidad}</p>
              <p>
                ${(item.precio * item.cantidad).toLocaleString("es-AR")}
              </p>
            </li>
          ))}
        </ul>
      )}

      <p>
        Subtotal: ${subtotal.toLocaleString("es-AR")}
      </p>

      {error && <p role="alert">{error}</p>}

      {items.length > 0 && (
        <button
          type="button"
          onClick={handleConfirmar}
          disabled={cargando}
        >
          {cargando ? "Enviando pedido..." : "Confirmar pedido"}
        </button>
      )}
    </section>
  );
}
