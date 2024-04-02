import { Component, OnInit, Input } from '@angular/core';
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
  @Input() buttonDisabled: boolean = false;
  game: Game | undefined;
  guessWord: string = '';
  errorMessage: string = '';
  gameOver: boolean = false;
  gameWon: boolean = false;
  hiddenWord: string = '';
  usedWords: Set<string> = new Set();
  isDarkMode: boolean = false;

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
        this.hiddenWord = this.generateHiddenWord(game.wordToGuess);
        this.usedWords.clear();
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

    if (this.usedWords.has(this.guessWord.toUpperCase())) {
      console.error('Ya has intentado esta palabra. Intenta con otra.');
      return;
    }

    this.wordleService.makeGuess(this.game.gameId, this.guessWord.toUpperCase()).subscribe({
      next: (response: any) => {
        const guess: Guess = {
          guessWord: this.guessWord.toUpperCase(),
          result: response.result,
        };

        this.usedWords.add(this.guessWord.toUpperCase());

        if (this.game?.guesses) {
          this.game.guesses = [...this.game.guesses];
        } else {
          console.error('No se puede acceder a las suposiciones del juego.');
          return;
        }

        if (this.game) {
          this.game.attemptsLeft = this.game.attemptsLeft - 1;
        } else {
          console.error('No se puede acceder al número de intentos restantes del juego.');
          return;
        }

        if (this.game.guesses)
          this.game.guesses.push(guess);

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

  generateHiddenWord(wordToGuess: string): string {
    return '-'.repeat(wordToGuess.length);
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
  }
}
