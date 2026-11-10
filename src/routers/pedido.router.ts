
import { Router } from "express";
import type { PedidoService } from "../services/pedido.service.js";

export function createPedidoRouter(servicio: PedidoService): Router {
  const router = Router();

  // POST /pedidos
  router.post("/", (req, res) => {
    try {
      const { items, mesaId } = req.body;

      if (!Array.isArray(items)) {
        return res.status(400).json({
          error: "Debe enviar una lista de items",
        });
      }

      const pedido = servicio.crearPedido(items, mesaId);

      return res.status(201).json(pedido);
    } catch (error) {
      const mensaje =
        error instanceof Error
          ? error.message
          : "Error al crear el pedido";

      const status = mensaje === "El producto no existe" ? 404 : 400;

      return res.status(status).json({ error: mensaje });
    }
  });

  // GET /pedidos
  router.get("/", (_req, res) => {
    return res.status(200).json(servicio.listarPedidos());
  });

  // GET /pedidos/:id
  router.get("/:id", (req, res) => {
    const id = req.params.id;

    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        error: "El ID del pedido debe ser numérico",
      });
    }

    const pedido = servicio.buscarPorId(id);

    if (!pedido) {
      return res.status(404).json({
        error: "Pedido no encontrado",
      });
    }

    return res.status(200).json(pedido);
  });

  return router;
}
