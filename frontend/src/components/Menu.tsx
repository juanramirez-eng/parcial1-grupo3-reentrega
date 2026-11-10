import { useMenu } from "../hooks/useMenu";
import { formatearPrecio } from "../utils/format";
import type { Producto } from "../schemas/producto.schema";

interface MenuProps {
  onSeleccionarProducto?: (producto: Producto) => void;
}

export function Menu({ onSeleccionarProducto }: MenuProps) {
  const { estado, reintentar } = useMenu();

  if (estado.estado === "cargando") {
    return (
      <div role="status" aria-live="polite" className="text-center p-4">
        <span className="spinner-border text-primary" aria-hidden="true" />
        <p className="mt-2">Cargando menú...</p>
      </div>
    );
  }

  if (estado.estado === "error") {
    return (
      <div role="alert" className="alert alert-danger m-3 text-center">
        <p>{estado.mensaje}</p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={reintentar}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <section aria-label="Menú de productos" className="container py-3">
      <h2 className="h4 mb-3">Nuestros Productos</h2>

      <div className="list-group">
        {estado.productos.map((prod) => (
          <div
            key={prod.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h3 className="h6 mb-0">{prod.nombre}</h3>

              {prod.variedad && (
                <small className="text-muted d-block">
                  {prod.variedad.descripcion}
                </small>
              )}
            </div>

            <div className="d-flex align-items-center gap-2">
              <span className="fw-bold">
                {formatearPrecio(prod.precio)}
              </span>

              {onSeleccionarProducto && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => onSeleccionarProducto(prod)}
                >
                  Elegir
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}