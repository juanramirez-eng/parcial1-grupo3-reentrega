
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ConfirmarPedido from "../pedidos/ConfirmarPedido";

const { mockUseCart } = vi.hoisted(() => ({
  mockUseCart: vi.fn(),
}));

vi.mock("../carrito/CartContext", () => ({
  useCart: mockUseCart,
}));

describe("ConfirmarPedido", () => {
  beforeEach(() => {
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
      vaciar: vi.fn(),
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
    vaciar: vi.fn(),
  });

  render(<ConfirmarPedido />);

  expect(screen.getByText("El carrito está vacío")).toBeInTheDocument();

  expect(
    screen.queryByRole("button", { name: /confirmar pedido/i })
  ).not.toBeInTheDocument();
});

});
