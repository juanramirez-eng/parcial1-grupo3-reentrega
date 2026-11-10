import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { Menu } from "../components/Menu";

const API_URL = "http://localhost:3000/productos";

const mockProductos = [
    {
        id: 1,
        tipo: "expreso",
        nombre: "Expreso Pocillo Colombia",
        precio: 5740,
        tamanio: "pocillo",
        gramosCafe: 18,
        variedad: {
            nombre: "Colombia",
            descripcion: "Notas florales y cítricas",
        },
    },
];

const server = setupServer(
    http.get(API_URL, () => HttpResponse.json(mockProductos)),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Carga del Menú (Funcionalidad 2)", () => {
    it("1. Carga exitosa: muestra indicador de carga y luego la lista de productos", async () => {
        render(<Menu />);
        expect(screen.getByRole("status")).toHaveTextContent(/cargando menú/i);

        expect(await screen.findByRole("heading", { name: "Expreso Pocillo Colombia" })).toBeInTheDocument();
        expect(screen.getByText(/5\.?740/)).toBeInTheDocument();
    });

    it("2. Error 500 con reintento: muestra mensaje de error y recupera al presionar Reintentar", async () => {
        const user = userEvent.setup();
        let intentos = 0;
        server.use(
            http.get(API_URL, () => {
                intentos++;
                if (intentos === 1) {
                    return HttpResponse.json({ error: "Fallo temporal en la base de datos" }, { status: 500 });
                }
                return HttpResponse.json(mockProductos);
            }),
        );

        render(<Menu />);

        const alerta = await screen.findByRole("alert");
        expect(alerta).toHaveTextContent("Fallo temporal en la base de datos");

        const boton = screen.getByRole("button", { name: /reintentar/i });
        await user.click(boton);

        expect(await screen.findByRole("heading", { name: "Expreso Pocillo Colombia" })).toBeInTheDocument();
    });

    it("3. API caida: muestra mensaje claro de conexion", async () => {
        server.use(
            http.get(API_URL, () => HttpResponse.error()),
        );

        render(<Menu />);
        const alerta = await screen.findByRole("alert");
        expect(alerta).toHaveTextContent(/error de conexión/i);
    });

    it("4. Respuesta fuera de contrato: informa incompatibilidad de datos", async () => {
        server.use(
            http.get(API_URL, () => HttpResponse.json([{ id: 1, tipo: "no-valido" }])),
        );

        render(<Menu />);
        const alerta = await screen.findByRole("alert");
        expect(alerta).toHaveTextContent(/no cumple con el contrato/i);
    });
});