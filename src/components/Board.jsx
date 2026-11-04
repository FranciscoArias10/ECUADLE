import React from 'react';

export default function Board({ 
  guesses, 
  currentGuess, 
  currentRow, 
  shakeRow, 
  isWinner,
  maxGuesses = 6, 
  wordLength = 5 
}) {
  const rows = [];

  for (let r = 0; r < maxGuesses; r++) {
    const isCurrent = r === currentRow;
    const isCompleted = r < currentRow;
    const isShaking = shakeRow === r;

    let letters = Array(wordLength).fill('');
    let evaluation = Array(wordLength).fill('');

    if (isCompleted && guesses[r]) {
      letters = guesses[r].guess.toUpperCase().split('');
      evaluation = guesses[r].result;
    } else if (isCurrent) {
      const currentLetters = currentGuess.toUpperCase().split('');
      for (let c = 0; c < wordLength; c++) {
        letters[c] = currentLetters[c] || '';
      }
    }

    const isWinningRow = isWinner && r === currentRow - 1;

    rows.push(
      <div 
        key={r} 
        className={`board-row ${isShaking ? 'shake' : ''}`}
      >
        {letters.map((letter, c) => {
          const stateClass = evaluation[c] ? evaluation[c] : '';
          const filledClass = letter ? 'filled' : '';
          const bounceClass = isWinningRow ? 'bounce' : '';

          return (
            <div 
              key={c} 
              className={`tile ${filledClass} ${stateClass} ${bounceClass}`}
              style={{
                animationDelay: isWinningRow ? `${c * 100}ms` : '0ms'
              }}
            >
              {letter}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="board-container">
      <div className="board-grid">
        {rows}
      </div>
    </div>
  );
}

