import { z } from "zod";

export const PedidoSchema = z.object({
  id: z.string(),
  mesaId: z.number().int().positive().nullable(),
  items: z.array(
    z.object({
      productoId: z.string(),
      cantidad: z.number().int().positive(),
    }),
  ),
  estado: z.string(),
  total: z.number(),
});

export type Pedido = z.infer<typeof PedidoSchema>;