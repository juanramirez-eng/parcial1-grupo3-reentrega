import { describe, it, expect, beforeEach } from "vitest";
import express from "express";
import request from "supertest";
import { CatalogoService } from "../src/services/catalogo.service.js";
import { PedidoRepository } from "../src/repositories/pedido.repository.js";
import { PedidoService } from "../src/services/pedido.service.js";
import { ReportesService } from "../src/services/reportes.service.js";
import { createReportesRouter } from "../src/routers/reportes.router.js";

describe("Rutas de reportes (/reportes)", () => {
  let pedidos: PedidoService;
  let app: express.Express;

  beforeEach(() => {
    const catalogo = new CatalogoService();

    pedidos = new PedidoService(
      catalogo,
      new PedidoRepository()
    );

    app = express();
    app.use(express.json());

    app.use(
      "/reportes",
      createReportesRouter(
        new ReportesService(pedidos, catalogo)
      )
    );
  });

  describe("GET /reportes/facturacion", () => {
    it("devuelve status 200 y la facturación acumulada de varios pedidos", async () => {
      pedidos.crearPedido([
        { productoId: "1", cantidad: 2 },
      ]);

      pedidos.crearPedido([
        { productoId: "20", cantidad: 1 },
      ]);

      const res = await request(app).get(
        "/reportes/facturacion"
      );

      expect(res.status).toBe(200);

      expect(res.body).toEqual({
        facturacion: 14240,
      });
    });

    it("devuelve facturación 0 si no hay ventas", async () => {
      const res = await request(app).get(
        "/reportes/facturacion"
      );

      expect(res.status).toBe(200);

      expect(res.body).toEqual({
        facturacion: 0,
      });
    });
  });

  describe("GET /reportes/mas-vendidos", () => {
    it("devuelve status 200 y el producto más vendido sumando cantidades", async () => {
      pedidos.crearPedido([
        { productoId: "2", cantidad: 2 },
      ]);

      pedidos.crearPedido([
        { productoId: "2", cantidad: 3 },
        { productoId: "19", cantidad: 4 },
      ]);

      const res = await request(app).get(
        "/reportes/mas-vendidos"
      );

      expect(res.status).toBe(200);

      expect(res.body).toEqual([
        {
          productoId: 2,
          nombre: "Expreso pocillo Colombia",
          cantidad: 5,
        },
      ]);
    });

    it("devuelve todos los productos empatados", async () => {
      pedidos.crearPedido([
        { productoId: "10", cantidad: 2 },
        { productoId: "20", cantidad: 2 },
      ]);

      const res = await request(app).get(
        "/reportes/mas-vendidos"
      );

      expect(res.status).toBe(200);

      expect(res.body).toEqual([
        {
          productoId: 10,
          nombre: "Filtrado pocillo Brasil",
          cantidad: 2,
        },
        {
          productoId: 20,
          nombre: "Torta selva negra",
          cantidad: 2,
        },
      ]);
    });

    it("devuelve una lista vacía si no hay ventas", async () => {
      const res = await request(app).get(
        "/reportes/mas-vendidos"
      );

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });
  });
});