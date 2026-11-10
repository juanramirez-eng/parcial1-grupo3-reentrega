import { Router } from "express";
import { CatalogoService } from "../services/catalogo.service";
import { productoARespuesta } from "./producto.respuesta";

export const catalogoRouter = Router();
const service = new CatalogoService();

catalogoRouter.get("/", (_req, res) => {
    res.status(200).json(service.obtenerTodos().map(productoARespuesta));
});

catalogoRouter.get("/:id", (req, res) => {
    const producto = service.obtenerPorId(req.params.id);

    if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.status(200).json(productoARespuesta(producto));
});