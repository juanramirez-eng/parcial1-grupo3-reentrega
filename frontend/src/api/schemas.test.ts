import { describe, it, expect } from "vitest";
import { productoSchema, productosSchema } from "./schemas";
import { MENU } from "../test/fixtures";

describe("productoSchema", () => {
    it("acepta un expreso valido", () => {
        expect(productoSchema.safeParse(MENU[1]).success).toBe(true);
    });

    it("acepta una pasteleria valida", () => {
        expect(productoSchema.safeParse(MENU[6]).success).toBe(true);
    });

    it("rechaza un producto con el precio como texto", () => {
        expect(productoSchema.safeParse({ ...MENU[1], precio: "7360" }).success).toBe(false);
    });

    it("rechaza un tipo desconocido", () => {
        const jugo = { id: "1", tipo: "jugo", nombre: "Jugo", precio: 100 };
        expect(productoSchema.safeParse(jugo).success).toBe(false);
    });

    it("rechaza un cafe sin variedad", () => {
        const sinVariedad = {
            id: "5",
            tipo: "expreso",
            nombre: "Expreso mediano Colombia",
            tamano: "mediano",
            precio: 7360,
        };
        expect(productoSchema.safeParse(sinVariedad).success).toBe(false);
    });
});

describe("productosSchema", () => {
    it("acepta la lista completa del menu", () => {
        expect(productosSchema.safeParse(MENU).success).toBe(true);
    });

    it("rechaza la lista si un elemento no cumple el contrato", () => {
        expect(productosSchema.safeParse([MENU[0], { id: "x" }]).success).toBe(false);
    });
});