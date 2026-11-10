
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ConfirmarPedido from "../pedidos/ConfirmarPedido";

const { mockUseCart, mockCrearPedido, mockVaciar, mockLeerMesa } =
  vi.hoisted(() => ({
    mockUseCart: vi.fn(),
    mockCrearPedido: vi.fn(),
    mockVaciar: vi.fn(),
    mockLeerMesa: vi.fn(),
  }));

vi.mock("../carrito/CartContext", () => ({
  useCart: mockUseCart,
}));

vi.mock("../services/apiClient", () => ({
  crearPedido: mockCrearPedido,
}));

vi.mock("../mesa/leerMesa", () => ({
  leerMesa: mockLeerMesa,
}));

describe("ConfirmarPedido", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseCart.mockReturnValue({
      items: [
        {
          productoId: "1",
          nombre: "Expreso mediano - Colombia",
          precio: 7360,
          cantidad: 2,
        },
        {
          productoId: "2",
          nombre: "Muffin de chocolate",
          precio: 2500,
          cantidad: 1,
        },
      ],
      subtotal: 17220,
      sumar: vi.fn(),
      restar: vi.fn(),
      quitar: vi.fn(),
      vaciar: mockVaciar,
    });

    mockLeerMesa.mockReturnValue(4);

    mockCrearPedido.mockResolvedValue({
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

  it("muestra los productos, cantidades y subtotal del carrito", () => {
    render(<ConfirmarPedido />);

    expect(
      screen.getByText("Expreso mediano - Colombia")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Muffin de chocolate")
    ).toBeInTheDocument();

    expect(screen.getByText("2")).toBeInTheDocument();

    expect(screen.getByText(/17\.220/)).toBeInTheDocument();
  });

  it("no permite confirmar cuando el carrito está vacío", () => {
    mockUseCart.mockReturnValue({
      items: [],
      subtotal: 0,
      sumar: vi.fn(),
      restar: vi.fn(),
      quitar: vi.fn(),
      vaciar: mockVaciar,
    });

    render(<ConfirmarPedido />);

    expect(
      screen.getByText("El carrito está vacío")
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: /confirmar pedido/i })
    ).not.toBeInTheDocument();
  });

  it("envía el pedido con la mesa y los productos del carrito", async () => {
    render(<ConfirmarPedido />);

    fireEvent.click(
      screen.getByRole("button", { name: /confirmar pedido/i })
    );

    await waitFor(() => {
      expect(mockCrearPedido).toHaveBeenCalledWith({
        mesaId: 4,
        items: [
          { productoId: "1", cantidad: 2 },
          { productoId: "2", cantidad: 1 },
        ],
      });
    });

    expect(mockVaciar).toHaveBeenCalled();
  });
});
