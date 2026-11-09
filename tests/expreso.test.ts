import { describe, it, expect } from "vitest";
import { Expreso } from "../src/models/expreso";

describe("Expreso", () => {
    it.each([
        ["pocillo", "Brasil", 5020],
        ["pocillo", "Colombia", 5740],
        ["pocillo", "Etiopia", 6820],
        ["mediano", "Brasil", 6280],
        ["mediano", "Colombia", 7360],
        ["mediano", "Etiopia", 8980],
        ["taza grande", "Brasil", 7540],
        ["taza grande", "Colombia", 8980],
        ["taza grande", "Etiopia", 11140],
    ] as const)("%s %s cuesta %i", (tamano, variedad, esperado) => {
        expect(new Expreso("e1", tamano, variedad).calcularPrecio()).toBe(esperado);
    });

    it("tiene precioBase 2500 y un nombre descriptivo", () => {
        const e = new Expreso("e1", "pocillo", "Brasil");
        expect(e.precioBase).toBe(2500);
        expect(e.nombre).toBe("Expreso pocillo Brasil");
    });
});