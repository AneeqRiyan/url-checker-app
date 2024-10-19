import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { UrlCheckerComponent } from './components/url-checker.component'; // Import UrlCheckerComponent
import { AppComponent } from './app.component'; // Import AppComponent

@NgModule({
  declarations: [AppComponent, UrlCheckerComponent], // Declare components here
  imports: [BrowserModule, ReactiveFormsModule], // Import necessary modules
  bootstrap: [AppComponent]
})
export class AppModule {}