export interface ItemPedido {
  productoId: string;
  cantidad: number;
}

export interface Pedido {
  id: string;
  mesaId: number | null;
  items: ItemPedido[];
  estado: string;
  total: number;
}
