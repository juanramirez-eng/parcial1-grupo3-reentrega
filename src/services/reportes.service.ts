import { CatalogoService } from "./catalogo.service.js";
import type { PedidoService } from "./pedido.service.js";

export interface ProductoVendido {
  productoId: number;
  nombre: string;
  cantidad: number;
}

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

    // Total facturado: suma de los totales de todos los pedidos
  facturacion(): number {
    return this.pedidos
      .listarPedidos()
      .reduce((acumulado, pedido) => acumulado + pedido.total, 0);
  }

    // Productos con mayor cantidad vendida; en caso de empate devuelve todos
  masVendidos(): ProductoVendido[] {
    const cantidades = this.cantidadesVendidas();

    if (cantidades.size === 0) {
      return [];
    }

    const maximo = Math.max(...cantidades.values());

    return Array.from(cantidades)
      .filter(([, cantidad]) => cantidad === maximo)
      .sort(([idA], [idB]) => idA - idB)
      .map(([productoId, cantidad]) => ({
        productoId,
        nombre: this.catalogo.obtenerPorId(String(productoId))?.nombre ?? "",
        cantidad,
      }));
  }

}