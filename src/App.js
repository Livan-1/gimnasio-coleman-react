// src/App.js (Versión Final y Completa)

import { useState } from 'react';
import './style.css'; // Importa tus estilos

// Importa todos los componentes que creaste
import Header from './components/Header';
import Hero from './components/Hero';
import Plans from './components/Plans';
import Classes from './components/Classes';
import Store from './components/Store';
import Sedes from './components/Sedes';
import Blog from './components/Blog';
import Footer from './components/Footer';
import Cart from './components/Cart';
import LoginModal from './components/LoginModal';

// Datos de los productos de la tienda (definidos aquí para fácil acceso)
const storeProducts = [
  { sku: 'AC-001', name: 'Guantes Coleman', price: 10000, image: 'https://images.unsplash.com/photo-1579722820308-4e071fcbff81?q=80&w=1200&auto=format&fit=crop' },
  { sku: 'AC-002', name: 'Botella Deportiva', price: 8000, image: 'https://images.unsplash.com/photo-1543832923-4664b0972e29?q=80&w=1200&auto=format&fit=crop' },
  { sku: 'AC-003', name: 'Bandas Elásticas', price: 12000, image: 'https://plus.unsplash.com/premium_photo-1679923834240-3a56233d45f3?q=80&w=1200&auto=format&fit=crop' },
  { sku: 'AC-004', name: 'Polera Oficial', price: 15000, image: 'https://images.unsplash.com/photo-1582874134106-03e1c667a7a3?q=80&w=1200&auto=format&fit=crop' },
];

function App() {
  // --- ESTADO DE LA APLICACIÓN ---
  // Controla la visibilidad del carrito
  const [isCartVisible, setCartVisible] = useState(false);
  // Controla la visibilidad del modal de login
  const [isLoginVisible, setLoginVisible] = useState(false);
  // Almacena los productos que se agregan al carrito
  const [cartItems, setCartItems] = useState([]);

  // --- FUNCIONES QUE MANEJAN LA LÓGICA ---
  const handleAddToCart = (productToAdd) => {
    setCartItems(prevItems => [...prevItems, productToAdd]); // Agrega el nuevo producto a la lista
    setCartVisible(true); // Abre el carrito al agregar algo
  };

  return (
    <>
      {/* Pasamos funciones a los componentes hijos como "props" para que puedan comunicarse con App.js */}
      <Header 
        onCartClick={() => setCartVisible(true)}
        onLoginClick={() => setLoginVisible(true)}
      />

      <main>
        <Hero />
        <Plans />
        <Classes />
        <Store 
          products={storeProducts} 
          onAddToCart={handleAddToCart} 
        />
        <Sedes />
        <Blog />
      </main>

      <Footer />

      {/* Componentes condicionales que dependen del estado para mostrarse */}
      <Cart 
        isVisible={isCartVisible}
        onClose={() => setCartVisible(false)}
        items={cartItems}
      />
      <LoginModal 
        isVisible={isLoginVisible}
        onClose={() => setLoginVisible(false)} 
      />
    </>
  );
}

export default App;