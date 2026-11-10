import { Cafe, type Tamano, type Variedad } from "./cafe";

const GRAMOS_FILTRADO: Record<Tamano, number> = { pocillo: 6, mediano: 15, "taza grande": 25 };

export class Filtrado extends Cafe {
    readonly tipo = "filtrado" as const;

    constructor(id: string, tamano: Tamano, variedad: Variedad) {
        super(id, "Filtrado", 3200, GRAMOS_FILTRADO, tamano, variedad);
    }
}