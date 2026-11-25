import React, { useState, useEffect } from 'react';

export default function StatsModal({ 
  isOpen, 
  onClose, 
  stats, 
  isGameOver, 
  isWinner, 
  wordData, 
  onShare 
}) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    function calculateTimeLeft() {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setHours(24, 0, 0, 0);
      const diff = tomorrow - now;
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const winPercentage = stats.played > 0 
    ? Math.round((stats.won / stats.played) * 100) 
    : 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {isGameOver 
              ? (isWinner ? 'VICTORIA' : 'FIN DEL JUEGO') 
              : 'ESTADISTICAS'}
          </h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar">
            X
          </button>
        </div>

        <div className="modal-body">
          {isGameOver && wordData && (
            <div className="word-card">
              <div className="word-card-target">{wordData.word}</div>
              <div className="word-card-def"><strong>Significado:</strong> {wordData.def}</div>
              <div className="word-card-example">"{wordData.example}"</div>
            </div>
          )}

          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-value">{stats.played}</div>
              <div className="stat-label">Jugadas</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{winPercentage}%</div>
              <div className="stat-label">Victorias</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{stats.streak}</div>
              <div className="stat-label">Racha</div>
            </div>
            <div className="stat-box">
              <div className="stat-value">{stats.maxStreak}</div>
              <div className="stat-label">Mejor</div>
            </div>
          </div>

          {isGameOver && (
            <>
              <div className="countdown-box">
                <div className="countdown-label">SIGUIENTE PALABRA EN</div>
                <div className="countdown-digits">{timeLeft}</div>
              </div>

              <button 
                className="btn-blue btn-full" 
                onClick={onShare}
                style={{
                  background: 'linear-gradient(135deg, #FFD100 0%, #F59E0B 100%)',
                  color: '#0F172A',
                  fontWeight: '900',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 15px rgba(255, 209, 0, 0.35)',
                  border: '2px solid #8C6500'
                }}
              >
                <span>📸</span> COMPARTIR FOTO Y RESULTADO
              </button>
            </>
          )}

          <button 
            className="btn-blue btn-full" 
            style={{ marginTop: '8px', opacity: 0.9 }} 
            onClick={onClose}
          >
            VOLVER AL TABLERO
          </button>
        </div>
      </div>
    </div>
  );
}
