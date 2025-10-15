// src/components/Blog.js

function Blog() {
  return (
    <section id="blog">
      <div className="container">
        <h2>Blog de Campeones</h2>
        <p className="muted">Consejos, rutinas y nutrición para avanzar con cabeza.</p>
        <div className="grid blog-grid">
          <article className="card">
            <span className="badge">Nutrición</span>
            <h3>Proteínas: ¿cuánto necesitas realmente?</h3>
            <p className="muted">Guía rápida para no pasarte ni quedarte corto.</p>
            <button className="btn ghost">Leer más</button>
          </article>
          <article className="card">
            <span className="badge">Fuerza</span>
            <h3>Progresión 5x5: la clave para subir cargas</h3>
            <p className="muted">Cómo aplicarla sin lesionarte.</p>
            <button className="btn ghost">Leer más</button>
          </article>
          <article className="card">
            <span className="badge">Movilidad</span>
            <h3>Recuperación activa en días de descanso</h3>
            <p className="muted">Mantén la racha sin sobrecargar tu cuerpo.</p>
            <button className="btn ghost">Leer más</button>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Blog;