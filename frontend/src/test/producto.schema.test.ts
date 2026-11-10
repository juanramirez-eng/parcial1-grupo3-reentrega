import { describe, it, expect } from "vitest";
import { CatalogoResponseSchema, ProductoSchema } from "../schemas/producto.schema";

describe("Esquemas Zod de Productos", () => {
    it("valida exitosamente un producto completo segun el contrato", () => {
        const mockCafe = {
            id: 5,
            tipo: "expreso",
            nombre: "Expreso Mediano",
            tamanio: "Mediano",
            gramosCafe: 27,
            variedad: {
                nombre: "Colombia",
                descripcion: "Acidez media y notas cítricas",
            },
            precio: 7360,
        };

        const res = ProductoSchema.safeParse(mockCafe);
        expect(res.success).toBe(true);
    });

    it("rechaza productos con tipos invalidos o sin precio", () => {
        const invalido = {
            id: 1,
            nombre: "Bebida",
            tipo: "desconocido",
        };

        const res = ProductoSchema.safeParse(invalido);
        expect(res.success).toBe(false);
    });

    it("valida la lista completa de productos para el catalogo", () => {
        const lista = [
            { id: 19, tipo: "pasteleria", nombre: "Muffin de chocolate", precio: 2500 },
        ];
        expect(CatalogoResponseSchema.safeParse(lista).success).toBe(true);
    });
});