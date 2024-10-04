import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MockServerService {
  constructor() {}

  // Mock server response to check if the URL exists and whether it's a file or folder
  checkUrlExists(url: string): Observable<{ exists: boolean; type: 'file' | 'folder' | null }> {
    return new Observable((observer) => {
      setTimeout(() => {
        if (url.includes('file')) {
          observer.next({ exists: true, type: 'file' });
        } else if (url.includes('folder')) {
          observer.next({ exists: true, type: 'folder' });
        } else {
          observer.next({ exists: false, type: null });
        }
        observer.complete();
      }, 1000); // Simulated delay
    });
  }
}