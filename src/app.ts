import express from "express";

import { CatalogoService } from "./services/catalogo.service.js";
import { PedidoRepository } from "./repositories/pedido.repository.js";
import { PedidoService } from "./services/pedido.service.js";
import { ReportesService } from "./services/reportes.service.js";
import { catalogoRouter } from "./routers/catalogo.router.js";
import { createPedidoRouter } from "./routers/pedido.router.js";
import { createReportesRouter } from "./routers/reportes.router.js";


export const app = express();

app.use(express.json());

const catalogo = new CatalogoService();
const pedidoRepository = new PedidoRepository();
const pedidoService = new PedidoService(catalogo, pedidoRepository);
const reportesService = new ReportesService(pedidoService, catalogo);

app.use("/productos", catalogoRouter);

app.use("/pedidos", createPedidoRouter(pedidoService));
app.use("/reportes", createReportesRouter(reportesService));


if (process.env.NODE_ENV === "test") {
  app.post("/__test__/reset", (_req, res) => {
    pedidoService.limpiarPedidos();
    return res.status(204).send();
  });

  app.post("/__test__/seed", (_req, res) => {
    return res.status(204).send();
  });
}

app.use((_req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
  });

});