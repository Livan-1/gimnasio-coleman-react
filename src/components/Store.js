// src/components/Store.js (Versión Actualizada y Corregida)

// 1. Recibimos las "props" (propiedades) desde App.js.
//    - "products" es la lista de productos a mostrar.
//    - "onAddToCart" es la función para agregar un producto al carrito.
function Store({ products, onAddToCart }) {
  return (
    <section id="tienda">
      <div className="container">
        <h2>Tienda</h2>
        <p className="muted">Accesorios y suplementos esenciales para tu progreso.</p>
        <div className="grid store">
          {/* 2. Usamos el método .map() para recorrer el array "products" que recibimos.
               Por cada "product" en el array, creamos un <article>. */}
          {products.map((product) => (
            <article className="card product" key={product.sku}>
              <img src={product.image} alt={product.name}/>
              <div className="row">
                <strong>{product.name}</strong>
                <span className="price">${product.price.toLocaleString('es-CL')}</span>
              </div>
              {/* 3. El botón "Agregar" ahora llama a la función onAddToCart, 
                   pasándole el producto actual para que se añada al carrito. */}
              <button 
                className="btn secondary add-cart" 
                onClick={() => onAddToCart(product)}
              >
                Agregar
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Store;