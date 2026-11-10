import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app";

describe("Rutas de Catalogo (/productos)", () => {
    it("GET /productos devuelve status 200 y la lista de 20 productos con precioFinal", async () => {
        const res = await request(app).get("/productos");
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(20);
        expect(res.body[0]).toHaveProperty("precioFinal");
    });

    it("GET /productos/:id devuelve status 200 para un producto existente", async () => {
        const res = await request(app).get("/productos/2");
        expect(res.status).toBe(200);
        expect(res.body.id).toBe("2");
        expect(res.body.nombre).toBe("Expreso pocillo Colombia");
        expect(res.body.precioFinal).toBe(5740);
    });

    it("GET /productos/:id devuelve status 404 para un producto inexistente", async () => {
        const res = await request(app).get("/productos/999");
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: "Producto no encontrado" });
    });
});