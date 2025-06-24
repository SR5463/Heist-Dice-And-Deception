import React, { useState, useEffect } from 'react';
import './Tutorial.css';

export default function Tutorial() {
  const [content, setContent] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetch('/tutorial.txt')
        .then(res => res.text())
        .then(text => setContent(text))
        .catch(() => setContent('Couldn’t load tutorial.'));
    }
  }, [isOpen]);

  return (
    <div className="tutorial-container">
      <button
        className="tutorial-button"
        onClick={() => setIsOpen(true)}
      >
        Show Tutorial
      </button>

      {isOpen && (
        <div
          className="tutorial-overlay"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="tutorial-popup"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
            <pre className="tutorial-content">
              {content}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
