import React, { useState } from 'react';
import RoleAssignment from './components/RoleAssignment';
import DiceRoller from './components/DiceRoller';
import ProbabilityCalculator from './components/ProbabilityCalculator';
import Tutorial from './components/Tutorial';
import './App.css';

export default function App() {
  const [players, setPlayers] = useState([]);

  return (
    <div className="app-container">
      <h1>Heist: Dice & Deception</h1>
      <RoleAssignment players={players} setPlayers={setPlayers} />
      {/* Tutorial Section */}
      <Tutorial filePath="/tutorial.txt" />

      {players.length > 0 && (
        <div className="game-interact">
          <DiceRoller players={players} />
          <ProbabilityCalculator />
        </div>
      )}
    </div>
  );
}