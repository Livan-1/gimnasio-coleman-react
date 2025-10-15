// src/components/Store.js (Actualizado)

function Store({ onAddToCart }) { // Recibe la función
  const products = [
    // ... (el mismo array de productos de antes)
  ];
  return (
    <section id="tienda">
      {/* ... (código que no cambia) ... */}
      <div className="grid store">
        {products.map((product) => (
          <article key={product.sku} className="card product">
            {/* ... (img y row no cambian) ... */}
            <button 
              className="btn secondary add-cart" 
              onClick={() => onAddToCart(product)} // Al hacer click, llama a la función con el producto
            >
              Agregar
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
export default Store;