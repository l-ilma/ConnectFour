import React, {useState} from 'react';
import Modal from '../Modal';
import './Board.css'
import GameType from '../GameType';
import {GameMode} from '../../constants';
import {Player} from '../../services/game.service';
import BoardService from '../../services/board.service';
import Controls from '../Controls';
import {FileService} from "../../services/file.service";
import {Point} from "../../interfaces/point";

const Board = () => {
  const [board, setBoard] = useState(Array.from(Array(6), () => new Array(7).fill(null)));
  const [player, setPlayer] = useState(Player.RED);
  const [currentMove, setCurrentMove] = useState<Point | null>(null);
  const [winner, setWinner] = useState<Player | null>(null);
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [showGameTypeModal, setShowGameTypeModal] = useState(true);
  const [showGameModeModal, setShowGameModeModal] = useState(false);
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const [file] = useState<FileService>(FileService.getInstance())

  const onModalClose = (): void => {
    setShowGameTypeModal(false);
  }

  const makeMove = (column: number): void => {
    for (let i = board.length - 1; i >= 0; i--) {
      if (board[i][column] === null) {
        const move = {x: i, y: column, player};
        board[i][column] = move;
        file.lastMove = move;
        console.log('file', file)
        setCurrentMove(move);
        setWinner(BoardService.getWinner(board, i, column));
        player === Player.RED ? setPlayer(Player.BLUE) : setPlayer(Player.RED);
        break;
      }
    }
  }

  const onVsPlayer = (): void => {
    setGameMode(GameMode.PVP);
    file.gameMode = GameMode.PVP;
  };

  const onVsComputer = (): void => {
    setGameMode(GameMode.PVC);
    file.gameMode = GameMode.PVC;
  };

  const renderCorrectModal = (): React.ReactNode => {
    if (showGameTypeModal) {
      return Modal({
        onPrimaryClick: onModalClose,
        primaryLabel: 'Resume game',
        onSecondaryClick: onModalClose,
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
        onPrimaryClick: onModalClose,
        primaryLabel: 'Confirm',
        header: 'Mode selection',
        children: (
          <div className="div--centered">
            <GameType onVsPlayerClick={onVsPlayer} onVsComputerClick={onVsComputer}/>
          </div>
        )
      });
    }

    if (showFileUploadModal) {
      //TODO;
    }
  };

  const onUndoClick = () => {
    console.log('undoClick parent', currentMove)
    if (currentMove) {
      board[currentMove.x][currentMove.y] = null;
    }
  }

  return (
    <div className="container">
      {renderCorrectModal()}
      {winner && (
        //@ts-ignore
        <Modal onPrimaryClick={() => setWinner(null)} primaryLabel="Reset game"/>
      )}
      <Controls onUndoClick={onUndoClick}/>
      <div className="board">
        {board.map((column, i: number) =>
          (
            <div key={i} className="board-row">
              {column.map((row: any, j: number) => (
                <div key={i + j} className="board-cell">
                  <div className={board[i][j] !== null ? "cell-content player-" + board[i][j].player : "cell-content"}
                       onClick={() => makeMove(j)}>
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

export default Board;
