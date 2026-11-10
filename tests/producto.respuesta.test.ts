import { describe, it, expect } from "vitest";
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
});