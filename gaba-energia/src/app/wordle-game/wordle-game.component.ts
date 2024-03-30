import { Component, OnInit } from '@angular/core';
import { WordleService } from '../services/wordle.service';
import { Game } from '../models/wordle.model';
import { Guess } from '../models/guess.model';

const baseClass = 'app-wordle-game';

@Component({
  selector: baseClass,
  templateUrl: './wordle-game.component.html',
  styleUrls: ['./wordle-game.component.css']
})
export class WordleGameComponent implements OnInit {
  game!: Game;
  guessWord!: string;
  errorMessage!: string;
  gameOver: boolean = false;
  gameWon: boolean = false;

  constructor(private wordleService: WordleService) { }

  ngOnInit(): void {
    this.startNewGame();
  }

  startNewGame(): void {
    this.wordleService.startNewGame().subscribe(
      (game: Game) => {
        this.game = game;
        this.errorMessage = '';
        this.gameOver = false;
        this.gameWon = false;
      },
      (error: string) => {
        this.errorMessage = 'Error al iniciar el juego. Por favor, inténtalo de nuevo más tarde.';
      }
    );
  }

  makeGuess(): void {
    this.wordleService.makeGuess(this.game.gameId, this.guessWord.toUpperCase()).subscribe(
      (response: any) => {
        // Actualizar el estado del juego después de hacer un intento
        const guess: Guess = {
          guessWord: this.guessWord.toUpperCase(),
          result: response.result
        };
        this.game.guesses.push(guess);
        this.game.attemptsLeft = response.attemptsLeft;

        if (response.isGameWon) {
          this.gameWon = true;
          this.gameOver = true;
        } else if (this.game.attemptsLeft === 0) {
          this.gameOver = true;
        }

        this.guessWord = ''; // Limpiar el campo de entrada
      },
      (error: string) => {
        this.errorMessage = 'Error al hacer el intento. Por favor, inténtalo de nuevo.';
      }
    );
  }
}