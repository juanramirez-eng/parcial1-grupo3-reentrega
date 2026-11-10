import { useState } from "react";
import { CartProvider, useCart } from "./carrito/CartContext";
import { ResumenCarrito } from "./carrito/ResumenCarrito";
import { EncabezadoMesa } from "./mesa/EncabezadoMesa";
import { leerMesa } from "./mesa/leerMesa";
import { Menu } from "./components/Menu";
import type { Producto } from "./schemas/producto.schema";
import type { Pedido } from "./schemas/pedido.schema";
import { crearPedido, fetchPedido } from "./services/apiClient";

function ContenidoApp() {
  const mesa = leerMesa(window.location.href);
  const { items, sumar, vaciar } = useCart();

  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmando, setConfirmando] = useState(false);

  function agregarProducto(producto: Producto) {
    sumar({
      productoId: String(producto.id),
      nombre: producto.nombre,
      precio: producto.precio,
    });

    setPedido(null);
    setError(null);
  }

  async function confirmarPedido() {
    if (items.length === 0 || confirmando) {
      return;
    }

    setError(null);
    setConfirmando(true);

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
          : "No se pudo confirmar el pedido.",
      );
    } finally {
      setConfirmando(false);
    }
  }

  return (
    <div className="app-shell">
      <EncabezadoMesa mesa={mesa} />

      <main className="app-main">
        <Menu onSeleccionarProducto={agregarProducto} />

        <ResumenCarrito onConfirmar={confirmarPedido} />

        {confirmando && (
          <section
            className="container pb-4"
            aria-live="polite"
          >
            <div className="status-card status-card--loading">
              <div
                className="spinner-border spinner-border-sm"
                role="status"
                aria-label="Confirmando pedido"
              />

              <div>
                <strong>Confirmando tu pedido</strong>
                <p className="mb-0">
                  Estamos enviando la información a la cafetería.
                </p>
              </div>
            </div>
          </section>
        )}

        {error && (
          <section className="container pb-4">
            <div
              className="status-card status-card--error"
              role="alert"
            >
              <div className="status-card__icon">
                !
              </div>

              <div>
                <strong>No pudimos confirmar el pedido</strong>

                <p className="mb-0">
                  {error}
                </p>

                <small className="status-card__help">
                  Tu carrito se mantiene para que puedas volver a intentar.
                </small>
              </div>
            </div>
          </section>
        )}

        {pedido && (
          <section
            className="container pb-5"
            aria-labelledby="pedido-confirmado-titulo"
          >
            <div className="order-success">
              <div className="order-success__icon">
                ✓
              </div>

              <div className="order-success__content">
                <span className="order-success__eyebrow">
                  Pedido recibido
                </span>

                <h2
                  id="pedido-confirmado-titulo"
                  className="order-success__title"
                >
                  Pedido #{pedido.id}
                </h2>

                <p className="order-success__message">
                  Tu pedido fue enviado correctamente.
                  Podés seguir su estado desde esta pantalla.
                </p>

                <div className="order-success__details">
                  <div className="order-detail">
                    <span className="order-detail__label">
                      Estado
                    </span>

                    <strong className="order-detail__value text-capitalize">
                      {pedido.estado}
                    </strong>
                  </div>

                  {pedido.mesaId !== null && (
                    <div className="order-detail">
                      <span className="order-detail__label">
                        Mesa
                      </span>

                      <strong className="order-detail__value">
                        {pedido.mesaId}
                      </strong>
                    </div>
                  )}

                  <div className="order-detail">
                    <span className="order-detail__label">
                      Total
                    </span>

                    <strong className="order-detail__value">
                      ${pedido.total.toLocaleString("es-AR")}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <span>Cafetería Origen</span>

          <span>
            Pedidos desde tu mesa
          </span>
        </div>
      </footer>
    </div>
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