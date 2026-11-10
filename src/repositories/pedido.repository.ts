
import type { Pedido } from "../models/pedido.model.js";

export class PedidoRepository {
  private pedidos: Pedido[] = [];
  private siguienteId = 1;

  generarId(): string {
    return String(this.siguienteId++);
  }

  guardar(pedido: Pedido): void {
    this.pedidos.push(pedido);
  }

  listar(): Pedido[] {
    return this.pedidos.map((pedido) => ({
      ...pedido,
      items: pedido.items.map((item) => ({ ...item })),
    }));
  }

  buscarPorId(id: string): Pedido | undefined {
    const pedido = this.pedidos.find(
      (pedido) => pedido.id === id
    );

    if (!pedido) {
      return undefined;
    }

    return {
      ...pedido,
      items: pedido.items.map((item) => ({ ...item })),
    };
  }

  limpiar(): void {
    this.pedidos = [];
  }
}
