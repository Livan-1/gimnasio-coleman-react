// src/components/Footer.js

function Footer() {
  return (
    <footer>
      <div className="container grid footer-grid">
        <div>
          <div className="title footer-brand">Fake Gimnasio Coleman</div>
          <p className="muted footer-slogan">Yeah Buddy! Light Weight</p>
        </div>
        <div>
          <strong>Secciones</strong>
          <p><a href="#planes">Planes</a> · <a href="#clases">Clases</a> · <a href="#tienda">Tienda</a></p>
        </div>
        <div>
          <strong>Contacto</strong>
          <p><a href="mailto:soporte@fakecoleman.com">soporte@fakecoleman.com</a></p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;