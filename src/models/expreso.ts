import { Producto } from "./producto";

export type Tamano = "pocillo" | "mediano" | "taza grande";
export type Variedad = "Brasil" | "Colombia" | "Etiopia";

const GRAMOS: Record<Tamano, number> = { pocillo: 18, mediano: 27, "taza grande": 36 };
const PRECIO_POR_GRAMO: Record<Variedad, number> = { Brasil: 140, Colombia: 180, Etiopia: 240 };

export class Expreso extends Producto {
    constructor(
        id: string,
        public readonly tamano: Tamano,
        public readonly variedad: Variedad,
    ) {
        super(id, `Expreso ${tamano} ${variedad}`, 2500);
    }

    calcularPrecio(): number {
        return this.precioBase + GRAMOS[this.tamano] * PRECIO_POR_GRAMO[this.variedad];
    }
}