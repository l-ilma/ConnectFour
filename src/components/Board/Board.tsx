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
      winner: null
    }
  }

  togglePlayer(): void {
    this.state.player === Player.RED ?
      this.setState({player: Player.BLUE}) :
      this.setState({player: Player.RED});
  }

  makeMove(row: number, column: number): void {
    console.log('clicked on cell: ', row, column)
    const {board, player} = this.state;
    for (let i = board.length - 1; i >= 0; i--) {
      if (board[i][column] === null) {
        board[i][column] = {x: i, y: column, player};
        this.checkBoard();
        this.togglePlayer();
        break;
      }
    }
  }

  setWinner(winner: Player) {
    this.setState({winner});
  }

  checkRows() {
    const {board} = this.state;
    for (let i = 0; i < board.length; i++) {
      let rowCounter = 1;
      let rowWinner = null;
      for (let j = 0; j < board[i].length; j++) {
        if (rowCounter === 4) {
          console.log('WE HAVE A WINNER: ', rowWinner)
          this.setWinner(rowWinner);
        }
        // horizontally
        if (j !== board[i].length - 1) {
          const cell1 = board[i][j];
          const cell2 = board[i][j + 1];
          if (cell1 && cell2 && cell1.player === cell2.player) {
            rowCounter++;
            rowWinner = cell1.player;
          } else {
            rowCounter = 1;
            rowWinner = null;
          }
        }
      }
    }
  }

  checkColumns() {
    const {board} = this.state;
    for (let column = 0; column < board[0].length; column ++) {
      let columnCounter = 1;
      let columnWinner = null;
      for (let i = 0; i < board.length; i++) {
        //vertically
        if (column < board[i].length) {
          if (columnCounter === 4) {
            console.log('WE HAVE A WINNER: ', columnWinner)
            this.setWinner(columnWinner);
          }
          if (i !== board.length - 1) {
            const cell1 = board[i][column];
            const cell2 = board[i + 1][column];
            console.log('cell1, cell2', cell1, cell2)
            if (cell1 && cell2 && cell1.player === cell2.player) {
              columnCounter++;
              columnWinner = cell1.player;
            } else {
              columnCounter = 1;
              columnWinner = null;
            }
          }
        }
      }
    }
  }


  checkBoard(): void {
    this.checkRows();
    this.checkColumns();
  }

  render() {
    const {board, player, winner} = this.state;
    return (
      <div className="container">
        <Modal/>
        {winner ? <Modal/> : null}
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
                  <div key={i + j} className="board-cell">
                    <div className={board[i][j] !== null ? "cell-content player-" + board[i][j].player : "cell-content"}
                         onClick={() => this.makeMove(i, j)}>
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
