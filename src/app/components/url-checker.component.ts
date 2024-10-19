import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-url-checker',
  templateUrl: './url-checker.component.html',
  styleUrls: ['./url-checker.component.css']
})
export class UrlCheckerComponent implements OnInit {
  urlControl = new FormControl('');
  isValidUrl: boolean | null = null;
  loading = false;
  checkResult: { exists: boolean; type: string } | null = null;

  constructor() {}

  ngOnInit(): void {
    // Immediate validation check for URL format
    this.urlControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((url) => {
        this.isValidUrl = this.validateUrl(url);  // Immediate URL validity check
        this.loading = false;  // Stop the loading spinner
        this.checkResult = null;  // Clear previous result immediately
      });

    // Debounced server request for existence check
    this.urlControl.valueChanges
      .pipe(
        debounceTime(500),  // Debounce the server check
        distinctUntilChanged(),
        switchMap((url) => {
          if (this.isValidUrl) {
            this.loading = true;  // Start the loading spinner
            return this.handleUrlCheck(url);  // Only check if the URL is valid
          } else {
            return of(null);  // Skip existence check for invalid URLs
          }
        })
      )
      .subscribe((result) => {
        this.loading = false;  // Stop the loading spinner
        this.checkResult = result;  // Update the result with server response
      });
  }

  validateUrl(url: string | null): boolean | null {
    if (!url) return null;  // If the input is empty, don't mark it as invalid
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;  // A basic regex for URL validation
    return urlPattern.test(url);
  }

  handleUrlCheck(url: string | null) {
    if (!url) return of({ exists: false, type: '' });

    // Simulate file or folder existence based on the URL pattern
    const folderPattern = /folder|\/$/; // URL ending with a slash
    const filePattern = /file|\.(html|png|jpg|pdf|txt|doc|css|js)$/; // Common file extensions

    if (folderPattern.test(url)) {
      return of({ exists: true, type: 'folder' });
    } else if (filePattern.test(url)) {
      return of({ exists: true, type: 'file' });
    } else {
      return of({ exists: false, type: '' });
    }
  }
}
