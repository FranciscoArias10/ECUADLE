import React, { useState, useEffect, useRef } from 'react';
import { createShareCanvas } from '../utils/shareImage';

export default function ShareModal({
  isOpen,
  onClose,
  wordData,
  guesses,
  isWinner,
  dayNumber,
  onShowToast
}) {
  const [themeColor, setThemeColor] = useState('tricolor'); // 'tricolor' | 'blue' | 'yellow' | 'red'
  const [imageSrc, setImageSrc] = useState('');
  const [imageBlob, setImageBlob] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef(null);

  // Generate image whenever open, themeColor, or data changes
  useEffect(() => {
    if (!isOpen) return;

    let isCancelled = false;
    setIsGenerating(true);

    async function buildImage() {
      try {
        const canvas = await createShareCanvas({
          wordData,
          guesses,
          isWinner,
          dayNumber,
          themeColor
        });

        if (isCancelled) return;
        canvasRef.current = canvas;

        canvas.toBlob((blob) => {
          if (isCancelled || !blob) return;
          setImageBlob(blob);
          const url = URL.createObjectURL(blob);
          setImageSrc(url);
          setIsGenerating(false);
        }, 'image/png');
      } catch (err) {
        console.error('Error al generar imagen de compartir:', err);
        setIsGenerating(false);
      }
    }

    buildImage();

    return () => {
      isCancelled = true;
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [isOpen, themeColor, wordData, guesses, isWinner, dayNumber]);

  if (!isOpen) return null;

  // Download image as PNG
  const handleDownload = () => {
    if (!imageBlob && !canvasRef.current) return;
    const url = imageSrc || canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `ecuadle-${dayNumber}-enner-orgulloso.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    if (onShowToast) onShowToast('¡Foto descargada!');
  };

  // Copy Image to Clipboard
  const handleCopyImage = async () => {
    if (!imageBlob && canvasRef.current) {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        await copyBlobToClipboard(blob);
      });
      return;
    }
    if (imageBlob) {
      await copyBlobToClipboard(imageBlob);
    }
  };

  const copyBlobToClipboard = async (blob) => {
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        if (onShowToast) onShowToast('¡Foto copiada al portapapeles!');
      } else {
        // Fallback to text copy
        handleCopyText();
      }
    } catch (err) {
      console.warn('ClipboardItem error, fallback to text copy:', err);
      handleCopyText();
    }
  };

  // Native share (Web Share API)
  const handleNativeShare = async () => {
    const score = isWinner ? `${guesses.length}/6` : 'X/6';
    const shareTitle = `Ecuadle #${dayNumber} ${score}`;
    const shareText = `¡Jugué Ecuadle #${dayNumber}! Enner Valencia estaría orgulloso 🇪🇨⚽`;

    if (navigator.share) {
      try {
        if (imageBlob && navigator.canShare && navigator.canShare({ files: [new File([imageBlob], 'ecuadle.png', { type: 'image/png' })] })) {
          const file = new File([imageBlob], `ecuadle-${dayNumber}.png`, { type: 'image/png' });
          await navigator.share({
            title: shareTitle,
            text: shareText,
            files: [file]
          });
          return;
        } else {
          await navigator.share({
            title: shareTitle,
            text: shareText
          });
          return;
        }
      } catch (e) {
        // user cancelled or share failed
      }
    }
    // Fallback: download image and copy text
    handleDownload();
  };

  // Copy classic text summary
  const handleCopyText = () => {
    const score = isWinner ? `${guesses.length}/6` : 'X/6';
    let boardSummary = '';
    guesses.forEach((g) => {
      const line = g.result.map((r) => {
        if (r === 'correct') return '[A]';
        if (r === 'present') return '[Az]';
        return '[R]';
      }).join(' ');
      boardSummary += line + '\n';
    });

    const text = `ECUADLE #${dayNumber} ${score}\n"Enner estaría orgulloso 🇪🇨⚽"\n\n${boardSummary}\n[A]=Amarillo [Az]=Azul [R]=Rojo\necuadle.com`;
    navigator.clipboard.writeText(text);
    if (onShowToast) onShowToast('Texto copiado al portapapeles');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content share-modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '480px', width: '92%' }}
      >
        <div className="modal-header">
          <h2 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📸</span> FOTO PARA COMPARTIR
          </h2>
          <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar">
            X
          </button>
        </div>

        <div className="modal-body share-modal-body">
          {/* Color Background Selector */}
          <div className="share-color-picker">
            <span className="share-color-label">Color de fondo:</span>
            <div className="share-color-buttons">
              <button
                type="button"
                className={`share-color-btn tricolor ${themeColor === 'tricolor' ? 'active' : ''}`}
                onClick={() => setThemeColor('tricolor')}
                title="Tricolor Ecuatoriano"
              >
                🇪🇨 Tricolor
              </button>
              <button
                type="button"
                className={`share-color-btn yellow ${themeColor === 'yellow' ? 'active' : ''}`}
                onClick={() => setThemeColor('yellow')}
                title="Fondo Amarillo"
              >
                🟡 Amarillo
              </button>
              <button
                type="button"
                className={`share-color-btn blue ${themeColor === 'blue' ? 'active' : ''}`}
                onClick={() => setThemeColor('blue')}
                title="Fondo Azul"
              >
                🔵 Azul
              </button>
              <button
                type="button"
                className={`share-color-btn red ${themeColor === 'red' ? 'active' : ''}`}
                onClick={() => setThemeColor('red')}
                title="Fondo Rojo"
              >
                🔴 Rojo
              </button>
            </div>
          </div>

          {/* Image Preview Container */}
          <div className="share-image-preview-wrapper">
            {isGenerating ? (
              <div className="share-image-loading">
                <div className="spinner"></div>
                <p>Preparando la foto con Enner y los platos típicos...</p>
              </div>
            ) : imageSrc ? (
              <img
                src={imageSrc}
                alt="Foto resultado Ecuadle con Enner Valencia y platos típicos"
                className="share-image-preview"
              />
            ) : null}
          </div>

          {/* Action Buttons */}
          <div className="share-actions-grid">
            <button 
              type="button" 
              className="btn-share-action btn-share-download"
              onClick={handleDownload}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
              <span>Descargar Foto</span>
            </button>

            <button 
              type="button" 
              className="btn-share-action btn-share-copy"
              onClick={handleCopyImage}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
              </svg>
              <span>Copiar Foto</span>
            </button>

            {navigator.share && (
              <button 
                type="button" 
                className="btn-share-action btn-share-native"
                onClick={handleNativeShare}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/>
                </svg>
                <span>Compartir</span>
              </button>
            )}

            <button 
              type="button" 
              className="btn-share-action btn-share-text"
              onClick={handleCopyText}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/>
              </svg>
              <span>Copiar Texto</span>
            </button>
          </div>

          <button 
            type="button"
            className="btn-blue btn-full" 
            style={{ marginTop: '12px', opacity: 0.9 }} 
            onClick={onClose}
          >
            VOLVER AL JUEGO
          </button>
        </div>
      </div>
    </div>
  );
}

