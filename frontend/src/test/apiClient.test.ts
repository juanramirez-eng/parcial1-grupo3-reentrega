import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { fetchProductos, ApiError } from "../services/apiClient";

const mockProductos = [
    { id: 1, tipo: "expreso", nombre: "Expreso Pocillo", precio: 5020 },
];

const server = setupServer(
    http.get("*/productos", () => HttpResponse.json(mockProductos)),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("apiClient - fetchProductos", () => {
    it("obtiene y valida la lista de productos correctamente", async () => {
        const productos = await fetchProductos();
        expect(productos).toHaveLength(1);
        expect(productos[0].nombre).toBe("Expreso Pocillo");
    });

    it("lanza ApiError con el mensaje de error ante respuesta 500", async () => {
        server.use(
            http.get("*/productos", () => {
                return HttpResponse.json({ error: "Fallo en el servidor" }, { status: 500 });
            }),
        );
        await expect(fetchProductos()).rejects.toThrow("Fallo en el servidor");
    });

    it("lanza ApiError si el JSON recibido no cumple con el esquema Zod", async () => {
        server.use(
            http.get("*/productos", () => HttpResponse.json([{ id: 1, tipo: "invalido" }])),
        );
        await expect(fetchProductos()).rejects.toThrow(/contrato/i);
    });

    it("lanza ApiError de red cuando el servidor esta caido", async () => {
        server.use(
            http.get("*/productos", () => HttpResponse.error()),
        );
        await expect(fetchProductos()).rejects.toThrow("Error de conexión con el servidor");
    });
});