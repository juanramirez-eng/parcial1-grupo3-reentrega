import { describe, it, expect, beforeEach } from "vitest";
import { CatalogoService } from "../src/services/catalogo.service.js";
import { PedidoRepository } from "../src/repositories/pedido.repository.js";
import { PedidoService } from "../src/services/pedido.service.js";
import { ReportesService } from "../src/services/reportes.service.js";

describe("ReportesService", () => {
  let pedidos: PedidoService;
  let reportes: ReportesService;

  beforeEach(() => {
    const catalogo = new CatalogoService();

    pedidos = new PedidoService(
      catalogo,
      new PedidoRepository()
    );

    reportes = new ReportesService(
      pedidos,
      catalogo
    );
  });

  describe("Cantidades vendidas", () => {
    it("suma las cantidades del mismo producto dentro de un pedido", () => {
      pedidos.crearPedido([
        { productoId: "1", cantidad: 2 },
        { productoId: "1", cantidad: 3 },
      ]);

      expect(
        reportes.cantidadesVendidas().get(1)
      ).toBe(5);
    });

    it("acumula las cantidades de varios pedidos", () => {
      pedidos.crearPedido([
        { productoId: "1", cantidad: 2 },
        { productoId: "19", cantidad: 1 },
      ]);

      pedidos.crearPedido([
        { productoId: "1", cantidad: 4 },
      ]);

      pedidos.crearPedido([
        { productoId: "19", cantidad: 3 },
      ]);

      const cantidades =
        reportes.cantidadesVendidas();

      expect(cantidades.get(1)).toBe(6);
      expect(cantidades.get(19)).toBe(4);
      expect(cantidades.size).toBe(2);
    });

    it("está vacío si no hay ventas", () => {
      expect(
        reportes.cantidadesVendidas().size
      ).toBe(0);
    });
  });

  describe("Facturación", () => {
    it("acumula el total de varios pedidos", () => {
      pedidos.crearPedido([
        { productoId: "1", cantidad: 2 },
        { productoId: "2", cantidad: 1 },
      ]);

      pedidos.crearPedido([
        { productoId: "19", cantidad: 3 },
      ]);

      expect(
        reportes.facturacion()
      ).toBe(23280);
    });

    it("es 0 si no hay ventas", () => {
      expect(
        reportes.facturacion()
      ).toBe(0);
    });
  });

  describe("Producto más vendido", () => {
    it("devuelve el producto con mayor cantidad acumulada entre pedidos", () => {
      pedidos.crearPedido([
        { productoId: "1", cantidad: 3 },
        { productoId: "19", cantidad: 2 },
      ]);

      pedidos.crearPedido([
        { productoId: "19", cantidad: 2 },
      ]);

      expect(
        reportes.masVendidos()
      ).toEqual([
        {
          productoId: 19,
          nombre: "Muffin de chocolate",
          cantidad: 4,
        },
      ]);
    });

    it("decide por cantidad vendida y no por cantidad de pedidos", () => {
      pedidos.crearPedido([
        { productoId: "2", cantidad: 1 },
      ]);

      pedidos.crearPedido([
        { productoId: "2", cantidad: 1 },
      ]);

      pedidos.crearPedido([
        { productoId: "20", cantidad: 5 },
      ]);

      expect(
        reportes.masVendidos()
      ).toEqual([
        {
          productoId: 20,
          nombre: "Torta selva negra",
          cantidad: 5,
        },
      ]);
    });

    it("devuelve todos los productos empatados", () => {
      pedidos.crearPedido([
        { productoId: "19", cantidad: 2 },
        { productoId: "1", cantidad: 3 },
      ]);

      pedidos.crearPedido([
        { productoId: "2", cantidad: 1 },
        { productoId: "19", cantidad: 1 },
      ]);

      expect(
        reportes.masVendidos()
      ).toEqual([
        {
          productoId: 1,
          nombre: "Expreso pocillo Brasil",
          cantidad: 3,
        },
        {
          productoId: 19,
          nombre: "Muffin de chocolate",
          cantidad: 3,
        },
      ]);
    });

    it("devuelve una lista vacía si no hay ventas", () => {
      expect(
        reportes.masVendidos()
      ).toEqual([]);
    });
  });
});