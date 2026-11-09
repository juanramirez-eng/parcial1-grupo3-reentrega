import { describe, it, expect } from "vitest";
import { Filtrado } from "../src/models/filtrado";

describe("Filtrado", () => {
    it.each([
        ["pocillo", "Brasil", 4040],
        ["pocillo", "Colombia", 4280],
        ["pocillo", "Etiopia", 4640],
        ["mediano", "Brasil", 5300],
        ["mediano", "Colombia", 5900],
        ["mediano", "Etiopia", 6800],
        ["taza grande", "Brasil", 6700],
        ["taza grande", "Colombia", 7700],
        ["taza grande", "Etiopia", 9200],
    ] as const)("%s %s cuesta %i", (tamano, variedad, esperado) => {
        expect(new Filtrado("f1", tamano, variedad).calcularPrecio()).toBe(esperado);
    });

    it("tiene precioBase 3200 y un nombre descriptivo", () => {
        const f = new Filtrado("f1", "pocillo", "Brasil");
        expect(f.precioBase).toBe(3200);
        expect(f.nombre).toBe("Filtrado pocillo Brasil");
    });

    it("lanza error con un tamano invalido", () => {
        // @ts-expect-error probamos un valor fuera del tipo
        expect(() => new Filtrado("f1", "gigante", "Brasil")).toThrow("tamano");
    });

    it("lanza error con una variedad invalida", () => {
        // @ts-expect-error probamos un valor fuera del tipo
        expect(() => new Filtrado("f1", "pocillo", "Kenia")).toThrow("variedad");
    });
});