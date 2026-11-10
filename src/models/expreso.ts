import { Cafe, type Tamano, type Variedad } from "./cafe";

export type { Tamano, Variedad };

const GRAMOS_EXPRESO: Record<Tamano, number> = { pocillo: 18, mediano: 27, "taza grande": 36 };

export class Expreso extends Cafe {
    readonly tipo = "expreso" as const;

    constructor(id: string, tamano: Tamano, variedad: Variedad) {
        super(id, "Expreso", 2500, GRAMOS_EXPRESO, tamano, variedad);
    }
}