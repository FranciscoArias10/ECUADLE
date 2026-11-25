import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import HelpModal from './components/HelpModal';
import StatsModal from './components/StatsModal';
import ShareModal from './components/ShareModal';
import Toast from './components/Toast';
import { getDailyWord, normalizeWord, VALID_SET } from './data/words';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

const WIN_MESSAGES = [
  'Excelente',
  'Sensacional',
  'Bacan',
  'Bien jugado',
  'Por poco',
  'Apenas a tiempo'
];

export default function App() {
  const { wordData, normalized: targetWord, dayNumber } = useMemo(() => getDailyWord(), []);

  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentRow, setCurrentRow] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [shakeRow, setShakeRow] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ecuadle_theme') || 'dark';
  });

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('ecuadle_theme', next);
      return next;
    });
  }, []);

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('ecuadle_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return { played: 0, won: 0, streak: 0, maxStreak: 0 };
  });

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2200);
  }, []);

  // Restore game state from localStorage
  useEffect(() => {
    const savedDay = localStorage.getItem('ecuadle_day');
    const hasVisited = localStorage.getItem('ecuadle_visited');

    if (!hasVisited) {
      localStorage.setItem('ecuadle_visited', 'true');
      setIsHelpOpen(true);
    }

    if (savedDay && parseInt(savedDay, 10) === dayNumber) {
      const savedGuesses = localStorage.getItem('ecuadle_guesses');
      const savedWon = localStorage.getItem('ecuadle_won') === 'true';

      if (savedGuesses) {
        try {
          const parsed = JSON.parse(savedGuesses);
          setGuesses(parsed);
          setCurrentRow(parsed.length);
          if (savedWon) {
            setIsWinner(true);
            setIsGameOver(true);
          } else if (parsed.length >= MAX_GUESSES) {
            setIsGameOver(true);
          }
        } catch (e) {
          // ignore corrupted storage
        }
      }
    }
  }, [dayNumber]);

  // Compute key statuses for keyboard
  const keyStatuses = useMemo(() => {
    const statuses = {};
    const priority = { correct: 3, present: 2, absent: 1 };

    guesses.forEach(({ guess, result }) => {
      const letters = guess.toUpperCase().split('');
      letters.forEach((letter, i) => {
        const current = statuses[letter];
        const next = result[i];
        if (!current || priority[next] > priority[current]) {
          statuses[letter] = next;
        }
      });
    });

    return statuses;
  }, [guesses]);

  // Evaluate a guess
  const evaluateGuess = useCallback((guess) => {
    const normGuess = normalizeWord(guess);
    const result = Array(WORD_LENGTH).fill('absent');
    const targetArr = targetWord.split('');
    const guessArr = normGuess.split('');
    const matched = Array(WORD_LENGTH).fill(false);

    // 1st pass: Correct positions
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guessArr[i] === targetArr[i]) {
        result[i] = 'correct';
        matched[i] = true;
      }
    }

    // 2nd pass: Present but wrong spot
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (result[i] === 'correct') continue;
      for (let j = 0; j < WORD_LENGTH; j++) {
        if (!matched[j] && guessArr[i] === targetArr[j]) {
          result[i] = 'present';
          matched[j] = true;
          break;
        }
      }
    }

    return result;
  }, [targetWord]);

  // Save game progress
  const persistGame = useCallback((newGuesses, won, gameOver) => {
    localStorage.setItem('ecuadle_day', dayNumber.toString());
    localStorage.setItem('ecuadle_guesses', JSON.stringify(newGuesses));
    localStorage.setItem('ecuadle_won', won ? 'true' : 'false');

    if (gameOver) {
      setStats((prev) => {
        const next = {
          played: prev.played + 1,
          won: won ? prev.won + 1 : prev.won,
          streak: won ? prev.streak + 1 : 0,
          maxStreak: won ? Math.max(prev.maxStreak, prev.streak + 1) : prev.maxStreak
        };
        localStorage.setItem('ecuadle_stats', JSON.stringify(next));
        return next;
      });
    }
  }, [dayNumber]);

  // Handle Enter/Submit
  const handleSubmitGuess = useCallback(() => {
    if (isGameOver) return;

    if (currentGuess.length < WORD_LENGTH) {
      showToast('Faltan letras');
      setShakeRow(currentRow);
      setTimeout(() => setShakeRow(null), 500);
      return;
    }

    const norm = normalizeWord(currentGuess);
    if (!VALID_SET.has(norm)) {
      showToast('Palabra no valida');
      setShakeRow(currentRow);
      setTimeout(() => setShakeRow(null), 500);
      return;
    }

    const result = evaluateGuess(currentGuess);
    const newGuesses = [...guesses, { guess: currentGuess, result }];
    setGuesses(newGuesses);
    setCurrentGuess('');
    setCurrentRow((prev) => prev + 1);

    const won = norm === targetWord;
    const finished = won || newGuesses.length >= MAX_GUESSES;

    if (won) {
      setIsWinner(true);
      setIsGameOver(true);
      persistGame(newGuesses, true, true);
      setTimeout(() => {
        showToast(WIN_MESSAGES[newGuesses.length - 1] || 'Ganaste');
        setTimeout(() => setIsStatsOpen(true), 1200);
      }, 500);
    } else if (newGuesses.length >= MAX_GUESSES) {
      setIsGameOver(true);
      persistGame(newGuesses, false, true);
      setTimeout(() => {
        showToast(`La palabra era: ${wordData.word.toUpperCase()}`);
        setTimeout(() => setIsStatsOpen(true), 1500);
      }, 500);
    } else {
      persistGame(newGuesses, false, false);
    }
  }, [
    isGameOver, 
    currentGuess, 
    currentRow, 
    evaluateGuess, 
    guesses, 
    targetWord, 
    wordData, 
    showToast, 
    persistGame
  ]);

  // Handle typing letter
  const handleAddLetter = useCallback((letter) => {
    if (isGameOver) return;
    if (currentGuess.length >= WORD_LENGTH) return;
    setCurrentGuess((prev) => prev + letter);
  }, [isGameOver, currentGuess]);

  // Handle backspace/delete
  const handleDeleteLetter = useCallback(() => {
    if (isGameOver) return;
    setCurrentGuess((prev) => prev.slice(0, -1));
  }, [isGameOver]);

  // Dispatch key actions
  const handleKeyPress = useCallback((key) => {
    if (key === 'ENVIAR' || key === 'ENTER') {
      handleSubmitGuess();
    } else if (key === 'BORRAR' || key === 'BACKSPACE') {
      handleDeleteLetter();
    } else if (/^[A-ZÑ]$/i.test(key)) {
      handleAddLetter(key.toUpperCase());
    }
  }, [handleSubmitGuess, handleDeleteLetter, handleAddLetter]);

  // Listen to physical keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === 'Escape') {
        setIsHelpOpen(false);
        setIsStatsOpen(false);
        setIsShareModalOpen(false);
        return;
      }

      if (isHelpOpen || isStatsOpen || isShareModalOpen) return;

      if (e.key === 'Enter') {
        handleKeyPress('ENVIAR');
      } else if (e.key === 'Backspace') {
        handleKeyPress('BORRAR');
      } else if (/^[a-zA-ZñÑ]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress, isHelpOpen, isStatsOpen, isShareModalOpen]);

  // Open the Image & Result Share Modal
  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  return (
    <div className={`app-layout theme-${theme}`} data-theme={theme}>
      <Header 
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenStats={() => setIsStatsOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="game-container">
        <Board 
          guesses={guesses}
          currentGuess={currentGuess}
          currentRow={currentRow}
          shakeRow={shakeRow}
          isWinner={isWinner}
        />

        <Keyboard 
          onKeyPress={handleKeyPress}
          keyStatuses={keyStatuses}
        />
      </main>

      <Toast message={toastMessage} />

      <HelpModal 
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      <StatsModal 
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={stats}
        isGameOver={isGameOver}
        isWinner={isWinner}
        wordData={wordData}
        onShare={handleShare}
      />

      <ShareModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        wordData={wordData}
        guesses={guesses}
        isWinner={isWinner}
        dayNumber={dayNumber}
        onShowToast={showToast}
      />
    </div>
  );
}

