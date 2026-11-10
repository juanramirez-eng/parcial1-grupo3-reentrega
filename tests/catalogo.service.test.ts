import { describe, it, expect } from "vitest";
import { CatalogoService } from "../src/services/catalogo.service";

describe("CatalogoService", () => {
    it("devuelve la lista completa de 20 productos iniciales", () => {
        const service = new CatalogoService();
        const productos = service.obtenerTodos();
        expect(productos).toHaveLength(20);
    });
});

it("encuentra un producto existente por su ID", () => {
        const service = new CatalogoService();
        const producto = service.obtenerPorId("2");
        expect(producto).toBeDefined();
        expect(producto?.nombre).toBe("Expreso pocillo Colombia");
        expect(producto?.calcularPrecio()).toBe(5740);
    });

    it("devuelve undefined cuando el ID no existe", () => {
        const service = new CatalogoService();
        expect(service.obtenerPorId("999")).toBeUndefined();
    });