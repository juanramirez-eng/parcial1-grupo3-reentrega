import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";

describe("Integración de la API", () => {
  it("permite crear un pedido y consultar la facturación resultante", async () => {
    const productos = await request(app).get("/productos");

    expect(productos.status).toBe(200);
    expect(productos.body).toHaveLength(20);

    const pedido = await request(app)
      .post("/pedidos")
      .send({
        items: [
          {
            productoId: "1",
            cantidad: 2,
          },
        ],
      });

    expect(pedido.status).toBe(201);
    expect(pedido.body.total).toBe(10040);

    const facturacion = await request(app)
      .get("/reportes/facturacion");

    expect(facturacion.status).toBe(200);
    expect(facturacion.body).toEqual({
      facturacion: 10040,
    });
  });
});