import { CatalogoService } from "./catalogo.service.js";
import type { PedidoService } from "./pedido.service.js";

export class ReportesService {
  constructor(
    private pedidos: PedidoService,
    private catalogo: CatalogoService
  ) {}

  // Suma las cantidades vendidas de cada producto acumulando todos los pedidos
  cantidadesVendidas(): Map<number, number> {
    const cantidades = new Map<number, number>();

    for (const pedido of this.pedidos.listarPedidos()) {
      for (const item of pedido.items) {
        const productoId = Number(item.productoId);
        cantidades.set(
          productoId,
          (cantidades.get(productoId) ?? 0) + item.cantidad
        );
      }
    }

    return cantidades;
  }
}