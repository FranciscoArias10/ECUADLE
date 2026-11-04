import React from 'react';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
  ['ENVIAR', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BORRAR']
];

export default function Keyboard({ onKeyPress, keyStatuses = {} }) {
  const handleClick = (key) => {
    onKeyPress(key);
  };

  return (
    <div className="keyboard">
      {KEYBOARD_ROWS.map((row, rowIdx) => (
        <div key={rowIdx} className="keyboard-row">
          {row.map((key) => {
            const isWide = key === 'ENVIAR' || key === 'BORRAR';
            const status = keyStatuses[key] || '';

            return (
              <button
                key={key}
                type="button"
                className={`key-btn ${isWide ? 'wide' : ''} ${status}`}
                onClick={() => handleClick(key)}
                aria-label={key === 'BORRAR' ? 'Borrar letra' : key}
              >
                {key === 'BORRAR' ? (
                  <svg viewBox="0 0 24 24" width="22" height="22" style={{ display: 'block' }}>
                    <path fill="currentColor" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"/>
                  </svg>
                ) : (
                  key
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

