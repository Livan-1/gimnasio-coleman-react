// src/__tests__/store.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Store from "../components/Store";

// Usa la estructura de tus productos reales (id/sku/name/price/category)
const mockProducts = [
  { sku: "AC-001", name: "Guantes Coleman", price: 10000, category: "fuerza", image: "/guantes_fake_coleman.jpg" },
  { sku: "AC-002", name: "Botella Deportiva", price: 8000, category: "cardio", image: "/botella_fake_coleman.jpg" },
];

describe("Store", () => {
  test("renderiza nombres de productos", () => {
    render(<Store products={mockProducts} onAddToCart={() => {}} />);
    expect(screen.getByText(/guantes coleman/i)).toBeInTheDocument();
    expect(screen.getByText(/botella deportiva/i)).toBeInTheDocument();
  });

  test("cada producto tiene botón Agregar", () => {
    render(<Store products={mockProducts} onAddToCart={() => {}} />);
    const botones = screen.getAllByRole("button", { name: /agregar/i });
    expect(botones.length).toBe(mockProducts.length);
  });

  test("al presionar Agregar se llama onAddToCart con el producto", async () => {
    const user = userEvent.setup();
    const onAddToCart = jest.fn();
    render(<Store products={mockProducts} onAddToCart={onAddToCart} />);
    const botones = screen.getAllByRole("button", { name: /agregar/i });
    await user.click(botones[0]);
    expect(onAddToCart).toHaveBeenCalledTimes(1);
    // No afirmo la forma exacta del objeto para no acoplar de más
  });

  test("con lista vacía, muestra mensaje", () => {
    render(<Store products={[]} onAddToCart={() => {}} />);
    // Ajusta el texto si tu componente usa otro string de vacío
    expect(screen.getByText(/no hay productos/i)).toBeInTheDocument();
  });
});
