import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { TextMaskModule } from 'angular2-text-mask';
import { CustomFormsModule } from 'ng2-validation';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';

import { Home, BookList, BookDetails, LayoutExercise, BookService } from './exports';

@NgModule({
  declarations: [
    AppComponent,
    Home,
    BookList,
    BookDetails,
    LayoutExercise
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(AppRoutes),
    HttpModule,
    JsonpModule,
    TextMaskModule,
    CustomFormsModule
  ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
