import React, { useState } from 'react';
import './ProbabilityCalculator.css';

export default function ProbabilityCalculator() {
  const [target, setTarget] = useState(10);
  const [prob, setProb] = useState(null);

  const calcProbability = () => {
    let successes=0;
    for(let i=1;i<=6;i++)for(let j=1;j<=6;j++)for(let k=1;k<=6;k++){
      if(i+j+k>=target) successes++;
    }
    setProb(((successes/216)*100).toFixed(2));
  };

  return (
    <div className="prob-calc">
      <h2>Probability Calculator</h2>
      <div className="input-group">
        <label htmlFor="target-input">Target (3–18):</label>
        <input id="target-input" type="number" value={target}
          onChange={e=>setTarget(Number(e.target.value))} min={3} max={18}/>
        <button onClick={calcProbability} className="calc-btn">Calculate</button>
      </div>
      {prob!==null && <p className="prob-display">P(sum ≥ {target}) = <strong>{prob}%</strong></p>}
    </div>
  );
}