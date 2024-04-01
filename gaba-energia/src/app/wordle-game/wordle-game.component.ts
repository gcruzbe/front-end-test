import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordleService } from '../services/wordle.service';
import { Game } from '../models/wordle.model';
import { Guess } from '../models/guess.model';

@Component({
  selector: 'app-wordle-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wordle-game.component.html',
  styleUrls: ['./wordle-game.component.css']
})
export class WordleGameComponent implements OnInit {
  game: Game | undefined;
  guessWord: string = '';
  errorMessage: string = '';
  gameOver: boolean = false;
  gameWon: boolean = false;

  constructor(private wordleService: WordleService) { }

  ngOnInit(): void {
    this.startNewGame();
  }

  startNewGame(): void {
    this.wordleService.startNewGame().subscribe({
      next: (game: Game) => {
        this.game = game;
        this.errorMessage = '';
        this.gameOver = false;
        this.gameWon = false;
      },
      error: (error: string) => {
        this.errorMessage = 'Error al iniciar el juego. Por favor, inténtalo de nuevo más tarde.';
      }
    });
  }

  makeGuess(): void {
    if (!this.game) {
      console.error('No se puede hacer una suposición sin un juego en curso.');
      return;
    }

    this.wordleService.makeGuess(this.game.gameId, this.guessWord.toUpperCase()).subscribe({
      next: (response: any) => {
        const guess: Guess = {
          guessWord: this.guessWord.toUpperCase(),
          result: response.result
        };

        if (this.game?.guesses) {
          this.game.guesses = [...this.game.guesses];
        } else {
          console.error('No se puede acceder a las suposiciones del juego.');
          return;
        }

        if (this.game?.attemptsLeft) {
          this.game.attemptsLeft = response.attemptsLeft;
        } else {
          console.error('No se puede acceder al número de intentos restantes del juego.');
          return;
        }

        if (this.game.guesses)
          this.game.guesses.push(guess);

        if (this.game.attemptsLeft)
          this.game.attemptsLeft = response.attemptsLeft;

        if (response.isGameWon) {
          this.gameWon = true;
          this.gameOver = true;
        } else if (this.game.attemptsLeft === 0) {
          this.gameOver = true;
        }

        this.guessWord = '';
      },
      error: (error: string) => {
        this.errorMessage = 'Error al hacer el intento. Por favor, inténtalo de nuevo.';
      }
    });
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.guessWord = value;
  }
}
