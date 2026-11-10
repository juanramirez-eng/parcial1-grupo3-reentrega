import type { Bebida, Origen, Tamano } from "../api/schemas";

export const ETIQUETA_BEBIDA: Record<Bebida, string> = {
    expreso: "Expreso",
    filtrado: "Filtrado",
};

export const ETIQUETA_TAMANO: Record<Tamano, string> = {
    pocillo: "Pocillo",
    mediano: "Mediano",
    "taza grande": "Taza grande",
};

export const ETIQUETA_ORIGEN: Record<Origen, string> = {
    Colombia: "Colombia",
    Etiopia: "Etiopía",
    Brasil: "Brasil",
};