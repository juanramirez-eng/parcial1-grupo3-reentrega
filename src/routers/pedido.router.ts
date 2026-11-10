import { Router } from "express";
import type { PedidoService } from "../services/pedido.service.js";

export function createPedidoRouter(servicio: PedidoService): Router {
  const router = Router();

  // POST /pedidos
  router.post("/", (req, res) => {
    try {
      const { items } = req.body;

      if (!Array.isArray(items)) {
        return res.status(400).json({
          error: "Debe enviar una lista de items",
        });
      }

      const pedido = servicio.crearPedido(items);

      return res.status(201).json(pedido);
    } catch (error) {
      return res.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : "Error al crear el pedido",
      });
    }
  });

  // GET /pedidos
  router.get("/", (_req, res) => {
    return res.json(servicio.listarPedidos());
  });

  // GET /pedidos/:id
  router.get("/:id", (req, res) => {
    const pedido = servicio.buscarPorId(req.params.id);

    if (!pedido) {
      return res.status(404).json({
        error: "Pedido no encontrado",
      });
    }

    return res.json(pedido);
  });

  return router;
}