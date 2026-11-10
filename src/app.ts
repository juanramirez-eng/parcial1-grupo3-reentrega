import express from "express";
import { catalogoRouter } from "./routers/catalogo.router";

export const app = express();

app.use(express.json());

app.use("/productos", catalogoRouter);

app.use((_req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});