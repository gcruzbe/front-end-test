import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { WordleService } from '../app/services/wordle.service';
import { AppComponent } from './app.component';
import { WordleGameComponent } from './wordle-game/wordle-game.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    WordleGameComponent,
  ],
  providers: [WordleService],
})
export class AppModule { }
