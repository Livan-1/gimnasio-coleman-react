// src/components/Header.js
function Header({ onCartClick, onLoginClick, cartItemCount = 0 }) {
  return (
    <header>
      <div className="nav-actions">
        <button className="btn ghost mobile-toggle">Menú</button>
        <button className="btn ghost" onClick={onLoginClick}>Ingresar</button>
        <button className="btn primary" onClick={onCartClick}>
          Carrito
          {/* Badge opcional si hay items */}
          {cartItemCount > 0 && <span aria-label="contador-carrito"> {cartItemCount}</span>}
        </button>
      </div>
    </header>
  );
}
export default Header;
