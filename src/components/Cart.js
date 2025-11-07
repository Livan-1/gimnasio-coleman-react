// src/components/Cart.js
function Cart({ isVisible, onClose, items, onRemoveItem, onDecreaseItem, onIncreaseItem }) {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartClass = isVisible ? 'offcanvas show' : 'offcanvas';

  return (
    <aside className={cartClass} role="complementary" aria-label="Carrito de compras">
      <header>
        <div className="container offcanvas-bar">
          <strong>Carrito de Compras</strong>
          <button className="btn ghost" aria-label="Cerrar carrito" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </header>

      <div className="body">
        <div className="grid">
          {items.length === 0 && (
            <p className="muted" style={{ padding: '20px' }}>
              El carrito está vacío.
            </p>
          )}

          {items.map((item) => (
            <article key={item.sku} className="card">
              <div className="row">
                <div className="col">
                  <strong>{item.name}</strong>
                  <div className="muted">${item.price.toLocaleString('es-CL')}</div>
                </div>
                <div className="col" style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'flex-end' }}>
                  <button
                    className="btn ghost"
                    aria-label="Disminuir cantidad"
                    onClick={() => onDecreaseItem(item.sku)}
                  >
                    −
                  </button>
                  <span className="quantity" aria-live="polite">{item.quantity}</span>
                  <button
                    className="btn ghost"
                    aria-label="Aumentar cantidad"
                    onClick={() => onIncreaseItem(item.sku)}
                  >
                    +
                  </button>
                  <button
                    className="btn ghost"
                    aria-label="Eliminar producto"
                    onClick={() => onRemoveItem(item.sku)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="footer">
        <div className="container offcanvas-bar">
          <div>
            <span className="muted">Total:</span>{' '}
            <strong>${total.toLocaleString('es-CL')}</strong>
          </div>
          <button className="btn primary">Pagar (mock)</button>
        </div>
      </div>
    </aside>
  );
}
export default Cart;
