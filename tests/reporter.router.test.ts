import { describe, it, expect, beforeEach } from "vitest";
import express from "express";
import request from "supertest";
import { CatalogoService } from "../services/catalogo.service.js";
import { PedidoRepository } from "../repositories/pedido.repository.js";
import { PedidoService } from "../services/pedido.service.js";
import { ReportesService } from "../services/reportes.service.js";
import { createReportesRouter } from "../routers/reportes.router.js";

describe("Rutas de reportes (/reportes)", () => {
  let pedidos: PedidoService;
  let app: express.Express;

  beforeEach(() => {
    // App de Express aislada con un repositorio de pedidos nuevo por test
    const catalogo = new CatalogoService();
    pedidos = new PedidoService(catalogo, new PedidoRepository());
    app = express();
    app.use(express.json());
    app.use("/reportes", createReportesRouter(new ReportesService(pedidos, catalogo)));
  });

  describe("GET /reportes/facturacion", () => {
    it("devuelve status 200 y la facturación acumulada de varios pedidos", async () => {
      pedidos.crearPedido([{ productoId: "1", cantidad: 2 }]); // 10040
      pedidos.crearPedido([{ productoId: "20", cantidad: 1 }]); // 4200

      const res = await request(app).get("/reportes/facturacion");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ facturacion: 14240 });
    });

    it("devuelve facturación 0 si no hay ventas", async () => {
      const res = await request(app).get("/reportes/facturacion");

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ facturacion: 0 });
    });
  });

  // (acá va el bloque de mas-vendidos)
});