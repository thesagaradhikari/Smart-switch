import React from 'react';
import './Switch.css';
import { FaLightbulb } from 'react-icons/fa';

const Switch = ({ name, state, onToggle }) => {
  return (
    <div className={`switch ${state ? 'on' : 'off'}`}>
      <FaLightbulb className={`icon ${state ? 'active' : ''}`} />
      <h3>{name}</h3>
      <button onClick={onToggle}>{state ? 'Turn Off' : 'Turn On'}</button>
    </div>
  );
};

export default Switch;
