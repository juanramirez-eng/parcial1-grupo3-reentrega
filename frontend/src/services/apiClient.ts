import {
  CatalogoResponseSchema,
  type Producto,
} from "../schemas/producto.schema";

import {
  PedidoSchema,
  type Pedido,
} from "../schemas/pedido.schema";

const BASE_URL = import.meta.env.VITE_API_URL || "";

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function obtenerMensajeError(
  response: Response,
  mensajeDefault: string,
): Promise<string> {
  try {
    const data = (await response.json()) as { error?: string };

    if (data && typeof data.error === "string") {
      return data.error;
    }
  } catch {
    // Conserva el mensaje por defecto.
  }

  return mensajeDefault;
}

export async function fetchProductos(): Promise<Producto[]> {
  let response: Response;

  try {
    response = await fetch(`${BASE_URL}/productos`);
  } catch {
    throw new ApiError(0, "Error de conexión con el servidor");
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      await obtenerMensajeError(
        response,
        "Error al obtener el catálogo",
      ),
    );
  }

  const json = await response.json();
  const parsed = CatalogoResponseSchema.safeParse(json);

  if (!parsed.success) {
    throw new ApiError(
      502,
      "La respuesta del servidor no cumple con el contrato esperado",
    );
  }

  return parsed.data;
}

interface CrearPedidoInput {
  mesaId: number | null;
  items: {
    productoId: string;
    cantidad: number;
  }[];
}

export async function crearPedido(
  datos: CrearPedidoInput,
): Promise<Pedido> {
  let response: Response;

  try {
    response = await fetch(`${BASE_URL}/pedidos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    });
  } catch {
    throw new ApiError(0, "Error de conexión con el servidor");
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      await obtenerMensajeError(
        response,
        "Error al crear el pedido",
      ),
    );
  }

  const json = await response.json();
  const parsed = PedidoSchema.safeParse(json);

  if (!parsed.success) {
    throw new ApiError(
      502,
      "La respuesta del servidor no cumple con el contrato esperado",
    );
  }

  return parsed.data;
}

export async function fetchPedido(id: string): Promise<Pedido> {
  let response: Response;

  try {
    response = await fetch(`${BASE_URL}/pedidos/${id}`);
  } catch {
    throw new ApiError(0, "Error de conexión con el servidor");
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      await obtenerMensajeError(
        response,
        "Error al obtener el pedido",
      ),
    );
  }

  const json = await response.json();
  const parsed = PedidoSchema.safeParse(json);

  if (!parsed.success) {
    throw new ApiError(
      502,
      "La respuesta del servidor no cumple con el contrato esperado",
    );
  }

  return parsed.data;
}