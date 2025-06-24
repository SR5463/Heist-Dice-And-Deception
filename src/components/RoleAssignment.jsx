import React, { useState, useRef, useEffect } from 'react';
import './RoleAssignment.css';

const TRAITOR = 'Traitor';
const SAFE = 'Safe';
const MAX_PLAYERS = 4;
const MEEPLES = ['Hacker', 'Grifter', 'Muscle', 'Ghost'];

export default function RoleAssignment({ players, setPlayers }) {
  const [name, setName] = useState('');
  const [meeple, setMeeple] = useState(() => MEEPLES[0]);
  // Only initialize traitorIndex once per component mount
  const traitorIndex = useRef(Math.floor(Math.random() * MAX_PLAYERS));

  // Compute available meeples from props.players
  const usedMeeples = players.map(p => p.meeple);
  const availableMeeples = MEEPLES.filter(m => !usedMeeples.includes(m));

  // Reset meeple selection if current meeple becomes unavailable
  useEffect(() => {
    if (!availableMeeples.includes(meeple)) {
      if (availableMeeples.length > 0) {
        setMeeple(availableMeeples[0]);
      } else {
        setMeeple('');
      }
    }
  }, [players]);

  const addPlayer = () => {
    if (!name.trim() || players.length >= MAX_PLAYERS || !meeple) return;
    const idx = players.length;
    const role = idx === traitorIndex.current ? TRAITOR : SAFE;
    if (role === TRAITOR) {
      alert(`${name.trim()}, you are the ${role}! Be careful not to reveal yourself!`);
    } else {
      alert(`${name.trim()}, you're in the clear this round, trust no one...`);
    }
    const newPlayer = { name: name.trim(), meeple, role, revealed: false };
    setPlayers(prev => [...prev, newPlayer]);
    setName('');
  };

  const revealAllRoles = () => {
    if (players.length === 0) return;
    setPlayers(prev => prev.map(pl => ({ ...pl, revealed: true })));
    const rolesList = players.map(p => `${p.name}: ${p.role}`).join('\n');
    const traitor = players.find(p => p.role === TRAITOR);
    const traitorMsg = traitor
      ? `The traitor was ${traitor.name}!` 
      : 'There was no traitor among the added players.';
    alert(`All roles revealed:\n${rolesList}\n\n${traitorMsg}`);
  };

  return (
    <div className="role-assignment">
      <h2 className="heading">Player Setup</h2>
      <div className="input-group">
        <input
          type="text"
          className="text-input"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Enter your name"
          onKeyDown={e => e.key==='Enter' && addPlayer()}
        />
        <select
          className="select-input"
          value={meeple}
          onChange={e => setMeeple(e.target.value)}
        >
          <option value="" disabled>
            {availableMeeples.length > 0 ? 'Select meeple' : 'No meeples available'}
          </option>
          {availableMeeples.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
        <button
          className="primary-btn"
          onClick={addPlayer}
          disabled={!name.trim() || players.length >= MAX_PLAYERS || !meeple}
        >
          Add Player
        </button>
      </div>
      <p className="instructions">
        {players.length < MAX_PLAYERS
          ? `Added ${players.length}/${MAX_PLAYERS}. Enter up to ${MAX_PLAYERS} players.`
          : 'Maximum players reached.'}
      </p>
      <ul className="player-list">
        {players.map((p, i) => (
          <li key={i} className={p.revealed && p.role === TRAITOR ? 'traitor' : ''}>
            <span className="player-info">
              {p.name} {p.revealed && `- ${p.role}`} ({p.meeple})
            </span>
          </li>
        ))}
      </ul>
      {players.length > 0 && players.some(p => !p.revealed) && (
        <div className="reveal-all">
          <button className="primary-btn" onClick={revealAllRoles}>
            Reveal All Roles
          </button>
        </div>
      )}
    </div>
  );
}
