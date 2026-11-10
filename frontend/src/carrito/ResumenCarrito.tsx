import { useCart } from "./CartContext";

interface ResumenCarritoProps {
  onConfirmar: () => void;
}

export function ResumenCarrito({
  onConfirmar,
}: ResumenCarritoProps) {
  const { items, subtotal, sumar, restar } = useCart();

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className="cart-section container pb-4 pb-md-5"
      aria-labelledby="titulo-carrito"
    >
      <div className="cart-card">
        <div className="cart-card__header">
          <div>
            <span className="cart-card__eyebrow">
              Tu selección
            </span>

            <h2
              id="titulo-carrito"
              className="cart-card__title"
            >
              Tu pedido
            </h2>
          </div>

          <span className="cart-card__count">
            {items.reduce(
              (total, item) => total + item.cantidad,
              0,
            )}{" "}
            productos
          </span>
        </div>

        <div className="cart-items">
          {items.map((item) => (
            <article
              key={item.productoId}
              className="cart-item"
            >
              <div className="cart-item__info">
                <h3 className="cart-item__name">
                  {item.nombre}
                </h3>

                <span className="cart-item__unit-price">
                  ${item.precio.toLocaleString("es-AR")} c/u
                </span>
              </div>

              <div className="cart-item__actions">
                <div
                  className="quantity-control"
                  aria-label={`Cantidad de ${item.nombre}`}
                >
                  <button
                    type="button"
                    className="quantity-control__button"
                    onClick={() => restar(item.productoId)}
                    aria-label={`Restar ${item.nombre}`}
                  >
                    −
                  </button>

                  <span className="quantity-control__value">
                    {item.cantidad}
                  </span>

                  <button
                    type="button"
                    className="quantity-control__button"
                    onClick={() =>
                      sumar({
                        productoId: item.productoId,
                        nombre: item.nombre,
                        precio: item.precio,
                      })
                    }
                    aria-label={`Sumar ${item.nombre}`}
                  >
                    +
                  </button>
                </div>

                <strong className="cart-item__total">
                  $
                  {(
                    item.precio * item.cantidad
                  ).toLocaleString("es-AR")}
                </strong>
              </div>
            </article>
          ))}
        </div>

        <div className="cart-card__summary">
          <div>
            <span className="cart-card__subtotal-label">
              Subtotal estimado
            </span>

            <p className="cart-card__note">
              El total definitivo lo calcula la API al confirmar.
            </p>
          </div>

          <strong className="cart-card__subtotal">
            ${subtotal.toLocaleString("es-AR")}
          </strong>
        </div>

        <button
          type="button"
          className="btn btn-primary cart-card__confirm"
          onClick={onConfirmar}
        >
          Confirmar pedido
        </button>
      </div>
    </section>
  );
}