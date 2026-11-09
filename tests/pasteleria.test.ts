import { describe, it, expect } from "vitest";
import { Pasteleria } from "../src/models/pasteleria";

describe("Pasteleria", () => {
    it("expone id, nombre y precioBase", () => {
        const muffin = new Pasteleria("p1", "Muffin de chocolate", 2500);
        expect(muffin.id).toBe("p1");
        expect(muffin.nombre).toBe("Muffin de chocolate");
        expect(muffin.precioBase).toBe(2500);
    });

    it("calcularPrecio devuelve el precioBase", () => {
        expect(new Pasteleria("p1", "Muffin de chocolate", 2500).calcularPrecio()).toBe(2500);
        expect(new Pasteleria("p2", "Torta selva negra", 4200).calcularPrecio()).toBe(4200);
    });
});