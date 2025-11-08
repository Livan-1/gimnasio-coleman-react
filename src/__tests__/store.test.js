import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Store from "../components/Store";

const mockProducts = [
  { sku: "AC-001", name: "Guantes Coleman", price: 10000, category: "fuerza", image: "/guantes_fake_coleman.jpg" },
  { sku: "AC-002", name: "Botella Deportiva", price: 8000, category: "cardio", image: "/botella_fake_coleman.jpg" },
];

describe("Store", () => {
  test("renderiza los nombres de los productos correctamente", () => {
    render(<Store products={mockProducts} onAddToCart={() => {}} />);
    expect(screen.getByText(/guantes coleman/i)).toBeInTheDocument();
    expect(screen.getByText(/botella deportiva/i)).toBeInTheDocument();
  });

  test("cada producto tiene su botón Agregar", () => {
    render(<Store products={mockProducts} onAddToCart={() => {}} />);
    const botones = screen.getAllByRole("button", { name: /agregar/i });
    expect(botones.length).toBe(mockProducts.length);
  });

  test("al hacer clic en Agregar se llama onAddToCart con el SKU del producto", async () => {
    const user = userEvent.setup();
    const onAddToCart = jest.fn();
    render(<Store products={mockProducts} onAddToCart={onAddToCart} />);

    const botones = screen.getAllByRole("button", { name: /agregar/i });
    await user.click(botones[1]); // clic en el segundo producto

    expect(onAddToCart).toHaveBeenCalledTimes(1);
    expect(onAddToCart).toHaveBeenCalledWith(mockProducts[1].sku);
  });

  test("si la lista está vacía, se muestra el encabezado y el contenedor de tienda", () => {
    render(<Store products={[]} onAddToCart={() => {}} />);
    expect(screen.getByText(/tienda/i)).toBeInTheDocument();

    const contenedor = document.querySelector(".grid.store");
    expect(contenedor).toBeInTheDocument();
  });
});
