import { Component } from '@angular/core';
import { WordleGameComponent } from './wordle-game/wordle-game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WordleGameComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
