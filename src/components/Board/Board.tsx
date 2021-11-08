import React from 'react';
import Modal from '../Modal';
import './Board.css'
import {
  FaSave,
  IoIosRedo,
  IoIosUndo,
} from "react-icons/all";
import {Player} from "../../services/game";

class Board extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      board: Array.from(Array(6), () => new Array(7).fill(null)),
      player: Player.RED, // red plays first // red is new white
    }
  }

  togglePlayer() {
    this.state.player === Player.RED ?
    this.setState({player: Player.BLUE}) :
    this.setState({player: Player.RED});
  }

  makeMove(row: number, column: number) {
    console.log('clicked on cell: ', row, column)
    const {board, player} = this.state;
    for (let i = this.state.board.length - 1; i >= 0; i--) {
      if (board[i][column] === null) {
        board[i][column] = {x: i, y: column, player};
        this.togglePlayer();
        break;
      }
    }
  }

  render() {
    const {board, player} = this.state;
    return (
      <div className="container">
        <Modal/>
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
              <div key={i} className='board-row'>
                {column.map((row: any, j: number) => (
                  <div key={i + j} className={"board-cell"}>
                    <div className={board[i][j] !== null ? "cell-content player-" + board[i][j].player : "cell-content"}
                         onClick={() => this.makeMove(i, j)}>
                      cell ({i}, {j})
                    </div>
                  </div>
                ))}
              </div>)
          )}
        </div>
        <div className="player-container">
          <label className="player-label">PLAYER</label>
          <span className={"player-color-point player-" + player}/>
        </div>
      </div>
    )
  }
}

export default Board;
