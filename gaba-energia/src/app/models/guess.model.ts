export interface Guess {
    guessWord: string;
    result: string;
}

/*
Guess: Esta interfaz define la estructura de datos para representar un intento de adivinanza en el juego. Contiene los siguientes campos:

guessWord: La palabra que el usuario intentó adivinar.
result: El resultado del intento, que describe cuántas letras están en la posición correcta, cuántas están en una posición incorrecta pero presentes en la palabra, y cuántas letras no están presentes en la palabra.
*/