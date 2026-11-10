import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app";

describe("Rutas de Catalogo (/productos)", () => {
    it("GET /productos devuelve status 200 y la lista de 20 productos con precio y tipo", async () => {
        const res = await request(app).get("/productos");
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(20);
        expect(res.body[0]).toHaveProperty("precio");
        expect(res.body[0]).toHaveProperty("tipo");
    });

    it("GET /productos incluye 9 expresos, 9 filtrados y 2 pastelerias", async () => {
        const res = await request(app).get("/productos");
        const tipos: string[] = res.body.map((p: { tipo: string }) => p.tipo);
        expect(tipos.filter((t) => t === "expreso")).toHaveLength(9);
        expect(tipos.filter((t) => t === "filtrado")).toHaveLength(9);
        expect(tipos.filter((t) => t === "pasteleria")).toHaveLength(2);
    });

    it("GET /productos/:id devuelve un cafe con precio, tipo y variedad con descripcion", async () => {
        const res = await request(app).get("/productos/5");
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            id: "5",
            tipo: "expreso",
            nombre: "Expreso mediano Colombia",
            tamano: "mediano",
            variedad: {
                nombre: "Colombia",
                descripcion: "Acidez media, cuerpo equilibrado y notas cítricas y florales",
            },
            precio: 7360,
        });
    });

    it("GET /productos/:id devuelve una pasteleria sin variedad", async () => {
        const res = await request(app).get("/productos/19");
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({ id: "19", tipo: "pasteleria", precio: 2500 });
        expect(res.body).not.toHaveProperty("variedad");
    });

    it("GET /productos/:id devuelve status 404 para un producto inexistente", async () => {
        const res = await request(app).get("/productos/999");
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: "Producto no encontrado" });
    });
});