import type { Producto } from "../models/producto";
import { PRODUCTOS_INICIALES } from "../data/productos.data";

export class CatalogoService {
    private readonly productos: Map<string, Producto>;

    constructor(productos: Producto[] = PRODUCTOS_INICIALES) {
        this.productos = new Map(productos.map((p) => [p.id, p]));
    }

    obtenerTodos(): Producto[] {
        return Array.from(this.productos.values());
    }
}