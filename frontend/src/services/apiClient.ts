import { CatalogoResponseSchema, type Producto } from "../schemas/producto.schema";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export class ApiError extends Error {
    readonly status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

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

export interface CrearPedidoDTO {
    mesaId: number | null;
    items: ItemPedido[];
}


export async function fetchProductos(): Promise<Producto[]> {
    let response: Response;

    try {
        response = await fetch(`${BASE_URL}/productos`);
    } catch {
        throw new ApiError(0, "Error de conexión con el servidor");
    }

    if (!response.ok) {
        let mensaje = "Error al obtener el catálogo";
        try {
            const data = (await response.json()) as { error?: string };
            if (data && typeof data.error === "string") {
                mensaje = data.error;
            }
        } catch {
            // Preserva mensaje por defecto
        }
        throw new ApiError(response.status, mensaje);
    }

    const json = await response.json();
    const parsed = CatalogoResponseSchema.safeParse(json);

    if (!parsed.success) {
        throw new ApiError(502, "La respuesta del servidor no cumple con el contrato esperado");
    }

    return parsed.data;
}


export async function crearPedido(datos: CrearPedidoDTO): Promise<Pedido> {
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
        let mensaje = "Error al crear el pedido";

        try {
            const data = (await response.json()) as { error?: string };
            if (typeof data.error === "string") {
                mensaje = data.error;
            }
        } catch {
            // Conserva el mensaje por defecto
        }

        throw new ApiError(response.status, mensaje);
    }

    return (await response.json()) as Pedido;
}

export async function obtenerPedido(id: string): Promise<Pedido> {
    let response: Response;

    try {
        response = await fetch(`${BASE_URL}/pedidos/${id}`);
    } catch {
        throw new ApiError(0, "Error de conexión con el servidor");
    }

    if (!response.ok) {
        let mensaje = "Error al obtener el pedido";

        try {
            const data = (await response.json()) as { error?: string };

            if (typeof data.error === "string") {
                mensaje = data.error;
            }
        } catch {
            // Conserva el mensaje por defecto
        }

        throw new ApiError(response.status, mensaje);
    }

    return (await response.json()) as Pedido;
}