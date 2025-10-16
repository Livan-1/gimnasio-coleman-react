// src/App.js

import { useState } from 'react';
import './style.css';

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

const storeProducts = [
  { sku: 'AC-001', name: 'Guantes Coleman', price: 10000, image: 'https://images.unsplash.com/photo-1579722820308-4e071fcbff81?q=80&w=1200&auto=format&fit=crop' },
  { sku: 'AC-002', name: 'Botella Deportiva', price: 8000, image: 'https://images.unsplash.com/photo-1543832923-4664b0972e29?q=80&w=1200&auto=format&fit=crop' },
  { sku: 'AC-003', name: 'Bandas Elásticas', price: 12000, image: 'https://plus.unsplash.com/premium_photo-1679923834240-3a56233d45f3?q=80&w=1200&auto=format&fit=crop' },
  { sku: 'AC-004', name: 'Polera Oficial', price: 15000, image: 'https://images.unsplash.com/photo-1582874134106-03e1c667a7a3?q=80&w=1200&auto=format&fit=crop' },
];

function App() {
  const [isCartVisible, setCartVisible] = useState(false);
  const [isLoginVisible, setLoginVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (productToAdd) => {
    const existingItem = cartItems.find(item => item.sku === productToAdd.sku);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.sku === productToAdd.sku ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
    }
    setCartVisible(true);
  };

  const handleRemoveFromCart = (skuToRemove) => {
    setCartItems(cartItems.filter(item => item.sku !== skuToRemove));
  };

  const handleDecreaseQuantity = (skuToDecrease) => {
    const existingItem = cartItems.find(item => item.sku === skuToDecrease);
    if (existingItem.quantity === 1) {
      handleRemoveFromCart(skuToDecrease);
    } else {
      setCartItems(cartItems.map(item =>
        item.sku === skuToDecrease ? { ...item, quantity: item.quantity - 1 } : item
      ));
    }
  };

  return (
    <>
      <Header
        onCartClick={() => setCartVisible(true)}
        onLoginClick={() => setLoginVisible(true)}
        cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
      />
      <main>
        <Hero />
        <Plans />
        <Classes />
        <Store products={storeProducts} onAddToCart={handleAddToCart} />
        <Sedes />
        <Blog />
      </main>
      <Footer />
      <Cart
        isVisible={isCartVisible}
        onClose={() => setCartVisible(false)}
        items={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onDecreaseItem={handleDecreaseQuantity}
        onIncreaseItem={handleAddToCart} // <-- Aquí se pasa la función
      />
      <LoginModal
        isVisible={isLoginVisible}
        onClose={() => setLoginVisible(false)}
      />
    </>
  );
}

export default App;