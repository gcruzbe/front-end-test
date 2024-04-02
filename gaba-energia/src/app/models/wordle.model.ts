import { Guess } from "./guess.model";

export interface Game {
  gameId: string;
  status: number;
  attemptsLeft: number;
  wordToGuess: string;
  guesses: Guess[];
}