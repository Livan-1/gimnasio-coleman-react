// src/components/Hero.js

function Hero() {
  return (
    <section className="hero">
      <div className="container wrap">
        <div>
          <span className="badge">Nuevas Sucursales en Chile</span>
          <h1>Mentalidad de Campeón, Precios "Light Weight"</h1>
          <p>Promovemos una vida sana y una mentalidad de guerrero. Únete a una familia de amantes del ejercicio con entrenamientos de la más alta calidad adaptados a tu nivel.</p>
          <div className="cta">
            <a href="#planes" className="btn primary">Ver Suscripciones</a>
            <a href="#clases" className="btn secondary">Explorar Clases</a>
          </div>
        </div>
        <div className="media">
          <div className="overlay">
            <div className="plate" aria-hidden="true">100</div>
            <div>
              <strong>Yeah Buddy!</strong>
              <div className="muted" style={{ fontSize: '12px' }}>Light Weight Baby</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;