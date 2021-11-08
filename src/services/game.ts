import {Point} from "../interfaces/point";

enum Player {
  BLUE = 'b',
  RED = 'r',
}

class Game {
  public positions: Array<Point> = [];
  public moves: Array<Point> = [];
  public firstMove: Player = Player.RED;
}

class GameBuilder {
  private game: Game = new Game();
  constructor() {
    this.reset();
  }

  public reset(): void {
    this.game = new Game();
  }

  public addPositions(positions: Array<Point>): GameBuilder {
    this.game.positions = positions;
    return this;
  }

  public addFirstPlayer(player: Player): GameBuilder {
    this.game.firstMove = player;
    return this;
  }

  public addMoves(moves: Array<Point>): GameBuilder {
    this.game.moves = moves;
    return this;
  }

  public build(): Game {
    const result = this.game;
    this.reset();
    return result;
  }
}

export {
  Game,
  GameBuilder,
  Player,
}
