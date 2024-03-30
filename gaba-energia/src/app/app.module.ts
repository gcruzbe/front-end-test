import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WordleGameComponent } from '../app/wordle-game/wordle-game.component';

@NgModule({
  declarations: [
    AppComponent,
    WordleGameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    WordleGameComponent,
    AppComponent
  ],
  exports: [
    WordleGameComponent,
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
