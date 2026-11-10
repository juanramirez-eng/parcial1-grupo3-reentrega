import { Cafe } from "../models/cafe";
import type { Producto } from "../models/producto";

export function productoARespuesta(producto: Producto) {
    const base = {
        id: producto.id,
        tipo: producto.tipo,
        nombre: producto.nombre,
        precioBase: producto.precioBase,
        precio: producto.calcularPrecio(),
    };

    if (producto instanceof Cafe) {
        return {
            ...base,
            tamano: producto.tamano,
            variedad: {
                nombre: producto.variedad,
                descripcion: producto.descripcionVariedad,
            },
        };
    }

    return base;
}