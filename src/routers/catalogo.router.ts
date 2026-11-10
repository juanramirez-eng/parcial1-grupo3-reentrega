import { Router } from "express";
import { CatalogoService } from "../services/catalogo.service";

export const catalogoRouter = Router();
const service = new CatalogoService();

catalogoRouter.get("/", (_req, res) => {
    const productos = service.obtenerTodos().map((p) => ({
        id: p.id,
        nombre: p.nombre,
        precioBase: p.precioBase,
        precioFinal: p.calcularPrecio(),
    }));
    res.status(200).json(productos);
});