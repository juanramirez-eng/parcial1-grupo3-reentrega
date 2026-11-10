
import type { Pedido, ItemPedido } from "../models/pedido.model.js";
import { PedidoRepository } from "../repositories/pedido.repository.js";
import type { CatalogoService } from "./catalogo.service.js";

export class PedidoService {
  constructor(
    private catalogo: CatalogoService,
    private repositorio: PedidoRepository
  ) {}

  crearPedido(items: ItemPedido[], mesaId?: number | null): Pedido {
  const mesa = this.validarMesaId(mesaId);

  if (items.length === 0) {
    throw new Error("El pedido no puede estar vacío");
  }

  let total = 0;

  for (const item of items) {
    if (!Number.isInteger(item.cantidad) || item.cantidad <= 0) {
      throw new Error("La cantidad debe ser un entero mayor a cero");
    }

    const producto = this.catalogo.obtenerPorId(String(item.productoId));
    if (!producto) {
      throw new Error("El producto no existe");
    }

    total += producto.calcularPrecio() * item.cantidad;
  }

  const pedido: Pedido = {
    id: this.repositorio.generarId(),
    mesaId: mesa,
    items: items.map((item) => ({ ...item })),
    estado: "pendiente",
    total,
  };

  this.repositorio.guardar(pedido);

  return pedido;
}

  private validarMesaId(mesaId: unknown): number | null {
    if (mesaId === undefined || mesaId === null) return null;
    if (typeof mesaId !== "number" || !Number.isInteger(mesaId) || mesaId <= 0) {
      throw new Error("mesaId debe ser un entero positivo");
    }
    return mesaId;
  }

  listarPedidos(): Pedido[] {
    return this.repositorio.listar();
  }

  buscarPorId(id: string): Pedido | undefined {
    return this.repositorio.buscarPorId(id);
  }

  limpiarPedidos(): void {
    this.repositorio.limpiar();
  }
}
