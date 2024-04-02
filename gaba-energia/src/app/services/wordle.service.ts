import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../models/wordle.model';

@Injectable({
  providedIn: 'root'
})
export class WordleService {

  constructor() { }

  startNewGame(difficulty: string = 'easy'): Observable<Game> {
    const gameId = Math.random().toString(36).substring(7);
    const initialGame: Game = {
      gameId: gameId,
      status: 0,
      attemptsLeft: 6,
      wordToGuess: 'SOLAR',
      guesses: []
    };

    return of(initialGame);
  }

  makeGuess(gameId: string, guessWord: string): Observable<Game> {
    let game: Game = this.getMockGame(gameId);

    if (!game) {
      console.error('Juego no encontrado')
    }

    if (game.attemptsLeft <= 0) {
      console.error('Ya no tienes más intentos')
    }

    if (game.attemptsLeft === 0) {
      game.status = 2;
    }

    const result = this.calculateResult(guessWord, game.wordToGuess);
    const isGameWon = result === '11111';

    console.log(isGameWon, '=====')

    return of({ ...game, result, isGameWon });
  }

  getGameDetails(gameId: string): Observable<Game> {
    const game: Game = this.getMockGame(gameId);

    if (!game) {
      console.error('Juego no encontrado')
    }

    return of(game);
  }

  private calculateResult(guessWord: string, targetWord: string): string {
    let result = '';

    for (let i = 0; i < 5; i++) {
      if (targetWord.includes(guessWord[i])) {
        result += '1';
      } else {
        result += '0';
      }
    }

    return result;
  }

  private getMockGame(gameId: string): Game {
    return {
      gameId: gameId,
      status: 0,
      attemptsLeft: 6,
      wordToGuess: 'SOLAR',
      guesses: []
    };
  }
}
