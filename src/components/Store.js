// src/components/Store.js
function Store({ products, onAddToCart }) {
  return (
    <section id="tienda">
      <div className="container">
        <h2>Tienda</h2>
        <p className="muted">Accesorios y suplementos esenciales para tu progreso.</p>
        <div className="grid store">
          {products.map((product) => (
            <article className="card product" key={product.sku}>
              <img src={product.image} alt={product.name} />
              <div className="row">
                <div className="col">
                  <strong>{product.name}</strong>
                  <div className="muted" aria-label="precio">${product.price.toLocaleString('es-CL')}</div>
                </div>
                <div className="col" style={{ textAlign: 'right' }}>
                  <button
                    className="btn secondary add-cart"
                    onClick={() => onAddToCart(product.sku)}

                  >
                    Agregar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Store;
