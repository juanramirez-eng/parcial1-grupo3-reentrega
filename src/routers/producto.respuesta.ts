import type { Producto } from "../models/producto";

export function productoARespuesta(producto: Producto) {
    return {
        id: producto.id,
        tipo: producto.tipo,
        nombre: producto.nombre,
        precioBase: producto.precioBase,
        precio: producto.calcularPrecio(),
    };
}