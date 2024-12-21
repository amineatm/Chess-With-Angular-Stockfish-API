import { Component } from '@angular/core';
import { ChessBoardComponent } from "./modules/chess-board/chess-board.component";

@Component({
  selector: 'app-root',
  imports: [ ChessBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Chess-With-Angular-Stockfish-API';
}
