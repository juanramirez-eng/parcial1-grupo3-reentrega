
import { useCart } from "../carrito/CartContext";

export default function ConfirmarPedido() {
  const { items, subtotal } = useCart();

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
    </section>
  );
}
