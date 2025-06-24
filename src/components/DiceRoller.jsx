import React, { useState, useEffect } from 'react';
import './DiceRoller.css';

export default function DiceRoller({ players }) {
  // Index of the current roller in the players array
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dice, setDice] = useState([1, 1, 1]);
  const [sum, setSum] = useState(3);
  const [forceLow, setForceLow] = useState(false);

  // Reset currentIndex if players change (e.g., new game or players list changes)
  useEffect(() => {
    if (!players || players.length === 0) {
      setCurrentIndex(0);
    } else if (currentIndex >= players.length) {
      setCurrentIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players]);

  const roll = () => {
    if (!players || players.length === 0) return;
    let rolls = [0, 0, 0];
    if (forceLow) {
      // Force one random die low (1-3)
      const idx = Math.floor(Math.random() * 3);
      rolls[idx] = Math.ceil(Math.random() * 3);
      for (let i = 0; i < 3; i++) {
        if (i !== idx) rolls[i] = Math.ceil(Math.random() * 6);
      }
    } else {
      rolls = rolls.map(() => Math.ceil(Math.random() * 6));
    }
    setDice(rolls);
    const total = rolls.reduce((a, b) => a + b, 0);
    setSum(total);

    // Advance to next player without alert
    setCurrentIndex(prev => {
      if (!players || players.length === 0) return 0;
      return (prev + 1) % players.length;
    });
  };

  const currentName = players && players.length > 0 ? players[currentIndex].name : 'No players';

  return (
    <div className="dice-roller">
      <h2 className="heading">Dice Roller</h2>
      {(!players || players.length === 0) ? (
        <p className="no-players">No players available. Please add players first.</p>
      ) : (
        <p className="current-roller">Current: <strong>{currentName}</strong></p>
      )}
      <label className="toggle-group">
        <input
          type="checkbox"
          checked={forceLow}
          onChange={e => setForceLow(e.target.checked)}
          disabled={!players || players.length === 0}
        />
        <span>Force one die to 1–3</span>
      </label>
      <button
        onClick={roll}
        className="roll-btn"
        disabled={!players || players.length === 0}
      >
        Roll 3d6
      </button>
      <div className="dice-display">
        {dice.map((d, i) => (
          <span key={i} className="die">{d}</span>
        ))}
      </div>
      <p className="sum-display">Sum: <strong>{sum}</strong></p>
    </div>
  );
}
