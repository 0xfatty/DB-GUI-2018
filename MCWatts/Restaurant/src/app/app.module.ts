import { Sprint1Module } from './../sprint1/sprint1.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { Sprint2Module } from '../sprint2/sprint2.module';








@NgModule({
  declarations: [
    AppComponent,

],
  imports: [
    BrowserModule,
    Sprint1Module,
    Sprint2Module,
    RouterModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
