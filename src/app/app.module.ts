import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { UrlCheckerComponent } from './components/url-checker.component'; // Import UrlCheckerComponent
import { AppComponent } from './app.component'; // Import AppComponent

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppComponent // Standalone components should be imported, not declared
  ],
  providers: [],
  bootstrap: [AppComponent] // Ensure bootstrap remains the same
})
export class AppModule { }
