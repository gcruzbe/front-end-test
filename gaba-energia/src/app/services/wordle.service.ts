import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Game } from '../models/wordle.model';

@Injectable({
  providedIn: 'root'
})
export class WordleService {

  constructor() { }

  // Método para iniciar un nuevo juego de Wordle
  startNewGame(difficulty: string = 'easy'): Observable<Game> {
    const gameId = Math.random().toString(36).substring(7);
    const initialGame: Game = {
      gameId: gameId,
      status: 0,
      attemptsLeft: 6, // Inicializar con 6 intentos
      wordToGuess: 'SOLAR',
      guesses: []
    };

    return of(initialGame);
  }

  // Método para realizar un intento de adivinanza en un juego de Wordle
  makeGuess(gameId: string, guessWord: string): Observable<Game> {
    let game: Game = this.getMockGame(gameId);

    if (!game) {
      console.error('Juego no encontrado')
    }

    // Verificar si aún quedan intentos
    if (game.attemptsLeft <= 0) {
      console.error('Ya no tienes más intentos')
    }

    // Decrementar el número de intentos restantes
    game.attemptsLeft--;

    // Deshabilitar el juego si no quedan intentos
    if (game.attemptsLeft === 0) {
      game.status = 2; // Derrota
    }

    // Calcular el resultado del intento
    const result = this.calculateResult(guessWord, game.wordToGuess);
    const isGameWon = result === '11111'; // La palabra se ha adivinado correctamente

    // Retornar los resultados simulados
    return of({ ...game, result, isGameWon });
  }

  // Método para obtener detalles de un juego de Wordle
  getGameDetails(gameId: string): Observable<Game> {
    const game: Game = this.getMockGame(gameId);

    if (!game) {
      console.error('Juego no encontrado')
    }

    return of(game);
  }

  // Método para calcular el resultado de un intento
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

  // Método para simular obtener un juego por su ID
  private getMockGame(gameId: string): Game {
    return {
      gameId: gameId,
      status: 0,
      attemptsLeft: 6, // Inicializar con 6 intentos
      wordToGuess: 'SOLAR',
      guesses: []
    };
  }
}
