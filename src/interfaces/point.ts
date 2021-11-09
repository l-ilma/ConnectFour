import {Player} from "../services/game.service";

export interface Point {
  x: number;
  y: number;
  player: Player;
}