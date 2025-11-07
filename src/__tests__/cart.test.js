// src/__tests__/cart.test.js
import React from "react";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "../components/Cart";

// OJO: Tus items reales usan sku (no id). Mantengo 'sku' aquí para coincidir con tu Cart.js
const items = [
  { sku: "AC-001", name: "Guantes Coleman", price: 10000, quantity: 2 },
  { sku: "AC-002", name: "Botella Deportiva", price: 8000, quantity: 1 },
];

describe("Cart", () => {
  test("cuando isVisible=false, el aside no tiene clase 'show' y no hay 'Total'", () => {
    render(
      <Cart
        isVisible={false}
        onClose={() => {}}
        items={[]}
        onRemoveItem={() => {}}
        onDecreaseItem={() => {}}
        onIncreaseItem={() => {}}
      />
    );
    const aside = screen.getByRole("complementary", { name: /carrito de compras/i });
    expect(aside.className).not.toMatch(/show/);
    // Con items vacíos, no aparece 'Total'
    expect(screen.queryByText(/total/i)).toBeNull();
  });

  test("cuando isVisible=true con items, aparece Total y botones accesibles", () => {
    render(
      <Cart
        isVisible={true}
        onClose={() => {}}
        items={items}
        onRemoveItem={() => {}}
        onDecreaseItem={() => {}}
        onIncreaseItem={() => {}}
      />
    );
    const aside = screen.getByRole("complementary", { name: /carrito de compras/i });
    expect(aside.className).toMatch(/show/);

    // Total visible
    expect(screen.getByText(/total/i)).toBeInTheDocument();

    // Botones por aria-label (coinciden con tu Cart.js publicado)
    expect(screen.getAllByRole("button", { name: /aumentar cantidad/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /disminuir cantidad/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: /eliminar producto/i }).length).toBeGreaterThan(0);
  });

  test("disminuir/aumentar/eliminar invocan callbacks con el sku correcto", async () => {
    const user = userEvent.setup();
    const onDecreaseItem = jest.fn();
    const onIncreaseItem = jest.fn();
    const onRemoveItem = jest.fn();

    render(
      <Cart
        isVisible={true}
        onClose={() => {}}
        items={[items[0]]}
        onRemoveItem={onRemoveItem}
        onDecreaseItem={onDecreaseItem}
        onIncreaseItem={onIncreaseItem}
      />
    );

    const fila = screen.getByText(/guantes coleman/i).closest("article");
    expect(fila).not.toBeNull();
    const withinRow = within(fila!);

    await user.click(withinRow.getByRole("button", { name: /disminuir cantidad/i }));
    await user.click(withinRow.getByRole("button", { name: /aumentar cantidad/i }));
    await user.click(withinRow.getByRole("button", { name: /eliminar producto/i }));

    expect(onDecreaseItem).toHaveBeenCalledWith("AC-001");
    expect(onIncreaseItem).toHaveBeenCalledWith("AC-001");
    expect(onRemoveItem).toHaveBeenCalledWith("AC-001");
  });

  test("el botón 'Cerrar carrito' dispara onClose", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    render(
      <Cart
        isVisible={true}
        onClose={onClose}
        items={items}
        onRemoveItem={() => {}}
        onDecreaseItem={() => {}}
        onIncreaseItem={() => {}}
      />
    );
    await user.click(screen.getByRole("button", { name: /cerrar carrito/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("muestra mensaje de vacío cuando items=[] y isVisible=true", () => {
    render(
      <Cart
        isVisible={true}
        onClose={() => {}}
        items={[]}
        onRemoveItem={() => {}}
        onDecreaseItem={() => {}}
        onIncreaseItem={() => {}}
      />
    );
    expect(screen.getByText(/no hay productos en el carrito/i)).toBeInTheDocument();
    expect(screen.queryByText(/total/i)).toBeNull();
  });
});
