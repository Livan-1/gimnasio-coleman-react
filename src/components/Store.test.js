// src/components/Store.test.js

import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom'; // Para .toBeInTheDocument()

// Importamos el componente que vamos a probar
import Store from './Store';

// --- ARRANGE (Organizar) ---
// 1. Creamos datos de productos simulados para pasarlos como props
const mockProducts = [
  { sku: 'P1', name: 'Proteína Whey', price: 10000, image: 'img1.jpg' },
  { sku: 'P2', name: 'Creatina', price: 5000, image: 'img2.jpg' }
];

// 2. Creamos una función "espía" (mock function) de Jest.
// Esto nos permitirá "espiar" si la función onAddToCart es llamada.
const mockOnAddToCart = jest.fn();

// (Opcional pero recomendado) Limpiamos el espía antes de cada prueba
beforeEach(() => {
  mockOnAddToCart.mockClear();
});
// ... (después de la configuración de arriba) ...

describe('Componente Store', () => {

  test('debería renderizar la lista de productos correctamente', () => {
    // 1. Arrange
    render(<Store products={mockProducts} onAddToCart={mockOnAddToCart} />);

    // 2. Act (Consultar)
    // Verificamos que el título esté
    expect(screen.getByText('Tienda')).toBeInTheDocument();

    // Verificamos el primer producto (Proteína)
    expect(screen.getByText('Proteína Whey')).toBeInTheDocument();
    // ¡Ojo con el formato! Tu componente usa .toLocaleString('es-CL')
    expect(screen.getByText('$10.000')).toBeInTheDocument(); 

    // Verificamos el segundo producto (Creatina)
    expect(screen.getByText('Creatina')).toBeInTheDocument();
    expect(screen.getByText('$5.000')).toBeInTheDocument();

    // Verificamos que hay dos imágenes (una por cada producto)
    // Usamos 'alt' text (buena práctica)
    expect(screen.getByAltText('Proteína Whey')).toBeInTheDocument();
    expect(screen.getByAltText('Creatina')).toBeInTheDocument();

    // Verificamos que hay dos botones "Agregar"
    const botones = screen.getAllByRole('button', { name: /Agregar/i });
    expect(botones).toHaveLength(2);
  });

});

// ... (después de la Prueba 1) ...

  test('debería llamar a onAddToCart con el producto correcto al hacer clic', () => {
    // 1. Arrange
    render(<Store products={mockProducts} onAddToCart={mockOnAddToCart} />);

    // 2. Act
    // Vamos a simular que hacemos clic en "Agregar" en la tarjeta de "Creatina"

    // Primero, encontramos la tarjeta (article) de "Creatina"
    const creatinaCard = screen.getByText('Creatina').closest('article');
    
    // Luego, encontramos el botón "Agregar" SÓLO DENTRO de esa tarjeta
    // 'within' es una utilidad de RTL para buscar dentro de un elemento
    const botonCreatina = within(creatinaCard).getByRole('button', { name: /Agregar/i });

    // Simulamos el clic
    fireEvent.click(botonCreatina);

    // 3. Assert
    // Verificamos que nuestra función espía fue llamada una vez
    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);

    // Verificamos QUE FUE LLAMADA CON EL PRODUCTO CORRECTO (el segundo de nuestro array)
    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProducts[1]); // mockProducts[1] es "Creatina"
  });
  // ... (después de la Prueba 2) ...

  test('debería renderizar sin fallar si no hay productos', () => {
    // 1. Arrange
    render(<Store products={[]} onAddToCart={mockOnAddToCart} />); // Pasamos un array vacío

    // 2. Assert
    // El título debe estar
    expect(screen.getByText('Tienda')).toBeInTheDocument();

    // PERO no debe haber botones de "Agregar"
    // Usamos queryBy... que devuelve null si no lo encuentra (en lugar de fallar)
    const botones = screen.queryAllByRole('button', { name: /Agregar/i });
    expect(botones).toHaveLength(0);
  });