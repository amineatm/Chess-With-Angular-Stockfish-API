import { Color, FENChar } from '../models';
import { Bishop } from './bishop';
import { King } from './king';
import { Knight } from './knight';
import { Pawn } from './pawn';
import { Piece } from './piece';
import { Queen } from './queen';
import { Rook } from './rook';

export class ChessBoard {
  private chessBoard: (Piece | null)[][];
  private _playerColor = Color.white;

  constructor() {
    this.chessBoard = [
      [
        new Queen(Color.white),
        new King(Color.white),
        new Rook(Color.white),
        new Rook(Color.white),
        new Knight(Color.white),
        new Knight(Color.white),
        new Bishop(Color.white),
        new Bishop(Color.white),
      ],
      [
        new Pawn(Color.white),
        new Pawn(Color.white),
        new Pawn(Color.white),
        new Pawn(Color.white),
        new Pawn(Color.white),
        new Pawn(Color.white),
        new Pawn(Color.white),
        new Pawn(Color.white),
      ],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [
        new Pawn(Color.black),
        new Pawn(Color.black),
        new Pawn(Color.black),
        new Pawn(Color.black),
        new Pawn(Color.black),
        new Pawn(Color.black),
        new Pawn(Color.black),
        new Pawn(Color.black),
      ],
      [
        new Queen(Color.black),
        new King(Color.black),
        new Rook(Color.black),
        new Rook(Color.black),
        new Knight(Color.black),
        new Knight(Color.black),
        new Bishop(Color.black),
        new Bishop(Color.black),
      ],
    ];
  }
  public get PlayerColor(): Color {
    return this._playerColor;
  }
  public get ChessBoardView(): (FENChar | null)[][] {
    return this.chessBoard.map((row) => {
      return row.map((piece) =>
        piece instanceof Piece ? piece.FENChar : null
      );
    });
  }
}

//   constructor() {
//     const createRow = (color:Color) => [
//       new Queen(color),
//       new King(color),
//       new Rook(color),
//       new Rook(color),
//       new Knight(color),
//       new Knight(color),
//       new Bishop(color),
//       new Bishop(color)
//     ];

//     this.chessBoard = [
//       createRow(Color.white),
//       Array(8).fill(new Pawn(Color.white)),
//       Array(8).fill(null),
//       Array(8).fill(null),
//       Array(8).fill(null),
//       Array(8).fill(null),
//       Array(8).fill(new Pawn(Color.black)),
//       createRow(Color.black)
//     ];
//   }
