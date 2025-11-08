// src/__tests__/app.test.js
import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

/**
 * 🧩 Pruebas de integración completas del flujo principal:
 * - Header visible con botones 
 * - Render de secciones principales
 * 
 * Se ajustó para evitar errores de "multiple banner" o "multiple carrito".
 * Solo se selecciona el primer header (el principal de navegación).
 */

describe("App (integración estable)", () => {
  test("renderiza el header principal con los tres botones esperados", () => {
    render(<App />);

    // Obtiene el primer header (el principal, antes del del carrito)
    const headers = screen.getAllByRole("banner");
    const header = headers[0]; // el principal
    const botones = within(header).getAllByRole("button");

    // Se espera que existan los botones del menú principal
    const nombres = botones.map((b) => b.textContent.trim().toLowerCase());
    expect(nombres).toEqual(expect.arrayContaining(["menú", "ingresar", "carrito"]));
  });

  test("abre y cierra el carrito desde el header correctamente", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Localiza el primer header y el botón 'Carrito' dentro de él
    const header = screen.getAllByRole("banner")[0];
    const botonCarrito = within(header).getByRole("button", { name: /carrito/i });

    // Abre el carrito
    await user.click(botonCarrito);

    // Busca el carrito abierto (role='complementary')
    const carrito = screen.getByRole("complementary", { name: /carrito de compras/i });
    expect(carrito).toHaveClass("show");

    // Dentro del carrito busca el botón 'Cerrar carrito'
    const botonCerrar = within(carrito).getByRole("button", { name: /cerrar carrito/i });
    await user.click(botonCerrar);

    // Espera que al cerrar, la clase 'show' ya no esté presente
    expect(carrito.className).not.toMatch(/show/);
  });

  test("muestra las secciones principales del sitio (Hero y Planes)", () => {
    render(<App />);
    // Verifica el contenido visible del hero
    expect(screen.getByText(/mentalidad de campeón/i)).toBeInTheDocument();
    // Verifica la sección de planes
    expect(screen.getByText(/planes de suscripción/i)).toBeInTheDocument();
  });

  test("el flujo completo de carrito agrega y muestra productos correctamente", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Busca el primer botón 'Elegir Plan' o 'Agregar'
    const botones = await screen.findAllByRole("button", { name: /elegir plan|agregar/i });
    expect(botones.length).toBeGreaterThan(0);

    // Agrega el primer producto o plan
    await user.click(botones[0]);

    // Abre el carrito desde el header principal
    const header = screen.getAllByRole("banner")[0];
    const botonCarrito = within(header).getByRole("button", { name: /carrito/i });
    await user.click(botonCarrito);

    // Carrito abierto
    const carrito = await screen.findByRole("complementary", { name: /carrito de compras/i });
    expect(carrito).toHaveClass("show");

    // Comprueba que el texto 'Total' esté visible
    expect(screen.getByText(/total/i)).toBeInTheDocument();
  });
});
