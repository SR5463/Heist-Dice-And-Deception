/* Tutorial.js */
import React, { useState } from 'react';
import tutorialContent from './tutorial.txt?raw';
import './Tutorial.css';

export default function Tutorial() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="tutorial-container">
      <button className="tutorial-button" onClick={() => setIsOpen(true)}>
        Show Tutorial
      </button>

      {isOpen && (
        <div className="tutorial-overlay" onClick={() => setIsOpen(false)}>
          <div className="tutorial-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setIsOpen(false)}>
              ×
            </button>
            <pre className="tutorial-content">{tutorialContent}</pre>
          </div>
        </div>
      )}
    </div>
  );
}