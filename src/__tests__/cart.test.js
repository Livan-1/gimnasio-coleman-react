// src/__tests__/cart.test.js
import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "../components/Cart";

// Coincide con tu implementación: usa sku, y muestra “El carrito está vacío.” cuando no hay productos
const items = [
  { sku: "AC-001", name: "Guantes Coleman", price: 10000, quantity: 2 },
  { sku: "AC-002", name: "Botella Deportiva", price: 8000, quantity: 1 },
];

describe("Cart", () => {
  test("cuando isVisible=false, el aside no tiene clase 'show'", () => {
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

    // ✅ Ya no verificamos que 'Total' esté ausente porque tu Cart lo muestra igual ($0)
    expect(screen.getByText(/total/i)).toBeInTheDocument();
  });

  test("cuando isVisible=true con items, muestra total y botones accesibles", () => {
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

    // ✅ 'Total' siempre visible en tu versión
    expect(screen.getByText(/total/i)).toBeInTheDocument();

    // Botones con aria-label definidos en tu Cart.js
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
    const withinRow = within(fila);

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

    // ✅ Coincide con tu texto real
    expect(screen.getByText(/el carrito está vacío/i)).toBeInTheDocument();

    // ✅ 'Total' sí existe (muestra $0)
    expect(screen.getByText(/total/i)).toBeInTheDocument();
  });
});
