import { Color, Coords, FENChar, SafeSquares } from '../models';
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
  private readonly chessBoardSize: number = 8;

  constructor() {
    const createRow = (color: Color) => [
      new Rook(color),
      new Knight(color),
      new Bishop(color),
      new Queen(color),
      new King(color),
      new Bishop(color),
      new Knight(color),
      new Rook(color),
    ];

    this.chessBoard = [
      createRow(Color.white), // Row 1 (White pieces)
      Array(8).fill(new Pawn(Color.white)), // Row 2 (White pawns)
      Array(8).fill(null), // Row 3 (Empty)
      Array(8).fill(null), // Row 4 (Empty)
      Array(8).fill(null), // Row 5 (Empty)
      Array(8).fill(null), // Row 6 (Empty)
      Array(8).fill(new Pawn(Color.black)), // Row 7 (Black pawns)
      createRow(Color.black), // Row 8 (Black pieces)
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

  public static isSquareDark(x: number, y: number): boolean {
    return (x % 2 === 0 && y % 2 === 0) || (x % 2 === 1 && y % 2 === 1);
  }

  public areCoordsValid(x: number, y: number): boolean {
    return (
      x >= 0 && y >= 0 && x <= this.chessBoardSize && y <= this.chessBoardSize
    );
  }

  public isInCheck(playerColor: Color): boolean {
    for (let x = 0; x < this.chessBoardSize; x++) {
      for (let y = 0; y < this.chessBoardSize; y++) {
        const piece: Piece | null = this.chessBoard[x][y];
        if (!piece || piece.color === playerColor) continue;
        for (const { x: dx, y: dy } of piece.directions) {
          let newX: number = x + dx;
          let newY: number = y + dy;

          if (!this.areCoordsValid(x, y)) continue;
          if ([Pawn, Knight, King].some((pieceClass) => piece instanceof pieceClass)) {
            //Pawns are only attacking diagonally
            if (piece instanceof Pawn && dy === 0) continue;
            const attackedPiece: Piece | null = this.chessBoard[newX][newY];
            if (attackedPiece instanceof King && attackedPiece.color === playerColor) return false;
          }
          else {
            while (this.areCoordsValid(newX, newY)) {
              const attackedPiece: Piece | null = this.chessBoard[newX][newY];
              if (attackedPiece instanceof King && attackedPiece.color === playerColor) return false;

              if (attackedPiece !== null) break;

              newX += dx;
              newY += dy;
            }
          }
        }
      }
    }
    return false;
  }

  private isPositionSafeAfterMove(piece: Piece, prevX: number, prevY: number, newX: number, newY: number): boolean {
    const newPiece: Piece | null = this.chessBoard[newX][newY];

    //we can't put piece of the same color in a square that contains a piece of the same color
    if (newPiece && newPiece.color === piece.color) return false;
    //simulate positions
    this.chessBoard[prevX][prevY] = null
    this.chessBoard[newX][newY] = piece

    const isPositionSafe: boolean = !this.isInCheck(piece.color)

    //restore positions
    this.chessBoard[prevX][prevY] = piece
    this.chessBoard[newX][newY] = newPiece

    return isPositionSafe;
  }

  private findSafeSquares(): SafeSquares {
    const safeSquares: SafeSquares = new Map<string, Coords[]>();

    for (let x = 0; x < this.chessBoardSize; x++) {
      for (let y = 0; y < this.chessBoardSize; y++) {
        const piece: Piece | null = this.chessBoard[x][y];

        if (!piece || piece.color !== this._playerColor) continue

        const pieceSafeSquares: Coords[] = []

        for (const { x: dx, y: dy } of piece.directions) {
          let newX = x + dx, newY = y + dy;
          if (this.areCoordsValid(newX, newY)) continue;

          let newPiece: Piece | null = this.chessBoard[newX][newY]
          if (newPiece && newPiece.color !== piece.color) continue

          // need to restrict pawn moves in certain directions
          if (piece instanceof Pawn) {
            // cant move pawn two squares straight if there is piece infront of him
            if (dx === 2 || dx === -2) {
              if (newPiece) continue;
              if (this.chessBoard[newX + (dx === 2 ? -1 : 1)][newY]) continue;
            }

            // can't move pawn one square straight if piece is infront of him
            if ((dx === 1 || dx === -1) && dy === 0 && newPiece) continue;

            // cant move pawn diagonally if there is no piece, or piece has same color as pawn
            if ((dy === 1 || dy === -1) && (!newPiece || piece.color === newPiece.color)) continue;
          }
          if (newPiece instanceof Pawn || newPiece instanceof Knight || newPiece instanceof King) {
            if (this.isPositionSafeAfterMove(piece, x, y, newX, newY)) {
              pieceSafeSquares.push({ x: newX, y: newY })
            }
          }
          else {
            while (this.areCoordsValid(newX, newY)) {
              newPiece = this.chessBoard[newX][newY];
              if (newPiece && newPiece.color === piece.color) break;

              if (this.isPositionSafeAfterMove(piece, x, y, newX, newY))
                pieceSafeSquares.push({ x: newX, y: newY });

              if (newPiece !== null) break;

              newX += dx;
              newY += dy;
            }
          }
        }
        if (pieceSafeSquares.length) {
          safeSquares.set(x + "," + y, pieceSafeSquares)
        }
      }
    }
    return safeSquares;
  }
}
