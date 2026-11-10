import { Router } from "express";
import type { ReportesService } from "../services/reportes.service.js";

export function createReportesRouter(reportesService: ReportesService): Router {
  const router = Router();

  // GET /reportes/facturacion
  router.get("/facturacion", (_req, res) => {
    return res.status(200).json({ facturacion: reportesService.facturacion() });
  });


    // GET /reportes/mas-vendidos
  router.get("/mas-vendidos", (_req, res) => {
    return res.status(200).json(reportesService.masVendidos());
  });

  return router;
}