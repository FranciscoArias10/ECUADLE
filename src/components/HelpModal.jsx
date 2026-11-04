import React from 'react';

export default function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">COMO JUGAR</h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar">
            X
          </button>
        </div>

        <div className="modal-body">
          <p>
            Adivina la <strong>palabra ecuatoriana</strong> oculta en 6 intentos. Cada intento debe ser una palabra valida de 5 letras.
          </p>
          <p>
            Despues de cada intento, el color de las casillas cambiara para indicarte que tan cerca estuviste:
          </p>

          <div className="legend-box">
            <div className="example-row">
              <div className="example-tile correct">C</div>
              <div className="example-tile">H</div>
              <div className="example-tile">O</div>
              <div className="example-tile">R</div>
              <div className="example-tile">O</div>
            </div>
            <p>
              <strong>AMARILLO:</strong> La letra <strong>C</strong> esta en la palabra y en la posicion correcta (esta bien).
            </p>

            <div className="example-row">
              <div className="example-tile">B</div>
              <div className="example-tile present">I</div>
              <div className="example-tile">E</div>
              <div className="example-tile">L</div>
              <div className="example-tile">A</div>
            </div>
            <p>
              <strong>AZUL:</strong> La letra <strong>I</strong> esta en la palabra, pero en una posicion distinta.
            </p>

            <div className="example-row">
              <div className="example-tile">C</div>
              <div className="example-tile">H</div>
              <div className="example-tile">U</div>
              <div className="example-tile absent">T</div>
              <div className="example-tile">A</div>
            </div>
            <p>
              <strong>ROJO:</strong> La letra <strong>T</strong> no es la correcta (no esta en la palabra).
            </p>
          </div>

          <p>
            Una palabra nueva de la jerga y tradicion del Ecuador esta disponible cada dia.
          </p>

          <button className="btn-blue btn-full" onClick={onClose}>
            ENTENDIDO
          </button>
        </div>
      </div>
    </div>
  );
}
