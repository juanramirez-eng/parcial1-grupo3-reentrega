
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
      error instanceof Error ? error.message : "Error al crear el pedido";

    // 3) producto inexistente -> 404, el resto -> 400
    const status = mensaje === "El producto no existe" ? 404 : 400;

    return res.status(status).json({ error: mensaje });
  }
});

// GET /pedidos
router.get("/", (_req, res) => {
  return res.json(servicio.listarPedidos());
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

export default router;
