// src/components/Plans.js

function Plans() {
  return (
    <section id="planes">
      <div className="container">
        <h2>Planes de Suscripción</h2>
        <p className="muted">Elige el plan que se adapte a ti. Cancela o modifica cuando quieras.</p>
        <div className="grid plans">
          <article className="card plan">
            <div className="head">
              <strong>Suscripción Normal</strong>
              <span className="badge">SUB-001</span>
            </div>
            <div className="price">$25.000 / mes</div>
            <ul>
              <li>✔ Acceso a todas las sucursales nacionales</li>
              <li>✔ Asesoramiento en taller de máquinas</li>
              <li>✔ Hasta 2 acompañantes (6-8 veces/mes)</li>
            </ul>
            <br />
            <button className="btn primary">Elegir Plan</button>
          </article>

          <article className="card plan" style={{ border: '2px solid var(--primary)' }}>
            <div className="head">
              <strong>Suscripción Intermedia</strong>
              <span className="badge">SUB-002</span>
            </div>
            <div className="price">$45.000 / mes</div>
            <ul>
              <li>✔ Todo lo del plan Normal</li>
              <li>✔ Consultas con nutricionista (2/mes)</li>
              <li>✔ 10% Dcto. en tienda</li>
            </ul>
            <br />
            <button className="btn primary">Elegir Plan</button>
          </article>

          <article className="card plan">
            <div className="head">
              <strong>Suscripción Premium</strong>
              <span className="badge">SUB-003</span>
            </div>
            <div className="price">$70.000 / mes</div>
            <ul>
              <li>✔ Todo lo del plan Intermedio</li>
              <li>✔ Reserva de salas y actividades</li>
              <li>✔ 25% Dcto. en tienda</li>
            </ul>
            <br />
            <button className="btn primary">Elegir Plan</button>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Plans;