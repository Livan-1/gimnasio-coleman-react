// src/__tests__/app.test.js
import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("App (integración estable)", () => {
  test("abre y cierra el carrito desde el header correctamente", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Buscar el botón "Carrito" únicamente dentro del header
    const header = screen.getByRole("banner");
    const abrirCarrito = within(header).getByRole("button", { name: "Carrito" });

    // Abre el carrito
    await user.click(abrirCarrito);
    const carrito = await screen.findByRole("complementary", { name: /carrito de compras/i });
    expect(carrito.className).toMatch(/show/);

    // Cierra el carrito
    const cerrarBtn = within(carrito).getByRole("button", { name: /cerrar carrito/i });
    await user.click(cerrarBtn);
    expect(carrito.className).not.toMatch(/show/);
  });

  test("el header contiene los tres botones principales", () => {
    render(<App />);
    const header = screen.getByRole("banner");
    const botones = within(header).getAllByRole("button");
    const nombres = botones.map((b) => b.textContent?.trim().toLowerCase());
    expect(nombres).toEqual(expect.arrayContaining(["menú", "ingresar", "carrito"]));
  });
});
