import { describe, it, expect } from "vitest";
import { CatalogoService } from "../src/services/catalogo.service";

describe("CatalogoService", () => {
    it("devuelve la lista completa de 20 productos iniciales", () => {
        const service = new CatalogoService();
        const productos = service.obtenerTodos();
        expect(productos).toHaveLength(20);
    });
});