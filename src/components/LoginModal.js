// src/components/LoginModal.js (Actualizado)

function LoginModal({ isVisible, onClose }) {
  return (
    <div className={`modal ${isVisible ? 'show' : ''}`}>
      <div className="dialog">
        {/* ... (el contenido del modal no cambia) ... */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button className="btn ghost" onClick={onClose}>Cancelar</button>
          <button className="btn primary">Ingresar</button>
        </div>
      </div>
    </div>
  );
}
export default LoginModal;