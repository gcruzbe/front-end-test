import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordleGameComponent } from './wordle-game.component';

@NgModule({
  declarations: [
    WordleGameComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WordleGameComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WordleGameModule { }
