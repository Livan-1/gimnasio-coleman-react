// src/components/Header.js (Actualizado)

function Header({ onCartClick, onLoginClick }) { // Recibe las funciones como props
  return (
    <header>
      {/* ... (el resto del código del brand y menu no cambia) ... */}
      <div className="nav-actions">
        <button className="btn ghost mobile-toggle">Menú</button>
        {/* Usamos onClick para ejecutar la función que viene de App.js */}
        <button className="btn ghost" onClick={onLoginClick}>Ingresar</button>
        <button className="btn primary" onClick={onCartClick}>Carrito</button>
      </div>
    </header>
  );
}
export default Header;