import {Point} from "../interfaces/point";
import {GameMode} from "../constants";

class FileService {
  private static fileInstance: FileService;
  private _moves: Array<Point> = [];
  private _gameMode: GameMode | null = null;
  private _currentMoveIndex: number = -1;
  private undoDone = false;

  private constructor() {
  }

  public static getInstance(): FileService {
    if (!FileService.fileInstance) {
      FileService.fileInstance = new FileService();
    }

    return FileService.fileInstance;
  }

  public get gameMode() {
    return this._gameMode;
  }

  public set gameMode(type: GameMode | null) {
    this._gameMode = type;
  }

  public set lastMove(point: Point) {
    if (this._currentMoveIndex === -1) {
      this._moves = [];
    }

    this.undoDone && this._moves.length !== 0 ?
      this._moves[this.currentMoveIndex + 1] = point :
      this._moves.push(point);
    this._currentMoveIndex++;
  }

  public get currentMoveIndex() {
    return this._currentMoveIndex;
  }

  public get movesListLength() {
    return this._moves.length;
  }

  public getPreviousMove(): Point | null {
    if (this._currentMoveIndex > 0) {
      this.undoDone = true;
      return this._moves[--this._currentMoveIndex];
    } else {
      this._currentMoveIndex = -1;
      this.undoDone = false;
      return null;
    }
  }

  public getNextMove(): Point | null {
    this.undoDone = false;
    if (this._currentMoveIndex < this._moves.length - 1) {
      return this._moves[++this._currentMoveIndex];
    } else {
      this._currentMoveIndex = this._moves.length - 1;
      return null;
    }
  }
}

export {
  FileService,
}