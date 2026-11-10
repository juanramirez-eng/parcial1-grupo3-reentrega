import { Expreso } from "../models/expreso";
import { Filtrado } from "../models/filtrado";
import { Pasteleria } from "../models/pasteleria";
import type { Producto } from "../models/producto";
import type { Cafe, Tamano, Variedad } from "../models/cafe";

const TAMANOS: Tamano[] = ["pocillo", "mediano", "taza grande"];
const VARIEDADES: Variedad[] = ["Brasil", "Colombia", "Etiopia"];

function generarCafes(
    TipoCafe: new (id: string, tamano: Tamano, variedad: Variedad) => Cafe,
    idInicial: number,
): Cafe[] {
    const cafes: Cafe[] = [];
    let id = idInicial;
    for (const tamano of TAMANOS) {
        for (const variedad of VARIEDADES) {
            cafes.push(new TipoCafe(String(id++), tamano, variedad));
        }
    }
    return cafes;
}

const expresos = generarCafes(Expreso, 1);
const filtrados = generarCafes(Filtrado, expresos.length + 1);

export const PRODUCTOS_INICIALES: Producto[] = [
    ...expresos,
    ...filtrados,
    new Pasteleria("19", "Muffin de chocolate", 2500),
    new Pasteleria("20", "Torta selva negra", 4200),
];