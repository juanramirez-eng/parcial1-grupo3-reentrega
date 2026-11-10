import type { Bebida, Origen, Producto, Tamano } from "../api/schemas";

export type ProductoCafe = Extract<Producto, { tipo: Bebida }>;

export type EleccionCafe = {
    bebida: Bebida;
    tamano: Tamano;
    origen: Origen;
};

export function esCafe(producto: Producto): producto is ProductoCafe {
    return producto.tipo === "expreso" || producto.tipo === "filtrado";
}

export function buscarCafe(
    productos: Producto[],
    eleccion: EleccionCafe,
): ProductoCafe | undefined {
    return productos
        .filter(esCafe)
        .find(
            (cafe) =>
                cafe.tipo === eleccion.bebida &&
                cafe.tamano === eleccion.tamano &&
                cafe.variedad.nombre === eleccion.origen,
        );
}