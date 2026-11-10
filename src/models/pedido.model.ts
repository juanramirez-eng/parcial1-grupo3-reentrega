export interface ItemPedido {
  productoId: string;
  cantidad: number;
}

export interface Pedido {
  id: string;
  items: ItemPedido[];
  estado: string;
  total: number;
}
