import { Producto } from "./producto";

export type Tamano = "pocillo" | "mediano" | "taza grande";
export type Variedad = "Brasil" | "Colombia" | "Etiopia";

const PRECIO_POR_GRAMO: Record<Variedad, number> = { Brasil: 140, Colombia: 180, Etiopia: 240 };

export abstract class Cafe extends Producto {
    constructor(
        id: string,
        tipo: string,
        precioBase: number,
        private readonly gramosPorTamano: Record<Tamano, number>,
        public readonly tamano: Tamano,
        public readonly variedad: Variedad,
    ) {
        super(id, `${tipo} ${tamano} ${variedad}`, precioBase);
        if (!(tamano in gramosPorTamano)) throw new Error(`tamano invalido: ${tamano}`);
        if (!(variedad in PRECIO_POR_GRAMO)) throw new Error(`variedad invalida: ${variedad}`);
    }

    calcularPrecio(): number {
        return this.precioBase + this.gramosPorTamano[this.tamano] * PRECIO_POR_GRAMO[this.variedad];
    }
}