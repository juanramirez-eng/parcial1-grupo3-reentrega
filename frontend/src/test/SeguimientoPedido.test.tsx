import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SeguimientoPedido from "../pedidos/SeguimientoPedido";

const { mockObtenerPedido } = vi.hoisted(() => ({
  mockObtenerPedido: vi.fn(),
}));

vi.mock("../services/apiClient", () => ({
  obtenerPedido: mockObtenerPedido,
}));

describe("SeguimientoPedido", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockObtenerPedido.mockResolvedValue({
      id: "15",
      mesaId: 4,
      items: [
        { productoId: "1", cantidad: 2 },
        { productoId: "2", cantidad: 1 },
      ],
      estado: "pendiente",
      total: 17220,
    });
  });

  it("muestra el número del pedido que se está siguiendo", () => {
    render(<SeguimientoPedido pedidoId="15" />);

    expect(screen.getByText(/Pedido #?15/)).toBeInTheDocument();
  });

  it("consulta el estado del pedido al presionar el botón", async () => {
    render(<SeguimientoPedido pedidoId="15" />);

    fireEvent.click(
      screen.getByRole("button", { name: /consultar estado/i })
    );

    await waitFor(() => {
      expect(mockObtenerPedido).toHaveBeenCalledWith("15");
    });
  });

  it("muestra el estado devuelto por la API", async () => {
    render(<SeguimientoPedido pedidoId="15" />);

    fireEvent.click(
      screen.getByRole("button", { name: /consultar estado/i })
    );

    expect(await screen.findByText(/pendiente/i)).toBeInTheDocument();
  });

  it("muestra un mensaje mientras consulta el pedido", async () => {
    let resolver!: (value: unknown) => void;

    mockObtenerPedido.mockReturnValueOnce(
      new Promise((resolve) => {
        resolver = resolve;
      })
    );

    render(<SeguimientoPedido pedidoId="15" />);

    fireEvent.click(
      screen.getByRole("button", { name: /consultar estado/i })
    );

    expect(screen.getByText(/consultando/i)).toBeInTheDocument();

    resolver({
      id: "15",
      mesaId: 4,
      items: [],
      estado: "en preparación",
      total: 17220,
    });

    expect(await screen.findByText(/en preparación/i)).toBeInTheDocument();
  });

  it("muestra el error devuelto por la API", async () => {
    mockObtenerPedido.mockRejectedValueOnce(
      new Error("No se pudo encontrar el pedido")
    );

    render(<SeguimientoPedido pedidoId="15" />);

    fireEvent.click(
      screen.getByRole("button", { name: /consultar estado/i })
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "No se pudo encontrar el pedido"
    );
  });

  it("permite volver a consultar el estado del pedido", async () => {
    render(<SeguimientoPedido pedidoId="15" />);

    fireEvent.click(
      screen.getByRole("button", { name: /consultar estado/i })
    );

    expect(await screen.findByText(/pendiente/i)).toBeInTheDocument();

    mockObtenerPedido.mockResolvedValueOnce({
      id: "15",
      mesaId: 4,
      items: [],
      estado: "entregado",
      total: 17220,
    });

    fireEvent.click(
      screen.getByRole("button", { name: /consultar estado/i })
    );

    expect(await screen.findByText(/entregado/i)).toBeInTheDocument();

    expect(mockObtenerPedido).toHaveBeenCalledTimes(2);
  });
});