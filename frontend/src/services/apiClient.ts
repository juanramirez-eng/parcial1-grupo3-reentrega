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