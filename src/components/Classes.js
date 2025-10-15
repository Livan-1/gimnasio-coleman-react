// src/components/Classes.js

function Classes() {
  return (
    <section id="clases">
      <div className="container">
        <h2>Clases</h2>
        <p className="muted">Filtra, encuentra tu clase ideal y reserva tu cupo al instante.</p>
        <div className="grid classes">
          <article className="card class-card">
            <div className="badge">CL-001</div>
            <h3>Spinning Intenso</h3>
            <div className="muted">45 min • Intermedio</div>
            <div className="meta">
              <span className="badge">Cupos: 8/12</span>
              <button className="btn ghost">Reservar</button>
            </div>
          </article>
          <article className="card class-card">
            <div className="badge">CL-002</div>
            <h3>Crossfit Funcional</h3>
            <div className="muted">60 min • Avanzado</div>
            <div className="meta">
              <span className="badge">Cupos: 3/10</span>
              <button className="btn ghost">Reservar</button>
            </div>
          </article>
          <article className="card class-card">
            <div className="badge">CL-003</div>
            <h3>Yoga</h3>
            <div className="muted">50 min • Todos</div>
            <div className="meta">
              <span className="badge">Cupos: 10/14</span>
              <button className="btn ghost">Reservar</button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Classes;