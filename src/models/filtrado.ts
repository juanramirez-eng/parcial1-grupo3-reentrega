import { Producto } from "./producto";
import type { Tamano, Variedad } from "./expreso";

const GRAMOS: Record<Tamano, number> = { pocillo: 6, mediano: 15, "taza grande": 25 };
const PRECIO_POR_GRAMO: Record<Variedad, number> = { Brasil: 140, Colombia: 180, Etiopia: 240 };

export class Filtrado extends Producto {
    constructor(
        id: string,
        public readonly tamano: Tamano,
        public readonly variedad: Variedad,
    ) {
        super(id, `Filtrado ${tamano} ${variedad}`, 3200);
        if (!(tamano in GRAMOS)) throw new Error(`tamano invalido: ${tamano}`);
        if (!(variedad in PRECIO_POR_GRAMO)) throw new Error(`variedad invalida: ${variedad}`);
    }

    calcularPrecio(): number {
        return this.precioBase + GRAMOS[this.tamano] * PRECIO_POR_GRAMO[this.variedad];
    }
}