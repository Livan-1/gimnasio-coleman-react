// src/components/Cart.js (Versión con botones de cantidad y eliminar)

function Cart({ isVisible, onClose, items, onRemoveItem, onDecreaseItem, onIncreaseItem }) {
  // Calculamos el total multiplicando precio por cantidad
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
          {items.length === 0 && <p className="muted" style={{ padding: '20px' }}>El carrito está vacío.</p>}

          {items.map((item) => (
            <div key={item.sku} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <strong>{item.name}</strong>
                <div className="muted">${item.price.toLocaleString('es-CL')}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Botones para ajustar cantidad */}
                <button className="btn ghost" onClick={() => onDecreaseItem(item.sku)}>-</button>
                <span>{item.quantity}</span>
                <button className="btn ghost" onClick={() => onIncreaseItem(item)}>+</button>
                {/* Botón para eliminar */}
                <button className="btn ghost" style={{ color: 'red' }} onClick={() => onRemoveItem(item.sku)}>Quitar</button>
              </div>
            </div>
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