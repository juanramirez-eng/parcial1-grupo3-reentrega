import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app";

describe("app", () => {
    it("responde 404 con un mensaje de error en una ruta inexistente", async () => {
        const res = await request(app).get("/no-existe");
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: "Ruta no encontrada" });
    });
});