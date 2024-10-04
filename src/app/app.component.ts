import { Component } from '@angular/core';
import { UrlCheckerComponent } from './components/url-checker.component';
import { RouterModule } from '@angular/router'; // <-- Add this import

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [UrlCheckerComponent, RouterModule], // <-- Add RouterModule here
})
export class AppComponent {
  title = 'url-checker-app';
}