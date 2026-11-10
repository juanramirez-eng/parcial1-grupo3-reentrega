
import { Router } from "express";
import { PedidoService } from "../services/pedido.service.js";
import { PedidoRepository } from "../repositories/pedido.repository.js";
import { CatalogoService } from "../services/catalogo.service.js";

const router = Router();
const catalogo = new CatalogoService();


const repositorio = new PedidoRepository();
const servicio = new PedidoService(catalogo, repositorio);

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

export default router;
