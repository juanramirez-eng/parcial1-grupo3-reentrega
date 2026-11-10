import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../src/app.js";

describe("Endpoints de soporte para E2E", () => {
  it("reset limpia los pedidos y reinicia la secuencia de IDs", async () => {
    const pedido1 = await request(app)
      .post("/pedidos")
      .send({
        mesaId: 4,
        items: [{ productoId: 19, cantidad: 1 }],
      });

    expect(pedido1.status).toBe(201);
    expect(pedido1.body.id).toBe("1");

    const reset = await request(app).post("/__test__/reset");

    expect(reset.status).toBe(204);

    const pedidos = await request(app).get("/pedidos");

    expect(pedidos.status).toBe(200);
    expect(pedidos.body).toEqual([]);

    const pedido2 = await request(app)
      .post("/pedidos")
      .send({
        mesaId: 4,
        items: [{ productoId: 19, cantidad: 1 }],
      });

    expect(pedido2.status).toBe(201);
    expect(pedido2.body.id).toBe("1");
  });

  it("seed deja disponibles los datos conocidos para E2E", async () => {
    const seed = await request(app).post("/__test__/seed");

    expect(seed.status).toBe(204);

    const productos = await request(app).get("/productos");

    expect(productos.status).toBe(200);
    expect(productos.body).toHaveLength(20);
  });
});