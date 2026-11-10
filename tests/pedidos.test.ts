import { describe, it, expect, beforeEach } from "vitest";
import { PedidoRepository } from "../repositories/pedido.repository.js";
import { PedidoService } from "../services/pedido.service.js";
import { CatalogoService } from "../catalogo/index.js";

describe("PedidoService", () => {
  let servicio: PedidoService;
  let repositorio: PedidoRepository;
  let catalogo: CatalogoService;

  beforeEach(() => {
    catalogo = new CatalogoService();
    repositorio = new PedidoRepository();
    servicio = new PedidoService(catalogo, repositorio);
  });

  describe("Crear pedidos", () => {
    it("calcula el total de un pedido con varios productos", () => {
      const pedido = servicio.crearPedido([
        { productoId: "1", cantidad: 2 },
        { productoId: "2", cantidad: 1 },
      ]);

      expect(pedido.total).toBe(15780);
    });

    it("multiplica el precio por la cantidad", () => {
      const pedido = servicio.crearPedido([
        { productoId: "1", cantidad: 3 },
      ]);

      expect(pedido.total).toBe(15060);
    });

    it("rechaza un pedido vacío", () => {
      expect(() => servicio.crearPedido([])).toThrow();
    });

    it("rechaza un producto inexistente", () => {
      expect(() =>
        servicio.crearPedido([
          { productoId: "999", cantidad: 1 },
        ])
      ).toThrow();
    });
  });

  describe("Validar cantidades", () => {
    it.each([0, -1, 1.5, NaN])(
      "rechaza la cantidad inválida %s",
      (cantidad) => {
        expect(() =>
          servicio.crearPedido([
            { productoId: "1", cantidad },
          ])
        ).toThrow();
      }
    );
  });

  describe("Consultar pedidos", () => {
    it("lista todos los pedidos creados", () => {
      servicio.crearPedido([
        { productoId: "1", cantidad: 1 },
      ]);

      servicio.crearPedido([
        { productoId: "2", cantidad: 1 },
      ]);

      expect(servicio.listarPedidos()).toHaveLength(2);
    });

    it("busca un pedido existente por ID", () => {
      const creado = servicio.crearPedido([
        { productoId: "1", cantidad: 1 },
      ]);

      expect(servicio.buscarPorId(creado.id)).toEqual(creado);
    });

    it("devuelve un resultado vacío si el pedido no existe", () => {
      expect(servicio.buscarPorId("inexistente")).toBeUndefined();
    });
  });
});
