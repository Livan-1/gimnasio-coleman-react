// src/components/Sedes.js

function Sedes() {
  return (
    <section id="sedes">
      <div className="container">
        <h2>Nuestras Sedes en Chile</h2>
        <p className="muted">Busca tu sede más cercana y conoce sus horarios.</p>
        <div className="grid sedes-grid">
          <div className="card">
            <strong>Santiago</strong>
            <p className="muted">Av. Ficticia 123, Providencia</p>
            <span className="badge">L–V 6:00–22:00</span>
          </div>
          <div className="card">
            <strong>Arica</strong>
            <p className="muted">Calle Ejemplo 456, Arica Centro</p>
            <span className="badge">L–S 7:00–21:00</span>
          </div>
           <div className="card">
            <strong>Punta Arenas</strong>
            <p className="muted">Pasaje Austral 789, Punta Arenas</p>
            <span className="badge">L–V 8:00–20:00</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sedes;