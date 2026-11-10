import { describe, it, expect } from "vitest";
import { Expreso } from "../src/models/expreso";
import { Filtrado } from "../src/models/filtrado";
import { Pasteleria } from "../src/models/pasteleria";
import { productoARespuesta } from "../src/routers/producto.respuesta";

describe("productoARespuesta", () => {
    it("serializa una pasteleria con tipo y precio", () => {
        const muffin = new Pasteleria("19", "Muffin de chocolate", 2500);

        expect(productoARespuesta(muffin)).toEqual({
            id: "19",
            tipo: "pasteleria",
            nombre: "Muffin de chocolate",
            precioBase: 2500,
            precio: 2500,
        });
    });

    it("serializa un expreso con tamano y variedad con descripcion", () => {
        const expreso = new Expreso("5", "mediano", "Colombia");

        expect(productoARespuesta(expreso)).toEqual({
            id: "5",
            tipo: "expreso",
            nombre: "Expreso mediano Colombia",
            precioBase: 2500,
            precio: 7360,
            tamano: "mediano",
            variedad: {
                nombre: "Colombia",
                descripcion: "Acidez media, cuerpo equilibrado y notas cítricas y florales",
            },
        });
    });

    it("serializa un filtrado con tamano y variedad con descripcion", () => {
        const filtrado = new Filtrado("14", "mediano", "Colombia");

        expect(productoARespuesta(filtrado)).toEqual({
            id: "14",
            tipo: "filtrado",
            nombre: "Filtrado mediano Colombia",
            precioBase: 3200,
            precio: 5900,
            tamano: "mediano",
            variedad: {
                nombre: "Colombia",
                descripcion: "Acidez media, cuerpo equilibrado y notas cítricas y florales",
            },
        });
    });
});