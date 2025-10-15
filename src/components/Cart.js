// src/components/Cart.js (Actualizado)

function Cart({ isVisible, onClose, items }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  // Añadimos una clase 'show' dinámicamente si isVisible es true
  return (
    <aside className={`offcanvas ${isVisible ? 'show' : ''}`}>
      <header>
        <div className="container offcanvas-bar">
          <strong>Carrito de Compras</strong>
          <button className="btn ghost" onClick={onClose}>Cerrar</button>
        </div>
      </header>
      <div className="body">
        <div className="grid">
          {items.length === 0 && <p>El carrito está vacío.</p>}
          {items.map((item, index) => (
            <div key={index} className="card">{item.name} - ${item.price.toLocaleString('es-CL')}</div>
          ))}
        </div>
      </div>
      <div className="footer">
        <div className="container offcanvas-bar">
          <div><span className="muted">Total:</span> <strong>${total.toLocaleString('es-CL')}</strong></div>
          <button className="btn primary">Pagar (mock)</button>
        </div>
      </div>
    </aside>
  );
}
export default Cart;