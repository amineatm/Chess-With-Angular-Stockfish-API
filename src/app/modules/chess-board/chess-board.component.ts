import { Component } from '@angular/core';
import { ChessBoard } from '../../chess-logic/pieces/chess-board';
import { Color, FENChar, pieceImagePaths } from '../../chess-logic/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chess-board',
  imports: [CommonModule],
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.css',
})
export class ChessBoardComponent {
  public pieceImagePaths = pieceImagePaths;
  private chessBoard = new ChessBoard();
  public chessBoardView: (FENChar | null)[][] = this.chessBoard.ChessBoardView;

  public get playerColor(): Color {
    return this.chessBoard.PlayerColor;
  }
  public isSquare(x: number, y: number): boolean {
    return ChessBoard.isSquareDark(x, y);
  }
}
