import React, {useState} from 'react';
import {FaSave, IoIosRedo, IoIosUndo} from 'react-icons/all';
import './Controls.css';
import {FileService} from "../../services/file.service";

const Controls = ({onUndoClick}: any) => {

  const [file] = useState<FileService>(FileService.getInstance())

  const undoMove = () => {
    onUndoClick();
    console.log('child undo')
  }

  const redoMove = () => {

  }

  const saveGame = () => {

  }

  return (
    <div className="controls">
      <div className="controls__btn-container">
        <button title="Undo"
                className="btn--ctrl"
                style={{marginRight: '10%'}}
                onClick={undoMove}>
          <IoIosUndo/>
        </button>
        <button title="Redo" className="btn--ctrl" onClick={redoMove}>
          <IoIosRedo/>
        </button>
      </div>
      <button title="Save game" className="btn--ctrl" onClick={saveGame}>
        <FaSave/>
      </button>
    </div>
  );
}

export default Controls;