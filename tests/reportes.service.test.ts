import { describe, it, expect, beforeEach } from "vitest";
import { CatalogoService } from "../services/catalogo.service.js";
import { PedidoRepository } from "../repositories/pedido.repository.js";
import { PedidoService } from "../services/pedido.service.js";
import { ReportesService } from "../services/reportes.service.js";

describe("ReportesService", () => {
  let pedidos: PedidoService;
  let reportes: ReportesService;

  beforeEach(() => {
    const catalogo = new CatalogoService();
    pedidos = new PedidoService(catalogo, new PedidoRepository());
    reportes = new ReportesService(pedidos, catalogo);
  });

  describe("Cantidades vendidas", () => {
    it("suma las cantidades del mismo producto dentro de un pedido", () => {
      pedidos.crearPedido([
        { productoId: "1", cantidad: 2 },
        { productoId: "1", cantidad: 3 },
      ]);

      expect(reportes.cantidadesVendidas().get(1)).toBe(5);
    });

    it("acumula las cantidades de varios pedidos", () => {
      pedidos.crearPedido([
        { productoId: "1", cantidad: 2 },
        { productoId: "19", cantidad: 1 },
      ]);
      pedidos.crearPedido([{ productoId: "1", cantidad: 4 }]);
      pedidos.crearPedido([{ productoId: "19", cantidad: 3 }]);

      const cantidades = reportes.cantidadesVendidas();
      expect(cantidades.get(1)).toBe(6);
      expect(cantidades.get(19)).toBe(4);
      expect(cantidades.size).toBe(2);
    });

    it("está vacío si no hay ventas", () => {
      expect(reportes.cantidadesVendidas().size).toBe(0);
    });
  });

    describe("Facturación", () => {
    it("acumula el total de varios pedidos", () => {
      // 2 x 5020 + 5740 = 15780
      pedidos.crearPedido([
        { productoId: "1", cantidad: 2 },
        { productoId: "2", cantidad: 1 },
      ]);
      // 3 x 2500 = 7500
      pedidos.crearPedido([{ productoId: "19", cantidad: 3 }]);

      expect(reportes.facturacion()).toBe(23280);
    });

    it("es 0 si no hay ventas", () => {
      expect(reportes.facturacion()).toBe(0);
    });
  });

  // (acá van a ir los próximos bloques)
});