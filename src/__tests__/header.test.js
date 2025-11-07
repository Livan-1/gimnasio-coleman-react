// src/__tests__/header.test.js
import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../components/Header";

describe("Header", () => {
  test("renderiza botones Menú, Ingresar y Carrito", () => {
    render(<Header onCartClick={() => {}} onLoginClick={() => {}} />);
    // Aseguramos que existan los 3 botones
    const header = screen.getByRole("banner");
    expect(within(header).getByRole("button", { name: /menú/i })).toBeInTheDocument();
    expect(within(header).getByRole("button", { name: /ingresar/i })).toBeInTheDocument();
    // Buscamos el 'Carrito' EXACTO dentro del header (evita confundir con 'Cerrar carrito')
    expect(within(header).getByRole("button", { name: /^carrito$/i })).toBeInTheDocument();
  });

  test("dispara onCartClick y onLoginClick", async () => {
    const user = userEvent.setup();
    const onCartClick = jest.fn();
    const onLoginClick = jest.fn();
    render(<Header onCartClick={onCartClick} onLoginClick={onLoginClick} />);

    const header = screen.getByRole("banner");
    await user.click(within(header).getByRole("button", { name: /^carrito$/i }));
    await user.click(within(header).getByRole("button", { name: /ingresar/i }));

    expect(onCartClick).toHaveBeenCalledTimes(1);
    expect(onLoginClick).toHaveBeenCalledTimes(1);
  });

  test("estructura accesible del header", () => {
    render(<Header onCartClick={() => {}} onLoginClick={() => {}} />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  test("los tres botones existen por role", () => {
    render(<Header onCartClick={() => {}} onLoginClick={() => {}} />);
    const header = screen.getByRole("banner");
    const botones = within(header).getAllByRole("button");
    expect(botones.length).toBeGreaterThanOrEqual(3);
  });
});
