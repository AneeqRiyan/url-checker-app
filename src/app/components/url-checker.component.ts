import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Add this import
import { MockServerService } from '../services/mock-server.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-url-checker',
  templateUrl: './url-checker.component.html',
  styleUrls: ['./url-checker.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // <-- Add CommonModule here
})
export class UrlCheckerComponent {
  urlControl = new FormControl('');
  isValidUrl: boolean | null = null;
  checkResult: { exists: boolean; type: string | null } | null = null;
  loading = false;

  private urlPattern = new RegExp('^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$');

  constructor(private mockServer: MockServerService) {
    this.urlControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((url: string | null) => {
          if (url === null) {
            return of(null);
          }
          return this.handleUrlCheck(url);
        })
      )
      .subscribe();
  }

  handleUrlCheck(url: string): Observable<any> {
    this.isValidUrl = this.urlPattern.test(url);

    if (this.isValidUrl) {
      this.loading = true;
      return this.mockServer.checkUrlExists(url).pipe(
        debounceTime(500),
        switchMap((response) => {
          this.loading = false;
          this.checkResult = response;
          return of(response);
        })
      );
    } else {
      this.checkResult = null;
      return of(null);
    }
  }
}
