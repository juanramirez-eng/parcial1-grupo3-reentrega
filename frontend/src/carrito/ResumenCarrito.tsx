import { useCart } from "./CartContext";

interface ResumenCarritoProps {
  onConfirmar: () => void;
}

export function ResumenCarrito({ onConfirmar }: ResumenCarritoProps) {
  const { items, subtotal } = useCart();

  if (items.length === 0) {
    return null;
  }

  return (
    <section aria-label="Carrito" className="container py-3">
      <h2 className="h4">Tu pedido</h2>

      <ul>
        {items.map((item) => (
          <li key={item.productoId}>
            {item.nombre} x {item.cantidad}
          </li>
        ))}
      </ul>

      <p>
        Subtotal estimado: ${subtotal}
      </p>

      <button
        type="button"
        className="btn btn-primary"
        onClick={onConfirmar}
      >
        Confirmar pedido
      </button>
    </section>
  );
}