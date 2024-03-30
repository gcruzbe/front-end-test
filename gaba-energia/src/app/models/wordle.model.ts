import { Guess } from "./guess.model";

export interface Game {
    gameId: string;
    status: number;
    attemptsLeft: number;
    wordToGuess: string;
    guesses: Guess[];
  }
  

  /*
Game: Esta interfaz define la estructura de datos para representar un juego de Wordle. Contiene los siguientes campos:

gameId: ID único del juego.
status: Estado actual del juego (0 para "En progreso", 1 para "Victoria", 2 para "Derrota").
attemptsLeft: Número de intentos restantes en el juego.
wordToGuess: La palabra que se debe adivinar en el juego.
guesses: Una lista de objetos Guess, que representan los intentos realizados por el usuario.
  */