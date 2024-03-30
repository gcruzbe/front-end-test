import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.wordle.com/v1';

  constructor(private http: HttpClient) { }

  // Método para iniciar un nuevo juego de Wordle
  startNewGame(difficulty: string = 'easy'): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/game`, { difficulty });
  }

  // Método para realizar un intento de adivinanza en un juego de Wordle
  makeGuess(gameId: string, guessWord: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/game/${gameId}/guess`, null, { params: { guessWord } });
  }

  // Método para obtener detalles de un juego de Wordle
  getGameDetails(gameId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/game/${gameId}`);
  }
}


/*
En este archivo, se define un servicio llamado ApiService que utiliza HttpClient de Angular para realizar solicitudes HTTP a la API de Wordle.

El método startNewGame() envía una solicitud POST para iniciar un nuevo juego de Wordle con un nivel de dificultad opcional.
El método makeGuess() envía una solicitud POST para realizar un intento de adivinanza en un juego de Wordle con una palabra de 5 letras proporcionada.
El método getGameDetails() envía una solicitud GET para obtener detalles de un juego de Wordle dado su ID único.
*/