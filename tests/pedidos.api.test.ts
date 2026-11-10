import request from "supertest";
import { describe, it, expect } from "vitest"; 
import { app } from "../src/app";

describe("POST /pedidos con mesaId", () => {
  it("acepta mesaId y lo devuelve en el pedido", async () => {
    const res = await request(app)
      .post("/pedidos")
      .send({
        mesaId: 4,
        items: [
          { productoId: 5, cantidad: 2 },
          { productoId: 19, cantidad: 1 },
        ],
      });

    expect(res.status).toBe(201);
    expect(res.body.mesaId).toBe(4);
    expect(res.body.estado).toBe("pendiente");
    expect(res.body.total).toBe(17220);
  });

  it("sin mesaId crea el pedido para retirar en barra", async () => {
    const res = await request(app)
      .post("/pedidos")
      .send({ items: [{ productoId: 19, cantidad: 1 }] });

    expect(res.status).toBe(201);
    expect(res.body.mesaId ?? null).toBeNull();
  });

  it.each([0, -1, 1.5, "abc"])(
    "rechaza mesaId inválido (%s) con 400 y { error }",
    async (mesaId) => {
      const res = await request(app)
        .post("/pedidos")
        .send({ mesaId, items: [{ productoId: 19, cantidad: 1 }] });

      expect(res.status).toBe(400);
      expect(typeof res.body.error).toBe("string");
    }
  );

  it("producto inexistente responde 400/404, nunca 500, con { error }", async () => {
    const res = await request(app)
      .post("/pedidos")
      .send({ mesaId: 4, items: [{ productoId: 99999, cantidad: 1 }] });

    expect([400, 404]).toContain(res.status);
    expect(typeof res.body.error).toBe("string");
  });
});

describe("GET /pedidos/:id", () => {
  it("devuelve estado, ítems, total y mesaId del pedido creado", async () => {
    const creado = await request(app)
      .post("/pedidos")
      .send({
        mesaId: 4,
        items: [
          { productoId: 5, cantidad: 2 },
          { productoId: 19, cantidad: 1 },
        ],
      });

    const res = await request(app).get(`/pedidos/${creado.body.id}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(creado.body.id);
    expect(res.body.mesaId).toBe(4);
    expect(res.body.estado).toBe("pendiente");
    expect(res.body.total).toBe(17220);
    expect(res.body.items).toHaveLength(2);
    expect(res.body.items[0]).toMatchObject({ productoId: 5, cantidad: 2 });
  });

  it("pedido inexistente responde 404 con { error }", async () => {
    const res = await request(app).get("/pedidos/99999");

    expect(res.status).toBe(404);
    expect(typeof res.body.error).toBe("string");
  });

  it("id no numérico responde 400 con { error }", async () => {
    const res = await request(app).get("/pedidos/abc");

    expect(res.status).toBe(400);
    expect(typeof res.body.error).toBe("string");
  });
});