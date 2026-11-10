import {
  Expreso,
  Filtrado,
  Pasteleria,
  BRASIL,
  COLOMBIA,
  ETIOPIA,
  Cafe,
  type Producto,
  type Tamanio,
  type VariedadCafe,
} from "../models/productos/index.js";

const VARIEDADES = [BRASIL, COLOMBIA, ETIOPIA];
const TAMANIOS: Tamanio[] = ["pocillo", "mediano", "grande"];

function generarCafes(
  TipoCafe: new (id: number, v: VariedadCafe, t: Tamanio) => Cafe,
  idInicial: number
): Cafe[] {
  const cafes: Cafe[] = [];
  let id = idInicial;
  for (const tamanio of TAMANIOS) {
    for (const variedad of VARIEDADES) {
      cafes.push(new TipoCafe(id++, variedad, tamanio));
    }
  }
  return cafes;
}

const expresos = generarCafes(Expreso, 1);                      // IDs 1–9
const filtrados = generarCafes(Filtrado, expresos.length + 1);  // IDs 10–18

export const PRODUCTOS_INICIALES: Producto[] = [
  ...expresos,
  ...filtrados,
  new Pasteleria(19, "Muffin de chocolate", 2500),
  new Pasteleria(20, "Porción de torta selva negra", 4200),
];