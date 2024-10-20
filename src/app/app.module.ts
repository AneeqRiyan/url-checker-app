import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { UrlCheckerComponent } from './components/url-checker.component'; 
import { AppComponent } from './app.component'; 

@NgModule({
  declarations: [AppComponent, UrlCheckerComponent], 
  imports: [BrowserModule, ReactiveFormsModule], 
  bootstrap: [AppComponent]
})
export class AppModule {}