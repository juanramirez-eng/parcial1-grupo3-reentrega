import { Expreso } from "../models/expreso";
import { Filtrado } from "../models/filtrado";
import { Pasteleria } from "../models/pasteleria";
import type { Producto } from "../models/producto";
import type { Tamano, Variedad } from "../models/cafe";

const TAMANOS: Tamano[] = ["pocillo", "mediano", "taza grande"];
const VARIEDADES: Variedad[] = ["Brasil", "Colombia", "Etiopia"];

const cafes: Producto[] = [];
let id = 1;

for (const tamano of TAMANOS) {
    for (const variedad of VARIEDADES) {
        cafes.push(new Expreso(String(id++), tamano, variedad));
    }
}

for (const tamano of TAMANOS) {
    for (const variedad of VARIEDADES) {
        cafes.push(new Filtrado(String(id++), tamano, variedad));
    }
}

export const PRODUCTOS_INICIALES: Producto[] = [
    ...cafes,
    new Pasteleria("19", "Muffin de chocolate", 2500),
    new Pasteleria("20", "Torta selva negra", 4200),
];