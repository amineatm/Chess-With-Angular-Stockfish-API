import { FENChar } from '../../chess-logic/models';

type squareWithPiece = {
  piece: FENChar;
  x: number;
  y: number;
};

type squareWithoutPiece = {
  piece: null;
};

export type selectedSquare = squareWithPiece | squareWithoutPiece;
