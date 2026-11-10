import "./pollyfill.ts";
import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { fetchProductos, crearPedido, obtenerPedido } from "../services/apiClient";

const API_URL = "http://localhost:3000/productos";
const PEDIDOS_URL = "http://localhost:3000/pedidos";

const mockProductos = [
    { id: 1, tipo: "expreso", nombre: "Expreso Pocillo", precio: 5020 },
];

const server = setupServer(
    http.get(API_URL, () => HttpResponse.json(mockProductos)),
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
            http.get(API_URL, () => {
                return HttpResponse.json({ error: "Fallo en el servidor" }, { status: 500 });
            }),
        );
        await expect(fetchProductos()).rejects.toThrow("Fallo en el servidor");
    });

    it("lanza ApiError si el JSON recibido no cumple con el esquema Zod", async () => {
        server.use(
            http.get(API_URL, () => HttpResponse.json([{ id: 1, tipo: "invalido" }])),
        );
        await expect(fetchProductos()).rejects.toThrow(/contrato/i);
    });

    it("lanza ApiError de red cuando el servidor esta caido", async () => {
        server.use(
            http.get(API_URL, () => HttpResponse.error()),
        );
        await expect(fetchProductos()).rejects.toThrow("Error de conexión con el servidor");
    });

describe("apiClient - crearPedido", () => {
    it("crea un pedido y devuelve los datos de la API", async () => {
        const mockPedido = {
            id: "1",
            mesaId: 4,
            items: [
                {
                    productoId: "1",
                    cantidad: 2,
                },
            ],
            estado: "pendiente",
            total: 10040,
        };

        server.use(
            http.post(PEDIDOS_URL, () => {
                return HttpResponse.json(mockPedido, { status: 201 });
            }),
        );

        const pedido = await crearPedido({
            mesaId: 4,
            items: [{ productoId: "1", cantidad: 2 }],
        });

        expect(pedido).toEqual(mockPedido);
    });

    
it("informa el error 400 devuelto por la API", async () => {
    server.use(
        http.post(PEDIDOS_URL, () =>
            HttpResponse.json(
                { error: "La cantidad debe ser un entero mayor a cero" },
                { status: 400 },
            ),
        ),
    );

    await expect(
        crearPedido({
            mesaId: 4,
            items: [{ productoId: "1", cantidad: 0 }],
        }),
    ).rejects.toThrow("La cantidad debe ser un entero mayor a cero");
});

it("informa el error 404 devuelto por la API", async () => {
    server.use(
        http.post(PEDIDOS_URL, () =>
            HttpResponse.json(
                { error: "El producto no existe" },
                { status: 404 },
            ),
        ),
    );

    await expect(
        crearPedido({
            mesaId: 4,
            items: [{ productoId: "999", cantidad: 1 }],
        }),
    ).rejects.toThrow("El producto no existe");
});

it("informa un error cuando falla la conexión", async () => {
    server.use(
        http.post(PEDIDOS_URL, () => HttpResponse.error()),
    );

    await expect(
        crearPedido({
            mesaId: 4,
            items: [{ productoId: "1", cantidad: 1 }],
        }),
    ).rejects.toThrow("Error de conexión con el servidor");
});

});

describe("apiClient - obtenerPedido", () => {

    it("obtiene un pedido por su ID", async () => {
        const mockPedido = {
            id: "1",
            mesaId: 4,
            items: [
                {
                    productoId: "1",
                    cantidad: 2,
                },
            ],
            estado: "pendiente",
            total: 10040,
        };

        server.use(
            http.get(`${PEDIDOS_URL}/1`, () =>
                HttpResponse.json(mockPedido),
            ),
        );

        const pedido = await obtenerPedido("1");

        expect(pedido).toEqual(mockPedido);
    });
    
it("informa cuando el pedido no existe", async () => {
    server.use(
        http.get(`${PEDIDOS_URL}/999`, () =>
            HttpResponse.json(
                { error: "Pedido no encontrado" },
                { status: 404 },
            ),
        ),
    );

    await expect(obtenerPedido("999")).rejects.toThrow(
        "Pedido no encontrado",
    );
});

it("informa un error 500 del servidor", async () => {
    server.use(
        http.get(`${PEDIDOS_URL}/1`, () =>
            HttpResponse.json(
                { error: "Error interno del servidor" },
                { status: 500 },
            ),
        ),
    );

    await expect(obtenerPedido("1")).rejects.toThrow(
        "Error interno del servidor",
    );
});

it("informa un error cuando falla la conexión", async () => {
    server.use(
        http.get(`${PEDIDOS_URL}/1`, () => HttpResponse.error()),
    );

    await expect(obtenerPedido("1")).rejects.toThrow(
        "Error de conexión con el servidor",
    );
});

});
});