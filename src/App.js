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
  { sku: 'AC-001', name: 'Guantes Coleman',   price: 10000, image: '/guantes_fake_coleman.jpg' },
  { sku: 'AC-002', name: 'Botella Deportiva', price:  8000, image: '/botella_fake_coleman.jpg' },
  { sku: 'AC-003', name: 'Bandas Elásticas',  price: 12000, image: '/bandas_fake_coleman.jpg' },
  { sku: 'AC-004', name: 'Polera Oficial',    price: 20000, image: '/poleron_fake_coleman.jpg' },
  { sku: 'AC-005', name: 'jabon antibacterial', price: 2000, image: '/JABON_FAKE_COLEMAN.jpg' },
];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setCartVisible] = useState(false);
  const [isLoginVisible, setLoginVisible] = useState(false);

  const handleAddToCart = (sku) => {
    const product = storeProducts.find(p => p.sku === sku);
    if (!product) return;

    setCartItems(prev => {
      const exists = prev.find(i => i.sku === sku);
      if (exists) {
        return prev.map(i => i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleDecreaseQuantity = (sku) => {
    setCartItems(prev => {
      const item = prev.find(i => i.sku === sku);
      if (!item) return prev;
      if (item.quantity <= 1) {
        return prev.filter(i => i.sku !== sku);
      }
      return prev.map(i => i.sku === sku ? { ...i, quantity: i.quantity - 1 } : i);
    });
  };

  const handleRemoveFromCart = (sku) => {
    setCartItems(prev => prev.filter(i => i.sku !== sku));
  };

  const openCart = () => setCartVisible(true);
  const openLogin = () => setLoginVisible(true);

  return (
    <>
      <Header
        onCartClick={openCart}
        onLoginClick={openLogin}
        cartItemCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
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
        onIncreaseItem={handleAddToCart}
      />

      <LoginModal
        isVisible={isLoginVisible}
        onClose={() => setLoginVisible(false)}
      />
    </>
  );
}

export default App;
