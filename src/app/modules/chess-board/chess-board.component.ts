import { Component } from '@angular/core';
import { ChessBoard } from '../../chess-logic/pieces/chess-board';
import { Color, FENChar } from '../../chess-logic/models';

@Component({
  selector: 'app-chess-board',
  imports: [],
  templateUrl: './chess-board.component.html',
  styleUrl: './chess-board.component.css',
})
export class ChessBoardComponent {
  private chessBoard = new ChessBoard();
  public chessBoardView: (FENChar | null)[][] = this.chessBoard.ChessBoardView;

  public get currentPlayer(): Color {
    return this.chessBoard.PlayerColor;
  }
}
