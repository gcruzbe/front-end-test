import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordleService {

  constructor(private apiService: ApiService) { }

  // Método para iniciar un nuevo juego de Wordle
  startNewGame(difficulty: string = 'easy'): Observable<any> {
    return this.apiService.startNewGame(difficulty);
  }

  // Método para realizar un intento de adivinanza en un juego de Wordle
  makeGuess(gameId: string, guessWord: string): Observable<any> {
    return this.apiService.makeGuess(gameId, guessWord);
  }

  // Método para obtener detalles de un juego de Wordle
  getGameDetails(gameId: string): Observable<any> {
    return this.apiService.getGameDetails(gameId);
  }
}


/*
En este archivo, el servicio WordleService simplemente actúa como un intermediario entre los componentes de Angular y el servicio ApiService.

El método startNewGame() llama al método correspondiente en ApiService para iniciar un nuevo juego de Wordle.
El método makeGuess() llama al método correspondiente en ApiService para realizar un intento de adivinanza en un juego de Wordle.
El método getGameDetails() llama al método correspondiente en ApiService para obtener detalles de un juego de Wordle.
*/