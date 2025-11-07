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
  { sku: 'AC-001', name: 'Guantes Coleman', price: 10000, image: '/guantes_fake_coleman.jpg' },
  { sku: 'AC-002', name: 'Botella Deportiva', price: 8000, image: '/botella_fake_coleman.jpg' },
  { sku: 'AC-003', name: 'Bandas Elásticas', price: 12000, image: '/bandas_fake_coleman.jpg' },
  { sku: 'AC-004', name: 'Polera Oficial', price: 15000, image: '/poleron_fake_coleman.jpg' },
  { sku: 'JPE-001', name: 'jabon antibacterial', price: 2000, image: '/JABON_FAKE_COLEMAN.jpg' }
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