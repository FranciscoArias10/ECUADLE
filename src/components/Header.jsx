import React from 'react';
import EcuadorFlag from './EcuadorFlag';

export default function Header({ onOpenHelp, onOpenStats, theme, onToggleTheme }) {
  return (
    <header className="header-navbar">
      <div className="header-content">
        <div className="header-nav-left">
          <button 
            className="btn-blue btn-nav" 
            onClick={onOpenHelp}
            aria-label="Ayuda"
            title="Ayuda"
          >
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.67z"/>
            </svg>
            <span className="btn-nav-label">AYUDA</span>
          </button>
        </div>

        <div className="header-brand">
          <EcuadorFlag width={50} height={34} />
          <div className="header-title-container">
            <h1 className="header-title">ECUADLE</h1>
            <div className="header-subtitle">PALABRA ECUATORIANA DEL DIA</div>
          </div>
        </div>

        <div className="header-nav-right">
          <button 
            className="btn-blue btn-nav btn-theme-toggle" 
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M12.3 2a10 10 0 0 0-.19 14 10 10 0 0 0 11.89 3.59A1 1 0 0 0 24 18.5a10 10 0 0 1-11.8-16.4 1 1 0 0 0 .1-1.1z"/>
              </svg>
            )}
            <span className="btn-nav-label">{theme === 'dark' ? 'CLARO' : 'OSCURO'}</span>
          </button>

          <button 
            className="btn-blue btn-nav" 
            onClick={onOpenStats}
            aria-label="Estadísticas"
            title="Estadísticas"
          >
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
            </svg>
            <span className="btn-nav-label">STATS</span>
          </button>
        </div>
      </div>
    </header>
  );
}
