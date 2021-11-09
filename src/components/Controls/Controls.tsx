import React from 'react';
import {FaSave, IoIosRedo, IoIosUndo} from 'react-icons/all';
import './Controls.css';

const Controls = () => {
  return (
    <div className="controls">
      <div className="controls__btn-container">
        <button title="Undo" className="btn--ctrl" style={{marginRight: '10%'}}><IoIosUndo/></button>
        <button title="Redo" className="btn--ctrl"><IoIosRedo/></button>
      </div>
      <button title="Save game" className="btn--ctrl"><FaSave/></button>
    </div>
  );
}

export default Controls;