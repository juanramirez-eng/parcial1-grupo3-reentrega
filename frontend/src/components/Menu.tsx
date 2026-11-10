import { useMemo, useState } from "react";
import { useMenu } from "../hooks/useMenu";
import { formatearPrecio } from "../utils/format";
import type { Producto } from "../schemas/producto.schema";

interface MenuProps {
  onSeleccionarProducto?: (producto: Producto) => void;
}

type FiltroMenu = "todos" | "cafes" | "comidas";

function obtenerTamano(nombre: string): string | null {
  const normalizado = nombre.toLowerCase();

  if (normalizado.includes("pocillo")) {
    return "Pocillo";
  }

  if (normalizado.includes("mediano")) {
    return "Mediano";
  }

  if (
    normalizado.includes("taza grande") ||
    normalizado.includes("grande")
  ) {
    return "Grande";
  }

  return null;
}

function esCafe(producto: Producto): boolean {
  return (
    producto.tipo === "expreso" ||
    producto.tipo === "filtrado"
  );
}

function esComida(producto: Producto): boolean {
  return producto.tipo === "pasteleria";
}

function obtenerClaseTipo(tipo: string): string {
  switch (tipo.toLowerCase()) {
    case "expreso":
      return "product-card--expreso";

    case "filtrado":
      return "product-card--filtrado";

    case "pasteleria":
      return "product-card--pasteleria";

    default:
      return "";
  }
}

export function Menu({
  onSeleccionarProducto,
}: MenuProps) {
  const { estado, reintentar } = useMenu();
  const [filtro, setFiltro] =
    useState<FiltroMenu>("todos");

  const productosFiltrados = useMemo(() => {
    if (estado.estado !== "listo") {
      return [];
    }

    const ordenados = [...estado.productos].sort(
      (a, b) => {
        const aCafe = esCafe(a);
        const bCafe = esCafe(b);

        if (aCafe && !bCafe) {
          return -1;
        }

        if (!aCafe && bCafe) {
          return 1;
        }

        return a.nombre.localeCompare(b.nombre);
      },
    );

    if (filtro === "cafes") {
      return ordenados.filter(esCafe);
    }

    if (filtro === "comidas") {
      return ordenados.filter(esComida);
    }

    return ordenados;
  }, [estado, filtro]);

  if (estado.estado === "cargando") {
    return (
      <section
        className="menu-section container py-5"
        aria-label="Cargando menú"
      >
        <div
          className="menu-feedback"
          role="status"
          aria-live="polite"
        >
          <div
            className="spinner-border text-primary"
            aria-hidden="true"
          />

          <p className="menu-feedback__text">
            Cargando menú...
          </p>
        </div>
      </section>
    );
  }

  if (estado.estado === "error") {
    return (
      <section
        className="menu-section container py-5"
        aria-label="Error al cargar el menú"
      >
        <div
          className="menu-feedback menu-feedback--error"
          role="alert"
        >
          <h2 className="h4 mb-2">
            No pudimos cargar el menú
          </h2>

          <p className="mb-3">
            {estado.mensaje}
          </p>

          <button
            type="button"
            className="btn btn-primary"
            onClick={reintentar}
          >
            Reintentar
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      className="menu-section container py-4 py-md-5"
      aria-labelledby="titulo-menu"
    >
      <div className="menu-section__heading">
        <div>
          <span className="menu-section__eyebrow">
            Carta
          </span>

          <h2
            id="titulo-menu"
            className="menu-section__title"
          >
            Elegí tu pedido
          </h2>

          <p className="menu-section__description">
            Seleccioná entre cafés y opciones de pastelería.
          </p>
        </div>

        <span className="menu-section__count">
          {productosFiltrados.length} productos
        </span>
      </div>

      <div
        className="menu-filters"
        aria-label="Filtrar productos"
      >
        <button
          type="button"
          className={`menu-filter ${
            filtro === "todos"
              ? "menu-filter--active"
              : ""
          }`}
          onClick={() => setFiltro("todos")}
        >
          Todos
        </button>

        <button
          type="button"
          className={`menu-filter ${
            filtro === "cafes"
              ? "menu-filter--active"
              : ""
          }`}
          onClick={() => setFiltro("cafes")}
        >
          Cafés
        </button>

        <button
          type="button"
          className={`menu-filter ${
            filtro === "comidas"
              ? "menu-filter--active"
              : ""
          }`}
          onClick={() => setFiltro("comidas")}
        >
          Comidas
        </button>
      </div>

      <div className="menu-grid">
        {productosFiltrados.map((producto) => {
          const tamano = obtenerTamano(
            producto.nombre,
          );

          return (
            <article
              key={producto.id}
              className={`product-card ${obtenerClaseTipo(
                producto.tipo,
              )}`}
            >
              <div className="product-card__content">
                <div className="product-card__header">
                  <div className="product-card__labels">
                    <span className="product-card__type">
                      {producto.tipo}
                    </span>

                    {tamano && (
                      <span
                        className={`product-card__size product-card__size--${tamano.toLowerCase()}`}
                      >
                        {tamano}
                      </span>
                    )}
                  </div>

                  <strong className="product-card__price">
                    {formatearPrecio(
                      producto.precio,
                    )}
                  </strong>
                </div>

                <h3 className="product-card__title">
                  {producto.nombre}
                </h3>

                {producto.variedad ? (
                  <p className="product-card__description">
                    {
                      producto.variedad
                        .descripcion
                    }
                  </p>
                ) : (
                  <p className="product-card__description">
                    Opción de pastelería para
                    acompañar tu pedido.
                  </p>
                )}

                <div className="product-card__footer">
                  <span className="product-card__availability">
                    Disponible
                  </span>

                  {onSeleccionarProducto && (
                    <button
                      type="button"
                      className="btn btn-primary product-card__button"
                      onClick={() =>
                        onSeleccionarProducto(
                          producto,
                        )
                      }
                      aria-label={`Elegir ${producto.nombre}`}
                    >
                      Agregar
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}