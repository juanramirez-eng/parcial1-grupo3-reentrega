import type { Producto } from "../api/schemas";

const DESCRIPCION = {
    Colombia: "Acidez media, cuerpo equilibrado y notas cítricas y florales",
    Etiopia: "Acidez muy viva, cuerpo ligero y notas frutales",
    Brasil: "Acidez baja, cuerpo denso y notas de avellana",
} as const;

export const MENU: Producto[] = [
    { id: "4", tipo: "expreso", nombre: "Expreso mediano Brasil", tamano: "mediano", variedad: { nombre: "Brasil", descripcion: DESCRIPCION.Brasil }, precio: 6280 },
    { id: "5", tipo: "expreso", nombre: "Expreso mediano Colombia", tamano: "mediano", variedad: { nombre: "Colombia", descripcion: DESCRIPCION.Colombia }, precio: 7360 },
    { id: "6", tipo: "expreso", nombre: "Expreso mediano Etiopia", tamano: "mediano", variedad: { nombre: "Etiopia", descripcion: DESCRIPCION.Etiopia }, precio: 8980 },
    { id: "13", tipo: "filtrado", nombre: "Filtrado mediano Brasil", tamano: "mediano", variedad: { nombre: "Brasil", descripcion: DESCRIPCION.Brasil }, precio: 5300 },
    { id: "14", tipo: "filtrado", nombre: "Filtrado mediano Colombia", tamano: "mediano", variedad: { nombre: "Colombia", descripcion: DESCRIPCION.Colombia }, precio: 5900 },
    { id: "15", tipo: "filtrado", nombre: "Filtrado mediano Etiopia", tamano: "mediano", variedad: { nombre: "Etiopia", descripcion: DESCRIPCION.Etiopia }, precio: 6800 },
    { id: "19", tipo: "pasteleria", nombre: "Muffin de chocolate", precio: 2500 },
    { id: "20", tipo: "pasteleria", nombre: "Torta selva negra", precio: 4200 },
];