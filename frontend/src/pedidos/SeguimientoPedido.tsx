import { useState } from "react";
import { obtenerPedido, type Pedido } from "../services/apiClient";

interface SeguimientoPedidoProps {
  pedidoId: string;
}

export default function SeguimientoPedido({
  pedidoId,
}: SeguimientoPedidoProps) {
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  async function handleConsultar() {
    setCargando(true);
    setError("");

    try {
      const respuesta = await obtenerPedido(pedidoId);
      setPedido(respuesta);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo consultar el pedido"
      );
    } finally {
      setCargando(false);
    }
  }

  return (
    <section>
      <h3>Seguimiento del pedido</h3>

      <p>Pedido #{pedidoId}</p>

      <button
        type="button"
        onClick={handleConsultar}
        disabled={cargando}
      >
        {cargando ? "Consultando..." : "Consultar estado"}
      </button>

      {error && <p role="alert">{error}</p>}

      {pedido && (
        <div>
          <p>Estado: {pedido.estado}</p>
        </div>
      )}
    </section>
  );
}