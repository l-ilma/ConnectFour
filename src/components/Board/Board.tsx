import React from 'react';
import Modal from '../Modal';
import './Board.css'
import {
  FaSave,
  IoIosRedo,
  IoIosUndo,
} from "react-icons/all";
import GameType from '../GameType';
import { GameMode } from '../../constants';

class Board extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      board: new Array(6).fill(new Array(7).fill(null)),
      player: 1,
      showModal: true,
      gameMode: null,
      showGameTypeModal: true,
      showGameModeModal: false,
      showFileUploadModal: false,
    }
  }

  onModalClose = () => {
    this.setState({ showGameTypeModal: false });
  }

  makeMove(row: number, column: number) {
    console.log('clicked on cell: ', row, column)
  }

  onVsPlayer = () => {
    this.setState({ gameMode: GameMode.PVP });
  };

  onVsComputer = () => {
    this.setState({ gameMode: GameMode.PVC });
  };

  renderCorrectModal = () => {
    const { showGameTypeModal, showGameModeModal, showFileUploadModal } = this.state;

    if (showGameTypeModal) {
      return Modal({
        onPrimaryClick: this.onModalClose,
        primaryLabel: 'Resume game',
        onSecondaryClick: this.onModalClose,
        secondaryLabel: 'Create game',
        secondary: true,
        children: (
          <div className="div--centered">
            Do you want to create new game or resume an existing one?
          </div>
        )
      });
    }

    if (showGameModeModal) {
      return Modal({
        onPrimaryClick: this.onModalClose,
        primaryLabel: 'Confirm',
        header: 'Mode selection',
        children: (
          <div className="div--centered">
            <GameType onVsPlayerClick={this.onVsPlayer} onVsComputerClick={this.onVsComputer} />
          </div>
        )
      });
    }

    if (showFileUploadModal) {
      //TODO;
    }
  };


  render() {
    const {board, player} = this.state;
    return (
      <div className="container">
        { this.renderCorrectModal() }
        <div className="controls-top">
          <div className="undo-redo-container">
            <button title="Undo" className="ctrl-btn" style={{marginRight: '10%'}}><IoIosUndo/></button>
            <button title="Redo" className="ctrl-btn"><IoIosRedo/></button>
          </div>
          <button title="Save game" className="ctrl-btn"><FaSave/></button>
        </div>
        <div className="board">
          {board.map((column: [], i: number) =>
            (
              <div key={i} className='column'>
                {column.map((row: any, j: number) => (
                  <div key={i + j} className='cell'>
                    <div className='content' onClick={() => this.makeMove(i, j)}>
                      cell ({i}, {j})
                    </div>
                  </div>
                ))}
              </div>)
          )}
        </div>
        <div className="player-container">
          <label className="player-label">PLAYER {player}</label>
          <span className="player-color"/>
        </div>
      </div>
    )
  }
}

export default Board;
