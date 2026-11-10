import { describe, it, expect } from "vitest";
import { Expreso } from "../src/models/expreso";
import { Filtrado } from "../src/models/filtrado";

describe("descripcion de la variedad", () => {
    it.each([
        ["Colombia", "Acidez media, cuerpo equilibrado y notas cítricas y florales"],
        ["Etiopia", "Acidez muy viva, cuerpo ligero y notas frutales"],
        ["Brasil", "Acidez baja, cuerpo denso y notas de avellana"],
    ] as const)("%s se describe como: %s", (variedad, descripcion) => {
        expect(new Expreso("1", "pocillo", variedad).descripcionVariedad).toBe(descripcion);
        expect(new Filtrado("2", "pocillo", variedad).descripcionVariedad).toBe(descripcion);
    });
});