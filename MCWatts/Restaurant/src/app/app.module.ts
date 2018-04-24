import { Sprint4Module } from './../sprint4/sprint4.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AccountRepostitory } from './domain/account-info-repository.service.';
import { Sprint1Module } from './../sprint1/sprint1.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { Sprint2Module } from '../sprint2/sprint2.module';
import { Sprint3Module } from '../sprint3/sprint3.module';









@NgModule({
  declarations: [
    AppComponent,


],
  imports: [
    BrowserModule,
    Sprint1Module,
    Sprint2Module,
    Sprint3Module,
    Sprint4Module,
    RouterModule.forRoot([]),
    HttpClientModule,
  ],
  providers: [
     AccountRepostitory
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
